import CategoryDetailModel from '../Model/CategoryDetailModel.js';

export const createCategoryDetail = async (req, res) => {
  try {
    const {
      categoryName,
      description1,
      description2,
      features // features should be passed as array or JSON string
    } = req.body;

    const image = req.file ? `/uploads/banners/${req.file.filename}` : null;

    if (!categoryName || !image || !description1 || !description2 || !features) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Parse features if sent as a JSON string
    const parsedFeatures = typeof features === 'string' ? JSON.parse(features) : features;

    const categoryDetail = new CategoryDetailModel({
      categoryName,
      image,
      description1,
      description2,
      features: parsedFeatures
    });

    await categoryDetail.save();
    res.status(201).json(categoryDetail);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCategoryDetails = async (req, res) => {
  try {
    const details = await CategoryDetailModel.find().lean();
    res.status(200).json(details);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteCategoryDetail = async (req, res) => {
  try {
    const deletedDetail = await CategoryDetailModel.findByIdAndDelete(req.params.id);
    if (!deletedDetail) {
      return res.status(404).json({ message: 'Category detail not found' });
    }
    res.status(200).json({ message: 'Category detail deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};  

export const updateCategoryDetail = async (req, res) => {
  try {
    const {
      categoryName,
      description1,
      description2,
      features // features should be passed as array or JSON string
    } = req.body;

    const image = req.file ? `/uploads/banners/${req.file.filename}` : null;

    const updateFields = { categoryName, description1, description2 };
    if (image) updateFields.image = image;
    if (features) updateFields.features = typeof features === 'string' ? JSON.parse(features) : features;

    const updatedDetail = await CategoryDetailModel.findByIdAndUpdate(req.params.id, updateFields, { new: true });

    if (!updatedDetail) {
      return res.status(404).json({ message: 'Category detail not found' });
    }

    res.status(200).json(updatedDetail);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};