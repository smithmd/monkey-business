var gameState = new GameState(0, 0, 0, false, 0, 1, 0);

function barrelClick() {
  gameState.barrel.click(gameState);
  refreshBananas();
  refreshBarrel();
}

function addWoodpecker() {
  //gameState.enableWoodPecker(100, 100, 15); // pecks the barrel 100 times, once per 100ms
  gameState.buyWoodPecker();
  refreshBeakStrength();
  refreshWoodPeckerCost();
}

function addMonkey(type) {
  gameState.buyMonkey(type);  // Eventually we'll pass the monkey type and get cost/etc from that
  refreshBananas();
  refreshBarrel();
}

function addBarrel() {
  gameState.buyBarrel(50);  // Eventually we'll pass the barrel type and get cost/etc from that
  refreshBananas();
  refreshBarrel();
}

function refreshBananas() {
  $('bCounter').innerHTML = gameState.bananas;
}

function refreshBeakStrength() {
  $('bStrength').innerHTML = gameState.beakStrength;
}

function refreshWoodPeckerCost() {
  $('wCost').innerHTML = gameState.magic;
}

function refreshBarrel() {
  $('sBarrel').innerHTML = gameState.barrel.barrelSize;
  $('inBarrel').innerHTML = gameState.barrel.inTheBarrel.length;
}