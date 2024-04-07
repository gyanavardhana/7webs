const mongoose = require('mongoose');

try {
    mongoose.connect(process.env.MONGO_URL, {})
        .then(() => console.log("Database Connected"));
}
catch (err) {
    console.log(err);
    console.log("some error in connecting to database");
}