import { CodeSnippetModel } from "../models/codeSnippet_model.js";
import { UserModel } from "../models/user_model.js";

export const addContributor = async(req, res) =>{
    const { codesnippetId, contributorEmail } = req.body;

    if (!codesnippetId || !contributorEmail) {
        return res.status(400).json({ message: "Codesnippet ID and Contributor Email are required" });
    }

    try {
        // Find the codesnippet by ID
        const codesnippet = await CodeSnippetModel.findById(codesnippetId);
        if (!codesnippet) {
            return res.status(404).json({ message: "Codesnippet not found" });
        }

        // Find the user by email
        const user = await UserModel.findOne({ email: contributorEmail });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the user is already a contributor
        if (codesnippet.contributors.includes(user._id)) {
            return res.status(400).json({ message: "User is already a contributor" });
        }

        // Add the user to the codesnippet's contributors
        codesnippet.contributors.push(user._id);
        await codesnippet.save();

        return res.status(200).json({ message: "Contributor added successfully", codesnippet });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
