const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;
const cors = require('cors');


// Middleware
app.use(cors());
app.use(express.json());


// Routes


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sj6rkpp.mongodb.net/?retryWrites=true&w=majority`;

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
        const database = client.db("BistroBoss");
        const menuCollection = database.collection("menu");
        const reviewsCollection = database.collection("reviews");
        const cartCollection = database.collection("cart");
        const usersCollection = database.collection("users");

        // Get the database and server versions
        app.get('/menu', async (req, res) => {
            const cursor = menuCollection.find({});
            const menu = await cursor.toArray();
            res.send(menu);
        });
        // get reviews
        app.get('/reviews', async (req, res) => {
            const cursor = reviewsCollection.find({});
            const reviews = await cursor.toArray();
            res.send(reviews);
        });
        // Post cart data
        app.post('/cart', async (req, res) => {
            const cart = req.body;
            const result = await cartCollection.insertOne(cart);
            res.send(result);
        });
        app.get('/cart', async (req, res) => {
            const email = req.query.email;
            const cursor = cartCollection.find({ email: email });
            const cart = await cursor.toArray();
            res.send(cart);
        });
        app.get('/carts', async (req, res) => {
            const cursor = cartCollection.find();
            const carts = await cursor.toArray();
            res.send(carts);
        });
        // Delete cart data
        app.delete('/cart/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await cartCollection.deleteOne(query);
            res.send(result);
        });
        
        
        // Post user data
        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await usersCollection.insertOne(user);
            res.send(result);
        });




        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);






app.get('/', (req, res) => {
    res.send(`BISTRO BOSS SERVER IS RUNNING ON PORT ${port}`);
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});