const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('joinvolactvtb', {
    cltID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'clttb',
        key: 'cltID'
      }
    },
    volActvID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'volactvtb',
        key: 'volActvID'
      }
    },
    cltActvState: {
      type: DataTypes.CHAR(1),
      allowNull: false
    },
    cltBKM: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: "N"
    },
    cltReqTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'joinvolactvtb',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "cltID" },
          { name: "volActvID" },
        ]
      },
      {
        name: "fk_joinVolActvTB_cltTB1_idx",
        using: "BTREE",
        fields: [
          { name: "cltID" },
        ]
      },
      {
        name: "fk_joinVolActvTB_volActvTB1_idx",
        using: "BTREE",
        fields: [
          { name: "volActvID" },
        ]
      },
    ]
  });
};
