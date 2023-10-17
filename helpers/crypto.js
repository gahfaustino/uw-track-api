const bcrypt = require('bcrypt');
const CryptoJS = require('crypto-js')

//const salt = bcrypt.genSaltSync(4);

const ITERATIONS = 1000;
const SALT_SIZE = 24;
const HASH_SIZE = 24;

var salt = CryptoJS.lib.WordArray.random(SALT_SIZE);

const gen = (plainText) => {
    const result = CryptoJS.PBKDF2(plainText, salt, {
        keySize: HASH_SIZE,
        iterations: ITERATIONS,
    });

    console.log('HASHED ', plainText, result.toString(), result);
    return result.toString()
    // ;;return bcrypt.hashSync(plainText, salt);
}

const validate = (plainText, plainTextToCompare) => {
   return bcrypt.compareSync(plainText, plainTextToCompare);
}

module.exports = {
    gen, validate
}