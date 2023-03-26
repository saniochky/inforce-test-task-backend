const config = require('config');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = config.get('port') || 5000;
const DB = config.get('mongoUri');

app.use(express.json({type: '*/*'}));
app.use(cors());

const productRouter = require('./routes/product');

app.use('/api/products', productRouter);

async function startServer() {
    try {
        await mongoose.connect(DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (e) {
        console.log('Server Error', e.message);
        process.exit(1);
    }
}

startServer();
