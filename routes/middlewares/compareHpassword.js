const bcrypt = require('bcrypt');

// Function to compare hashed password with plain text password
const comparePasswords = async (plainTextPassword, hashedPassword) => {
  try {
    const match = await bcrypt.compare(plainTextPassword, hashedPassword);
    return match; // Returns true if passwords match, false otherwise
  } catch (error) {
    throw error;
  }
};

module.exports = comparePasswords;
