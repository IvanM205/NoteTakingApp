const express = require('express');
const notesRoutes = require('./routes/notesRoutes');
const { connectDB } = require('./config/db');
const { rateLimiter } = require('./middleware/rateLimiter');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;


// middleware
app.use(cors({
    origin: "http://localhost:5173",
}));
app.use(express.json());
app.use(rateLimiter);
// app.use((req, res, next) => {
//     console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
//     next();
// })

app.use('/api/notes', notesRoutes);


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server started on PORT: ${PORT}`);
    })
});


