const mongoose  = require('mongoose');

const DB = process.env.DATABASE

mongoose.connect(DB,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true
})
.then(()=>console.log(`Connection is setup successfully`))
.catch((err)=>console.log(`not connected`))
