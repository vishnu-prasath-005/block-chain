const fs = require("fs");

const ethers = require("ethers");

const wallet = new ethers.Wallet(
  "f637a31dd69d0a6ea6f2d30c2f255e45217bc39f318b4bac31eacfb2e0289dcd"
);

const walletPassword = "12345qwerty";
(async () => {
  const walletJson = await wallet.encrypt(walletPassword);
  fs.writeFileSync("wallet.json", walletJson);
  console.log("wallet as json =  ", walletJson);
  const decrypt = await ethers.decryptKeystoreJson(walletJson, walletPassword);
  console.log("\n decrypted wallet = ", decrypt);
})();
