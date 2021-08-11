const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('volActvTB', {
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
        model: 'cltTB',
        key: 'cltID'
      }
    },
    volActvCatID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'volActvCatTB',
        key: 'volActvCatID'
      }
    },
    volActvTitle: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    volActvCont: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    volActvPer: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    volActvProgTime: {
      type: DataTypes.TIME,
      allowNull: false
    },
    volActvOSD: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    volActvOED: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    volActvPT: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    volActvState: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: "R"
    },
    volActvViews: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'volActvTB',
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
