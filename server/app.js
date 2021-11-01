const express = require('express');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const schema =require('./schema/schema');
const mongoose =require('mongoose');
const cors = require('cors');



const app= express();

app.use(cors())


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));
app.listen(1000,()=>{
    console.log('port 1000')
});
mongoose.connect('mongodb+srv://tester:KVUE23u!X9sJ_Bk@cluster0.nlr2r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
mongoose.connection.once('open',()=>{
    console.log('connected')
})