var DataTypes = require("sequelize").DataTypes;
var _chatRoomTB = require("./chatRoomTB");
var _cltTB = require("./cltTB");
var _joinChatTB = require("./joinChatTB");
var _joinVolActvTB = require("./joinVolActvTB");
var _msgTB = require("./msgTB");
var _tokenGetStateTB = require("./tokenGetStateTB");
var _tokenTB = require("./tokenTB");
var _volActvCatTB = require("./volActvCatTB");
var _volActvTB = require("./volActvTB");

function initModels(sequelize) {
  var chatRoomTB = _chatRoomTB(sequelize, DataTypes);
  var cltTB = _cltTB(sequelize, DataTypes);
  var joinChatTB = _joinChatTB(sequelize, DataTypes);
  var joinVolActvTB = _joinVolActvTB(sequelize, DataTypes);
  var msgTB = _msgTB(sequelize, DataTypes);
  var tokenGetStateTB = _tokenGetStateTB(sequelize, DataTypes);
  var tokenTB = _tokenTB(sequelize, DataTypes);
  var volActvCatTB = _volActvCatTB(sequelize, DataTypes);
  var volActvTB = _volActvTB(sequelize, DataTypes);

  cltTB.belongsToMany(tokenTB, { as: 'tokenID_tokenTBs', through: tokenGetStateTB, foreignKey: "cltID", otherKey: "tokenID" });
  cltTB.belongsToMany(volActvTB, { as: 'volActvID_volActvTBs', through: joinVolActvTB, foreignKey: "cltID", otherKey: "volActvID" });
  tokenTB.belongsToMany(cltTB, { as: 'cltID_cltTB_tokengetstatetbs', through: tokenGetStateTB, foreignKey: "tokenID", otherKey: "cltID" });
  volActvTB.belongsToMany(cltTB, { as: 'cltID_cltTBs', through: joinVolActvTB, foreignKey: "volActvID", otherKey: "cltID" });
  joinChatTB.belongsTo(chatRoomTB, { as: "chatRoom", foreignKey: "chatRoomID"});
  chatRoomTB.hasMany(joinChatTB, { as: "joinchattbs", foreignKey: "chatRoomID"});
  msgTB.belongsTo(chatRoomTB, { as: "chatRoom", foreignKey: "chatRoomID"});
  chatRoomTB.hasMany(msgTB, { as: "msgtbs", foreignKey: "chatRoomID"});
  joinChatTB.belongsTo(cltTB, { as: "clt", foreignKey: "cltID"});
  cltTB.hasMany(joinChatTB, { as: "joinchattbs", foreignKey: "cltID"});
  joinVolActvTB.belongsTo(cltTB, { as: "clt", foreignKey: "cltID"});
  cltTB.hasMany(joinVolActvTB, { as: "joinvolactvtbs", foreignKey: "cltID"});
  msgTB.belongsTo(cltTB, { as: "clt", foreignKey: "cltID"});
  cltTB.hasMany(msgTB, { as: "msgtbs", foreignKey: "cltID"});
  tokenGetStateTB.belongsTo(cltTB, { as: "clt", foreignKey: "cltID"});
  cltTB.hasMany(tokenGetStateTB, { as: "tokengetstatetbs", foreignKey: "cltID"});
  volActvTB.belongsTo(cltTB, { as: "publ", foreignKey: "publID"});
  cltTB.hasMany(volActvTB, { as: "volactvtbs", foreignKey: "publID"});
  tokenGetStateTB.belongsTo(tokenTB, { as: "token", foreignKey: "tokenID"});
  tokenTB.hasMany(tokenGetStateTB, { as: "tokengetstatetbs", foreignKey: "tokenID"});
  tokenTB.belongsTo(volActvCatTB, { as: "volActvCat", foreignKey: "volActvCatID"});
  volActvCatTB.hasMany(tokenTB, { as: "tokentbs", foreignKey: "volActvCatID"});
  volActvTB.belongsTo(volActvCatTB, { as: "volActvCat", foreignKey: "volActvCatID"});
  volActvCatTB.hasMany(volActvTB, { as: "volactvtbs", foreignKey: "volActvCatID"});
  joinVolActvTB.belongsTo(volActvTB, { as: "volActv", foreignKey: "volActvID"});
  volActvTB.hasMany(joinVolActvTB, { as: "joinvolactvtbs", foreignKey: "volActvID"});

  return {
    chatRoomTB,
    cltTB,
    joinChatTB,
    joinVolActvTB,
    msgTB,
    tokenGetStateTB,
    tokenTB,
    volActvCatTB,
    volActvTB,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
