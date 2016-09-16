/**
 * Created by msmith on 3/9/14.
 */


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
    this.barrel = barrels[barrelType];
    this.monkey = new Monkey(0, 1, 0);
    this.magic = 15;                        // TEMPORARY MAGIC NUMBER TO MAKE WP WORK! WEE!
    this.barrels = [barrels[barrelType]];
  },
  /** saveState
   *    Saves the game state to html5 storage
   */
  saveState: function() {

  },
  /** loadState
   *
   */
  loadState: function () {

  },
  /** addBananas
   *      Check to see if the monkey is going to throw poop, if not, add bananas.
   */
  addBananas: function (bananas) {
    if (this.monkey.poopCheck()) {
      this.monkey.throwPoop();
    } else {
      this.bananas += bananas;
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
  enableWoodPecker: function (beakStrength, peckSpeed) {
    // save a temporary reference to 'this' object
    var self = this;
    self.hasWoodPecker = true;
    self.beakStrength = beakStrength;
    var originalBeakStrength = self.beakStrength;
    var WoodPecker = setInterval(
        function () {
          self.barrel.click(self);
          self.beakStrength--;

          // update percentage bar
          var beakStrengthBar = document.getElementById('beakStrengthBar');
          var percentage = (self.beakStrength / originalBeakStrength) * 100;
          beakStrengthBar.style.width = percentage + '%';

          if (self.beakStrength === 0) {
            beakStrengthBar.style.width = '0';
            clearInterval(WoodPecker);  // This ends the automatic execution of the Barrel.click function.
            //  Probably some sort of animation should be ended here?
            self.hasWoodPecker = false;
          }
          refreshBananas();
        }, peckSpeed);  // This clicks the barrel every 1000 milliseconds, doesn't need to be in loop.
    //  Probably some sort of animation or something should be turned on here?
  },
  /** buyWoodPecker
   *      Turns on the WoodPecker, automatically gets stronger and more expensive.
   */
  buyWoodPecker: function () {
    var self = this;
    if (this.hasWoodPecker) {
      return false;
    } else {
      if (self.spendBananas(this.magic)) {   // magic starts at 15, increases by about 35% every time.
        document.getElementById('beakStrengthBar').style.width = '100%';
        self.enableWoodPecker(Math.floor(this.magic * 1.1), 500);   // 500 is arbitrary, we'll probably change it.
        self.levelWoodPecker++; // Totally not being used right now, until we make a list of WPs.
        self.magic = Math.floor(this.magic * 1.35);
      }
    }
  },
  /** buyMonkey
   *      Buys a monkey and puts it in the barrel!
   */
  buyMonkey: function (type) {
    if (this.barrel.barrelSize <= this.barrel.inTheBarrel.length) {
      this.replaceMonkey(this.randomMonkey(), type);  // Barrel is full!  This will be replaced with some code to randomly pick a monkey to be removed.
    } else if (this.spendBananas(monkeys.get(type).cost)) {
      this.barrel.inTheBarrel.push(Object.clone(monkeys.get(type)));  // cloning the object before pushing onto the array
    } else {
      return false;
    }
  },
  /** replaceMonkey
   *      Replaces a monkey in the barrel, adds stolen bananas to players bananas.
   */
  replaceMonkey: function (index, type) {
    if (this.spendBananas(monkeys.get(type).cost)) {
      this.bananas += this.barrel.inTheBarrel[index].stolenBananas();
      this.barrel.inTheBarrel[index] = Object.clone(monkeys.get(type));  // cloning the object before pushing onto the array
    }
  },
  removeMonkey: function (index) {
    // can't remove last monkey from barrel
    if (this.barrel.inTheBarrel.length > 1) {
      var removedMonkey = this.barrel.inTheBarrel.splice(index, 1);
    }
  },
  randomMonkey: function () {
    // get a random monkey's index
    return Math.floor((Math.random()*this.barrel.inTheBarrel.length));
  },
  /** buyBarrel
   *      Buys/Upgrades the barrel size.
   */
  buyBarrel: function (cost) {
    if (this.spendBananas(cost)) {
      var b = new Barrel.apply(this, barrel_properties[0]);
      this.barrels.push(b);
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
   * upgradeBarrel
   *    Upgrades the user's barrel, unless they have the highest barrel
   */
  upgradeBarrel: function () {
    if(this.barrelType < barrels.length-1) {
      var itb = this.barrel.inTheBarrel;
      this.barrelType++;
      this.barrel = barrels[this.barrelType];
      this.barrel.inTheBarrel = itb;
    }
  }
};