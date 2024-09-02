const  express = require('express');
const dotenv  = require('dotenv');
const connectDB  = require ('./config/db.js');
const userRoutes  =  require('./routes/userRoutes');
const rewardRoutes = require ('./routes/rewardRoutes.js');
const  cors  = require('cors');

dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/rewards', rewardRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));

module.exports =app;
