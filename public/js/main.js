
function populateSearch(profileData){

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
    url: 'http://localhost:3000/api/user',
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
  populateSearch(profileData); //this needs to be in .done callback
  fadeToSearch();
}

function displayFirstTimeMsg(){
  
}

function setIngredientRemoveBinding(ingredientItem){
  var ingredientIcon = ingredientItem.children(".ingredient-item-icon")[0]
  $(ingredientIcon).click(function(){
    this.parentElement.remove()
    //INCLUDE REMOVE ANIMATION HERE *****************************************************************************
  });
}

function searchRecipe(){
  var newIngredient = $(".ingredient-search").val()
  if(newIngredient === ''){
    swal({   title: "Error!",   text: "Enter an ingredient!",   type: "error",   confirmButtonText: "Cool" });
  }
  else{
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
    searchRecipe();
  });

  $(".ingredient-search").keypress(function (e) {
    var key = e.which;
    if(key == 13)  // the enter key code
    {
      searchRecipe();
    }
  });   
}

function calcSidebarTableHeight(){
  var height = $(".page").height() - $(".header").height() - $(".search-recipe").height() -50;
  $(".sidebar-table-wrapper").css("height", height+"px");
}

$(document).ready(function() {
  setupEventBindings();
  calcSidebarTableHeight();
});





