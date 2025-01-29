import CryptoJS from "crypto-js";
import { ethers } from "ethers";
import nftAbi from "../../abis/nftAbi.json";
import erc6551RegistryABI from "../../abis/erc6551Registry.json";
// const dotenv = require('dotenv');

const eventABI = [
  "event AccountCreated(address account, address implementation, uint256 chainId, address tokenContract, uint256 tokenId, uint256 salt)",
];

const PRIVATE_KEY = process.env.REACT_APP_OWNER_PK;
const NFT_CONTRACT_ADDRESS = process.env.REACT_APP_NFT_CONTRACT_ADDRESS;
const ERC6551_REGISTRY_ADDRESS = process.env.REACT_APP_ERC6551_REGISTRY_ADDRESS;
const ERC6551_ACCOUNT_ADDRESS = process.env.REACT_APP_ERC6551_ACCOUNT_ADDRESS;

// Genera una clave privada a partir del nombre de usuario y la contraseña, y la almacena en sessionStorage.
// Verifica si el usuario ya tiene un NFT asociado; si es así, recupera la cuenta vinculada.
// Si no tiene un NFT, se crea/mintea uno nuevo y se asocia a la nueva cuenta.
const createUser = async (username: any, password: any, setCreateAccount: any, setCreateAccountSteps: any) => {
  console.log(NFT_CONTRACT_ADDRESS)
  if(NFT_CONTRACT_ADDRESS == undefined){return}
  const secretKey = CryptoJS.PBKDF2(password, username, {
    keySize: 256 / 32,
  }).toString(); //Le crea llave privada uniendo usuario y contraseña
  window.sessionStorage.setItem("pk", secretKey); //Almacena la PK en sessionStorage
  const wallet = new ethers.Wallet(secretKey);

  const tokenId = await checkUserNFT(wallet.address); //Verifica si ya tiene cuentas esa PK

  const provider = new ethers.JsonRpcProvider("https://polygon-rpc.com/");
  const nftContract = new ethers.Contract(
    NFT_CONTRACT_ADDRESS,
    nftAbi,
    provider
  );

  if (tokenId) {
    console.log("Setea createAccount en 1")
    setCreateAccount(1)
    // Entra aca si ya tiene un NFT, entonces busca
    const accountWallet = await getTokenBoundAccount(tokenId); //Esta funcion es un caller que en base a un NFT te devuelve su address de cuenta (ERC6551)
    console.log("NFT ya existente encontrado:", tokenId);
    console.log("Wallet de usuario vinculada existente:", wallet.address);
    console.log("Cuenta vinculada existente:", accountWallet);
    window.localStorage.setItem("userWallet", wallet.address);
    window.localStorage.setItem("wallet", accountWallet);
    window.sessionStorage.setItem("userPassword", password);

    const userInfo = await nftContract.getUserInfo(accountWallet); //Esto nos retorna el nombre de usuario y en que fecha se creo la cuenta
    window.localStorage.setItem("userName", userInfo[0]);
    window.localStorage.setItem("creationTime", userInfo[2]);
    return true;
  } else {
    setCreateAccount(2)
    setCreateAccountSteps(1)
    // Envía 0.50 MATIC a la wallet del usuario
    await sendMaticToUser(wallet.address, 0.5);
    setCreateAccountSteps(2)
    // Si no tiene NFT, mintea uno nuevo y se genera una nueva direccion, a esa direccion le asocia el nombre de usuario
    const newTokenId = await mintNFT(wallet.address); //Mintea nuevo NFT a la direccion a nivel usuario
    setCreateAccountSteps(3)
    const accountWallet = await createTokenBoundAccount(newTokenId);
    setCreateAccountSteps(4)
    console.log("Nuevo NFT creado:", newTokenId);
    console.log("Wallet de usuario vinculada nueva:", wallet.address);
    console.log("Nueva cuenta vinculada creada:", accountWallet);
    window.localStorage.setItem("userWallet", wallet.address);
    window.localStorage.setItem("wallet", accountWallet);
    window.sessionStorage.setItem("userPassword", password);
    await createUserFunc(accountWallet, newTokenId, username); //Vuelve a llamar a la funcion
    console.log("Creado correctamente");
    const userInfo = await nftContract.getUserInfo(accountWallet);
    console.log(userInfo);
    window.localStorage.setItem("userName", userInfo[0]);
    window.localStorage.setItem("creationTime", userInfo[2]);
    setCreateAccountSteps(5)
    return false;
  }
};

