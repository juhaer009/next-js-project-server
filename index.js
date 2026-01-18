const express = require('express')
const app = express()
const cors = require("cors")
require('dotenv').config();
const port = process.env.PORT || 3000
const { MongoClient, ServerApiVersion } = require('mongodb');

//middleware
app.use(express.json());
app.use(cors());

const uri =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@simple-crud-server.hfigrlp.mongodb.net/?appName=simple-crud-server`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const db = client.db("next_db");
    const clothesCollection = db.collection("clothes");

    app.get("/clothes", async(req,res)=>{
        const cursor = clothesCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })

    app.post("/clothes", async(req,res)=>{
        const clothes = req.body;
        const result = await clothesCollection.insertOne(clothes);
        res.send(result);
    })

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('next server running')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
