
var suggestions = []
var stops = ["Vasaplatsen", "Valand", "Brunsparken", "Censtralstationen","Saxofonvägen"];
$( document ).ready(function() {
  //Hantering för inputFrån
    $("#inputFrån").on("keyup", function() {
        var input = document.getElementById('inputFrån');
        var filter = input.value.toUpperCase();
        var ul = document.getElementById("FromUl");
        if( $("#inputFrån").val() != ''){
            ul.style.display = 'block'
        }else{
            ul.style.display = 'none'
        }
        var bigletter = [];
        stops.forEach(ext => {
            bigletter.push(ext.toUpperCase())
        });
      printFrom(bigletter,filter);
     
    });
    function printFrom(sugs,filter) {
        ul1 = document.getElementById("FromUl");
        ul1.innerText = '';
        sugs.forEach(e => {
            if (e.indexOf(filter) > -1) {
            var  liItem = document.createElement('li');
            var atag = document.createElement('a'); 
             atag.innerText = e;
            liItem.append(atag);
            ul1.append(liItem) 
        
          } 
        });
    }
});

//Input hantering för inputTill
$( document ).ready(function() {
    $("#inputTill").on("keyup", function() {
        var input = document.getElementById('inputTill');
        var filter = input.value.toUpperCase();
        var ul = document.getElementById("toUl");
        if( $("#inputTill").val() != ''){
            ul.style.display = 'block'
        }else{
            ul.style.display = 'none'
        }
        var bigletter = [];
        stops.forEach(ext => {
            bigletter.push(ext.toUpperCase())
        });
      printTo(bigletter,filter);
     
    });
    function printTo(sugs,filter) {
        ul1 = document.getElementById("toUl");
        ul1.innerText = '';
        sugs.forEach(e => {
            if (e.indexOf(filter) > -1) {
            var  liItem = document.createElement('li');
            var atag = document.createElement('a'); 
             atag.innerText = e;
            liItem.append(atag);
            ul1.append(liItem) 
        
          } 
        });
    }
});