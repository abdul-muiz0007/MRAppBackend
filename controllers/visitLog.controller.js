const VisitLog = require('../models/visitLog.model');

const getVisitLogs = async (req, res) => {
    try {
        const visitLogs = await VisitLog.find({});
        res.status(200).json(visitLogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getVisitLog = async (req, res) => {
    try {
        const visitLog = await VisitLog.findById(req.params.id);
        if (!visitLog) {
            return res.status(404).json({ message: 'Visit Log not found' });
        }
        res.status(200).json(visitLog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createVisitLog = async (req, res) => {
    try {
        const visitLog = await VisitLog.create(req.body);
        res.status(201).json(visitLog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateVisitLog = async (req, res) => {
    try {
        const { id } = req.params;
        const visitLog = await VisitLog.findByIdAndUpdate(id, req.body, { new: true });
        if (!visitLog) {
            return res.status(404).json({ message: 'Visit Log not found' });
        }
        res.status(200).json(visitLog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteVisitLog = async (req, res) => {
    try {
        const { id } = req.params;
        const visitLog = await VisitLog.findByIdAndDelete(id);
        if (!visitLog) {
            return res.status(404).json({ message: 'Visit Log not found' });
        }
        res.status(200).json({ message: 'Visit Log deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getVisitLogsByPOV = async (req, res) => {
    try {
        const { povID, userID } = req.body;
        const visitLogs = await VisitLog.find({ povID });
        if (!visitLogs.length) {
            return res.status(404).json({ message: 'No Visit Logs found for the given POV' });
        }
        res.status(200).json(visitLogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getVisitLogs,
    getVisitLog,
    createVisitLog,
    updateVisitLog,
    deleteVisitLog,
    getVisitLogsByPOV
};