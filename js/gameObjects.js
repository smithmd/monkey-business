/**
 * Created by msmith on 2/15/14.
 */

var Barrel = Class.create();
Barrel.prototype = {
  initialize: function (name) {
    this.monkeyType = 0;
    this.totalClicks = 0;
  },
  click: function () {
    GameState.addBananas(1); // replace with call to instance of gameState
    this.totalClicks++;
  }
};

var GameState = Class.create();
GameState.prototype = {
  initialize: function () {
    this.bananas = 0;
  },
  addBananas: function (pBananas) {
    this.bananas += pBananas;
  }
};