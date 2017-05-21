(function(){
'use strict';

angular.module('ShoppingListCheckOff',[])
.controller("ToBuyController",ToBuyController)
.controller("AlreadyBoughtController", AlreadyBoughtController)
.service("ShoppingListCheckOffService", ShoppingListCheckOffService)

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService){
  var toBuy = this;

  toBuy.items = function(){
    try{
      return ShoppingListCheckOffService.getToBuyItems();
    }
    catch(e)
    {
      toBuy.allBought = "Everything is bought!";
    }
  }

  toBuy.buy = function(itemIndex){
    try {
      ShoppingListCheckOffService.buyItem(itemIndex);
    } catch (e) {

    }
  }
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService){
  var alreadyBought = this;

  alreadyBought.items = function(){
    try {
      var list = ShoppingListCheckOffService.getBoughtItems();
      alreadyBought.nothingBought = null;
      return list;

    } catch (e) {
      alreadyBought.nothingBought = e.message;
    }
  }
}

function ShoppingListCheckOffService(){
  var service = this;

  var toBuyItems = [
    { name: "Cookies", quantity: 5 },
    { name: "Soda" , quantity: 1},
    { name: "Chips" , quantity: 3},
    { name: "Dip" , quantity: 2},
    { name: "Pepto Bismol" , quantity: 4}
  ]

  var boughtItems = [];

  service.getToBuyItems = function(){
    if(toBuyItems.length == 0)
      throw new Error("Everything is bought!");
    else
      return toBuyItems;
  }

  service.getBoughtItems = function(){
    if(boughtItems.length == 0){
      throw new Error("Nothing bought yet.");
    }
    else{
      return boughtItems;
    }
  };

  service.buyItem = function(itemIndex){
    var item = toBuyItems[itemIndex];
    boughtItems.push(item);
    toBuyItems.splice(itemIndex,1);
  }
}

})();
