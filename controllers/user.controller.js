const User = require('../models/user.model');
const Territory = require('../models/territory.model'); 
const bcrypt = require('bcrypt'); // For password hashing

const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createUser = async (req, res) => {
    try {
        const { name, email, password, address, number } = req.body;

        const formattedName = name.trim();
        const lowercaseEmail = email.toLowerCase(); 
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ 
            name: formattedName, 
            email: lowercaseEmail, 
            password: hashedPassword,
            address: address,
            number: number
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findByIdAndUpdate(id, req.body);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const updatedUser = await User.findById(id);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateTaggedTerritory = async (req, res) => {
    try {
        const { userName, territoryName } = req.body;
        const user = await User.findOne({ name: userName });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const territory = await Territory.findOne({ territoryName: territoryName });
        if (!territory) {
            return res.status(404).json({ message: 'Territory not found' });
        }
        user.taggedTerritory = territory.territoryID;
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    updateTaggedTerritory,
    deleteUser,
    loginUser
};