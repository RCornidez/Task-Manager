import db from "../db.js";

const { Category } = db.models;

export default class CategoryController {
    // Create a new category
    async createCategory(req, res) {
        try {
            const newCategory = await Category.create(req.body);
            res.status(201).json(newCategory);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // Get all categories
    async getCategories(req, res) {
        try {
            const categories = await Category.findAll();
            res.json(categories);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Get a specific category by ID
    async getCategoryById(req, res) {
        try {
            const category = await Category.findByPk(req.params.id);
            if (category) {
                res.json(category);
            } else {
                res.status(404).json({ error: 'Category not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Update a category
    async updateCategory(req, res) {
        try {
            const updatedCategory = await Category.update(req.body, {
                where: { id: req.params.id }
            });
            if (updatedCategory) {
                res.json(updatedCategory);
            } else {
                res.status(404).json({ error: 'Category not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Delete a category
    async deleteCategory(req, res) {
        try {
            const categoryToDelete = await Category.destroy({
                where: { id: req.params.id }
            });
            if (categoryToDelete) {
                res.status(204).end();
            } else {
                res.status(404).json({ error: 'Category not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
