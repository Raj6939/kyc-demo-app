const express = require('express')
const http = require('http');
const axios = require('axios')
const port = 4000;
const app = express();
const server = http.createServer(app);
var bodyParser = require('body-parser')
const cors = require('cors');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());  
app.use(cors())

app.post('/api/v1/webhook', (req, res) => {
    try {
        console.log('inside try')
        console.log(req.body, "body")
        const { name } = req.body
        console.log(name)
        return res.json('yes')

    } catch (e) {
        console.log(e)
        return res.status(500).json({ status: 500, message: 'Error occured', error: e });
    }

})

server.listen(port, () => {
    console.log('Server is running on port ', port)
})