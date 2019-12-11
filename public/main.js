
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
        var finsihsingalex = [];
        ul1 = document.getElementById("FromUl");
        var input = document.getElementById('inputFrån');
        ul1.innerText = '';
        sugs.forEach(e => {
            if (e.indexOf(filter) > -1) {
                finsihsingalex.push(e);
            var  liItem = document.createElement('li');
            var atag = document.createElement('a'); 
            liItem.addEventListener("click", function() {
              inputFrom = document.getElementById('inputFrån');
              inputFrom.value = e;
            });
            atag.innerText = e;
            liItem.append(atag);
            ul1.append(liItem) 
          } 
        });
        input.addEventListener("keydown", function (e) {
            
            if (e.keyCode === 13) { 
                ul1 = document.getElementById("FromUl");
                var inputFrom = document.getElementById('inputFrån');
                inputFrom.value =  finsihsingalex[0]
                ul1.style.display = 'none'
                ul1.innerText = '';
            }
        });
    }
    //Input hantering för inputTill
    
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
        
            var finsihsingalex = [];
            ul1 = document.getElementById("toUl");
            var input = document.getElementById('inputTill');
            ul1.innerText = '';
            sugs.forEach(e => {
                if (e.indexOf(filter) > -1) {
                    finsihsingalex.push(e);
                var  liItem = document.createElement('li');
                var atag = document.createElement('a'); 
                liItem.addEventListener("click", function() {
                  inputFrom = document.getElementById('inputTill');
                  inputFrom.value = e;
                });
                atag.innerText = e;
                liItem.append(atag);
                ul1.append(liItem) 
              } 
            });
            input.addEventListener("keydown", function (e) {
                
                if (e.keyCode === 13) { 
                    console.log(finsihsingalex[0])
                    var inputFrom = document.getElementById('inputTill');
                    inputFrom.value =  finsihsingalex[0]
                   
                }
            });
        }
});




