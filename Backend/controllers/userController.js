import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

// Register User
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.json({ success: false, message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        const token = jwt.sign({ id: newUser._id, isAdmin: false }, process.env.JWT_SECRET);

        res.json({ success: true, token, user: { name: newUser.name, email: newUser.email } });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Login User
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const adminEmail = process.env.ADMIN_EMAIL ? process.env.ADMIN_EMAIL.trim() : "";
        const adminPass = process.env.ADMIN_PASSWORD ? process.env.ADMIN_PASSWORD.trim() : "";

        // Check if admin credentials
        if (email.trim() === adminEmail && password.trim() === adminPass) {
            const token = jwt.sign({ email: adminEmail, isAdmin: true }, process.env.JWT_SECRET)
            return res.json({ success: true, token, isAdmin: true })
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id, isAdmin: false }, process.env.JWT_SECRET);

        res.json({ success: true, token, isAdmin: false, user: { name: user.name, email: user.email } });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};
