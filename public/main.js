

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
        
        $('#datepicker').datepicker({
            uiLibrary: 'bootstrap4'
        })
        $('#timepicker').timepicker({
            uiLibrary: 'bootstrap4'
        })
        $('#secondDatepicker').datepicker({
            uiLibrary: 'bootstrap4'
        })
        $('#secondTimepicker').timepicker({
            uiLibrary: 'bootstrap4'
        })
        $(".button_submit").click(function(){
            var inputFrom = $("#inputFrån").val();
            var inputTo = $("#inputTill").val();
            var datepicker = $("#datepicker").val();
            var timepicker = $("#timepicker").val();
            var secondDatepicker = $("#secondDatepicker").val();
            var secondTimepicker = $("#secondTimepicker").val();

            $('#container1').css({
                "background" : "white",
                "border" : "2px solid gray",
                "border-radius" : "20px"
            })
            
            $('#container2').css({
                "background" : "white",
                "border" : "2px solid gray",
                "border-radius" : "20px"
            })
            $('#container3').css({
                "background" : "white",
                "border" : "2px solid gray",
                "border-radius" : "20px"
            })
            
            $("#container1").append('Du åker från: ',inputFrom,'<br>', 'Datumet:',datepicker,'<br>','Tid:',timepicker);
            $("#container2").append('Du anländer: ',inputTo,'<br>','Datumet:',secondDatepicker,'<br>','Tid:',secondTimepicker)
            $("#container3").append('Stationer i mellan')
          });
            
        
});




