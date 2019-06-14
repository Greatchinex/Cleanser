const express = require("express");
const router = express.Router();
const config = require("../config/database");
const prod = require("../models/productModel");
const verify = require('../config/verify');

// End Point for Men's Products
router.get("/men", (req, res, next) => {
    prod.find({category: "men"}, (err, products) => {
        let mensProduct = [];
        // Check for error
        if(err) {
            res.status(500).send({message: err.message})
        } 

        // If product is found in DB add it to the array
        if(products) {
            products.forEach(mensP => {
                mensProduct.push(mensP);
            });   
        }
        // Return Products
        res.send(mensProduct);
    })
})

// End Point for Women's Products
router.get("/women", (req, res, next) => {
    prod.find({category: "women"}, (err, products) => {
        let womenProduct = [];
        // Check for error
        if(err) {
            res.status(500).send({message: err.message})
        } 
         // If product is found in DB add it to the array
        if(products) {
            products.forEach(womenP => {
                womenProduct.push(womenP);
            });
        }

        // Return Products
        res.send(womenProduct);
    })
})

// End Point for girls's Products
router.get("/girls", (req, res, next) => {
    prod.find({category: "girls"}, (err, products) => {
        let girlProduct = [];
        // Check for error
        if(err) {
            res.status(500).send({message: err.message})
        } 
         // If product is found in DB add it to the array
        if(products) {
            products.forEach(girlP => {
                girlProduct.push(girlP);
            });
        }

        // Return Products
        res.send(girlProduct);
    })
})

// End Point for boy's Products
router.get("/boys", (req, res, next) => {
    prod.find({category: "boys"}, (err, products) => {
        let boysProduct = [];
        // Check for error
        if(err) {
            res.status(500).send({message: err.message})
        } 
         // If product is found in DB add it to the array
        if(products) {
            products.forEach(boysP => {
                boysProduct.push(boysP);
            });
        }

        // Return Products
        res.send(boysProduct);
    })
})

// End Point for bedding's Products
router.get("/beddings", (req, res, next) => {
    prod.find({category: "beddings"}, (err, products) => {
        let bedProduct = [];
        // Check for error
        if(err) {
            res.status(500).send({message: err.message})
        } 
         // If product is found in DB add it to the array
        if(products) {
            products.forEach(bedsP => {
                bedProduct.push(bedsP);
            });
        }

        // Return Products
        res.send(bedProduct);
    })
})













module.exports = router;