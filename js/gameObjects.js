/**
 * Created by msmith on 2/15/14.
 */

var Monkey = Class.create();
Monkey.prototype = {
  initialize: function (type, bananas, cost, poop, steal) {
    this.type = type;
    this.bananasDropped = bananas;
    this.cost = cost;
    this.poopFactor = poop;
    this.stealFactor = steal;
    this.stolen = 0;
    this.poopThrown = 0;
  },
  dropBananas: function () {
    return this.bananasDropped;
  },
  poopCheck: function () {
    return 0; // Does some sort of check to see if poop should be thrown.
  },
  throwPoop: function () {
    //throw some poop
  },
  stolenBananas: function () {
    return this.stolen;
  }
};

var Barrel = Class.create();
Barrel.prototype = {
  initialize: function (size, woodpeckerMultiplier, name) {
    this.barrelName = name;
    this.totalClicks = 0;
    this.barrelSize = size;  // Default Barrel size
    this.woodpeckerMultiplier = woodpeckerMultiplier;
    this.inTheBarrel = [new Monkey('Wild', 1, 100, 0, 0)];  // create an array of monkeys populated with a basic wild monkey
    this.inTheBarrel.bananaCount = function () {
      var bCount = 0;
      for (var i = 0; i < this.length; i++) {
        bCount += this[i].dropBananas();
      }
      return bCount;
    }
  },
  click: function (gameState) {
    gameState.addBananas(this.inTheBarrel.bananaCount()); // replace with call to instance of gameState
    this.totalClicks++;
  },
  getClicks: function () {
    return this.totalClicks;
  }
};