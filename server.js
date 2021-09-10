const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

mongoose.connect(process.env.MONGDB_URI || 'mongodb://localhost/workout', {
	useNewUrlParser: true,
	useFindAndModify: false,
	useUnifiedTopology: true,
	useCreateIndex: true,
});

// // HTML Routes
// app.use(require('./routes/homeRoutes'));

// // API Routes
// app.use(require('./routes/apiRoutes.js'));

app.listen(PORT, () => {
	console.log(`App running on port ${PORT}!`);
});
