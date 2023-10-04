const CategoriesRepository = require('../repositories/CategoriesRepository');

class CategoryController {
  // Listar todas as categorias
  async index(req, res) {
    const { orderBy } = req.query;
    const categories = await CategoriesRepository.findAll(orderBy);

    res.json(categories);
  }

  // Listar uma categoria pelo seu ID

  async show(req, res) {
    const { id } = req.params;

    const category = await CategoriesRepository.findById(id);

    if (!category) {
      return res.status(404).json({ error: 'Category not found!' });
    }

    res.json(category);
  }

  // Criar uma categoria
  async store(req, res) {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const categoryExists = await CategoriesRepository.findByName(name);

    if (categoryExists) {
      return res.status(400).json({ error: 'This category name is already in use!' });
    }

    const category = await CategoriesRepository.create({ name });

    res.json(category);
  }

  // Remover uma categoria
  async delete(req, res) {
    const { id } = req.params;

    await CategoriesRepository.delete(id);

    // 204: No Content
    res.sendStatus(204);
  }

  // Alterar uma categoria
  async update(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const categoryExists = await CategoriesRepository.findByName(name);

    if (categoryExists) {
      return res.status(400).json({ error: 'This category name is already in use!' });
    }

    const category = await CategoriesRepository.update(id, { name });

    res.json(category);
  }
}

module.exports = new CategoryController();
