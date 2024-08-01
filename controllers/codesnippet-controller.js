import { CodeSnippetModel } from "../models/codeSnippet_model.js";


// Add a code snippet
export const createCode = async (req, res) => {
    try {
      const { title, content, language } = req.body;
  
      if (!title || !content || !language) {
        return res.status(400).json({ message: 'Title, content, and language are required' });
      }
  
      const newCode = new CodeSnippetModel({
        title,
        content,
        language,
      });
  
      await newCode.save();
  
      res.status(201).json({ message: 'Code snippet created successfully', newCode });
    } catch (err) {
      console.error('Error creating code snippet:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  
// Get all codes
export const getAllCodes = async (req, res) => {
    try {
        const allcodes = await CodeSnippetModel.find()

        res.status(200).json({allcodes});
    } catch (err) {
        

        console.error('Error fetching code snippets:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }}


    // Get a single code snippet
    export const getOneCode = async (req, res) => {
        try {
          const id = req.params.id;
          const code = await CodeSnippetModel.findById(id);
      
          if (!code) {
            res.status(404).json({ message: 'Code snippet not found' });
          } else {
            res.status(200).json({ code });
          }
        } catch (err) {
          console.error('Error fetching code snippet:', err);
          res.status(500).json({ message: 'Internal Server Error' });
        }
      };



    // Update a code snippet
export const updateCode = async (req, res) => {
  try {
    const id = req.params.id;
    const code = await CodeSnippetModel.findByIdAndUpdate(id, req.body, { new: true });

    if (!code) {
      res.status(404).json({ message: 'Code snippet not found' });
    } else {
      res.status(200).json({ code });
    }
  } catch (err) {
    console.error('Error updating code snippet:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

    // Delete a code snippet
    export const deleteCode = async (req, res) => {
        try {
          const id = req.params.id;
          await CodeSnippetModel.findByIdAndDelete(id);
      
          res.status(204).json({ message: 'Code snippet deleted successfully' });
        } catch (err) {
          console.error('Error deleting code snippet:', err);
          res.status(500).json({ message: 'Internal Server Error' });
        }
      };