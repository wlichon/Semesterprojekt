var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

const slidebutton = "<div class='btn btn-primary col-auto p-1' id='lslide'><i class='bi bi-chevron-left'></i></div>";
const commentbar = "<div class='row mt-5 comment'><div class='input-group input-group-lg'><span class='input-group-text' id='inputGroup-sizing-lg'>Comment</span><input type='text' id = 'comment' class='form-control' aria-label='Sizing example input' aria-describedby='inputGroup-sizing-lg'> <span class='input-group-text' id='inputGroup-sizing-lg'>Name</span><input type='text' name = 'personname' id = 'personname'> <button class='btn btn-outline-secondary bg-primary text-white' type='submit' name='submitnamecommentcheckbox'>Submit</button></div></div>"




$(function() {
    $("#appointments").hide();
    $("#events").hide();
    $("#createappointmentform").hide();
    $('#commenttitle').hide();

   $.ajax({
        type: "GET",
        url: "backend/serviceHandler.php",  // geh zum ServiceHandler -> Funktion Parameter werden überprüft -> 
        cache: false,
        data: {function: "loadAppointments"},   // kein Parameter nötig, da alle Meetings geladen werden
        dataType: "json",
        success: function (response) {
            console.log("success");
            console.log(response);
            loadAppointments(response);
        },

                
        
        complete: function () {
            //AB DA AN ALLES!!
            $(".event").find(".bi-calendar2-x-fill").on('click', e =>{
            var self = e.currentTarget;
            //console.log((e as any).parent());      // Element was das Klick getriggert hat
            $("#events").hide("slide", {direction : "left"}, 1000, () =>{
                console.log(self);
                console.log("dabinich");
                let appointmentID = self.getAttribute("data")!;
                console.log("das ist die appointmentid außerhalb der funktion:", appointmentID);
                ajaxLoadOptions(appointmentID);
                //loadCommentsAjax(appointmentID); // HIERHIERHEHRHEHEHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH
                setTimeout(() => $("#appointments").show("slide",1000),100);
                /** 
                * TODO: hier ajax call mit appointmentId als parameter, gibt rows zurück
                 *! $("#commenttitle").show("slide", 1000);
                */



                var forum2 = $('#checkboxnamecomment');
               // var dirtyFormID = 'checkboxnamecomment';
                //var resetForm = <HTMLFormElement>document.getElementById(dirtyFormID);
                //resetForm.reset();
                console.log("das ist die appointmentid außerhalb der funktion2:", appointmentID);


                forum2.on("submit",function (e) {
                    console.log("das ist die appointmentid in der funktion:", appointmentID);
                    //e.stopImmediatePropagation();
                    e.preventDefault();
                    let termin1:number = 0;
                    let termin2:number = 0;
                    let array: Array <number> = [];
                    var checkboxing: number;
                    HTMLInputElement: var checkbox = $("input:checkbox[name=type]:checked");
                    $(checkbox).each(function() {
                        checkboxing = $(this).val() as number;
                        //alert(checkboxing);
                        array.push(checkboxing);   
                    });
    
                    if (array[0] == 0) {
                        termin1 = 1;
                    }
    
                    if (array[0] == 1) {
                        termin2 = 1;
                    }
    
                    if (array[1] == 1) {
                        termin2 = 1;
                    }
    
                    var personname = $('#personname').val();
                    var comment = $('#comment').val();
    
                    $.ajax({
                        type: "GET",
                        url: "backend/serviceHandler.php",
                        data: {function: "voteForAppointment", meetingnummer: appointmentID, name: personname, kommentar: comment, termin1auswahl: termin1, termin2auswahl: termin2},
                        dataType: "test",
                        success: function (data) {
                            console.log("zeile 84");
                        },
                        
                        error: function (data) {
                            $('#checkboxnamecomment').off('submit');
                            slidebar();
                            console.log("hallo2");
                        }
                    })
    
                    console.log(termin1);
                    console.log(termin2);
                    console.log(personname);
                    console.log(comment);
        })
            })
            
            
            })
            $("#events").show("slide",1000);
        },
               
        error: function(e){
            console.log("failure 107");
        }
        
        
    });
    
    

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
    $("#createappointmentform").append(slidebutton);
    $("#lslide").on('click', function() {
        $("#createappointmentform").hide("slide", {direction : "left"}, 1000, () =>{
            $("#appointments").empty().append(optionNameInput);
            $("#events").show("slide",1000);
        })
    });

    frm.submit(function (e) {
        e.preventDefault();
        $("createappointment").show();
        var date = $("#date").val();
        var meetingID = $("#meetingid").val();
        var title = $("#title").val();
        var votingExpirationDate = $("#votingExpirationDate").val();
        var begin = $("#begin").val();
        var end = $("#end").val();
        var terminoption1id = $("#terminoption1id").val();
        var terminoption1begin = $("#terminoption1begin").val();
        var terminoption1end = $("#terminoption1end").val();
        var terminoption2id = $("#terminoption2id").val();
        var terminoption2begin = $("#terminoption2begin").val();
        var terminoption2end = $("#terminoption2end").val();

        console.log(date, meetingID, title, votingExpirationDate, begin, end, terminoption1begin, terminoption1end, terminoption2begin, terminoption2end);
        $.ajax({
            type: "GET",
            url: "backend/serviceHandler.php",
            data: {function: "createAppointmentWithOptions", param1: date,
            param2: meetingID, param3: title, param4: votingExpirationDate, param5: begin, param6: end, param7: terminoption1begin, 
            param8: terminoption1end, param9: terminoption2begin, param10: terminoption2end, param11: terminoption1id, param12: terminoption2id},
            
            success: function (data) {                          // success und error sind vertauscht -> bei Fehler und keiner Eintragung kommt Success
                $("#createappointmentform").hide("slide", 1000);
                $("#events").empty();
                var button = "<div class='col-md-3 d-flex justify-content-between' style='flex-direction: column'> <div class='col'> <h2 class='align-self-center'>Appointments</h2><p class=''>Click a meeting to vote for another date</p> </div><button class = 'btn-primary btn-lg' id = 'createappointment'> Click here to create an appointment</button></div></div>"
                $('#events').append(button);
                $("#createappointment").on("click", function() {
                    $("#appointments").hide("slide", 1000);
                    $("#events").hide("slide", 1000);
                    $("#createappointmentform").show("slide", 1000);
                })
                $.ajax({
                    type: "GET",
                    url: "backend/serviceHandler.php",  // geh zum ServiceHandler -> Funktion Parameter werden überprüft -> 
                    cache: false,
                    data: {function: "loadAppointments"},   // kein Parameter nötig, da alle Meetings geladen werden
                    dataType: "json",
                    success: function (response) {
                        console.log("success2222");
                        console.log(response);
                        loadAppointments(response); //das neu eingefügte Appointment laden
                        },
                    
                    complete: function () {
                                $(".event").on('click', e =>{
                                var self = e.currentTarget;         // Element was das Klick getriggert hat
                                $("#events").hide("slide", {direction : "left"}, 1000, () =>{
                                    console.log(self);
                                    console.log("Zeile 179");
                                    var appointmentID = self.getAttribute("data")!;
                                    console.log(appointmentID);
                                    ajaxLoadOptions(appointmentID);
                                    //loadCommentsAjax(appointmentID); // HIERHIERHEHRHEHEHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH
                                    setTimeout(() => $("#appointments").show("slide",1000),100);
                                    })
                    
                                })
                                $("#events").show("slide",1000);
                                    
                    },           
                    
                    error: function(e){
                        console.log("failure 193");
                    },     
                })
            },

            error: function (data) {
                $("#createappointmentform").hide("slide", 1000);
                $("#events").empty();
                var button = "<div class='col-md-3 d-flex justify-content-between' style='flex-direction: column'> <div class='col'> <h2 class='align-self-center'>Appointments</h2><p class=''>Click a meeting to vote for another date</p> </div><button class = 'btn-primary btn-lg' id = 'createappointment'> Click here to create an appointment</button></div></div>"
                $('#events').append(button);
                $("#createappointment").on("click", function() {
                    $("#appointments").hide("slide", 1000);
                    $("#events").hide("slide", 1000);
                    $("#createappointmentform").show("slide", 1000);
                })
                $.ajax({
                    type: "GET",
                    url: "backend/serviceHandler.php",  // geh zum ServiceHandler -> Funktion Parameter werden überprüft -> 
                    cache: false,
                    data: {function: "loadAppointments"},   // kein Parameter nötig, da alle Meetings geladen werden
                    dataType: "json",
                    success: function (response) {
                        console.log("success2222");
                        console.log(response);
                        loadAppointments(response); //das neu eingefügte Appointment laden
                        },
                    
                    complete: function () {
                        /*
                        $(".event").find(".bi-calendar2-x-fill").on('click', e =>{
                            var self = e.currentTarget;
                            //console.log((e as any).parent());      // Element was das Klick getriggert hat
                            $("#events").hide("slide", {direction : "left"}, 1000, () =>{
                                console.log(self);
                                console.log("dabinich");
                                let appointmentID = self.getAttribute("data")!;
                                */
                                $(".event").find(".bi-calendar2-x-fill").on('click', e =>{
                                var self = e.currentTarget;         // Element was das Klick getriggert hat
                                $("#events").hide("slide", {direction : "left"}, 1000, () =>{
                                    console.log(self);
                                    console.log("Zeile 224");
                                    let appointmentID = self.getAttribute("data")!;
                                    console.log(appointmentID);
                                    ajaxLoadOptions(appointmentID);
                                    //loadCommentsAjax(appointmentID); // HIERHIERHEHRHEHEHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH
                                    setTimeout(() => $("#appointments").show("slide",1000),100);
                                    })
                    
                                })
                                $("#events").show("slide",1000);
                                    
                    },           
                    
                    error: function(e){
                        console.log("failure 238");
                    },     
                })
            }         // richtig
            });
        });
    });


