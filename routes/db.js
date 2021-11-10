const mongoose = require('mongoose');

try {
    const connectionOptions = { useNewUrlParser: true, useUnifiedTopology: true};
    let url = "mongodb+srv://supun:supun123@cluster0.ptqnl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    mongoose.connect(url, connectionOptions); 
} catch (error) {
    console.error('Database not connected')
}