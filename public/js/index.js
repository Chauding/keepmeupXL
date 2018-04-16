var Index = function() {};
Index.load = function(){
  $(".ui.search").removeClass('lab-hidden');
      $('.ui.dropdown').dropdown();
      $(".header-search .prompt").keyup(function(event){
        if (event.keyCode === 13) {
          var requestData = {
            search: $(".header-search .prompt").val()
          }
          $.ajax({
                 url: "/",
                 method: "POST",
                 data: requestData,
                 success: function(response) {
                   $('#twitterColumn').empty();
                   $('#twitterColumn').html(response);
                },
                error: function(data) {
                  console.log('NO');
                },
          })
          // calls the funciton below
          // Index.newRender();
        }
      });
}
Index.register = function (){
    $(".ui.search").addClass('lab-hidden');
    $('.ui.dropdown').dropdown();
}
Index.newRender = function () {
  // takes the value inside the serach bar
  var searchTerm = $(".header-search .prompt").val();
  //puts the value above and sets it to be a variable in the url
   window.location.href = 'http://localhost:8080/?q=' + searchTerm;
}
