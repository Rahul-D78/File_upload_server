const express = require('express')
const connectDB = require('./config/db')
const filesRouter = require('./routes/files')

const app = express()
app.use(express.static('public'))
app.set('view engine', 'ejs')

let PORT = process.env.PORT || 3000 

app.use('/api/files', filesRouter)
app.use('/files', require('./routes/show'))
app.use('/files/download', require('./routes/download'))
connectDB();

app.listen(PORT, () => {
    console.log(`server is running on ${PORT} address ---> http://localhost:3000`);
})