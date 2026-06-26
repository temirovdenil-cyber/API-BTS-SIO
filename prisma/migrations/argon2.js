const argon2 = require('argon2');
const hashPassword = async (password) => {
  try {
    const hash = await argon2.hash(password);
    return hash;
  } catch (error) {
    console.error('Error hashing password:', error);
    throw error;
  }
};
const verifyPassword = async (password, hash) => {
  try {
    const isValid = await argon2.verify(hash, password);
    return isValid;
  } catch (error) {
    console.error('Error verifying password:', error);
    throw error;
  }
};  
module.exports = { hashPassword, verifyPassword };