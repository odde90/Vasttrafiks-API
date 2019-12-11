$( document ).ready(function() {
    $("#inputTill").on("keyup", function() {
        var input, filter, ul, li, a, i, txtValue;
            input = document.getElementById('inputTill');
            filter = input.value.toUpperCase();
            ul = document.getElementById("myUL");
            li = ul.getElementsByTagName('li');

        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("a")[0];
            txtValue = a.textContent || a.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
            } else {
            li[i].style.display = "none";
            }
        }
    
    });
    $("#inputFrån").on("keyup", function() {
        var input, filter, ul, li, a, i, txtValue;
            input = document.getElementById('inputFrån');
            filter = input.value.toUpperCase();
            ul = document.getElementById("myUL2");
            li = ul.getElementsByTagName('li');
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("a")[0];
            txtValue = a.textContent || a.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
            } else {
            li[i].style.display = "none";
            }
        }
    });
});
