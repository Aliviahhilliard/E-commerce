const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

/**
 * Tag - Represents a Tag, fields and rules are defined in model.
 * 
 * @extends Model
 */
class Tag extends Model {}

Tag.init(
  {
    // Define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    tag_name: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  }
);

module.exports = Tag;
