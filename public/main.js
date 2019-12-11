
$( document ).ready(function() {
    $("#inputTill").on("keyup", function() {
        var value = this.value.toLowerCase().trim();
        $("#lista1 p").show().filter(function() {
          return $(this).text().toLowerCase().trim().indexOf(value) == -1;
        }).hide();
    });
    $("#inputFrån").on("keyup", function() {
        var value = this.value.toLowerCase().trim();
        $("#lista2 p").show().filter(function() {
          return $(this).text().toLowerCase().trim().indexOf(value) == -1;
        }).hide();
      });
});