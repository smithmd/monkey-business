/**
 * Created by msmith on 2/15/14.
 */

var Barrel = Class.create();
Barrel.prototype = {
  initialize: function (name) {
    // this.monkeyType = 0; // Moved this to Monkey
    this.totalClicks = 0;
  },
  click: function () {
    GameState.addBananas(); // replace with call to instance of gameState
    this.totalClicks++;
  }
};

var Monkey = Class.create();
Monkey.prototype = {
  initialize: function (type, bananas) {
    this.monkeyType = type;
    this.bananasDropped = bananas;
  },
  dropBananas: function () {
    return this.bananasDropped;
  },
  poopCheck: function () {
    return 0; // Does some sort of check to see if poop should be thrown.
  },

};

var GameState = Class.create();
GameState.prototype = {
  initialize: function (PlayerID, bananas, monkeyType, hasWoodPecker) {
    this.PlayerID = PlayerID;               // Unique identifier for game continuation?
    this.bananas = bananas;                 // Banana Counter
    this.monkeyType = monkeyType;           // Type of Monkey in Barrel
    this.hasWoodPecker = hasWoodPecker;     // Will be used for a loop that allows for auto-clicking
  },
  /** BarrelOfMonkeys... or something.
   *      Create a list of Monkey objects.
   *      Pass them monkey type and the number of bananas they drop.
   */
  // BarrelOfMonkeys

  /** addBananas
   *      Check to see if the monkey is going to throw poop, if not, add bananas.
   */
  addBananas: function () {
    if (Monkey.poopCheck()) {
      // Throw Poop!
    } else {
      this.bananas += Monkey.dropBananas();
    }
  },
  /** upgradeMonkey
   *      Increase monkey type, result of player upgrading the monkey.
   */
  upgradeMonkey: function () {
    // Do some sort of check to see if the player can afford and upgrade?
    // Deduct banana cost from players bananas.
    this.monkeyType++;
  },
  /** downgradeMonkey
   *      Decrease monkey type, result of monkey throwing poop or something.
   */
  downgradeMonkey: function () {
    this.monkeyType--;
  }
};