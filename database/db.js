const mongoose = require('mongoose')

const db = async () => {
    try {
        await mongoose.connect(process.env.MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, () => console.log('connected to DB...'));
    } catch (error) {
        console.log(error);
    }

}

module.exports = db
