

$(function() {
    $("#appointments").hide();
    console.log("hi");

    $("#submit").on('click', () => {
       console.log($("#test").prop("checked"));
        //loaddata(Number($(".form-check-input").val()));
    });


    $("#events").on('click', () => $("#events").hide("slide", {direction : "left"}, 1000,function(){
        $("#appointments").show("slide",1000);
    }));


    $("#appointments").on('click', () => $("#appointments").hide("slide", {direction : "left"}, 1000,function(){
        $("#events").show("slide",1000);
    }));



});





function loaddata(id : number) {

    $.ajax({
        type: "GET",
        url: "../serviceHandler.php",
        cache: false,
        data: {method: "queryPersonByName", param: id},
        dataType: "json",
        success: function (response) {
            
            $("#noOfentries").val(response.length);
            $("#searchResult").show(1000).delay(1000).hide(1000);
        }
        
    });
}