const optionNameInput = '<div class="col-md d-flex justify-content-between" style="flex-direction: column">'+
    '<div class="row h-80">'+
        '<div class="col">'+
           '<h2 class="align-self-center">Options</h2>'+
        '</div>'+
    '</div>'+
    '</div>'


function slidebar(){
    $("#appointments").hide("slide", {direction : "left"}, 1000, () =>{
        $("#appointments").empty().append(optionNameInput);
        $("#events").show("slide",1000);
    })
}

function loadAppointments(response : any){
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
            '</div><i class="bi bi-backspace-fill p-1" id="remove'+ i +'" data='+ id +'></i> <i class="bi bi-calendar2-x-fill p-1" id="vote'+i+'"data="'+id+'"></i></div>'
            
            );

        $("#remove"+i).on('click',function(){
            let deleteButton = $(this);
            let id = deleteButton.attr("data");
            console.log(id);
            $.ajax({
                type: "GET",
                url: "backend/serviceHandler.php",
                cache: false,
                data: {function: "deleteAppointment",param: id}, 
                dataType: "text",
                success: function (response) {
                    console.log("delete success")
                    deleteButton.parent().remove();
                },
        
                error: function (response){
                    console.log("delete failure")
                }
            })
        })
        let isexpired = new Date(expiration);
        var today = new Date();
        if (isexpired <= today) {
            $("#option" + i).append("<span><h5 class = 'mt-3' > abgelaufen! </h5></span>");
            //$(".event").find(".bi-calendar2-x-fill").on('click'
            $("#vote" + i).remove();
        }

        counter++;
    
    
    })
}

