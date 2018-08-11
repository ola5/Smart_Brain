const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');


const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db = knex({
  client: 'pg',
  connection: {
    host : 'postgresql-elliptical-79534',
    user : 'postgres',
    password : '',
    database : 'smart_brain'
  }
});

db.select('*').from('users').then(data => {
	// console.log(data);
});

const app = express();

app.use(bodyParser.json());
app.use(cors())


// root route --> Method => GET :: respond with success fail
app.get('/', (req, res)=> {res.send('it is  working !')})
// signin route    --> Method => POST  :: respond with success or fail
app.post('/signin', signin.handleSignin(db, bcrypt))
// register route  --> Method => POST :: respond with new usr object
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
// profile/:userid --> Method => GET :: respond with user profile
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
// image/  --> Method => PUT :: respond with user object with count
app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

app.listen(process.env.PORT || 3000, ()=> {
  console.log(`App is running on port ${process.env.PORT}`);
})



