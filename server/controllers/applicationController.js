const Application = require("../models/Application");


const submitApplication = async (req, res) => {
    try {
        const {
            petId,
            petName,
            userName,
            userEmail,
            phone,
            address,
            reason,
        } = req.body;

        if (!userName || !userEmail || !phone || !address || !reason) {
            return res.status(400).json({
                message: "Please fill all required fields",
            });
        }

        const newApplication = new Application({
            petId: petId || null,
            petName: petName || "Selected Pet",
            userName,
            userEmail,
            phone,
            address,
            reason,
            status: "pending",
        });

        const savedApplication = await newApplication.save();

        res.status(201).json({
            message: "Adoption application submitted successfully",
            application: savedApplication,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error submitting adoption application",
            error: error.message,
        });
    }
};

// Get user's applications
const getMyApplications = async (req, res) => {
    try {
        const { email } = req.query;

        let applications;

        if (email) {
            applications = await Application.find({ userEmail: email }).sort({
                createdAt: -1,
            });
        } else {
            applications = await Application.find().sort({
                createdAt: -1,
            });
        }

        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching applications",
            error: error.message,
        });
    }
};

module.exports = {
    submitApplication,
    getMyApplications,
};