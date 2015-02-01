
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
    alert( "Data Retrieved: " + msg );
  });

  console.log("AJAX REQUEST SENT TO LOCALHOST:3000");
  populateSearch(profileData); //this needs to be in .done callback
  fadeToSearch();
}



function setIngredientRemoveBinding(ingredientItem){
  var ingredientIcon = ingredientItem.children(".ingredient-item-icon")[0]
  $(ingredientIcon).click(function(){
    this.parentElement.remove()
    //INCLUDE REMOVE ANIMATION HERE *****************************************************************************
  });
}


function setupEventBindings(){
  $(".search-item-icon").click(function(){
    var newIngredient = $(".ingredient-search").val()
    var startString = " <tr class=\"ingredient-item\"><td class=\"ingredient-item-label\"> "
    var endString = " </td><td class=\"ingredient-item-icon\"><div class=\"ingredient-item-icon-image\"></div></td></tr>"
    var newSidebarListItem = startString + newIngredient + endString;
    var x = $(newSidebarListItem).appendTo('.sidebar-table');
    setIngredientRemoveBinding(x)
  });

  
}

function calcSidebarTableHeight(){
  var height = $(".sidebar").height() - $(".search-recipe").height();
  $(".sidebar").css("max-height", height+"px");
  $(".sidebar-table").css("max-height", height+"px");
}

$(document).ready(function() {
  setupEventBindings();
//  calcSidebarTableHeight();
});





