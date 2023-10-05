const db = require('../../database');

class ContactsRepository {
  // Lista todos os registros
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`
    SELECT contacts.*, categories.name AS category_name
    FROM contacts
    LEFT JOIN categories on categories.id = contacts.category_id
    ORDER BY contacts.name ${direction}
    `);
    return rows;
  }

  // Lista um registro pelo ID
  async findById(id) {
    const [row] = await db.query(
      `
   SELECT contacts.*, categories.name AS category_name
   FROM contacts
   LEFT JOIN categories on categories.id = contacts.category_id
   WHERE contacts.id = $1`,
      [id],
    );

    return row;
  }

  // Lista um registro pelo e-mail
  async findByEmail(email) {
    const [row] = await db.query(
      `
   SELECT email FROM contacts
   WHERE email = $1
   `,
      [email],
    );

    return row;
  }

  // Remove um registro
  async delete(id) {
    const row = await db.query(
      `
   DELETE FROM contacts
   WHERE id = $1`,
      [id],
    );

    return row;
  }

  // Cria um registro
  async create({
    name, email, phone, category_id,
  }) {
    const [row] = await db.query(`
    INSERT INTO contacts(name, email, phone, category_id)
    VALUES($1, $2, $3, $4)
    RETURNING *
    `, [name, email, phone, category_id]);

    return row;
  }

  // Atualiza um Registro
  async update(id, {
    name, email, phone, category_id,
  }) {
    const [row] = await db.query(`
    UPDATE contacts
    SET name = $1, email = $2, phone = $3, category_id = $4
    WHERE id = $5
    RETURNING *
    `, [name, email, phone, category_id, id]);

    return row;
  }
}

module.exports = new ContactsRepository();
