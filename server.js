const express = require('express');
const mongoose = require('mongoose');

const app = express();
// app only runs on local at this stage, but the production env is here and ready
const PORT = process.env.PORT || 3001;

// express middleware for parsing body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('./routes'));

// again, the app is only running on local at this stage, 
// but a production env is configured here to use with Atlas as well
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