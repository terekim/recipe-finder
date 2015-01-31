
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
  // $.ajax({
  //   type: "GET",
  //   url: 'http://localhost:3000/api',
  //   data: profileData
  // })
  // .done(function( msg ) {
  //   var recipeFinderUserData = msg
  //   alert( "Data Retrieved: " + msg );
  // });
  console.log("AJAX REQUEST SENT TO LOCALHOST:3000");
  populateSearch(profileData); //this needs to be in .done callback
  fadeToSearch();
}


function setupEventBindings(){
  $(".sidebar-item-icon").click(function(){
    var newIngredient = $(".ingredient-search").val()
    var startString = " <tr class=\"sidebar-item\"><td class=\"sidebar-item-label\"> "
    var endString = " </td><td class=\"sidebar-item-icon\"><div class=\"sidebar-item-icon-remove-image\"></div></td></tr>"
    var newSidebarListItem = startString + newIngredient + endString;
    $(newSidebarListItem).appendTo('.sidebar-table');
  });
}


$(document).ready(function() {
  setupEventBindings();
});





