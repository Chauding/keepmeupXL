var Index = function() {};
Index.load = function(){
      $('.ui.dropdown').dropdown();
      $(".header-search .prompt").keyup(function(event){
        if (event.keyCode === 13) {
          $.ajax({
                 url: "http://localhost:8080/",
                 method: "POST",
                 dataType:"json",
                 data: $(".header-search .prompt").val(),
                 success: function(results) {
                  console.log('Yay' + results);
                  conole.log(this.data);
                },
                error: function(results) {
                  console.log('NO' + results);
                },
          })
        }
      });
}
