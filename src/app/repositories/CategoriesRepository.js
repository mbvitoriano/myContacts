const db = require('../../database');

class CategoriesRepository {
  // Listar todas as Categorias
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`SELECT * FROM categories ORDER BY name ${direction}`);
    return rows;
  }

  // Listar uma categoria pelo seu nome
  async findByName(name) {
    const [row] = await db.query(`
      SELECT name FROM categories
      WHERE name = $1;
    `, [name]);

    return row;
  }

  // Listar uma categoria pelo seu ID
  async findById(id) {
    const [row] = await db.query(`
      SELECT * FROM categories
      WHERE id = $1;
    `, [id]);

    return row;
  }

  // Criar uma categoria
  async create({ name }) {
    const [row] = await db.query(`
    INSERT INTO categories(name)
    VALUES($1)
    RETURNING *
    `, [name]);

    return row;
  }

  // Remover uma categoria
  async delete(id) {
    const row = await db.query(
      `
    DELETE FROM categories
    WHERE id = $1`,
      [id],
    );

    return row;
  }

  // Alterar uma categoria
  async update(id, { name }) {
    const row = await db.query(`
      UPDATE categories
      SET name = $1
      WHERE id = $2
      RETURNING *
    `, [name, id]);

    return row;
  }
}

module.exports = new CategoriesRepository();
