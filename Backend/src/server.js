import express from 'express';
import cors from "cors";
import dotenv from 'dotenv';


import notesRoutes from './routes/notesRoutes.js'
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;


//middlewares
app.use(cors({ 
    origin: "http://localhost:5173"
}))
app.use(express.json());// this middleware is used to parse JSON bodies
app.use(rateLimiter);

// app.use((req, res, next) => { 
    //     console.log(`Req Method is: ${req.method} and Req URL is:${req.url}`);//this middleware logs the request method and URL
    //     next();
    // })
    
    app.use("/api/notes", notesRoutes)
    
    
    connectDB().then(() => { 

        app.listen(PORT, () =>{ 
            console.log('Server is running on port :', PORT);
        });
    });
    