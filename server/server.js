const express = require('express');
const sequelize = require('./config/database');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

require('dotenv').config()

app.use(express.json());
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());

const initDb = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connected to postgres successfully!");

        // force: false évite de supprimer les données à chaque redémarrage
        await sequelize.sync({ force: false });
        console.log("Database tables created successfully!");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

initDb();

app.use('/api', require('./routes'))

// Une route de test rapide
app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.use((err, req, res, next) => {
    console.error(err);

    if (err.isOperational) {
        return res.status(err.statusCode).json({
            message: err.message
        });
    }

    return res.status(500).json({
        message: "Something went wrong"
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});
