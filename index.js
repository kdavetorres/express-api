// setting up server
const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 5000;

/* // route manual
// app.get('/', (req, res) => {
//  res.send("<h3>Hello World<h3>");
}); // request & responds */

// specifying the directory of a webpage
app.use(express.static(path.join(__dirname, 'public')));

app.listen(5000, ()=> {
 console.log("Server is running in port ", PORT);
});

