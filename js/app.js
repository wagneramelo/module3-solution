(function() {
"use strict";

angular
.module("NarrowItDownApp", [])
.controller("NarrowItDownController",['MenuSearchService',NarrowItDownController])
.service("MenuSearchService",['$http',MenuSearchService])
.directive("foundItems",FoundItemsDirective);

function FoundItemsDirective()
 {
     var ddo = {
         templateUrl: 'foundItemsTemplate.html',
         scope: {
             items: '<',
             onRemove: '&'
         },
         controller: FoundItemsDirectiveController,
         controllerAs: 'list',
         bindToController: true
     }

     return ddo;
 }

 function FoundItemsDirectiveController() {
  var list = this;
 }

function NarrowItDownController(MenuSearchService){
	var ctrl = this;

	ctrl.getMenuItems = function(searchTerm){
		MenuSearchService.getMatchedMenuItems(searchTerm)
		.then(function(result){
			ctrl.found = result;
		});
	}

	ctrl.removeItem = function(index){
		ctrl.found.splice(index,1);
	}

}


function MenuSearchService($http) {
    var service = this;

    service.getMatchedMenuItems = function(searchTerm) {
        return $http({
            method: 'GET',
            url: "https://davids-restaurant.herokuapp.com/menu_items.json"
        })
        .then(function(result) {
            var items = result.data.menu_items;
            var foundItems = [];

            if (!searchTerm)
                return foundItems;

            for (var i=0; i < items.length; i++)
            {
                if (items[i].description.toLowerCase().indexOf(searchTerm) !== -1)
                {
                    foundItems.push(items[i]);
                }
            }
            return foundItems;
        })
        .catch(function(error) {
            return error.data;
        });
    };
}
        

})();


