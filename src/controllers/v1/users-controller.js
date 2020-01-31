const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
  try {
    console.log('req.body', req.body);

    const hash = await bcrypt.hash(req.body.password, 15);
    console.log('DONE', hash);
    res.send({ status: 'OK', message: 'user created' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: 'ERROR', message: error.message });
  }
};
const deleteUser = (req, res) => {
  res.send({ status: 'OK', message: 'user deleted' });
};

const getUsers = (req, res) => {
  res.send({ status: 'OK', data: [] });
};

const updateUser = (req, res) => {
  res.send({ status: 'OK', message: 'user updated' });
};

module.exports = {
  createUser,
  deleteUser,
  getUsers,
  updateUser
};
