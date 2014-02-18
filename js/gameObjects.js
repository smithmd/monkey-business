/**
 * Created by msmith on 2/15/14.
 */

var Barrel = Class.create();
Barrel.prototype = {
  initialize: function () {
    // this.monkeyType = 0; // Moved this to Monkey
    this.totalClicks = 0;
  },
  click: function (gameState) {
    gameState.addBananas(); // replace with call to instance of gameState
    this.totalClicks++;
  },
  getClicks: function () {
    return this.totalClicks;
  }
};

var Monkey = Class.create();
Monkey.prototype = {
  initialize: function (type, bananas, cost) {
    this.monkeyType = type;
    this.bananasDropped = bananas;
    this.cost = cost;
  },
  dropBananas: function () {
    return this.bananasDropped;
  },
  poopCheck: function () {
    return 0; // Does some sort of check to see if poop should be thrown.
  },
  throwPoop: function () {
    //throw some poop
  }
};

var GameState = Class.create();
GameState.prototype = {
  initialize: function (PlayerID, bananas, monkeyType, hasWoodPecker, beakStrength, levelWoodPecker, barrelType) {
    this.PlayerID = PlayerID;               // Unique identifier for game continuation?
    this.bananas = bananas;                 // Banana Counter
    this.monkeyType = monkeyType;           // Type of Monkey in Barrel
    this.hasWoodPecker = hasWoodPecker;     // Will be used for a loop that allows for auto-clicking
    this.beakStrength = beakStrength;       // This determines how long the beak lasts != to seconds.
    this.levelWoodPecker = levelWoodPecker; // This is the current level of the WoodPecker.
    this.barrelType = barrelType;
    this.barrel = new Barrel();
    this.monkey = new Monkey(0, 1, 0);
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
    if (this.monkey.poopCheck()) {
      this.monkey.throwPoop();
    } else {
      this.bananas += this.monkey.dropBananas();
    }
  },
  /** upgradeMonkey
   *      Increase monkey type, result of player upgrading the monkey.
   */
  upgradeMonkey: function () {
    if (this.spendBananas(Monkey.cost)) {
      this.monkeyType++;
    }
  },
  /** downgradeMonkey
   *      Decrease monkey type, result of monkey throwing poop or something.
   */
  downgradeMonkey: function () {
    if (this.monkeyType > 0) {
      this.monkeyType--;
    }
  },
  /** enableWoodPecker
   *      Turns on the woodpecker, a lower beakStrength means a weaker beak.
   */
  enableWoodPecker: function (beakStrength) {
    var self = this;
    self.hasWoodPecker = true;
    self.beakStrength = beakStrength;
    var WoodPecker = setInterval(
        function () {
          self.barrel.click(self);
          self.beakStrength--;
          if (self.beakStrength === 0) {
            clearInterval(WoodPecker);  // This ends the automatic execution of the Barrel.click function.
            //  Probably some sort of animation should be ended here?
            self.hasWoodPecker = false;
          }
          refreshBananas();
          refreshBeakStrength();
        }, 1000);  // This clicks the barrel every 1000 milliseconds, doesn't need to be in loop.
    //  Probably some sort of animation or something should be turned on here?
  },
  /** buyWoodPecker
   *      Turns on the WoodPecker, automatically gets stronger and more expensive.
   */
  buyWoodPecker: function () {
    if (this.spendBananas(this.levelWoodPecker * 100)) {   // 100 is arbitrary, we'll probably change it.
      this.enableWoodPecker(this.levelWoodPecker * 100);   // 100 is arbitrary, we'll probably change it.
      this.levelWoodPecker++;
    }
  },
  /** spendBananas
   *      Checks to see that the player has enough bananas, then deducts them.
   */
  spendBananas: function (cost) {
    if (cost > this.bananas) {
      return false;
    } else {
      this.bananas -= cost;
      return true;
    }
  },
  /**
   * getBarrel
   * @returns The Barrel object that's currently initialized
   */
  getBarrel: function () {
    return this.getBarrel();
  }
};

function refreshBananas() {
  $('bCounter').innerHTML = gameState.bananas;
}

function refreshBeakStrength() {
  $('bStrength').innerHTML = gameState.beakStrength;
}