require('dotenv').config();

// IMPORTS
const express = require('express'); // express
const cors = require('cors'); // cors
const routes = require('./routes'); // routes path
const connectDB = require('./db'); // database connection
const path = require('path');

// Initialization
const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

// static files
app.use(express.static(path.join(__dirname, './frontend/dist')));

// ROUTES
app.use(routes);

app.get('*', function(req, res){
    res.sendFile(path.join(__dirname, './client/dist/index.html')); 
});

// ERROR HANDLING
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        error: err.message || 'Some internal error in the server!!',
    })
});

app.listen(process.env.PORT, async () => {
    console.log(`SERVER STARTED AT: ${process.env.PORT}`);
    console.log('Press CTRL + C to exit.');
    await connectDB();
});