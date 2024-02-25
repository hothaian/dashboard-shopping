const express = require('express');
const app = express();
const path = require('path');
const db = require('./models');
const cors = require('cors');
const { dataUser } = require('./data'); 

const users = require('./routes/user');


app.use(express.json());


app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/users', users);



app.use('/static', express.static(path.join(__dirname, 'public')));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));



// Create the database if it does not exist
(async () => {
    try {
        // Check if the database exists
        await db.sequelize.query('SELECT 1+1 AS result');
    } catch (error) {
        if (error.original.code === 'ER_BAD_DB_ERROR') {
            // If the database does not exist, display a message to the user
            console.error('Database not found. Please create the schema "my-shop" in MySQL.');
            process.exit(1); // Exit the application
        } else {
            // Handle other errors
            console.error(error);
        }
    } finally {
        try {
            // Drop existing tables
            await db.sequelize.drop();

            // Synchronize models after ensuring the database exists
            await db.sequelize.sync();

            // Insert data from data.js file
            await insertData();
        } catch (error) {
            console.error('Error synchronizing models:', error);
            process.exit(1); // Exit the application
        }
    }
})();



async function insertData() {
    try {
        const UserModel = db.models.User; 

        if (!UserModel) {
            console.error('UserModel is not defined. Check your model definition and synchronization.');
            return;
        }

        // Check if there's any data in the User table
        const existingData = await UserModel.findAll();

        if (existingData.length === 0) {
            // Insert dataUser into the User table
            await UserModel.bulkCreate(dataUser);
            console.log('Data inserted successfully!');
        } else {
            console.log('Data already exists in the User table.');
        }
    } catch (error) {
        console.error('Error inserting data:', error);
    }
}

app.use((req, res, next) => {
    console.log(new Date().toLocaleDateString());
    next();
})

app.get('/', [
    (req, res, next) => {
        res.send('This is the home page!')
    }
]);

app.use(function(request, response, next) {
    console.log('This is global middleware!');
    next();
});

app.listen(1234, () => {
    console.log('Server is running on port 1234');
});