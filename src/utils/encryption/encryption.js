import CryptoJS from "crypto-js";

export const encrypt = ({ plainText, signature }) => {
  return CryptoJS.AES.encrypt(plainText, signature).toString();
};

export const decrypt = ({ cipherText, segnature }) => {
  return CryptoJS.AES.decrypt(cipherText, segnature).toString(
    CryptoJS.enc.Utf8
  );
};
