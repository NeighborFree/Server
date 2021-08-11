const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tokenGetStateTB', {
    tokenID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'tokenTB',
        key: 'tokenID'
      }
    },
    cltID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'cltTB',
        key: 'cltID'
      }
    },
    tokenActState: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: "N"
    }
  }, {
    sequelize,
    tableName: 'tokenGetStateTB',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "tokenID" },
          { name: "cltID" },
        ]
      },
      {
        name: "fk_tokenGetStateTB_tokenTB_idx",
        using: "BTREE",
        fields: [
          { name: "tokenID" },
        ]
      },
      {
        name: "fk_tokenGetStateTB_cltTB1_idx",
        using: "BTREE",
        fields: [
          { name: "cltID" },
        ]
      },
    ]
  });
};
