

$(function() {

    $("#load").on('click', () => {
        $.ajax({
            type: "GET",
            url: "/backend/serviceHandler.php",
            cache: false,
            data: {method: "loadAppointments"},
            dataType: "text",
            success: function (response) {
                console.log("success");
                //console.log(response);
            },
            error: function(e){
                console.log("failure");
            }
            
        });
    });
    
    
    $("#appointments").hide();
    console.log("hi");

    $("#submit").on('click', () => {
       console.log($("#test").prop("checked"));
    });


    $("#events").on('click', () => $("#events").hide("slide", {direction : "left"}, 1000,function(){
        $("#appointments").show("slide",1000);
    }));


    $("#appointments").on('click', () => $("#appointments").hide("slide", {direction : "left"}, 1000,function(){
        $("#events").show("slide",1000);
    }));



});





function loaddata() {
    $.ajax({
        type: "GET",
        url: "/backend/serviceHandler.php",
        cache: false,
        //data: {method: "loadAppointments"},
        dataType: "json",
        success: function (response) {
            console.log("success");
            console.log(response);
            /*
            $.each(response, (i,val) => { 
                $("#list").append("<li class='list-group-item' data-price=" + val["price"] + "><b>" + val["name"] + "</b> for € <i>" + val["price"] + "</i></li>")
            })
            */
        },
        error: function(e){
            console.log("failure");
        }
        
    });
}