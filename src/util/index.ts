import crypto, { privateDecrypt, publicEncrypt, createCipheriv, createDecipheriv } from 'crypto';
const fs = require('fs');

module.exports.getDateString = (date: Date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}


export const readFile = (path: string) => {
    const result = fs.readFileSync(path, { encoding: "utf8" });
    return result
}

export const decryptData = (privateKey: string, encryptedData: string) => {


    return privateDecrypt(
        {
            key: privateKey,
            //padding: crypto.RSA_PKCS1_OAEP_PADDING, // RSA_PKCS1_PADDING                
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: "sha256",
        }, Buffer.from(encryptedData, "base64")
    ).toString();

}

export const encryptData = (publicKey: string, data: string) => {
    return publicEncrypt(
        {
            key: publicKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: "sha256",
        }, Buffer.from(data)
    ).toString("base64");
}

export const aesEncrypt = (aes_iv: string, aes_key: string, data: string) => {


    var iv = Buffer.from(aes_iv);
    var key = Buffer.from(aes_key);
    //var plainText = 'some plain text';
    var algo = 'aes-128-cbc'; // we are using 128 bit here because of the 16 byte key. use 256 is the key is 32 byte.

    var cipher = createCipheriv('aes-128-cbc', key, iv);
    // var encrypted = cipher.update(data, 'utf-8', 'base64'); // `base64` here represents output encoding
    // encrypted += cipher.final('base64');
    //Buffer.concat([decipher.update(buffer), decipher.final()]);
    return Buffer.concat([cipher.update(Buffer.from(data)), cipher.final()]).toString("base64");
}

export const aesDecrypt = (aes_iv: string, aes_key: string, data: string) => {

    var iv = Buffer.from(aes_iv);
    var key = Buffer.from(aes_key);
    //var plainText = 'some plain text';
    var algo = 'aes-128-cbc'; // we are using 128 bit here because of the 16 byte key. use 256 is the key is 32 byte.

    var decipher = createDecipheriv('aes-128-cbc', key, iv);
    // var decrypted = cipher.update(data, 'utf-8', 'base64'); // `base64` here represents output encoding
    // decrypted += cipher.final('base64');
    //Buffer.concat([decipher.update(buffer), decipher.final()]);
    return Buffer.concat([decipher.update(Buffer.from(data, 'base64')), decipher.final()]).toString();
}

export const randomString = (length: number) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

// export  const aesDecryptByConfigKey = ( data: string) => {

//     var iv = Buffer.from(aes_iv);
//     var key = Buffer.from(aes_key);
//     //var plainText = 'some plain text';
//     var algo = 'aes-128-cbc'; // we are using 128 bit here because of the 16 byte key. use 256 is the key is 32 byte.

//     var decipher = createDecipheriv('aes-128-cbc', key, iv);
//     // var decrypted = cipher.update(data, 'utf-8', 'base64'); // `base64` here represents output encoding
//     // decrypted += cipher.final('base64');
//     //Buffer.concat([decipher.update(buffer), decipher.final()]);
//     return Buffer.concat([decipher.update(Buffer.from(data, 'base64')), decipher.final()]).toString();
// }



// export  const aesEncryptByConfigKey = ( data: string) => {

//     var iv = Buffer.from(aes_iv);
//     var key = Buffer.from(aes_key);
//     //var plainText = 'some plain text';
//     var algo = 'aes-128-cbc'; // we are using 128 bit here because of the 16 byte key. use 256 is the key is 32 byte.

//     var decipher = createDecipheriv('aes-128-cbc', key, iv);
//     // var decrypted = cipher.update(data, 'utf-8', 'base64'); // `base64` here represents output encoding
//     // decrypted += cipher.final('base64');
//     //Buffer.concat([decipher.update(buffer), decipher.final()]);
//     return Buffer.concat([decipher.update(Buffer.from(data, 'base64')), decipher.final()]).toString();
// }

module.exports.sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}


