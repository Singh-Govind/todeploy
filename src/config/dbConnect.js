const mongoose = require("mongoose");

function connect() {
  return mongoose.connect(
    "mongodb+srv://govind:123@cluster0.3cdklpi.mongodb.net/"
  );
}

module.exports = connect;
