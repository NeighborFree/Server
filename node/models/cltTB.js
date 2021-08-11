const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cltTB', {
    cltID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cltName: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    cltTel: {
      type: DataTypes.CHAR(11),
      allowNull: false
    },
    cltAddr: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    cltEmail: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    cltPW: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    cltLv: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    lifeVolTime: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: "00:00:00"
    },
    facVolTime: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: "00:00:00"
    },
    eduVolTime: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: "00:00:00"
    },
    osVolTime: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: "00:00:00"
    },
    onlVolTime: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: "00:00:00"
    },
    totalVolTime: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: "00:00:00"
    },
    lifeVolCnt: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    facVolCnt: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    eduVolCnt: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    osVolCnt: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    onlVolCnt: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    totalVolCnt: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'cltTB',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "cltID" },
        ]
      },
    ]
  });
};
