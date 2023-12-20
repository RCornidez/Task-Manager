import { DataTypes } from 'sequelize';

class CategoryModel {
    constructor(id, name, description) {
        this.id = id;
        this.name = name;
        this.email = description;
    }
}

const Category = (sequelize) => sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true 
  }
}, {
  freezeTableName: true
});

export default Category;


export { Category, CategoryModel };
