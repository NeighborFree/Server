const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('joinchattb', {
    joinChatID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cltID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'clttb',
        key: 'cltID'
      }
    },
    chatRoomID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'chatroomtb',
        key: 'chatRoomID'
      }
    }
  }, {
    sequelize,
    tableName: 'joinchattb',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "joinChatID" },
        ]
      },
      {
        name: "fk_joinChatTB_cltTB1_idx",
        using: "BTREE",
        fields: [
          { name: "cltID" },
        ]
      },
      {
        name: "fk_joinChatTB_chatRoomTB1_idx",
        using: "BTREE",
        fields: [
          { name: "chatRoomID" },
        ]
      },
    ]
  });
};
