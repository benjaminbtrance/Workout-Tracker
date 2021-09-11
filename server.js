const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

console.log('MONGO_URI ', process.env.MONGDB_URI);
mongoose.connect(process.env.MONGDB_URI || 'mongodb://localhost/workout', {
	useNewUrlParser: true,
	useFindAndModify: false,
	useUnifiedTopology: true,
	useCreateIndex: true,
});

// routes
app.use(require('./routes/apiRoutes.js'));

// // API Routes
// app.use(require('./routes/apiRoutes.js'));

app.listen(PORT, () => {
	console.log(`App running on port ${PORT}!`);
});
