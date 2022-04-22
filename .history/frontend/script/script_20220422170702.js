"use strict";
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
var slidebutton = "<div class='btn btn-primary col-auto p-1' id='lslide'><i class='bi bi-chevron-left'></i></div>";
var commentbar = "<div class='row mt-5 comment'><div class='input-group input-group-lg'><span class='input-group-text' id='inputGroup-sizing-lg'>Comment</span><input type='text' class='form-control' aria-label='Sizing example input' aria-describedby='inputGroup-sizing-lg'><button class='btn btn-outline-secondary bg-primary text-white' type='button' id='submit'>Submit</button></div></div>";
$(function () {
    $("#appointments").hide();
    $("#events").hide();
    $.ajax({
        type: "GET",
        url: "backend/serviceHandler.php",              // geh zum ServiceHandler -> Funktion Parameter werden überprüft -> 
        cache: false,
        data: { function: "loadAppointments" },         // kein Parameter nötig, da alle Meetings geladen werden
        dataType: "json",
        success: function (response) {
            console.log("success");
            $.each(response, function (i, val) {
                let counter = 1;
                var date = new Date(val["date"]["date"]);
                var month = months[date.getMonth()];
                var day = days[date.getDay()];
                var dayOfMonth = date.getDate();
                var year = date.getFullYear();
                var expiration = val["votingExpirationDate"]["date"].substr(0, 19);
                var begin = val["begin"]["date"].substr(11).substr(0, 8);
                var end = val["end"]["date"].substr(11).substr(0, 8);
                var id = val["optionIDs"];
                $("#events").append("<div class='col-md-2 event' id =" + counter + " + data=" + id + ">" +
                    "<div class='col wrapper'>" +
                    "<h2>" + val["title"] + "</h2>" +
                    "<h4>" + month + "</h4>" +
                    "<h3>" + dayOfMonth + "</h3>" +
                    "<p>" + day + "</p>" +
                    "<p>Begins: " + begin + "</p>" +
                    "<p>Ends: " + end + "</p>" +
                    "<h6><p>Voting ends:</p>" +
                    "<p>" + expiration + "</p></h6>" + 
                    "</div> </div>"
                    );
                    
                    let isexpired = new Date(expiration);
                    var today = new Date();
                    if (isexpired <= today) {
                        $("#" + counter).append("<h5 class = 'mt-3' > abgelaufen! </h5>");
                    }
                    else {
                    }
                    $("#" + counter).addClass("noHover");
                    counter++;
                
            });
        },
        complete: function () {
            $(".erlaubt").on('click', function (e) {
                var self = e.currentTarget;
                $("#events").hide("slide", { direction: "left" }, 1000, function () {
                    console.log(self);
                    var optionIDs_string = self.getAttribute("data");
                    var optionIDs = Array.from(optionIDs_string.split(","));
                    console.log(optionIDs);
                    $.ajax({
                        type: "GET",
                        url: "backend/serviceHandler.php",
                        cache: false,
                        data: { function: "loadOptions", param: optionIDs },    // für die Funktion loadOptions brauchen wir die jeweilige ID des Meetings das wir zuvor angeklickt haben
                        dataType: "json",
                        success: function (response) {
                            console.log("success");
                            console.log(response);
                            $.each(response, function (i, val) {
                                var date = new Date(val["date"]["date"]);
                                console.log("loop");
                                var month = months[date.getMonth()];
                                var day = days[date.getDay()];
                                var dayOfMonth = date.getDate();
                                var year = date.getFullYear();
                                var begin = val["begin"]["date"].substr(11).substr(0, 8);
                                var end = val["end"]["date"].substr(11).substr(0, 8);
                                $("#appointments").append("<div class='col-md'>" +
                                    "<div class='col-md event'>" +
                                    "<div class='col wrapper'>" +
                                    "<h4>" + month + "</h4>" +
                                    "<h3>" + dayOfMonth + "</h3>" +
                                    "<p>" + day + "</p>" +
                                    "<p>Begins: " + begin + "</p>" +
                                    "<p>Ends: " + end + "</p>" +
                                    "</div></div>" +
                                    "<div class='row inputs h-20'>" +
                                    "<div class='col-md'><input class='form-check-input' type='checkbox' value=''></div></div></div>");
                            });
                            $("#appointments").append(slidebutton + commentbar);
                            $("#lslide").on('click', slidebar);
                        },
                        error: function (response) {
                            console.log("failure");
                        }
                    }),
                        setTimeout(function () { return $("#appointments").show("slide", 1000); }, 100);
                });
            });
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
});
var optionNameInput = '<div class="col-md d-flex justify-content-between" style="flex-direction: column">' +
    '<div class="row h-80">' +
    '<div class="col">' +
    '<h2 class="align-self-center">Options</h2>' +
    '</div>' +
    '</div>' +
    '<div class="row inputs h-20 align-self-bottom">' +
    '<div class="col-md">' +
    '<i class="bi bi-person-circle m-1"></i><input type="text" placeholder="Name">' +
    '</div>' +
    '</div>' +
    '</div>';
function slidebar() {
    $("#appointments").hide("slide", { direction: "left" }, 1000, function () {
        $("#appointments").empty().append(optionNameInput);
        $("#events").show("slide", 1000);
    });
}
