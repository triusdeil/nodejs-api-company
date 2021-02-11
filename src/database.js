import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/company-db',{
    useNewUrlParser:true, 
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
})
    .then(db => console.log('db is connected'))
    .catch (err => console.error(err))