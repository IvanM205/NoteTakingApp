const express = require('express');
const notesRoutes = require('./routes/notesRoutes');
const { connectDB } = require('./config/db');
const { rateLimiter } = require('./middleware/rateLimiter');
const dotenv = require('dotenv');
const path = require("path");
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const baseDir = process.cwd();

// middleware
if (process.env.NODE_ENV !== "production") {
    app.use(cors({
        origin: "http://localhost:5173",
    }));
}
app.use(express.json());
app.use(rateLimiter);
// app.use((req, res, next) => {
//     console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
//     next();
// })

app.use('/api/notes', notesRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(baseDir, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    })
}


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server started on PORT: ${PORT}`);
    })
});


