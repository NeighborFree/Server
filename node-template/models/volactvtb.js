const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('volactvtb', {
    volActvID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    publID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'clttb',
        key: 'cltID'
      }
    },
    volActvCatID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'volactvcattb',
        key: 'volActvCatID'
      }
    },
    volActTitle: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    volActCont: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    volActPer: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    volActProgTime: {
      type: DataTypes.TIME,
      allowNull: false
    },
    volActOSD: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    volActOED: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    volActPT: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    volActState: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: "R"
    },
    volActViews: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'volactvtb',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "volActvID" },
        ]
      },
      {
        name: "fk_volActTB_cltTB1_idx",
        using: "BTREE",
        fields: [
          { name: "publID" },
        ]
      },
      {
        name: "fk_volActvTB_volActvCatTB1_idx",
        using: "BTREE",
        fields: [
          { name: "volActvCatID" },
        ]
      },
    ]
  });
};
