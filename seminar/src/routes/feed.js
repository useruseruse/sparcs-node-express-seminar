const express = require('express');

const router = express.Router();

class FeedDB {
    static _inst_;
    static getInst = () => {
        if ( !FeedDB._inst_ ) FeedDB._inst_ = new FeedDB();
        return FeedDB._inst_;
    }

    #id = 0; #itemCount = 0; #LDataDB = [];

    constructor() { console.log("[Feed-DB] DB Init Completed"); }

    selectItems = ( count ) => {
        try {
            if (count === 0) return { success: true, data: [] };    
            const res = this.#LDataDB.slice(0,count);
            return { success: true, data: res };
        } catch (e) {
            console.log(`[Feed-DB] Select Error: ${ e }`);
            return { success: false, data: `DB Error - ${ e }` };
        }
    }

    insertItem = ( item ) => {
        const { title, content } = item;
        try {
            const newDB = this.#LDataDB.push({id:this.#id, title:title, content:content});
            console.log(`${this.#LDataDB}`);
            this.#id++; this.#itemCount++;
            return true;
        } catch (e) {
            console.log(`[Feed-DB] Insert Error: ${ e }`);
            return false;
        }
    }

    deleteItem = ( id ) => {
        try {
            this.#LDataDB = this.#LDataDB.filter( e => {
                return (`${e.id}` !== id);
            })      
            const res = this.#LDataDB
            return true;
        } catch (e) {
            console.log(`[Feed-DB] Delete Error: ${ e }`);
            return false;
        }
    }

    editItem = ( id, title, content ) =>{
        try{
            const editedItem = {id:id, title:title, content:content};
            this.#LDataDB = this.#LDataDB.map( (e) =>{
                    if(e.id === id ){
                        return editedItem;
                    }else{
                        return e;
                    }
                }
            );
            const res = this.#LDataDB;
            return true; 
        }catch(e){
            console.log(`[Feed-DB] Edit Error: ${ e } ${typeof(e.id)} ${typeof(id)}`);
            return false;
        }
    }
}

const feedDBInst = FeedDB.getInst();

router.get('/getFeed', async (req, res) => {
    try {
        const requestCount = parseInt(req.query.count);
        const searchString = req.query.search;
        const dbRes = await feedDBInst.selectItems(requestCount);
        if (dbRes.success) return res.status(200).json(dbRes.data);
        else return res.status(500).json({ error: dbRes.data })
    } catch (e) {
        return res.status(500).json({ error: e });
    }
});

router.post('/addFeed', async (req, res) => {
   try {
       const { title, content } = req.body;
       const addResult = await feedDBInst.insertItem({ title, content });
       if (!addResult) return res.status(500).json({ error: dbRes.data })
       else return res.status(200).json({ isOK: true });
   } catch (e) {
       return res.status(500).json({ error: e });
   }
});

router.post('/deleteFeed', async (req, res) => {
    try {
        const { id } = req.body;
        const deleteResult = await feedDBInst.deleteItem(id);
        if (!deleteResult) return res.status(500).json({ error: "No item deleted" })
        else return res.status(200).json({ isOK: true });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
})


router.post('/editFeed', async(req,res) => {                 
    try{
        const { id, title, content } = req.body;            
        const editResult = await feedDBInst.editItem( parseInt(id) ,title,content);
        if (!editResult) return res.status(500).json({ error: "No item edited" })
        else return res.status(200).json({ isOK: true });
    } catch(e) {
        return res.status(500).json({ error: e });
    }
})

module.exports = router;