const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load env variables

dotenv.config();

const app = express();

// Configurar CORS
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Routes
app.use('/api/empleados', require('./src/routes/empleadoRoutes'));
app.use('/api/areas', require('./src/routes/areaRoutes'));
app.use('/api/puestos', require('./src/routes/puestoRoutes'));

// Start server

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started port ${PORT}`));