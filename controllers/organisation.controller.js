const Organisation = require('../models/organisation.model');

const getOrganisations = async (req, res) => {
    try {
        const organisations = await Organisation.find({});
        res.status(200).json(organisations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getOrganisation = async (req, res) => {
    try {
        const organisation = await Organisation.findById(req.params.id);
        if (!organisation) {
            return res.status(404).json({ message: 'Organisation not found' });
        }
        res.status(200).json(organisation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createOrganisation = async (req, res) => {
    try {
        const organisation = await Organisation.create(req.body);
        res.status(201).json(organisation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateOrganisation = async (req, res) => {
    try {
        const { id } = req.params;
        const organisation = await Organisation.findByIdAndUpdate(id, req.body, { new: true });
        if (!organisation) {
            return res.status(404).json({ message: 'Organisation not found' });
        }
        res.status(200).json(organisation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteOrganisation = async (req, res) => {
    try {
        const { id } = req.params;
        const organisation = await Organisation.findByIdAndDelete(id);
        if (!organisation) {
            return res.status(404).json({ message: 'Organisation not found' });
        }
        res.status(200).json({ message: 'Organisation deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getOrganisations,
    getOrganisation,
    createOrganisation,
    updateOrganisation,
    deleteOrganisation
};