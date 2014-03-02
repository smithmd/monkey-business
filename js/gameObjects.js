/**
 * Created by msmith on 2/15/14.
 */

var Barrel = Class.create();
Barrel.prototype = {
  initialize: function () {
    this.totalClicks = 0;
    this.barrelSize = 1;  // Default Barrel size
    this.inTheBarrel = new Array(new Monkey('Wild', 1, 100, 0, 0));  // create an array of monkeys populated with a basic wild monkey
    //this.inTheBarrel.push(new Monkey('Wild', 10, 10, 0, 0));  // Maybe reference heap [0] somehow?!
    this.inTheBarrel.bananaCount = function () {
      var bCount = 0;
      for(i = 0; i< this.length; i++) {
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
    this.magic = 15;                        // TEMPORARY MAGIC NUMBER TO MAKE WP WORK! WEE!
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
        }, peckSpeed);  // This clicks the barrel every 1000 milliseconds, doesn't need to be in loop.
    //  Probably some sort of animation or something should be turned on here?
  },
  /** buyWoodPecker
   *      Turns on the WoodPecker, automatically gets stronger and more expensive.
   */
  buyWoodPecker: function () {
    if (this.hasWoodPecker) {
      return false;
    } else {
      if (this.spendBananas(this.magic)) {   // magic starts at 15, increases by about 35% every time.
        this.enableWoodPecker(Math.floor(this.magic * 1.1), 100);   // 100 is arbitrary, we'll probably change it.
        this.levelWoodPecker++; // Totally not being used right now, until we make a list of WPs.
        this.magic = Math.floor(this.magic * 1.35);
      }
    }
  },
  /** buyMonkey
   *      Buys a monkey and puts it in the barrel!
   */
  buyMonkey: function (type) {
    if (this.barrel.barrelSize <= this.barrel.inTheBarrel.length) {
      modalWin = new CreateModalPopUpObject();
      var functionArray = new Array (this.replaceMonkey,this.randomMonkey,type);
      modalWin.ShowURL('randMonkey.html',320,470,'Monkey Choice',null,functionArray);
      // this.replaceMonkey(this.randomMonkey(),type);  // Barrel is full!  This will be replaced with some code to randomly pick a monkey to be removed.
    } else if (this.spendBananas(monkeys.get(type).cost)) {
      this.barrel.inTheBarrel.push( Object.clone(monkeys.get(type) ));  // cloning the object before pushing onto the array
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
  randomMonkey: function () {
    this.randOne = 0;
    this.randTwo = 0;
    this.randThree = 0;

    switch(this.barrel.inTheBarrel.length){
      case 3:   // Only three monkeys in the barrel
        this.randThree = 2;
      case 2:   // Only two monkeys in the barrel
        this.randTwo = 1;
      case 1:   // Only one monkey in the barrel
        return [this.randOne, this.randTwo, this.randThree];
        break;
      default:  // Four or more monkeys, pick one out of three!
        while((this.randOne === this.randTwo) || (this.randTwo === this.randThree) || (this.randOne === this.randThree) || (this.randThree === 0)) {
          this.randOne = Math.floor(Math.random()*this.inTheBarrel.length);
          this.randTwo = Math.floor(Math.random()*this.inTheBarrel.length);
          this.randThree = Math.floor(Math.random()*this.inTheBarrel.length);
        }
        return [this.randOne, this.randTwo, this.randThree];
    }
  },
  /** buyBarrel
   *      Buys/Upgrades the barrel size.
   */
  buyBarrel: function (cost) {
    if(this.spendBananas(cost)) {
      this.barrel.barrelSize++; // This will increase by different numbers based on barrel type.
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