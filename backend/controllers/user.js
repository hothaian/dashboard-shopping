const { models: { User } } = require('../models');
const { v4: uuidv4 } = require('uuid');

module.exports = {
    userAPI: (req, res) => {
        return res.status(200).send('This is User API');
    },

    getAllUsers: async (req, res) => {
        try {
            const users = await User.findAll({  
                attributes: { exclude: ['password'] }
            });

            res.json(users);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    createUser: async (req, res) => {
        try {
            if (req.body.name && req.body.email && req.body.age && req.body.phone && req.body.access) {
                const { name, email, age, phone, access } = req.body;

                // Check if the email already exists
                const existingUser = await User.findOne({
                    where: { email }
                });

                if (existingUser) {
                    return res.status(400).send('Email is already taken. Please choose a different one.');
                }

                // Generate a unique ID using uuid
                const uniqueId = uuidv4();

                // Create the user with the provided data
                await User.create({
                    id: uniqueId,
                    name,
                    email,
                    age,
                    phone,
                    access,
                    createdAt: '',
                    updatedAt: ''
                });

                res.send('User added to the database!');
            } else {
                res.status(400).send('Bad Request. Please provide all required fields.');
            }
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).send('Internal Server Error');
        }
    },
 
};
