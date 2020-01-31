const express = require('express');
const bodyParser = require('body-parser');

const routesv1 = require('./routes/v1');

const app = express();

// parse application/json
app.use(bodyParser.json());

routesv1(app);

app.listen(4000, () => {
  console.log('running on 4000');
});
