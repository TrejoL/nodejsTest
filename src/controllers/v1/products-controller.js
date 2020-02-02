const Products = require('../../mongo/models/products');

const createProduct = async (req, res) => {
  try {
    const { title, desc, price, images, userId } = req.body;

    const product = await Products.create({
      title,
      desc,
      price,
      images,
      user: userId
    });
    res.send({ status: 'OK', data: product });
  } catch (error) {
    console.log('createProduct error:', error);
    res.status(500).send({ status: 'ERROR', data: error.message });
  }
};

const deleteProduct = (req, res) => {};

const getProducts = async (req, res) => {
  try {
    // const products = await Products.find({
    //   price: { $lt: 10 }
    // })
    const products = await Products.find()
      .populate('user', 'username email data role')
      .select('title desd price');
    res.send({ status: 'OK', data: products });
  } catch (error) {
    console.log('getProducts error', error);
    res.status(500).send({ status: 'ERROR', data: error.message });
  }
};

const getProductsByUser = async (req, res) => {
  try {
    const products = await Products.find({
      user: req.params.userId
    });
    res.send({ status: 'OK', data: products });
  } catch (error) {
    console.log('getProducts error', error);
    res.status(500).send({ status: 'ERROR', data: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { images, desc, price, productId } = req.body;
    await Products.findByIdAndUpdate(productId, { images, desc, price });
    res.send({ status: 'OK', message: 'product updated' });
  } catch (error) {
    console.log('updateProduct error:', error);
    res.status(500).send({ status: 'ERROR', data: error.message });
  }
};

module.exports = {
  createProduct,
  deleteProduct,
  getProducts,
  getProductsByUser,
  updateProduct
};
