const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const sql = require('./config/db');

app.use(helmet());
app.use(xss());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get('/', (req, res) => {
	res.json({ message: 'API is working properly' });
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
