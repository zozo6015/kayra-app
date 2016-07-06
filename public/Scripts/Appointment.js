$(document).ready(function () {

    $('.AppViewUpdate').on("click", function () {
        var AppointmentID = this.id;

        var parameters = { AppointmentID: AppointmentID };

        $.post('/ViewAppointmentDetails', parameters)
            .done(function (data) {
                var AppointmentID = data.AppointmentsResluts[0].AppointmentID;
                var DogID = data.AppointmentsResluts[0].DogID;
                var DogBreed = data.AppointmentsResluts[0].DogBreed;
                var DogName = data.AppointmentsResluts[0].DogName;
                var OwnerFirstName = data.AppointmentsResluts[0].OwnerFirstName;
                var OwnerSurname = data.AppointmentsResluts[0].OwnerSurname;
                var TelNo = data.AppointmentsResluts[0].TelNo;
                var Email = data.AppointmentsResluts[0].Email;
                var Facebook = data.AppointmentsResluts[0].Facebook;
                var AppNotes = data.AppointmentsResluts[0].AppNotes;
                var ServiceIDsArr = data.AppointmentsResluts[0].ServiceIDsArr;
                var StartTime = data.AppointmentsResluts[0].StartTime;
                var EndDate = data.AppointmentsResluts[0].EndDate;

                $("#hidDogAppointmentID").val(AppointmentID);
                $("#txtDogName").val(DogName);
                $("#txtFirstName").val(OwnerFirstName);
                $("#txtSurname").val(OwnerSurname);
                $("#txtTelNo").val(TelNo);
                $("#txtEmail").val(Email);
                $("#txtFB").val(Facebook);
                $("#startDate").val(StartTime);
                $("#endDate").val(EndDate);
                $('#txtNotes').val(AppNotes);
                for (i = 0; i < ServiceIDsArr.length; i++) {
                    $("#chkServiceNails-" + ServiceIDsArr[i]).prop('checked', true);
                }


            })
            .fail(function () {

            })
            .always(function () {

            });


        $('#UpdateAppointment').modal('toggle');
        var options = {
            "backdrop": "static"
        }

        $('#UpdateAppointment').modal(options);
    });



    $('.updateAppointment').on("click", function () {
        $('#divLoadingGif').addClass("divLoadingGif");
        var AppointmentID = $("#hidDogAppointmentID").val();

        var StartDate = $('#startDate').val();
        var EndDate = $('#endDate').val();
        var AppNote = $("#txtNotes").val();

        var parameters = { AppointmentID: AppointmentID, StartDate: StartDate, EndDate: EndDate, AppNote: AppNote };

        $.post('/UpdateAppointment', parameters)
            .done(function (data) {
                if (data.AppointmentsUpdateResluts[0].Result == "Success") {
                    $('input[type=checkbox]').each(function () {
                        if (this.checked) {

                            var parameters = { AppointmentID: AppointmentID, ServiceID: $(this).val() };

                            $.post('/AddDogService', parameters)
                            .done(function (data1) {
                                if (data1.Result[0].Result > 0) {

                                    $("#divAlertBox").css("display", "block");
                                    $("#divAlertMsgText").html("Appointment updated successfully!");
                                    $("#divAlertBox").removeClass("alert alert-danger");
                                    $("#divAlertBox").addClass("alert alert-success");

                                    setTimeout(function () {
                                        window.location.assign("Appointments");
                                    }, 2000);

                                }
                                else {
                                    $("#divAlertBox").css("display", "block");
                                    $("#divAlertMsgText").html("Failed! Please try again or contact the site administrator");
                                    $("#divAlertBox").removeClass("alert alert-success");
                                    $("#divAlertBox").addClass("alert alert-danger");
                                }
                            })
                            .fail(function () {

                            })
                            .always(function () {
                            });
                        }
                    });
                }
                else {
                    alert("Failed");
                }


            })
            .fail(function () {
                $('#divLoadingGif').removeClass("divLoadingGif");

            })
            .always(function () {
                $('#divLoadingGif').removeClass("divLoadingGif");
            });
    });

    $('#btnCancelAppointment').on("click", function () {
        $('#divLoadingGif').addClass("divLoadingGif");
        var AppointmentID = $("#hidDogAppointmentID").val();

        var parameters = { AppointmentID: AppointmentID };

        $.post('/DeleteAppointment', parameters)
        .done(function (data) {
            if (data[0].Result == 'Success')
            {
                $("#divAlertBox").css("display", "block");
                $("#divAlertMsgText").html("Appointment successfully deleted!");
                $("#divAlertBox").removeClass("alert alert-danger");
                $("#divAlertBox").addClass("alert alert-success");

                setTimeout(function () {
                    $("#divAlertBox").fadeOut("slow", function () {
                        window.location.assign("/Appointments");
                    });
                }, 1300);
            }
            else
            {
                $("#divAlertBox").css("display", "block");
                $("#divAlertMsgText").html("An error occurred!");
                $("#divAlertBox").addClass("alert alert-danger");
                $("#divAlertBox").removeClass("alert alert-success");
            }
        })
        .fail(function () {
            $('#divLoadingGif').removeClass("divLoadingGif");

        })
        .always(function () {
            $('#divLoadingGif').removeClass("divLoadingGif");
        });

    });


    $('#TodayHeading').on("click", function () {
        if ($("#TodayHeading").text() == "+ Today") {
            $("#DayBody").css("display", "block");
            $("#TodayHeading").text("- Today");
        }
        else {
            $("#DayBody").css("display", "none");
            $("#TodayHeading").text("+ Today");
        }

    });

    $('#WeekHeading').on("click", function () {
        if ($("#WeekHeading").text() == "- Week") {
            $("#WeekBody").css("display", "none");
            $("#WeekHeading").text("+ Week");
        }
        else {
            $("#WeekBody").css("display", "block");
            $("#WeekHeading").text("- Week");
        }

    });


    $('#MonthHeading').on("click", function () {
        if ($("#MonthHeading").text() == "- Month") {
            $("#MonthBody").css("display", "none");
            $("#MonthHeading").text("+ Month");
        }
        else {
            $("#MonthBody").css("display", "block");
            $("#MonthHeading").text("- Month");
        }

    });

    $("#WeekBody").css("display", "none");
    $("#MonthBody").css("display", "none");

    $('#ApointmentStartDate').datetimepicker({ format: 'YYYY-MM-DD hh:mm' });
    $('#ApointmentEndDate').datetimepicker({ format: 'YYYY-MM-DD hh:mm' });

    $('.date').on("click", function () {
        $('#' + this.id).datetimepicker({ format: 'YYYY-MM-DD hh:mm' });
    });
});