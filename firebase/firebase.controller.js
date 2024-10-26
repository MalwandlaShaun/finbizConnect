// controllers/userController.js
import admin from 'firebase-admin';

const db = admin.firestore();

// Get user by ID
export const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const userDoc = await db.collection('users').doc(userId).get();
        if (userDoc.exists) {
            res.status(200).json(userDoc.data());
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send('Error retrieving user: ' + error.message);
    }
};

// Create a new user
export const createUser = async (req, res) => {
    try {
        const userData = req.body;
        const newUserRef = db.collection('users').doc();
        await newUserRef.set(userData);
        res.status(201).send(`User created with ID: ${newUserRef.id}`);
    } catch (error) {
        res.status(500).send('Error creating user: ' + error.message);
    }
};
