const User = require('../models/User');
const BadRequestError = require('../middlewares/errors/BadRequestError')
const NotFoundError = require('../middlewares/errors/NotFoundError');

const getAll = async () => User.findAll();

const getById = async (id) => {
    if(!id) throw new BadRequestError("Id is required.");
    const user = await User.findByPk(id);
    if (!user) throw new NotFoundError("User not found");
    return user;
}

const deleteById = async (id) => {
    await getById(id);
    await User.destroy({where: {id}});
}

module.exports = {getAll, getById, deleteById};
