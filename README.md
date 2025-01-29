# 🚀 Aplicación de Whitelist - KiiChain  

Bienvenido a la aplicación de **Whitelist de KiiChain**.  
Esta es una aplicación web desarrollada en **React con Vite**, que permite a los usuarios verificar si están en la whitelist, ver la palabra clave y, si son administradores, gestionar la whitelist y modificar la palabra clave.

---

## 📌 Configuración y ejecución local  

Para ejecutar la aplicación en tu entorno local, sigue estos pasos:  

### **1️⃣ Clonar el repositorio**  
```sh
git clone <https://github.com/joacolinares/KiiChain>
cd <KIICHAIN>
```

### **2️⃣ Instalar dependencias**  
```sh
yarn install
```

### **3️⃣ Ejecutar la aplicación**  
```sh
yarn run start
```
Esto iniciará un servidor de desarrollo en `http://localhost:5173/` o `http://localhost:3000/` (puerto predeterminado de Vite).  

---

## 📡 Contrato Inteligente  

El contrato inteligente que gestiona la whitelist está desplegado en **Polygon**.  

- **📍 Dirección del contrato:**  
  `0x22B5991F5D3b912fd6C3b130b0A0B533B3A968BB`  
- **🔗 Ver en Polygonscan:**  
  [Ver contrato en Polygonscan](https://polygonscan.com/address/0x22B5991F5D3b912fd6C3b130b0A0B533B3A968BB#code)  
- **👑 Dirección del Owner (Administrador):**  
  `0xab1d8De7b5F66FE3107AECD30D4f8C238C953BD3`

---

## 🌍 Aplicación desplegada  

Puedes acceder a la aplicación en línea en **Vercel**:  
🔗 **[KiiChain Whitelist - Aplicación en Vercel](https://kii-chain.vercel.app)**  

---

## 🔧 Tecnologías utilizadas  

- **Frontend:** React + Vite + Tailwind CSS  
- **Blockchain:** Solidity, Ethers.js, Thirdweb SDK  
- **Red de Prueba:** Polygon  

---

## 💡 Funcionalidades  

✅ Verifica si una dirección está en la whitelist  
✅ Obtiene la palabra clave si la wallet está en la whitelist  
✅ Permite que el owner administre la whitelist (agregar/eliminar direcciones)  
✅ Permite que el owner modifique la palabra clave  