function loadOptions(response : any){
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
            "<div class='col-md'><input class='form-check-input' type='checkbox' name = 'type' value='" + i + "'" +  "></div></div></div>"
        )
        
    
    })
}

function ajaxLoadOptions(appointmentID : string){
    $.ajax({
        type: "GET",
        url: "backend/serviceHandler.php",
        cache: false,
        data: {function: "loadOptions", param: appointmentID},   // für die Funktion loadOptions brauchen wir die jeweilige ID des Meetings das wir zuvor angeklickt haben
        dataType: "json",
        success: function (response) {
            console.log("ajaxLoadOptionsSuccess")
            loadOptions(response);
            $("#appointments").append(slidebutton + commentbar);
            $("#lslide").on('click', slidebar);
            loadCommentsAjax(appointmentID);
        },
        
        error: function (response){
            console.log("failure 370")
            console.log("failure")
        },

        complete: function(response){
            //loadCommentsAjax(appointmentID);
        }
    })
}

function reloadAfterDelete(){

}

function loadCommentsAjax(appointmentID: string) {
    $.ajax({
        type: "GET",
        url: "backend/serviceHandler.php",
        cache: false,
        data: {function: "loadCommentsAndNames", param: appointmentID},
        dataType: "json",

        success: function (response) {
            console.log("SUCCESS: hier kommen die apppointments von", appointmentID);
            console.log(response);
            $("#appointments").remove('#commentheader');
            $("#appointments").append("<div><h3 class = 'text-white mt-5' id = 'commentheader'> Kommentare </h3> </div>");
            $.each(response, (i: number,val) =>{
                var commentid = val['commentid']; 
                var name = val['name'];
                var comment = val['comment'];
                console.log(commentid, name, comment);

                $("#appointments").append(
                "<div> <p class = 'text-white'>" + "#" + commentid
                + " " + name + " schrieb dazu: " +
                comment + "</p> </div>"
                );
            })
        },

        error: function (response) {
            $("#appointments").remove('#commentheader');
            $("#appointments").append("<div><h3 class = 'text-white mt-5' id = 'commentheader'> Bisher keine Kommentare </h3> </div>");
            console.log("ERROR: hier kommen die apppointments von", appointmentID);
            console.log(response);
        }
    })
}