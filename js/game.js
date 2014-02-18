var gameState = new GameState(0,0,0,0,0,0,0);

function barrelClick() {
  gameState.barrel.click(gameState);
  $('bCounter').innerHTML = gameState.bananas;
}