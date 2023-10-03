const ContactsRepository = require('../repositories/ContactsRepository');

class ContactController {
  async index(req, res) {
    // Listar todos os registros
    const contacts = await ContactsRepository.findAll();

    res.json(contacts);
  }

  async show(req, res) {
    // Exibir um registro
    const { id } = req.params;

    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(contact);
  }

  async store(req, res) {
    // Criar novo registro

    const {
      name, email, phone, categoryId,
    } = req.body;

    const contactExists = await ContactsRepository.findByEmail(email);

    if (contactExists) {
      return res.status(400).json({ error: 'This emial is already in use!' });
    }

    const contact = await ContactsRepository.create({
      name, email, phone, categoryId,
    });

    res.json(contact);
  }

  async delete(req, res) {
    // Editar um registro

    const { id } = req.params;

    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return res.status(404).json({ error: 'User not found' });
    }

    await ContactsRepository.delete(id);
    res.sendStatus(204);
  }
}

// Singleton
module.exports = new ContactController();
