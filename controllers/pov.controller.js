const POV = require('../models/pov.model');
const Territory = require('../models/territory.model');

const getPOVs = async (req, res) => {
    try {
        const { organisation } = req.body;
        const povs = await POV.find({ organisation });
        res.status(200).json(povs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getPOV = async (req, res) => {
    try {
        const pov = await POV.findById(req.params.id);
        if (!pov) {
            return res.status(404).json({ message: 'POV not found' });
        }
        res.status(200).json(pov);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createPOV = async (req, res) => {
    try {
        const pov = await POV.create(req.body);
        res.status(200).json(pov);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updatePOV = async (req, res) => {
    try {
        const {id} = req.params;
        const pov = await POV.findByIdAndUpdate(id, req.body);
        if (!pov) {
            return res.status(404).json({ message: 'POV not found' });
        }
        const updatedPOV = await POV.findById(id);
        res.status(200).json(updatedPOV);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateTaggedTerritory = async (req, res) => {
    try {
        const { povName, territoryName } = req.body;
        const pov = await POV.findOne({ name: povName });
        if (!pov) {
            return res.status(404).json({ message: 'POV not found' });
        }
        const territory = await Territory.findOne({ territoryName: territoryName });
        if (!territory) {
            return res.status(404).json({ message: 'Territory not found' });
        }
        pov.taggedTerritory = territory.territoryID;
        await pov.save();
        res.status(200).json(pov);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPOVsByTerritory = async (req, res) => {
    try {
        const { orgID, userID } = req.body;
        const territoryIDs = await Territory.find({ organisation: orgID, taggedUsers: userID }).distinct('territoryID');
        const povs = await POV.find({ taggedTerritory: { $in: territoryIDs } });
        if (!povs.length) {
            return res.status(404).json({ message: 'No POVs found for the given territory' });
        }
        res.status(200).json(povs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deletePOV = async (req, res) => {
    try {
        const {id} = req.params;
        const pov = await POV.findByIdAndDelete(id);
        if (!pov) {
            return res.status(404).json({ message: 'POV not found' });
        }
        res.status(200).json({ message: 'POV deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCount = async (req, res) => {
    try {
        const count = await POV.countDocuments({});
        res.status(200).json({ count });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getPOVs,
    getPOV,
    createPOV,
    updatePOV,
    updateTaggedTerritory,
    getPOVsByTerritory,
    deletePOV,
    getCount
};