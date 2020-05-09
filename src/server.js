const express = require('express');

let app = express();
app.use(express.static('public'));
app.use(express.static('dist'));

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.listen(5000, () => {
    console.log('server listening');
});