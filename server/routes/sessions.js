// const express = require('express');
// const router = express.Router();
// const UserCredential = require('../models/userCreds');

// router.post('/', (req, res) => {
//     if (!req.body) {
//         res.status(400).send({error: "Request Payload Empty!"});
//         return;
//     }

//     const { user_name, password } = req.body;

//     if (!user_name) {
//         res.status(400).send({error: "User_name missing in the Payload!"});
//         return;
//     }

//     if (!password) {
//         res.status(400).send({error: "Password missing in the Payload!"});
//         return;
//     }

//     UserCredential.findOne({ email }).then(user => {
//         if (!user) {
//             res.status(400).send({error: "User not signed up!"});
//             return;
//         }

//         if (!match) {
//             res.status(400).send({error: "Incorrect user_name/password combination!"});
//             return;
//         }

//         req.session.userId = user.id;
//         res.status(204).send();
//     }).catch(() => {
//         res.status(500).send({ error: "Internal Server Error" });
//     });
// });

// router.delete('/me', (req, res) => {
//     delete req.session.userId;
//     res.status(204).send();
// });

// module.exports = router;