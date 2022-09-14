const fs = require("fs/promises");

const updateContacts = async (instance, filePath) => {
  try {
    await fs.writeFile(filePath, JSON.stringify(instance));
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = updateContacts;