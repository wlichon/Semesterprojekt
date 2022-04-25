var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

const slidebutton = "<div class='btn btn-primary col-auto p-1' id='lslide'><i class='bi bi-chevron-left'></i></div>";
const commentbar = "<div class='row mt-5 comment'><div class='input-group input-group-lg'><span class='input-group-text' id='inputGroup-sizing-lg'>Comment</span><input type='text' name='check_list[]' class='form-control' aria-label='Sizing example input' aria-describedby='inputGroup-sizing-lg'><button class='btn btn-outline-secondary bg-primary text-white' type='submit' name='submitnamecommentcheckbox'>Submit</button></div></div>"

$(function() {
    $("#appointments").hide();
    $("#events").hide();
    $("#createappointmentform").hide();

   $.ajax({
        type: "GET",
        url: "backend/serviceHandler.php",  // geh zum ServiceHandler -> Funktion Parameter werden überprüft -> 
        cache: false,
        data: {function: "loadAppointments"},   // kein Parameter nötig, da alle Meetings geladen werden
        dataType: "json",
        success: function (response) {
        // bei sucess liefert loadAppointments ein Array mit den ganzen Appointments in dem Format:
        //  Appointment("25-06-2027", "Meeting4", "22-05-2025 19:30:00", "18:00", "18:30", [2, 3]) also:
        // Appointment("Tag-Monat-Jahr", "MeetingNummer", "ExpirationDate", "UhrzeitBeginn", "Uhrzeitende", "OptionsID");
        // Appointment ($date,$title,$votingExpirationDate,$begin,$end,$optionIDs)3222
            console.log("success");
            console.log(response);
            $.each(response, (i : number,val) => { 
                let counter = 1;
                //console.log(val[2]);
                var date = new Date(val["date"]["date"]);
                var month = months[date.getMonth()];
                var day = days[date.getDay()];
                var dayOfMonth = date.getDate();
                var year = date.getFullYear();
                var expiration = val["votingExpirationDate"]["date"].substr(0, 19);
                var begin = val["begin"]["date"].substr(11).substr(0, 8);
                var end = val["end"]["date"].substr(11).substr(0, 8);
                var id = val["id"];               

                
                $("#events").append("<div class='col-md-2 event' id ='option" + i + "' + data=" + id + ">" +
                    "<div class='col wrapper'>" +
                    "<h2>" + val["title"] + "</h2>" +
                    "<h6><p>Voting ends:</p>" +
                    "<p>" + expiration + "</p></h6>" + 
                    "</div> </div>"
                    );


                let isexpired = new Date(expiration);
                var today = new Date();
                if (isexpired <= today) {
                    $("#option" + i).append("<h5 class = 'mt-3' > abgelaufen! </h5>");
                    $("#option" + i).attr("class", "col-md-2 noevent");
                }

                counter++;
            
            
            })},

                
                
        complete: function () {
            $(".event").on('click', e =>{
            var self = e.currentTarget;         // Element was das Klick getriggert hat
            $("#events").hide("slide", {direction : "left"}, 1000, () =>{
                console.log(self);
                var appointmentID = self.getAttribute("data")!;
                console.log(appointmentID);
                $.ajax({
                    type: "GET",
                    url: "backend/serviceHandler.php",
                    cache: false,
                    data: {function: "loadOptions",param: appointmentID},   // für die Funktion loadOptions brauchen wir die jeweilige ID des Meetings das wir zuvor angeklickt haben
                    dataType: "json",
                    success: function (response) {
                        console.log("success")
                        $.each(response, (i: number,val) =>{
                            var date = new Date(val["date"]["date"]);
                            console.log("loop");
                            var month = months[date.getMonth()];
                            var day = days[date.getDay()];
                            var dayOfMonth = date.getDate();
                            var year = date.getFullYear();
                            var begin = val["begin"]["date"].substr(11).substr(0,8);
                            var end = val["end"]["date"].substr(11).substr(0,8);

                            $("#appointments").append(
                                "<div class='col-md'>" +
                                "<div class='col-md event'>" +
                                "<div class='col wrapper'>" +
                                "<h4>" + month + "</h4>" +
                                "<h3>"+ dayOfMonth +"</h3>" + 
                                "<p>" + day + "</p>" +
                                "<p>Begins: " + begin + "</p>" +
                                "<p>Ends: " + end + "</p>" +
                                "</div></div>" +
                                "<div class='row inputs h-20'>" +
                                "<div class='col-md'><input class='form-check-input' type='checkbox' name = 'check_list[]' value='termin" + i + "'" +  "></div></div></div>"
                            )
                            
                        
                        })
                            
                        $("#appointments").append(slidebutton + commentbar);
                        $("#lslide").on('click', slidebar)
                    },
                    error: function (response){
                        console.log("failure")
                    }
                }),
                setTimeout(() => $("#appointments").show("slide",1000),100);
                })


            })
            $("#events").show("slide",1000);

            
        },
               
        error: function(e){
            console.log("failure");
        }
        

        
        
    });
    
    console.log("hi");

    $("#submit").on('click', () => {
       console.log($("#test").prop("checked"));
    });


    // Create an appointment
    $("#createappointment").on("click", function() {
        $("#appointments").hide("slide", 1000);
        $("#events").hide("slide", 1000);
        $("#createappointmentform").show("slide", 1000);
    })

    var frm = $('#createappointmentform');
    frm.submit(function (e) {
        e.preventDefault();
        $("createappointment").show();
        var date = $("#date").val();
        var meetingID = $("#meetingid").val();
        var title = $("#title").val();
        var votingExpirationDate = $("#votingExpirationDate").val();
        var begin = $("#begin").val();
        var end = $("#end").val();
        var terminoption1begin = $("#terminoption1begin").val();
        var terminoption1end = $("#terminoption1end").val();
        var terminoption2begin = $("#terminoption2begin").val();
        var terminoption2end = $("#terminoption2end").val();

        console.log(date, meetingID, title, votingExpirationDate, begin, end, terminoption1begin, terminoption1end, terminoption2begin, terminoption2end);
        $.ajax({
            type: "GET",
            url: "backend/serviceHandler.php",
            data: {function: "createAppointmentWithOptions", param1: date,
            param2: meetingID, param3: title, param4: votingExpirationDate, param5: begin, param6: end, param7: terminoption1begin, 
            param8: terminoption1end, param9: terminoption2begin, param10: terminoption2end},
            
            success: function (data) {                          // success und error sind vertauscht -> bei Fehler und keiner Eintragung kommt Success
                alert("Diese MeetingID ist leider schon vergeben! Bitte wählen Sie eine andere MeetingID.");
            },

            error: function (data) {
                $("#createappointmentform").hide("slide", 1000);
                $("#events").empty();
                var button = "<div class='col-md-3 d-flex justify-content-between' style='flex-direction: column'> <div class='col'> <h2 class='align-self-center'>Appointments</h2><p class=''>Click a meeting to vote for another date</p> </div><button class = 'btn-primary btn-lg' id = 'createappointment'> Click here to create an appointment</button></div></div>"
                $('#events').append(button);
                $.ajax({
                    type: "GET",
                    url: "backend/serviceHandler.php",  // geh zum ServiceHandler -> Funktion Parameter werden überprüft -> 
                    cache: false,
                    data: {function: "loadAppointments"},   // kein Parameter nötig, da alle Meetings geladen werden
                    dataType: "json",
                    success: function (response) {
                        console.log("success2222");
                        console.log(response);
                        
                        $.each(response, (i : number,val) => { 
                            let counter = 1;
                            //console.log(val[2]);
                            var date = new Date(val["date"]["date"]);
                            var month = months[date.getMonth()];
                            var day = days[date.getDay()];
                            var dayOfMonth = date.getDate();
                            var year = date.getFullYear();
                            var expiration = val["votingExpirationDate"]["date"].substr(0, 19);
                            var begin = val["begin"]["date"].substr(11).substr(0, 8);
                            var end = val["end"]["date"].substr(11).substr(0, 8);
                            var id = val["id"];               
            
                            
                            $("#events").append("<div class='col-md-2 event' id ='option" + i + "' + data=" + id + ">" +
                                "<div class='col wrapper'>" +
                                "<h2>" + val["title"] + "</h2>" +
                                "<h6><p>Voting ends:</p>" +
                                "<p>" + expiration + "</p></h6>" + 
                                "</div> </div>"
                                );
            
            
                            let isexpired = new Date(expiration);
                            var today = new Date();
                            if (isexpired <= today) {
                                $("#option" + i).append("<h5 class = 'mt-3' > abgelaufen! </h5>");
                                $("#option" + i).attr("class", "col-md-2 noevent");
                            }

                            counter++;
                            
                        })},
                    
                    complete: function () {
                                $(".event").on('click', e =>{
                                var self = e.currentTarget;         // Element was das Klick getriggert hat
                                $("#events").hide("slide", {direction : "left"}, 1000, () =>{
                                    console.log(self);
                                    var appointmentID = self.getAttribute("data")!;
                                    console.log(appointmentID);
                                    $.ajax({
                                        type: "GET",
                                        url: "backend/serviceHandler.php",
                                        cache: false,
                                        data: {function: "loadOptions",param: appointmentID},   // für die Funktion loadOptions brauchen wir die jeweilige ID des Meetings das wir zuvor angeklickt haben
                                        dataType: "json",
                                        success: function (response) {
                                            console.log("success")
                                            $.each(response, (i: number,val) =>{
                                                var date = new Date(val["date"]["date"]);
                                                console.log("loop");
                                                var month = months[date.getMonth()];
                                                var day = days[date.getDay()];
                                                var dayOfMonth = date.getDate();
                                                var year = date.getFullYear();
                                                var begin = val["begin"]["date"].substr(11).substr(0,8);
                                                var end = val["end"]["date"].substr(11).substr(0,8);
                    
                                                $("#appointments").append(
                                                    "<div class='col-md'>" +
                                                    "<div class='col-md event'>" +
                                                    "<div class='col wrapper'>" +
                                                    "<h4>" + month + "</h4>" +
                                                    "<h3>"+ dayOfMonth +"</h3>" + 
                                                    "<p>" + day + "</p>" +
                                                    "<p>Begins: " + begin + "</p>" +
                                                    "<p>Ends: " + end + "</p>" +
                                                    "</div></div>" +
                                                    "<div class='row inputs h-20'>" +
                                                    "<div class='col-md'><input class='form-check-input' type='checkbox' name = 'check_list[]' value='termin" + i + "'" +  "></div></div></div>"
                                                )
                                                
                                            
                                            })
                                                
                                            $("#appointments").append(slidebutton + commentbar);
                                            $("#lslide").on('click', slidebar)
                                        },

                                        error: function (response){
                                            console.log("failure")
                                        }
                                    }),
                                    setTimeout(() => $("#appointments").show("slide",1000),100);
                                    })
                    
                                })
                                $("#events").show("slide",1000);
                                    
                    },           
                    
                    error: function(e){
                        console.log("failure");
                    },     
                })}         // richtig
            });
        });
    });

const optionNameInput = '<div class="col-md d-flex justify-content-between" style="flex-direction: column">'+
    '<div class="row h-80">'+
        '<div class="col">'+
           '<h2 class="align-self-center">Options</h2>'+
        '</div>'+
    '</div>'+
    '<div class="row inputs h-20 align-self-bottom">'+
        '<div class="col-md">'+
            '<i class="bi bi-person-circle m-1"></i><input type="text" placeholder="Name">'+
            '</div>'+
        '</div>'+
    '</div>'


function slidebar(){
    $("#appointments").hide("slide", {direction : "left"}, 1000, () =>{
        $("#appointments").empty().append(optionNameInput);
        $("#events").show("slide",1000);
    })
}
