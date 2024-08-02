import { ProjectModel } from "../models/project_models.js";
import { UserModel } from "../models/user_model.js";

export const addContributor = async(req, res) =>{
    const { projectId, contributorEmail } = req.body;

    if (!projectId || !contributorEmail) {
        return res.status(400).json({ message: "Project ID and Contributor Email are required" });
    }

    try {
        // Find the project by ID
        const project = await ProjectModel.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        // Find the user by email
        const user = await UserModel.findOne({ email: contributorEmail });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the user is already a contributor
        if (project.contributors.includes(user._id)) {
            return res.status(400).json({ message: "User is already a contributor" });
        }

        // Add the user to the project's contributors
        project.contributors.push(user._id);
        await project.save();

        return res.status(200).json({ message: "Contributor added successfully", project });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};