const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const userRouter = require('./src/routes/userRoutes');

// Middlewares
app.use(bodyParser.json());

//Routes
app.use('/api/users', userRouter)

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
