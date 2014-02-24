var monkeys = $H();
monkeys.set('wild', new Monkey('Wild', 1, 100, 0, 0));
monkeys.set('jungle', new Monkey('Jungle', 2, 225, 0, 0));
monkeys.set('savannah', new Monkey('Savannah', 4, 500, 0, 0));
monkeys.set('sailor', new Monkey('Sailor', 8, 1125, 0, 0));
monkeys.set('dockworker', new Monkey('Dock Worker', 16, 2500, 0, 0));
monkeys.set('factory', new Monkey('Factory Worker', 32, 6000, 0, 0));
monkeys.set('programmer', new Monkey('Programmer', 64, 15000, 0, 0));
monkeys.set('ceo', new Monkey('CEO', 200, 50000, 0, 0));

// maybe should be an array...
var barrels = $H();
barrels.set('oak', new Barrel(1,1));
barrels.set('reinforced', new Barrel(2,1));
barrels.set('plastic', new Barrel(4, 1.2));
barrels.set('onyx', new Barrel(6, 0.9));
barrels.set('steel', new Barrel(10,0.8));
barrels.set('obsidian', new Barrel(12,0.7));
barrels.set('titanium', new Barrel(15, 0.7));
barrels.set('tungsten', new Barrel(18, 0.5));
barrels.set('adamantium', new Barrel(20, 0.2));