// Determina si se debe crear un nuevo NFT o usar uno existente.
// Se conecta al contrato NFT y consulta el balance del usuario.
// Si el balance es mayor a cero, se obtiene el ID del NFT asociado.
async function checkUserNFT(userAddress: any) {
  if(NFT_CONTRACT_ADDRESS == undefined){return}
  try {
    const provider = new ethers.JsonRpcProvider("https://polygon-rpc.com/");
    const nftContract = new ethers.Contract(
      NFT_CONTRACT_ADDRESS,
      nftAbi,
      provider
    );
    const balance = await nftContract.balanceOf(userAddress); // Verificar si el usuario ya tiene un NFT
    if (balance > 0) {
      const tokenId = await nftContract.NFTPerWallet(userAddress, 0);
      return tokenId; //Si entra aca significa que tiene
    } else {
      console.log("No tiene NFT");
      return null; // No tiene NFT
    }
  } catch (error) {
    console.error("Error al verificar si el usuario tiene NFT:", error);
    return null;
  }
}

//Envia 0.50 Matic desde la cuenta Owner hacia la wallet si es que se esta registrando
async function sendMaticToUser(receiverAddress: string, amount: number) {
  if(PRIVATE_KEY == undefined){return}
  try {
    const provider = new ethers.JsonRpcProvider("https://polygon-rpc.com/");
    const ownerWallet = new ethers.Wallet(PRIVATE_KEY, provider);

    // Convertir la cantidad a wei (MATIC tiene 18 decimales)
    const value = ethers.parseUnits(amount.toString(), 18);

    const tx = await ownerWallet.sendTransaction({
      to: receiverAddress,
      value: value,
    });

    console.log(`Enviando ${amount} MATIC a ${receiverAddress}...`);
    await tx.wait();
    console.log(`Transferencia completada. Hash de la transacción: ${tx.hash}`);
  } catch (error) {
    console.error("Error al enviar MATIC:", error);
    throw error;
  }
}




// Genera un ID de NFT aleatorio y lo asocia a la dirección del usuario.
async function mintNFT(userAddress: string): Promise<number> {
  try {
    if(PRIVATE_KEY == undefined){return 0}
    if(NFT_CONTRACT_ADDRESS == undefined){return 0}
    const provider = new ethers.JsonRpcProvider("https://polygon-rpc.com/");
    const ownerWallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const nftContract = new ethers.Contract(
      NFT_CONTRACT_ADDRESS,
      nftAbi,
      ownerWallet
    );
    const tokenId = Math.floor(Math.random() * 10000); // Genera  numero de NFT de manera aleatoria, se podria ver de hacerlo de manera secuencial
    const tx = await nftContract.safeMint(userAddress, tokenId);
    console.log("Enviandole el NFT", tokenId, " A la wallet: ", userAddress);
    await tx.wait();
    console.log(`NFT con tokenId ${tokenId} enviado a ${userAddress}`);
    return tokenId;
  } catch (error) {
    //console.error("Error al mintar el NFT:", error);
    throw error;
  }
}

