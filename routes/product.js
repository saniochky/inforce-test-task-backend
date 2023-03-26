const express = require('express');
const productSchema = require('../models/product');

const router = express.Router();

router.get('/', getProducts, async (req, res) => {
    res.json({
        'products': req.products,
    });
});

router.post('/', addProduct, async (req, res) => {
    res.json({
        'message': 'ProductItem created',
    });
});

router.patch('/:id', editProduct, async (req, res) => {
    res.json({
        'message': 'ProductItem edited',
    });
});

router.delete('/:id', deleteProduct, async (req, res) => {
    res.json({
        'message': 'ProductItem deleted',
    });
});

router.post('/comment/:productId', addComment, async (req, res) => {
    res.json({
        'message': 'Comment added',
    });
});

router.delete('/comment/:productId/:commentId', deleteComment, async (req, res) => {
    res.json({
        'message': 'Comment deleted',
    });
});

async function getProducts(req, res, next) {
    try {
        req.products = await productSchema.find();
        next();
    } catch (e) {
        res.status(500).json({
            'message': e.message,
        });
    }
}

async function addProduct(req, res, next) {
    try {
        const product = new productSchema(req.body);
        await product.save();
        next();
    } catch (e) {
        res.status(500).json({
            'message': e.message,
        });
    }
}
async function editProduct(req, res, next) {
    try {
        const product = await productSchema.findById(req.params.id);
        if (!product) {
            res.status(400).json({
                'message': 'ProductItem not found',
            });
        } else {
            product.imageUrl = req.body.imageUrl;
            product.name = req.body.name;
            product.count = req.body.count;
            product.size = req.body.size;
            product.weight = req.body.weight;
            await product.save();
            next();
        }
    } catch (e) {
        res.status(500).json({
            'message': e.message,
        });
    }
}

async function deleteProduct(req, res, next) {
    try {
        const product = await productSchema.findById(req.params.id);
        if (!product) {
            res.status(400).json({
                'message': 'ProductItem not found',
            });
        } else {
            await product.remove();
            next();
        }
    } catch (e) {
        res.status(500).json({
            'message': e.message,
        });
    }
}

async function addComment(req, res, next) {
    try {
        const product = await productSchema.findById(req.params.productId);
        if (!product) {
            res.status(400).json({
                'message': 'ProductItem not found',
            });
        } else {
            product.comments.push(req.body);
            await product.save();
            next();
        }
    } catch (e) {
        res.status(500).json({
            'message': e.message,
        });
    }
}

async function deleteComment(req, res, next) {
    try {
        const product = await productSchema.findById(req.params.productId);
        if (!product) {
            res.status(400).json({
                'message': 'ProductItem not found',
            });
        } else {
            product.comments.filter(comment => comment._id !== req.params.commentId);
            await product.save();
            next();
        }
    } catch (e) {
        res.status(500).json({
            'message': e.message,
        });
    }
}

module.exports = router;
