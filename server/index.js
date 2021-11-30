const express = require('express');
const path = require('path');
const keys = require('./config/keys.js');

app = express();

// home page
app.get(`/`, async(req, res) => {
    res.sendFile(path.join(process.cwd()+'/public/index.html'));
});

// docs page
app.get(`/docs-page`, async(req, res) => {
    res.sendFile(path.join(process.cwd()+'/public/docs-page.html'));
});