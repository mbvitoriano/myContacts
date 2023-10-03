const ContactsRepository = require('../repositories/ContactsRepository');

class ContactController {
  async index(req, res) {
    // Listar todos os registros
    const contacts = await ContactsRepository.findAll();

    res.json(contacts);
  }

  show() {

    // Exibir um registro
  }

  store() {

    // Criar novo registro
  }

  delete() {

    // editar um registro
  }
}

// Singleton
module.exports = new ContactController();
