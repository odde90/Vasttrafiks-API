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

async function getTrip() {
    var inputFrom = document.getElementById('inputFrån').value;
    var inputTo = document.getElementById('inputTill').value; 
    var timeFrom = document.getElementById('timepicker').value;
    var dateFrom = document.getElementById('datepicker').value;
    var arrivalPicker = document.getElementById('arivalvariblePicker').value;
    //var timeTo = document.getElementById('secondDatepicker').value;
    //var dateTo = document.getElementById('secondTimepicker').value;
   
    if(inputFrom != '' && inputTo != ''){

        if(timeFrom != '' && dateFrom != ''){
            try{
                console.log(true)
                let tripResponse = await ClientsideFetch(inputFrom.toLowerCase(),inputTo.toLowerCase(),timeFrom,dateFrom,arrivalPicker)
            }catch(er){
                console.error(er);
            }
        }else{       
            try{
            var today = new Date();
            var date = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear();
            var time = today.getHours() + ":" + today.getMinutes();
            let tripResponse = await ClientsideFetch(inputFrom.toLowerCase(),inputTo.toLowerCase(),time,date,arrivalPicker)
            }catch(er){
                console.error(er);
            }
        }
    }
}


async function ClientsideFetch(station1,station2,time,date,arrivalPicker){
    var realstation1 = [];
    var realstation2 = [];
    var station1Array = station1.split(", ");
    var station2Array = station2.split(", ");

    station1Array.forEach(parts => {
        var sample = parts.charAt(0).toUpperCase() + parts.slice(1);
        realstation1.push(sample);
    });
    station2Array.forEach(part => {
        var sample2 = part.charAt(0).toUpperCase() + part.slice(1);
        realstation2.push(sample2);
    });

    var finalstation1 = realstation1.join(', ');
    var finalstation2 = realstation2.join(', ');

    const paramsJureny = {
        firstStation: finalstation1,
        secondStation: finalstation2,
        date,
        time,
        arrivalOrdepature: arrivalPicker,
    }

    url = '/clientRequestStops'
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(paramsJureny),
    }
    
    let res = await fetch(url, options)

    if (res.status != 200) {
        throw new Error(response.status + ' ' + response.statusText)
    } else {
        let jurney = await res.json();
        console.log(jurney);
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




