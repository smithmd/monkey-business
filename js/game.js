var gameState = new GameState(0,0,0,true,0,0,0);

function barrelClick() {
  gameState.barrel.click(gameState);
  refreshBananas();
}

function addWoodpecker() {
  gameState.enableWoodPecker(100, 100, 15); // pecks the barrel 100 times, once per 100ms
  refreshBeakStrength();
}

function refreshBananas() {
  $('bCounter').innerHTML = gameState.bananas;
}

function refreshBeakStrength() {
  $('bStrength').innerHTML = gameState.beakStrength;
}