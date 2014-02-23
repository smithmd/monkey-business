<!DOCTYPE html>
<html>
  <head>

  </head>
  <body>
    <div id="monkeys" style="float:right;">
    </div>
    <div id="scoreboard">
      <span id="bCounter">0</span> bananas<br/>
      <span id="bStrength">0</span> beak strength<br/>
      <span id="inBarrel">1</span> of <span id="sBarrel">1</span> monkeys in the barrel<br/>
      <span id=""
    </div>
    <a href="javascript:void(0);" onclick="barrelClick()" id="barrel"><img src="img/barrel.jpg"/></a>

    <div id="upgrades">
      <a href="javascript:void(0);" onclick="addWoodpecker()">Buy a Basic Woodpecker (<span id="wCost">15</span>
        bananas)</a><br/>

      <a href="javascript:void(0);" onclick="addBarrel()">Upgrade the Barrel (50 bananas)</a><br/>
      <a>upgrade 2</a>
    </div>
    <?php include 'include/scripts.inc' ?>
    <script type="application/javascript">
      document.observe("dom:loaded", function () {
        var monkeyList = '<ul>';
        monkeys.each(function (pair) {
          monkeyList += '<li><a href="javascript:void(0);" onclick="addMonkey(\'' + pair.key + '\')">'
              + 'Buy a ' + pair.value.type + " Monkey (" + pair.value.cost + ")" + '</a></li>';
        });
        monkeyList += '</ul>';
        $('monkeys').innerHTML = monkeyList;
      });
    </script>
  </body>
</html>