const mongoose = require("mongoose");

const OSchemaDefinition = {
    name: String,
    balance: {
        type: Number,
        default: 10000
     }
};
const OSchemaOptions = { timestamps: true };

const schema = new mongoose.Schema(OSchemaDefinition, OSchemaOptions);

const AccountModel = mongoose.model("account", schema);

module.exports = AccountModel;
