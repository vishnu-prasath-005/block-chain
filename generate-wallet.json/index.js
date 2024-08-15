const fs = require("fs");

const ethers = require("ethers");

const wallet = new ethers.Wallet(
  "c8dc090c906f78a074caeab97218b7b32a5a9c4606a2996f962a35de67959024"
);

const walletPassword = "12345qwerty";
(async () => {
  const walletJson = await wallet.encrypt(walletPassword);
  fs.writeFileSync("wallet.json", JSON.stringify(walletPassword));
  console.log("wallet as json =  ", walletJson);
  const decrypt = await ethers.decryptKeystoreJson(walletJson, walletPassword);
  console.log("\n decrypted wallet = ", decrypt);
})();
