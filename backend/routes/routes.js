const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send(200);
});

router.get('*', (request, response) => {
    response.sendFile(__dirname + '/public/index.html'); // For React/Redux
});

module.exports = router;
