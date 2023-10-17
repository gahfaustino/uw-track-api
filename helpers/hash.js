const bcrypt = require('bcrypt');

const salt = bcrypt.genSaltSync(4);

const gen = (plainText) => {
    return bcrypt.hashSync(plainText, salt);}

const validate = (plainText, plainTextToCompare) => {
   return bcrypt.compareSync(plainText, plainTextToCompare);
}

module.exports = {
    gen, validate
}