const express = require('express');
const authMiddleware = require('../middleware/auth');
const AccountModel = require('../models/account');
const router = express.Router();

class BankDB {
    static _inst_;
    static getInst = () => {
        if ( !BankDB._inst_ ) BankDB._inst_ = new BankDB();
        return BankDB._inst_;
    }


    constructor() { 
        this.initDB = async() => {
            const newAccount = new AccountModel({ name:process.env.ID, balance:10000});
            const res = newAccount.save();
            console.log("[Bank-DB] DB Init Completed ");
        }
        this.initDB();
    }

    getBalance = async () => {
        try{
            const data = await AccountModel.findOne({name: process.env.ID });
            return { success: true, data: data };
        } catch(e) {
            console.log(`[Account-DB] Error: ${ e }`);
            return { success: false };
        }
    }

    transaction = async ( amount ) => {
        const newBalance = this.balance + amount;
        const newAccount = await AccountModel.updateOne({name: process.env.ID}, {balance: newBalance});
        return { success: true, data: newBalance };
    };
}

const bankDBInst = BankDB.getInst();

router.post('/getInfo', authMiddleware, (req, res) => {
    try {
        const { success, data } = bankDBInst.getBalance();
        if (success) return res.status(200).json({ balance: data.balance });
        else return res.status(500).json({ error: data });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
});

router.post('/transaction', authMiddleware, (req, res) => {
    try {
        const { amount } = req.body;
        const { success, data } = bankDBInst.transaction( parseInt(amount) );
        if (success) res.status(200).json({ success: true, balance: data, msg: "Transaction success" });
        else res.status(500).json({ error: data })
    } catch (e) {
        return res.status(500).json({ error: e });
    }
})

module.exports = router;