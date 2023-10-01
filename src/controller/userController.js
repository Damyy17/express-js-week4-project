const User = require('../models/userModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registeredUsers = [
    new User(1, "damyy", "hihihaha29")
];

const userId = registeredUsers.length

exports.getAllUsers = (req, res) =>{
    res.json(registeredUsers);
}

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User( userId + 1, username, hashedPassword );
        registeredUsers.push(user);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = registeredUsers.find(user => user.username === username);

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ username: user.username}, 'secret_key', { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

