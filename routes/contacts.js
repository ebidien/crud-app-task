const express = require('express');
const router = express.Router();
const Contact = require('../models/contacts');

//POST: Create a new Contact
router.post('/', (req, res) => {
    contact = new Contact({
        name: req.body.contactName,
        email: req.body.contactEmail,
        country: req.body.contactCountry
    });

    contact.save().then((contact) => {
        res.send(contact);
    }).catch((error) => {
        res.status(500).send("Unable to create new Contact.");
    });
});

module.exports = router;