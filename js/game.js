/**
 * Created by msmith on 2/15/14.
 */

var Barrel = Class.create();
Barrel.prototype = {
  initialize: function (name) {
    this.monkeyType = 0;
  },
  click: function () {
    GameState.bananas++;
  }
};

var GameState = Class.create();
GameState.prototype = {
  bananas: 0,
  initialize: function () {

  }
};