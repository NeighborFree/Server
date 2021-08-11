const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tokenTB', {
    tokenID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    volActvCatID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'volActvCatTB',
        key: 'volActvCatID'
      }
    },
    tokenName: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    tokenCont: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    tokenActVolCnt: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    tokenActVolTime: {
      type: DataTypes.TIME,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tokenTB',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "tokenID" },
        ]
      },
      {
        name: "fk_tokenTB_volActvCatTB1_idx",
        using: "BTREE",
        fields: [
          { name: "volActvCatID" },
        ]
      },
    ]
  });
};
