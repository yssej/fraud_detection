const Datatypes = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Organization = require('./Organization');

const Membership = sequelize.define("Membership", {
    id: {
        type: Datatypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: Datatypes.INTEGER,
        allowNull: false
    },
    organizationId: {
        type: Datatypes.INTEGER,
        allowNull: false
    },
    role: {
        type: Datatypes.ENUM("Admin", "Analyst"),
        allowNull: false
    },
    status: {
        type: Datatypes.ENUM("Pending", "Accepted", "Declined"),
        defaultValue: "Pending",
        allowNull: false
    }
}, {
    timestamps: false
});

Organization.belongsToMany(User, { through: Membership, foreignKey: 'organizationId' });
User.belongsToMany(Organization, { through: Membership, foreignKey: 'userId' });
sequelize.sync()
    .then(() => console.log("Associations synchronized with database."))
    .catch(err => console.error("Synchronisation error", err));

module.exports = {
    Membership,
    Organization,
    User
}
