const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { query, validationResult, body } = require('express-validator');



// Create a user using: POST "/api/auth/". Doesn't required auth to access this route


router.post('/', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        // Prevent duplicate email
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        // Create and save user
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        await user.save();
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});
module.exports = router



// //////////////////////////////////////////////////
// async (req, res) => {
//     console.log(req.body);
//     try {
//         const { email } = req.body;
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ error: 'Email already exists' });
//         }
//         const user = new User(req.body);
//         await user.save();
//         res.json(user);
//     } catch (err) {
//         res.status(500).json({ error: 'Server error' });
//     }
// });


// router.post('/', (req, res) => {
//     console.log(req.body);
//     const user = new User(req.body);
//     user.save()
//         .then(() => {
//             res.send(req.body);
//         })
//         .catch((err) => {
//             console.error(err);
//             res.status(500).send('Server error');
//         });
// })



//////////////////////
// res.send(req.body);

