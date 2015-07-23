var ingredientList = [];

function populateSearch(profileData){
  var obj = profileData;
  console.log(obj.dishList);

  for (var i=0; i < obj.dishes; i++) {
    var startString = " <tr class=\"dish-item\"><td class=\"dish-item-label\"> "
    var endString = " </td><td class=\"dish-item-icon\"><div class=\"dish-item-icon-image\"></div></td></tr>"
    var newSidebarListItem = startString + obj.dishList[i].dishName + endString;
    console.log(newSidebarListItem);
    var x = $(newSidebarListItem).appendTo('.dishes-table');
  }
}

function fadeToSearch(){
  $("#splash").fadeOut(1000)
  $("#search").fadeIn(1000, function(){
  })
  // $(".splash").css("background", "#E1E3D7")
}

function transitionToSearch(fbProfile) {
  var id = fbProfile.id;
  var firstName = fbProfile.first_name;
  var lastName = fbProfile.last_name;
  var profileData = { id: id, firstname: firstName, lastname: lastName };

  $.ajax({
    type: "POST",
    url: 'http://localhost:3000/api/v1/user',
    data: profileData
  })
  .done(function( msg ) {
    var recipeFinderUserData = msg


    // Returns a list of dishes if the user had previous logged in already
    // Format:
    // var dishes = {
    //   "dishes": 5,
    //   "dishList": [
    //     { "id": 1,
    //     "dishName": "Buffalo Pulled Chicken Breast"
    //   },
    //     { "id": 2,
    //     "dishName": "Barbeque Chicken"
    //   },
    //     { "id": 3,
    //     "dishName": "Roasted Barbeque Chicken"
    //   },
    //     { "id": 4,
    //     "dishName": "Chicken Tenders"
    //   },
    //     { "id": 5,
    //     "dishName": "Chicken Steak"
    //   }]
    // };
    if (recipeFinderUserData.dishes === 0){
      displayFirstTimeMsg();
    }
    console.log(msg);
  });

  console.log("AJAX REQUEST SENT TO LOCALHOST:3000");
  // populateSearch(profileData); //this needs to be in .done callback
  fadeToSearch();
}

function displayFirstTimeMsg(){
}

function setIngredientRemoveBinding(ingredientItem){
  var ingredientIcon = ingredientItem.children(".ingredient-item-icon")[0]
  $(ingredientIcon).click(function(){
    this.parentElement.remove();
    ingredientList.pop(ingredientIcon.innerHTML);
    //INCLUDE REMOVE ANIMATION HERE *****************************************************************************
  });
}

function addIngredient(){
  var newIngredient = $(".ingredient-search").val();

  if(newIngredient === ''){
    swal({   title: "Error!",   text: "Enter an ingredient!",   type: "error",   confirmButtonText: "Cool" });
  }else{
    ingredientList.push(newIngredient.toLowerCase());
    var startString = " <tr class=\"ingredient-item\"><td class=\"ingredient-item-label\"> "
    var endString = " </td><td class=\"ingredient-item-icon\"><div class=\"ingredient-item-icon-image\"></div></td></tr>"
    var newSidebarListItem = startString + newIngredient + endString;
    var x = $(newSidebarListItem).appendTo('.sidebar-table');
    setIngredientRemoveBinding(x);
    $(".ingredient-search").val('');
  }
}

function setupEventBindings(){
  $(".search-item-icon").click(function(){
    addIngredient();
  });

  $(".ingredient-search").keypress(function (e) {
    var key = e.which;
    if(key == 13)  // the enter key code
    {
      addIngredient();
    }
  });
}

function calcSidebarTableHeight(){
  var height = $(".page").height() - $(".header").height() - $(".search-recipe").height() -50;
  $(".sidebar-table-wrapper").css("height", height+"px");
}

function searchRecipes(){
  $(".search-recipe").click(function(){
    var rButton_anyOrAll = 1;
    var ingredientSearch = { ingredients: ingredientList, anyOrAll: rButton_anyOrAll};
    $.ajax({
      type: "POST",
      url: 'http://localhost:3000/api/v1/searchRecipes',
      dataType: 'json',
      data: ingredientSearch
    }).done(function(msg) {
      var newRecipes = msg;

      // The return message from backend is 0 (check of number of dishes done in backend)
      if (newRecipes == 0) {
        swal({   title: "Error!",   text: "Sorry, there are no recipes!",   type: "error",   confirmButtonText: "Okay" });
      } else {
        $(".content").replaceWith(''); //clear "Enter your ingredients and find a recipe!"
        populateSearch(newRecipes);
      }
    });
  });
}

$(document).ready(function() {
  setupEventBindings();
  calcSidebarTableHeight();
  searchRecipes();
});