// Crea una cuenta vinculada a un NFT utilizando el estándar ERC6551.
// Esta cuenta permite que el NFT tenga su propia dirección y funcionalidades asociadas.
async function createTokenBoundAccount(tokenId: number) {
  try {
    if(PRIVATE_KEY == undefined){return}
    if(ERC6551_REGISTRY_ADDRESS == undefined){return}
    const provider = new ethers.JsonRpcProvider("https://polygon-rpc.com/");
    const ownerWallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const registryContract = new ethers.Contract(
      ERC6551_REGISTRY_ADDRESS,
      erc6551RegistryABI,
      ownerWallet
    );
    const tx = await registryContract.createAccount(
      //Crea una cuenta mediante el estandar ERC6551 enlazando el ID de ese NFT con esa cuenta
      ERC6551_ACCOUNT_ADDRESS,
      137,
      NFT_CONTRACT_ADDRESS,
      tokenId,
      0,
      "0x"
    );
    const transactionHash = tx.hash;
    const receipt = await tx.wait();
    await receipt;
    const address = getAccountFromTransaction(transactionHash); //Esto nos obtiene la address de la cuenta recien creada
    return address;
  } catch (error) {
    console.error("Error al crear la cuenta Token Bound:", error);
  }
}

// Se conecta al contrato ERC6551 Registry para obtener la dirección de la cuenta.
async function getTokenBoundAccount(tokenId: any) {
  try {
    if(ERC6551_REGISTRY_ADDRESS == undefined){return}
    const provider = new ethers.JsonRpcProvider("https://polygon-rpc.com/");
    const registryContract = new ethers.Contract(
      ERC6551_REGISTRY_ADDRESS,
      erc6551RegistryABI,
      provider
    );
    const accountWallet = await registryContract.account(
      ERC6551_ACCOUNT_ADDRESS,
      137,
      NFT_CONTRACT_ADDRESS,
      tokenId,
      0
    );
    return accountWallet;
  } catch (error) {
    console.error("Error al obtener la cuenta vinculada:", error);
    throw error;
  }
}

// Crea un nuevo usuario en el contrato NFT.
// Asocia el nombre de usuario y el ID del NFT a la cuenta vinculada.
async function createUserFunc(
  userAddress: string,
  newTokenId: any,
  username: any
) {
  try {
    if(PRIVATE_KEY == undefined){return}
    if(NFT_CONTRACT_ADDRESS == undefined){return}
    const provider = new ethers.JsonRpcProvider("https://polygon-rpc.com/");
    const ownerWallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const nftContract = new ethers.Contract(
      NFT_CONTRACT_ADDRESS,
      nftAbi,
      ownerWallet
    );
    const tx = await nftContract.createUser(userAddress, newTokenId, username);
    console.log(
      `Usuario ${username} creado con el TokenId ${newTokenId} con el usuario ${username}`
    );
    await tx.wait();
  } catch (error) {
    console.error("Error al mintar el NFT:", error);
    throw error;
  }
}

// Función para obtener la dirección de la cuenta creada a partir del hash de la transacción.
// Busca en los logs de la transacción para encontrar el evento AccountCreated y decodifica la información.
// Devuelve la dirección de la cuenta creada.
async function getAccountFromTransaction(transactionHash: string) {
  try {
    if(ERC6551_REGISTRY_ADDRESS == undefined){return}
    const provider = new ethers.JsonRpcProvider("https://polygon-rpc.com/");
    const receipt = await provider.getTransactionReceipt(transactionHash);
    if (!receipt) {
      return;
    }
    const log = receipt.logs.find(
      (log) =>
        log.address.toLowerCase() === ERC6551_REGISTRY_ADDRESS.toLowerCase()
    );
    if (!log) {
      console.log(
        "No se encontró un log del contrato ERC6551 Registry en esta transacción."
      );
      return;
    }
    const iface = new ethers.Interface(eventABI);
    const decodedLog = iface.decodeEventLog(
      "AccountCreated",
      log.data,
      log.topics
    );
    return decodedLog.account;
  } catch (error) {
    console.error("Error al obtener la dirección de la cuenta creada:", error);
  }
}

export default createUser;
