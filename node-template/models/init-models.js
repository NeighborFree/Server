var DataTypes = require("sequelize").DataTypes;
var _chatroomtb = require("./chatroomtb");
var _clttb = require("./clttb");
var _joinchattb = require("./joinchattb");
var _joinvolactvtb = require("./joinvolactvtb");
var _msgtb = require("./msgtb");
var _tokengetstatetb = require("./tokengetstatetb");
var _tokentb = require("./tokentb");
var _volactvcattb = require("./volactvcattb");
var _volactvtb = require("./volactvtb");

function initModels(sequelize) {
  var chatroomtb = _chatroomtb(sequelize, DataTypes);
  var clttb = _clttb(sequelize, DataTypes);
  var joinchattb = _joinchattb(sequelize, DataTypes);
  var joinvolactvtb = _joinvolactvtb(sequelize, DataTypes);
  var msgtb = _msgtb(sequelize, DataTypes);
  var tokengetstatetb = _tokengetstatetb(sequelize, DataTypes);
  var tokentb = _tokentb(sequelize, DataTypes);
  var volactvcattb = _volactvcattb(sequelize, DataTypes);
  var volactvtb = _volactvtb(sequelize, DataTypes);

  clttb.belongsToMany(tokentb, { as: 'tokenID_tokentbs', through: tokengetstatetb, foreignKey: "cltID", otherKey: "tokenID" });
  clttb.belongsToMany(volactvtb, { as: 'volActvID_volactvtbs', through: joinvolactvtb, foreignKey: "cltID", otherKey: "volActvID" });
  tokentb.belongsToMany(clttb, { as: 'cltID_clttb_tokengetstatetbs', through: tokengetstatetb, foreignKey: "tokenID", otherKey: "cltID" });
  volactvtb.belongsToMany(clttb, { as: 'cltID_clttbs', through: joinvolactvtb, foreignKey: "volActvID", otherKey: "cltID" });
  joinchattb.belongsTo(chatroomtb, { as: "chatRoom", foreignKey: "chatRoomID"});
  chatroomtb.hasMany(joinchattb, { as: "joinchattbs", foreignKey: "chatRoomID"});
  msgtb.belongsTo(chatroomtb, { as: "chatRoom", foreignKey: "chatRoomID"});
  chatroomtb.hasMany(msgtb, { as: "msgtbs", foreignKey: "chatRoomID"});
  joinchattb.belongsTo(clttb, { as: "clt", foreignKey: "cltID"});
  clttb.hasMany(joinchattb, { as: "joinchattbs", foreignKey: "cltID"});
  joinvolactvtb.belongsTo(clttb, { as: "clt", foreignKey: "cltID"});
  clttb.hasMany(joinvolactvtb, { as: "joinvolactvtbs", foreignKey: "cltID"});
  msgtb.belongsTo(clttb, { as: "clt", foreignKey: "cltID"});
  clttb.hasMany(msgtb, { as: "msgtbs", foreignKey: "cltID"});
  tokengetstatetb.belongsTo(clttb, { as: "clt", foreignKey: "cltID"});
  clttb.hasMany(tokengetstatetb, { as: "tokengetstatetbs", foreignKey: "cltID"});
  volactvtb.belongsTo(clttb, { as: "publ", foreignKey: "publID"});
  clttb.hasMany(volactvtb, { as: "volactvtbs", foreignKey: "publID"});
  tokengetstatetb.belongsTo(tokentb, { as: "token", foreignKey: "tokenID"});
  tokentb.hasMany(tokengetstatetb, { as: "tokengetstatetbs", foreignKey: "tokenID"});
  tokentb.belongsTo(volactvcattb, { as: "volActvCat", foreignKey: "volActvCatID"});
  volactvcattb.hasMany(tokentb, { as: "tokentbs", foreignKey: "volActvCatID"});
  volactvtb.belongsTo(volactvcattb, { as: "volActvCat", foreignKey: "volActvCatID"});
  volactvcattb.hasMany(volactvtb, { as: "volactvtbs", foreignKey: "volActvCatID"});
  joinvolactvtb.belongsTo(volactvtb, { as: "volActv", foreignKey: "volActvID"});
  volactvtb.hasMany(joinvolactvtb, { as: "joinvolactvtbs", foreignKey: "volActvID"});

  return {
    chatroomtb,
    clttb,
    joinchattb,
    joinvolactvtb,
    msgtb,
    tokengetstatetb,
    tokentb,
    volactvcattb,
    volactvtb,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
