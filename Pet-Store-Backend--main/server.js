const express = require('express'); // import express to make a server
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const db = require('./src/config/database')
require('dotenv').config();





const app = express(); //by using the server we can make an app, initialize the server
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());


const UserRoutes = require('./src/routes/user_route');
const CategoryRoute = require('./src/routes/category_route');
const PetRoute = require('./src/routes/pets_route');
const searchPets = require('./src/routes/search_route');
const forgetPasswordRoute = require('./src/routes/forgetPasswordRoute')
const checkUserAuth = require('./src/middleware/auth');

app.use('/api/user', UserRoutes);
app.use('/api/category', CategoryRoute);
app.use('/api/pets', checkUserAuth, PetRoute);
app.use('/password', forgetPasswordRoute);
app.use('/api', searchPets);

 
const PORT = 3000; // start the app at port 5000
app.listen(PORT, () =>console.log(`server started at Port: http://localhost:${PORT}`));