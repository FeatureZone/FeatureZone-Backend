
import { CodeSnippetModel } from "../models/codeSnippet_model.js";
import { CommentModel } from "../models/comment_model.js";
import { commentValidator } from "../validators/comment_validator.js";


// Add a comment
export const addComment = async (req, res, next) => {

    try {
        const { error, value } = commentValidator.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        // Get id from user
        const userId = req.user.id;
        // Get id from code snippet
        const snippetId = req.params.snippetId;
        // Comment = validated text
        const { text } = value

        // check if codesnippet the user wants to comment on exists
        const codeSnippet = await CodeSnippetModel.findById(snippetId)
        if (!codeSnippet) {
            return res.status(404).send("Code snippet not found")
        }

        // Create a new comment
        const comment = new CommentModel.create({ user: userId, codeSnippet: snippetId, text })
        await comment.save

        // Add the comment ID to the snippet's comments array
        codeSnippet.comments.push(comment._id)
        await codeSnippet.save()

        res.status(201).json({ message: 'Comment added', comment });

    } catch (error) {
        next(error)
    }
}

// Get comments
export const getComments = async (req, res, next) => {
    try {
        // get snippet id and check if code exists
        const snippetId = req.params.snippetId;

        // Populate the comments with user details
        const codeSnippet = await CodeSnippetModel.findById(snippetId).populate({
            path: 'comments',
            populate: { path: 'user', select: 'username' }
        });
        if (!codeSnippet) {
            return res.status(404).send("Code snippet not found")
        }
        res.status(200).json({ comments: snippet.comments })
    } catch (error) {
        next(error)
    }
};

// Update a comment
export const updateComment = async (req, res, next) => {
    try {
        const { error, value } = commentValidator.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message); // Return validation error message
        }

        const userId = req.user.id;
        const commentId = req.params.commentId;
        const { text } = value;

        const comment = await CommentModel.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Check if the comment belongs to the user
        if (comment.user.toString() !== userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        comment.text = text;
        await comment.save();

        res.status(200).json({ message: 'Comment updated', comment });
    } catch (error) {
        next(error);
    }
};


// Delete a comment
export const deleteComment = async (req, res, next) => {
    try {
        // Get the user ID from the request
        const userId = req.user.id;
        // Get the comment ID from the request 
        const commentId = req.params.commentId;

        // Find the comment by ID
        const comment = await CommentModel.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        // Check if the comment belongs to the user
        if (comment.user.toString() !== userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        // Remove the comment from the database
        await comment.remove();

        // Remove the comment ID from the snippet's comments array
        await CodeSnippetModel.findByIdAndUpdate(comment.snippet, { $pull: { comments: commentId } });

        res.status(200).json({ message: 'Comment deleted' });
    } catch (error) {
        next(error);
    }
};
