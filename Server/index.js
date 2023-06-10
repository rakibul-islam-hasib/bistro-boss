const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_KEY)
const port = process.env.PORT || 5000;

const cors = require('cors');


// Middleware
app.use(cors());
app.use(express.json());

// Verify token
const verifyJWT = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).send({ error: true, message: 'Unauthorize access' })
    }
    const token = authorization?.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).send({ error: true, message: 'forbidden user or token has expired' })
        }
        req.decoded = decoded;
        next()
    })
}


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
        const paymentCollection = database.collection('payments')

        // Database related middleware
        const verifyAdmin = async (req, res, next) => {
            const email = req.decoded.email;
            const user = await usersCollection.findOne({ email: email });
            if (user.role !== 'admin') {
                return res.status(403).send({ error: true, message: 'forbidden access' })
            }
            next()
        }

        // Get the database and server versions
        app.get('/menu', async (req, res) => {
            const cursor = menuCollection.find({});
            const menu = await cursor.toArray();
            res.send(menu);
        });
        // post menu data 
        app.post('/menu', verifyJWT, verifyAdmin, async (req, res) => {
            const doc = req.body;
            // console.log(doc)
            const result = await menuCollection.insertOne(doc)
            res.send(result)
        })
        // Delete a menu item 
        app.delete('/menu/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const result = await menuCollection.deleteOne(filter);
            res.send(result);
        })
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
        app.get('/cart', verifyJWT, async (req, res) => {
            // console.log(req)
            const email = req.query.email;
            const decodedEmail = req.decoded.email;
            if (email !== decodedEmail) {
                return res.status(401).send({ error: true, message: 'unauthorize token' })
            }
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

        app.get('/item/:id' , async(req , res)=>{
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await menuCollection.findOne(query);
            res.send(result);
        })
        app.patch('/item/:id' , async(req , res)=>{
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const updatedItem = req.body;
            const result = await menuCollection.updateOne(query , {$set : updatedItem});
            res.send(result);
        })
        // Post user data
        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await usersCollection.insertOne(user);
            res.send(result);
        });
    
        // Get user data
        app.get('/users', verifyJWT, verifyAdmin, async (req, res) => {
            const result = await usersCollection.find().toArray();
            res.send(result);
        });

        // is admin  or not
        app.get('/user/id-admin/:email', verifyJWT, async (req, res) => {
            const email = req.params.email;
            const query = { email: email };
            const matched = await usersCollection.findOne(query);
            if (matched) {
                res.send({ isAdmin: matched.role === 'admin' });
                return;
            }
            res.send({ isAdmin: false });
        })



        app.patch('/users/mk-admin/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const matched = await usersCollection.findOne(query);
            if (matched) {
                res.send({ message: 'User already an admin' });
                return;
            }
            const result = await usersCollection.updateOne(query, {
                $set: { role: 'admin' }
            });
            res.send(result);
        });


        // JSON web token 
        app.post('/user/set-token', (req, res) => {
            const user = req.body;
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '12h' })
            res.send({ token })
        })

        // Payment Related routs 

        app.post('/create-payment-intent', async (req, res) => {
            const { price } = req.body;
            const totalAmount = parseInt(price) * 100;
            const paymentIntent = await stripe.paymentIntents.create({
                amount: totalAmount,
                currency: "usd",
                payment_method_types: ['card']
            })

            res.send({ clientSecret: paymentIntent.client_secret })
        })

        // ! GET THE PAYMENT AND THEN SET THE PAYMENT RELATED INFO TO SERVER 

        app.post('/post-payment-info', verifyJWT, async (req, res) => {
            const payment = req.body;
            const itemIds = payment?.cartId;
            const itemIdsWithObjectId = itemIds.map(id => new ObjectId(id));
            payment.cartId = itemIdsWithObjectId;
            // get the user cart data
            const deleteResult = await cartCollection.deleteMany({ itemId: { $in: itemIds.map(id => id) } });
            const paymentResult = await paymentCollection.insertOne(payment);

            res.send({ deleteResult, paymentResult });
        });

        app.get('/admin-stats', async (req, res) => {
            const totalUsers = await usersCollection.estimatedDocumentCount();
            // const totalAmount = await paymentCollection.aggregate([{$group : {_id : null , total : {$sum : '$amount'}}}]).toArray(); 
            const payments = await paymentCollection.find().toArray();
            const totalAmount = payments.reduce((acc, item) => acc + item.amount, 0);
            let totalItem = await menuCollection.estimatedDocumentCount();
            let totalOrder = await paymentCollection.estimatedDocumentCount();
            res.send({ totalUsers, totalAmount, totalItem, totalOrder })
        });

        app.get('/order-stats', verifyJWT, verifyAdmin, async (req, res) => {
            const pipeline = [
                // {
                //     $lookup: {
                //         from: "menu",
                //         let: { cartId: "$cartId" },
                //         pipeline: [
                //             {
                //                 $match: {
                //                     $expr: { $in: ["$_id", "$$cartId"] }
                //                 }
                //             }
                //         ],
                //         as: "menu_item"
                //     }
                // },

                {
                    $lookup: {
                        from: 'menu',
                        localField: 'cartId',
                        foreignField: '_id',
                        as: 'menu_item'
                    }
                },
                {
                    $unwind: '$menu_item'
                },
                {
                    $group: {
                        _id: '$menu_item.category',
                        count: { $sum: 1 },
                        total: { $sum: '$menu_item.price' }
                    }
                },
                {
                    $project: {
                        category: '$_id',
                        count: 1,
                        total: { $round: ['$total', 2] },
                        _id: 0
                    }
                }
            ];

            const orderStats = await paymentCollection.aggregate(pipeline).toArray();
            res.send(orderStats);
        });



        // ! USER STATS . 
        app.get('/user-stats', async (req, res) => {
            let totalItem = await menuCollection.estimatedDocumentCount();
            res.send({ totalItem })
        })
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