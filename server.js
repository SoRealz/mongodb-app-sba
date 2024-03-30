const express = require('express')
const mongoose = require('mongoose')
 const Product = require('./models/productModel')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.send('Hello NODE API')
})

app.get('/blog', (req, res) => {
    res.send('hello blog my name is jacob')
})

app.get('/products', async(req, res) =>{
    try{
        const products = await Product.find({});
        res.status(200).json(products)
    }
    catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/products/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.post('/product', async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

app.put('/products/:id', async(req, res) => {
    try{
        const {id} =req.params; 
        const product= await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).json({message: `cannot find any product with id ${id}`})
        }  
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    }
    catch{
        res.status(500).json({message: error.message})
    }
})

app.delete('/products/:id', async(req, res) => {
    try{ 
    const {id} = req.params;
    const product = await Product.findByIdAndDelete(id)
    if(!product){
        return res.status(404).json({message: `cannot find any product with ID ${id}`})
    }
    res.status(200).json(product);

    }
    catch (error) {
        res.status(500).json({message: error.message})
    }
})



mongoose.connect('mongodb+srv://jacoblsorrell1991:u49f08@cluster0.fulhvhw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
    app.listen(3000, () => {
        console.log('Node API is running on port 3000')
    })
    console.log('connected to mongodb')
})
.catch((error) => {
    console.log(error)
})
