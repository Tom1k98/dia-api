const express = require('express')
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({extended: false}));
require('dotenv').config();
const mongoose = require('mongoose');
const dbUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.eznnv.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(ok => {
    console.log('Connection to db successfull')
}).catch(err => {
    console.log(`connection to db end with error: ${err}`)
});

app.use('/api/', express.static("public"))

const diaRoute = require('./routes/api/dia');
app.use('/api/dia', diaRoute);

const PORT = process.env.PORT || 5555;
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
})