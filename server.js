const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

// express middleware for parsing body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('./routes'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/thought-bubbles', {
    // enables findOneAndUpdate and findOneAndDelete
    useFindAndModify: false,
    // enables the new Mongoose url string parser (old one is deprecated)
    useNewUrlParser: true,
    // enables new Mongoose topology engine (old one is deprecated)
    useUnifiedTopology: true,
    // removes deprecation warning for ensureIndex, otherwise no changes to code
    useCreateIndex: true
});

mongoose.set('debug', true);
app.listen(PORT, () => console.log(`Connected on localhost:${PORT}`));