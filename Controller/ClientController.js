import ClientModel from '../Model/ClientModel.js';

export const createClient = async (req, res) => {
  try {
    const { name, description } = req.body;
    const image = req.file ? `/uploads/banners/${req.file.filename}` : null;

    if (!name || !description || !image) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newClient = new ClientModel({ name, description, image });
    await newClient.save();
    res.status(201).json(newClient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getClients = async (req, res) => {
  try {
    const clients = await ClientModel.find().sort({ createdAt: -1 });
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteClient = async (req, res) => {
  try {
    const deletedClient = await ClientModel.findByIdAndDelete(req.params.id);
    if (!deletedClient) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.status(200).json({ message: 'Client deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};  

export const updateClient = async (req, res) => {
  try {
    const { name, description } = req.body;
    const image = req.file ? `/uploads/banners/${req.file.filename}` : null;

    const updateFields = { name, description };
    if (image) updateFields.image = image;

    const updatedClient = await ClientModel.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    );

    if (!updatedClient) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.status(200).json(updatedClient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};  