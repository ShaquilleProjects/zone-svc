const express = require('express');
const path = require('path');
//const keys = require('./config/keys.js');

app = express();

// home page
app.get(`/`, async(req, res) => {
    res.sendFile(path.join(process.cwd()+'/docs/index.html'));
});

// docs page
app.get(`/docs-page`, async(req, res) => {
    res.sendFile(path.join(process.cwd()+'/docs/docs-page.html'));
});

// importing all routes
require('./routes/routes.js')(app);

app.use(express.static("docs"));

// port 2000 is default, change as necessary
const PORT = process.env.PORT || 2000;
app.listen(PORT, function () {
    console.log('Express app listening at PORT %s', PORT)
});