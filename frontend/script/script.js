"use strict";
$(function () {
    $("#load").on('click', function () {
        $.ajax({
            type: "GET",
            url: "/backend/serviceHandler.php",
            cache: false,
            data: { method: "loadAppointments" },
            dataType: "json",
            success: function (response) {
                console.log("success");
                //console.log(response);
            },
            error: function (e) {
                console.log("failure");
            }
        });
    });
    $("#appointments").hide();
    console.log("hi");
    $("#submit").on('click', function () {
        console.log($("#test").prop("checked"));
    });
    $("#events").on('click', function () { return $("#events").hide("slide", { direction: "left" }, 1000, function () {
        $("#appointments").show("slide", 1000);
    }); });
    $("#appointments").on('click', function () { return $("#appointments").hide("slide", { direction: "left" }, 1000, function () {
        $("#events").show("slide", 1000);
    }); });
});
