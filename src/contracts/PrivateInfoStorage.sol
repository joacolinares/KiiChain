// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title PrivateInfoStorage
 * @dev Un contrato inteligente para almacenar y consultar información privada de manera segura
 * con un sistema basado en una whitelist.
 */
contract PrivateInfoStorage is  Ownable {

    // Estado: Información privada almacenada
    string private kiiPrivateInfo;

    // Estado: Whitelist de direcciones
    mapping(address => bool) private whitelist;

    // Estado: Lista de direcciones en la whitelist
    address[] private whitelistAddresses;

    /**
     * @dev Evento emitido cuando la información privada es actualizada.
     * @param updater Dirección del propietario que realizó la actualización.
     * @param newInfo La nueva información almacenada.
     */
    event PrivateInfoUpdated(address indexed updater, string newInfo);

    /**
     * @dev Evento emitido cuando una dirección es agregada a la whitelist.
     * @param addedBy Dirección del propietario que agregó la dirección.
     * @param addedAddress Dirección que fue agregada a la whitelist.
     */
    event AddressAddedToWhitelist(address indexed addedBy, address indexed addedAddress);

   /// @notice Evento emitido cuando una dirección es eliminada de la whitelist.
    event AddressRemovedFromWhitelist(address indexed removedBy, address indexed removedAddress);


    /**
     * @dev Modificador que verifica si una dirección está en la whitelist.
     */
    modifier onlyWhitelisted() {
        require(whitelist[msg.sender], "Caller is not in the whitelist.");
        _;
    }

    /**
     * @notice Constructor que inicializa el contrato.
     * @dev Incluye la dirección por defecto en la whitelist y 10 direcciones adicionales.
     * @param initialAddresses Lista de direcciones para la whitelist inicial (debe incluir 10).
     */
    constructor(address[] memory initialAddresses) Ownable(msg.sender) {
        require(initialAddresses.length == 10, "Exactly 10 addresses required for whitelist.");

        addToWhitelist(0x5Ec605060d810669fd7134494C4AF17ab438CC92);

        // Agregar las direcciones iniciales a la whitelist
        for (uint256 i = 0; i < initialAddresses.length; i++) {
            addToWhitelist(initialAddresses[i]);
        }
    }

    /**
     * @notice Agrega una dirección a la whitelist y al array de direcciones.
     * @dev Solo puede ser ejecutada por el propietario del contrato.
     * @param _address Dirección a agregar a la whitelist.
     */
    function addToWhitelist(address _address) public onlyOwner {
        require(!whitelist[_address], "Address is already whitelisted.");
        whitelist[_address] = true;
        whitelistAddresses.push(_address);
        emit AddressAddedToWhitelist(msg.sender, _address);
    }

    /**
     * @notice Elimina una dirección de la whitelist usando su índice.
     * @dev Solo el propietario puede ejecutarla. Usa swap-and-pop para optimizar gas.
     * @param index Índice de la dirección en la whitelist.
     */
    function removeFromWhitelist(uint256 index) external onlyOwner {
        require(index < whitelistAddresses.length, "Index out of bounds.");

        address toRemove = whitelistAddresses[index];
        require(whitelist[toRemove], "Address is not whitelisted.");
        whitelist[toRemove] = false;
        whitelistAddresses[index] = whitelistAddresses[whitelistAddresses.length - 1];
        whitelistAddresses.pop();
        emit AddressRemovedFromWhitelist(msg.sender, toRemove);
    }

    /**
     * @notice Consulta la información privada almacenada.
     * @dev Solo direcciones en la whitelist pueden llamar a esta función.
     * @return La información privada almacenada.
     */
    function getPrivateInfo() external view onlyWhitelisted  returns (string memory) {
        return kiiPrivateInfo;
    }

    /**
     * @notice Obtiene todas las direcciones en la whitelist.
     * @return Una lista de direcciones que están en la whitelist.
     */
    function getWhitelistAddresses() external  view onlyOwner  returns (address[] memory) {
        return whitelistAddresses;
    }

    /**
     * @notice Actualiza la información privada almacenada.
     * @dev Solo puede ser ejecutada por el propietario del contrato.
     * @param newInfo La nueva información privada a almacenar.
     */
    function updatePrivateInfo(string calldata newInfo) external onlyOwner {
        kiiPrivateInfo = newInfo;
        emit PrivateInfoUpdated(msg.sender, newInfo);
    }

    /**
     * @notice Verifica si una dirección está en la whitelist.
     * @param _address Dirección a verificar.
     * @return `true` si la dirección está en la whitelist, de lo contrario `false`.
     */
    function isWhitelisted(address _address) external view returns (bool) {
        return whitelist[_address];
    }
}
