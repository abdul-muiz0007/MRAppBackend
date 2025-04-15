const Territory = require('../models/territory.model');

const getTerritories = async (req, res) => {
    try {
        const territories = await Territory.find({});
        res.status(200).json(territories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTerritory = async (req, res) => {
    try {
        const territory = await Territory.findById(req.params.id);
        if (!territory) {
            return res.status(404).json({ message: 'Territory not found' });
        }
        res.status(200).json(territory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createTerritory = async (req, res) => {
    try {
        const territory = await Territory.create(req.body);
        res.status(200).json(territory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateTerritory = async (req, res) => {
    try {
        const { id } = req.params;
        const territory = await Territory.findByIdAndUpdate(id, req.body);
        if (!territory) {
            return res.status(404).json({ message: 'Territory not found' });
        }
        const updatedTerritory = await Territory.findById(id);
        res.status(200).json(updatedTerritory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteTerritory = async (req, res) => {
    try {
        const { id } = req.params;
        const territory = await Territory.findByIdAndDelete(id);
        if (!territory) {
            return res.status(404).json({ message: 'Territory not found' });
        }
        res.status(200).json({ message: 'Territory deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCount = async (req, res) => {
    try {
        const count = await Territory.countDocuments({});
        res.status(200).json({ count });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getTerritories,
    getTerritory,
    createTerritory,
    updateTerritory,
    deleteTerritory,
    getCount
};