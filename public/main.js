var suggestions = []
var stops = [];

async function initLocation() {
    try {
        let response = await makeRequest();
    } catch (er) {
        console.error(er);
    }
}

initLocation();

async function makeRequest() {     
    url = '/init';
    let res = await fetch(url)
    if (res.status != 200) {
        throw new Error(response.status + ' ' + response.statusText)
    } else {
        let dataStop = await res.json();
       /// console.log(dataStop)
        dataStop.forEach(stop => {
            stops.push(stop);
        });
    }
}


$( document ).ready(function() {
  //Hantering för inputFrån
    $("#inputFrån").on("keyup", function() {
        var input = document.getElementById('inputFrån');
        var filter = input.value.toUpperCase();
        var ul = document.getElementById("FromUl");

        if( $("#inputFrån").val() != '' ){
                $(document).on('keypress',function(e) {
                    if(e.which == 13) {
                        ul.style.display = 'none'
                    }else{
                        $("#inputFrån").on("keydown", function() {

                            ul.style.display = 'block'
                        });
                    }
                });
    
                $(document).on("click","#FromUl",function() {
                    ul.style.display = 'none'
                });
        } 
         else{
            ul.style.display = 'none'
        } 
        var bigletter = [];
        const filteredStops = {};
      
        stops.forEach(stop => {
            filteredStops[stop._attributes.name.toUpperCase()] = stop._attributes.weight
        })
        
        for (const name in filteredStops) {
            var stop = {
              name,
              weigth: filteredStops[name]
            }
            bigletter.push(stop)
        }
        printFrom(bigletter, filter);

    });
    function printFrom(sugs,filter) {
        var finsihsingalex = [];
        ul1 = document.getElementById("FromUl");
        var input = document.getElementById('inputFrån');
        ul1.innerText = '';
        var counter = 0;
        sugs.forEach(e => {
            if (e.name.indexOf(filter) > -1 && counter < 6 ) {
                counter++
            finsihsingalex.push(e.name);
            var  liItem = document.createElement('li');
            var atag = document.createElement('a'); 
            liItem.addEventListener("click", function() {
              inputFrom = document.getElementById('inputFrån');
              inputFrom.value = e.name;
            });
            atag.innerText = e.name;
            liItem.append(atag);
            ul1.append(liItem) 
          } 
        });
        input.addEventListener("keydown", function (e) {
            
            if (e.keyCode === 13) { 
                ul1 = document.getElementById("FromUl");
                var inputFrom = document.getElementById('inputFrån');
                inputFrom.value =  finsihsingalex[0]
                //ul1.style.display = 'none'
                ul1.innerText = '';
                ul1.style.display = null;
                
            }
        });
    }
    //Input hantering för inputTill
    
        $("#inputTill").on("keyup", function() {
            var input = document.getElementById('inputTill');
            var filter = input.value.toUpperCase();
            var ul = document.getElementById("toUl");

            if( $("#inputTill").val() != '' ){
                $(document).on('keypress',function(e) {
                    if(e.which == 13) {
                        ul.style.display = 'none'
                    }else{
                        $("#inputTill").on("keydown", function() {

                            ul.style.display = 'block'
                        });
                    }
                });
    
                $(document).on("click","#FromUl",function() {
                    ul.style.display = 'none'
                });
            }

            else{
                ul.style.display = 'none'
            } 

            var tobigletter = [];
            const tofilteredStops = {};
          
            stops.forEach(stop => {
                tofilteredStops[stop._attributes.name.toUpperCase()] = stop._attributes.weight
            })
            
            for (const name in tofilteredStops) {
                var stop = {
                  name,
                  weigth: tofilteredStops[name]
                }
                tobigletter.push(stop)
            }

      
          printTo(tobigletter,filter);
         
        });
        function printTo(sugs,filter) {
        
            var finsihsingalex = [];
            ul1 = document.getElementById("toUl");
            var input = document.getElementById('inputTill');
            ul1.innerText = '';
            var tocounter =  0;
            sugs.forEach(e => {

                if (e.name.indexOf(filter) > -1 && tocounter < 6) {
                    tocounter++
                    finsihsingalex.push(e.name);
                var  liItem = document.createElement('li');
                var atag = document.createElement('a'); 
                liItem.addEventListener("click", function() {
                  inputFrom = document.getElementById('inputTill');
                  inputFrom.value = e.name;
                });
                atag.innerText = e.name;
                liItem.append(atag);
                ul1.append(liItem) 
              } 
            });
            input.addEventListener("keydown", function (e) {
                
                if (e.keyCode === 13) {  
                  
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




