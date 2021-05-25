const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')
const app = express()


dotenv.config({path: './config.env'});
require('./db/conn')

app.use(express.json());
app.use(cookieParser());
// const user = require('./model/userSchema')

// link the router files to make routing easy
app.use(require('./router/auth'));

const port = process.env.PORT
//middleware
// const  middleware = (req,res,next)=>{
//     console.log(`Hello my middleware`);
//     next();
// }


app.get('/', (req, res) =>{
    res.send('Hello World!')
});
// app.get('/about',middleware, (req, res) =>{
//     res.send('Hello World!')
// });
// app.get('/contact', (req, res) =>{
//     res.send('Hello World!')
// });
// app.get('/signIn', (req, res) =>{
//     res.send('Hello World!')
// });
// app.get('/signUp', (req, res) =>{
//     res.send('Hello World!')
// });
app.listen(port, () => console.log(`Example app listening on ${port}!`))