const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('msgtb', {
    msgID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    chatRoomID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'chatroomtb',
        key: 'chatRoomID'
      }
    },
    cltID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'clttb',
        key: 'cltID'
      }
    },
    msgCont: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    msgTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'msgtb',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "msgID" },
        ]
      },
      {
        name: "fk_msgTB_cltTB1_idx",
        using: "BTREE",
        fields: [
          { name: "cltID" },
        ]
      },
      {
        name: "fk_msgTB_chatRoomTB1_idx",
        using: "BTREE",
        fields: [
          { name: "chatRoomID" },
        ]
      },
    ]
  });
};
