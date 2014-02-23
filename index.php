<!DOCTYPE html>
<html>
  <head>

  </head>
  <body>
    <div id="scoreboard">
      <span id="bCounter">0</span> bananas<br/>
      <span id="bStrength">0</span> beak strength<br/>
      <span id="inBarrel">1</span> of <span id="sBarrel">1</span> monkeys in the barrel<br/>
    </div>
    <a href="javascript:void(0);" onclick="barrelClick()" id="barrel"><img src="img/barrel.jpg"/></a>

    <div id="upgrades">
      <a href="javascript:void(0);" onclick="addWoodpecker()">Buy a Basic Woodpecker (<span id="wCost">15</span>
        bananas)</a><br/>
      <a href="javascript:void(0);" onclick="addMonkey()">Buy a Wild Monkey (10 bananas)</a><br/>
      <a href="javascript:void(0);" onclick="addBarrel(50)">Buy a Wild Monkey (50 bananas)</a><br/>
      <a>upgrade 2</a>
    </div>
    <div id="monkeys">
    </div>
    <?php include 'include/scripts.inc' ?>
    <script type="application/javascript">
      document.observe("dom:loaded", function () {
        var monkeyList = '<ul>';
        monkeys.each(function (pair) {
          monkeyList += '<li>' + pair.value.type + " (" + pair.value.cost + ")" + '</li>';
        });
        monkeyList += '</ul>';
        $('monkeys').innerHTML = monkeyList;
      });
    </script>
  </body>
</html>