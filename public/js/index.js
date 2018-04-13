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
                 url: "http://localhost:8080/",
                 method: "POST",
                 dataType:"json",
                 data: requestData,
                 success: function(results) {
                  console.log(this.data);
                  location.reload();
                },
                error: function(results) {
                  console.log('NO' + results);
                },
          })
          // Index.newRender();
        }
      });
}
Index.register = function (){
    $(".ui.search").addClass('lab-hidden');
}
Index.newRender = function () {
  var searchTerm = $(".header-search .prompt").val();
   window.location.href = 'http://localhost:8080/?q=' + searchTerm;
}
