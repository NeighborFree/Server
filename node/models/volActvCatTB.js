const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('volActvCatTB', {
    volActvCatID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    volActCatName: {
      type: DataTypes.STRING(10),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'volActvCatTB',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "volActvCatID" },
        ]
      },
    ]
  });
};
