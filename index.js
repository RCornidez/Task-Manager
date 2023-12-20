import express from 'express';
import db from './db.js';
import routes from './routes.js';
import cors from 'cors'

const app = express();

// Middleware
app.use(express.json()); 
app.use(cors({ origin: '*' })); // Only allow requests from this origin

async function Server () {
    // Sync the Database
    await db.sequelize.sync({ force: false })
    console.log("Models synced with SQLite Database")

    // Routes
    await app.use('/api', routes);

    // Start server only after database sync is complete
    const PORT = process.env.PORT || 3000;
    await app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

Server();




