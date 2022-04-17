"use strict";
$(function () {
    $("#appointments").hide();
    $("#events").hide();
    $.ajax({
        type: "GET",
        url: "backend/serviceHandler.php",
        cache: false,
        data: { method: "loadAppointments" },
        dataType: "json",
        success: function (response) {
            var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            var days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
            console.log("success");
            console.log(response);
            $.each(response, function (i, val) {
                var date = new Date(val["date"]["date"]);
                var month = months[date.getMonth()];
                var day = days[date.getDay()];
                var dayOfMonth = date.getDate();
                var year = date.getFullYear();
                var expiration = val["votingExpirationDate"]["date"].substr(0, 19);
                var begin = val["begin"]["date"].substr(11).substr(0, 8);
                var end = val["end"]["date"].substr(11).substr(0, 8);
                //console.log(expiration);
                $("#events").append("<div class='col-md-2 event'>" +
                    "<div class='col wrapper'>" +
                    "<h2>" + val["title"] + "</h2>" +
                    "<h4>" + month + "</h4>" +
                    "<h3>" + dayOfMonth + "</h3>" +
                    "<p>" + day + "</p>" +
                    "<p>Begins: " + begin + "</p>" +
                    "<p>Ends: " + end + "</p>" +
                    "<h6><p>Voting ends:</p>" +
                    "<p>" + expiration + "</p></h6>" +
                    "</div></div>");
            });
        },
        complete: function () {
            $("#events").show("slide", 1000);
        },
        error: function (e) {
            console.log("failure");
        }
    });
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
