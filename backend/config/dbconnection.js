const mongoose = require('mongoose');

module.exports = function (app) {
    mongoose.set("strictQuery", false);
    const MONGO_URI = process.env.MONGO_URI;
    const PORT = process.env.PORT || 5000;
    
    mongoose.connect(MONGO_URI, { useNewUrlParser: true }).then(res => {
        console.log(`Connected to MongoDB on port 5000`);  
        app.listen(PORT);
    }).catch(err => {
        console.log(err);
    })
}