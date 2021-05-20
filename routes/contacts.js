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

//GET: Retrieve all Contacts
router.get("/", (req, res) => {
    Contact.find()
        .then((contacts) => res.send(contacts))
        .catch((error) => {
            res.status(500).send("Unable to complete request.");
        });
});

//GET: Retrieve a Contact by ID
router.get("/:contactId", async (req, res) => {
    const contact = await Contact.findById(req.params.contactId);
    if (!contact) res.status(404).send("Requested Contact not found.");
    res.send(contact);
});

//PUT: Update a Contact by ID
router.put("/:contactId", async (req, res) => {
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.contactId,
        {
            name: req.body.contactName,
            email: req.body.contactEmail,
            country: req.body.contactCountry
        },
        { new: true }
    );

    if (!updatedContact) res.status(404).send("Requested Contact not found.");
    res.send(updatedContact);
});

//DELETE: Delete a Contact by ID
router.delete("/:contactId", async (req, res) => {
    const contact = await Contact.findByIdAndRemove(req.params.contactId);
    if (!contact) res.status(404).send("Requested Contact not found.");
    res.send(contact);
});

module.exports = router;