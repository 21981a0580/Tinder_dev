const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://sivakoduru111:rNw5m2D5HGRBo1FY@backenddevelopmentbysiv.4hsgnvj.mongodb.net/DB_SIVA")
}

module.exports = connectDB;