function transitionToSearch(fbProfile) {
  var id = fbProfile.id;
  var firstName = fbProfile.first_name;
  var lastName = fbProfile.last_name;
  debugger;
  $.ajax({
    type: "GET",
    url: 'http://localhost:3000/api',
    data: { id: id, firstname: firstName, lastname: lastName }
  })
    .done(function( msg ) {
      alert( "Data Saved: " + msg );
    });
}