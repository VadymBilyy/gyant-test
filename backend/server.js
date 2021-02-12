const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const checkToken = require('./routes/checkToken');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	useFindAndModify: true,
});

const connection = mongoose.connection;

connection.once('open', () => {
	console.log('MongoDB database connection established succefully');
});

const casesRouter = require('./routes/case');
const userRouter = require('./routes/user');
const conditionsRouter = require('./routes/conditions');

app.use(cookieParser());

app.use('/user', userRouter);
app.use('/api', checkToken);
app.use('/api/cases', casesRouter);
app.use('/api/conditions', conditionsRouter);

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
