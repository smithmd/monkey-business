/**
 * Created by msmith on 2/15/14.
 */

var Barrel = Class.create();
Barrel.prototype = {
  initialize: function (name) {
    this.monkeyType = 0;
  },
  click: function () {
    Player.bananas++;
  }
};

var Player = Class.create();
Player.prototype = {
  bananas: 0,
  initialize: function () {

  }
};