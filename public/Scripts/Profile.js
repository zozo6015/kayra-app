$(document).ready(function () {

    $('#btnAddDP').on("click", function () {

        $('#ModalAddDogProfile').modal('toggle');
        var options = {
            "backdrop": "static"
        }

        $('#ModalAddDogProfile').modal(options);
    });

    var AppointmentDogID = '';

    $('#btnAddDogProfile').on("click", function () {
        $('#divLoadingGif').addClass("divLoadingGif");
        var DogBreed = $("#ddDogBreed option:selected").val();
        var DogName = $('#txtDogName').val();
        var FirstName = $("#txtFirstname").val();
        var Surname = $("#txtSurname").val();
        var TelNo = $("#txtTelNo").val();
        var Email = $("#txtEmail").val();
        var FB = $("#txtFB").val();
        var Notes = $("#txtNotes").val();

        if (DogBreed == '') {
            $("#divAlertBox").css("display", "block");
            $("#divAlertMsgText").html("Dog breed cannot be empty");
            $("#divAlertBox").removeClass("alert alert-success");
            $("#divAlertBox").addClass("alert alert-danger");
            $('#divLoadingGif').removeClass("divLoadingGif");
        }
        else if (DogName == '') {
            $("#divAlertBox").css("display", "block");
            $("#divAlertMsgText").html("Dog name cannot be empty");
            $("#divAlertBox").removeClass("alert alert-success");
            $("#divAlertBox").addClass("alert alert-danger");
            $('#divLoadingGif').removeClass("divLoadingGif");
        }
        else if (FirstName == '') {
            $("#divAlertBox").css("display", "block");
            $("#divAlertMsgText").html("First name cannot be empty");
            $("#divAlertBox").removeClass("alert alert-success");
            $("#divAlertBox").addClass("alert alert-danger");
            $('#divLoadingGif').removeClass("divLoadingGif");
        }
        else if (Email == '') {
            $("#divAlertBox").css("display", "block");
            $("#divAlertMsgText").html("Email can not be empty");
            $("#divAlertBox").removeClass("alert alert-success");
            $("#divAlertBox").addClass("alert alert-danger");
            $('#divLoadingGif').removeClass("divLoadingGif");
        }
        else {



            var parameters = { DogBreed: DogBreed, DogName: DogName, FirstName: FirstName, Surname: Surname, TelNo: TelNo, Email: Email, FB: FB, Notes: Notes };

            $.post('/AddDogProfile', parameters)
                .done(function (data) {
                    DogID = data.Result[0].Result;
                    AppointmentDogID = DogID;
                    if (data.Result[0].Result > 0) {

                        var files = $("#upload-input").get(0).files;

                        if (files.length > 0) {
                            // create a FormData object which will be sent as the data payload in the
                            // AJAX request
                            var formData = new FormData();

                            // loop through all the selected files and add them to the formData object
                            for (var i = 0; i < files.length; i++) {
                                var file = files[i];

                                // add the files to formData object for the data payload
                                formData.append('uploads[]', file, file.name);
                            }
                            formData.append('DogID', DogID);


                            $.ajax({
                                url: '/uploadImage',
                                type: 'POST',
                                data: formData,
                                processData: false,
                                contentType: false,
                                success: function (data) {
                                    console.log('upload successful!\n' + data);
                                },
                                xhr: function () {
                                    // create an XMLHttpRequest
                                    var xhr = new XMLHttpRequest();

                                    // listen to the 'progress' event
                                    xhr.upload.addEventListener('progress', function (evt) {

                                        if (evt.lengthComputable) {
                                            // calculate the percentage of upload completed
                                            var percentComplete = evt.loaded / evt.total;
                                            percentComplete = parseInt(percentComplete * 100);

                                            // update the Bootstrap progress bar with the new percentage
                                            $('.progress-bar').text(percentComplete + '%');
                                            $('.progress-bar').width(percentComplete + '%');

                                            // once the upload reaches 100%, set the progress bar text to done
                                            if (percentComplete === 100) {
                                                $('.progress-bar').html('Done');
                                            }
                                        }

                                    }, false);

                                    return xhr;
                                }
                            });

                        }

                        $("#divAlertBox").css("display", "block");
                        $("#divAlertMsgText").html("Dog profile added successfully!");
                        $("#divAlertBox").removeClass("alert alert-danger");
                        $("#divAlertBox").addClass("alert alert-success");
                        $("#frmAddDogProfile").bootstrapValidator('resetForm', true);
                        $('#btnAddDogProfileAppointment').prop('disabled', false);

                    }
                    else {
                        $("#divAlertBox").css("display", "block");
                        $("#divAlertMsgText").html("Failed! Please try again or contact the site administrator");
                        $("#divAlertBox").removeClass("alert alert-success");
                        $("#divAlertBox").addClass("alert alert-danger");
                    }
                })
                .fail(function () {
                    $('#divLoadingGif').removeClass("divLoadingGif");

                })
                .always(function () {
                    $('#divLoadingGif').removeClass("divLoadingGif");
                });
        }
    });

    $('#btnAddDogProfileAppointment').on("click", function () {
        ViewAppointment(AppointmentDogID);

        $('#myAddAppointment').modal('toggle');
        var options = {
            "backdrop": "static"
        }

        $('#myAddAppointment').modal(options);
    });

    $('.dogrowclass').on("click", function () {
        ddUpdateDogBreed.disabled = true;
        txtUpdateDogName.disabled = true;
        txtUpdateFirstname.disabled = true;
        txtUpdateSurname.disabled = true;
        txtUpdateTelNo.disabled = true;
        txtUpdateEmail.disabled = true;
        txtUpdateFB.disabled = true;
        txtUpdateNotes.disabled = true;
        btnUpdateDogProfile.disabled = true;


        var DogID = this.id;
        DogIDArr = DogID.split('-');
        DogID = DogIDArr[1];

        DisplayDogProfile(DogID);

    });

    $('.DogUpdate').on("click", function (e) {
        e.stopPropagation();

        ddUpdateDogBreed.disabled = false;
        txtUpdateDogName.disabled = false;
        txtUpdateFirstname.disabled = false;
        txtUpdateSurname.disabled = false;
        txtUpdateTelNo.disabled = false;
        txtUpdateEmail.disabled = false;
        txtUpdateFB.disabled = false;
        txtUpdateNotes.disabled = false;
        btnUpdateDogProfile.disabled = false;

        var DogID = this.id;
        DogIDArr = DogID.split('-');
        DogID = DogIDArr[1];

        DisplayDogProfile(DogID);

    });



    function DisplayDogProfile(DogID) {
        $(".updateModal").html("");
        $(".addModal").html("");
        $("#imagethumbsupdate").html("");
        $("#imagethumbsAdd").html("");
        var parameters = { DogID: DogID };

        $.post('/GetDogInfo', parameters)
        .done(function (data) {
            var Result = data.Result[0];

            $('select[name=ddUpdateDogBreed]').val(Result.BreedID);
            $('.selectpicker').selectpicker('refresh');
            $('#txtUpdateDogName').val(Result.DogName);
            $('#txtUpdateFirstname').val(Result.OwnerFirstName);
            $('#txtUpdateSurname').val(Result.OwnerSurname);
            $('#txtUpdateTelNo').val(Result.TelNo);
            $('#txtUpdateEmail').val(Result.Email);
            $('#txtUpdateFB').val(Result.Facebook);
            $('#txtUpdateNotes').val(Result.Notes);


            $('#hidUpdateDogID').val(Result.DogID);


            GetDogImages(Result.DogID, function (DogmgArr) {
                var html = "";
                var htmlsmallthumbs = "";
                for (i = 0; i < DogmgArr.length; i++) {
                    var imageid1 = 'imagebig' + i;
                    htmlsmallthumbs += "<div class='col-12 col-md-4 col-sm-6'>";
                    htmlsmallthumbs += "<a title='Dogs' class='imgTitle' href='#'>";
                    htmlsmallthumbs += "<img class='thumbnail img-responsive' id='" + imageid1 + "' src='" + DogmgArr[i] + "'>";
                    htmlsmallthumbs += "</a>";
                    htmlsmallthumbs += "</div>";

                    for (i1 = 0; i1 < DogmgArr.length; i1++) {

                        html += '<div class="item" id="' + imageid1 + '">';
                        html += '<img class="thumbnail img-responsive" title="Dogs" src="' + DogmgArr[i1] + '">';
                        html += '</div>';
                    }

                }

                $(".updateModal").append(html);
                $(".addModal").append(html);
                $("#imagethumbsupdate").append(htmlsmallthumbs);
                $("#imagethumbsAdd").append(htmlsmallthumbs);



            });
        })
        .fail(function () {


        })
        .always(function () {


            $('#ModalUpdateDogProfile').modal('toggle');
            var options = {
                "backdrop": "static"
            }

            $('#ModalUpdateDogProfile').modal(options);
        });
    }

    function GetDogImages(DogID, callback) {

        var parameters = { DogID: DogID };
        $.post('/GetDogImages', parameters)
        .done(function (data) {
            return callback(data);
        })
        .fail(function () {
        })
        .always(function () {

        });
    }



    $('#btnSearchProfile').on("click", function () {
        var DogName = $('#txtSearchDogName').val();
        var Bread = $("#ddDogBreedSearch option:selected").val();
        var FirstName = $('#txtSearchOwnerFirst').val();
        var Surname = $('#txtSearchOwnerSurname').val();
        var Email = $('#txtSearchEmail').val();

        //window.location.assign("SearchDog");

        window.location.assign("/SearchDog?DogName=" + DogName + "&Bread=" + Bread + "&FirstName=" + FirstName + "&Surname=" + Surname + "&Email=" + Email);

    });

    $('#btnUpdateDogProfile').on("click", function () {
        var DogID = $('#hidUpdateDogID').val();
        var DogBreed = $("#ddUpdateDogBreed option:selected").val(); 
        var DogName = $('#txtUpdateDogName').val();
        var OwnerFirstName = $('#txtUpdateFirstname').val();
        var OwnerSurname = $('#txtUpdateSurname').val();
        var TelNo = $('#txtUpdateTelNo').val();
        var Email = $('#txtUpdateEmail').val();
        var Facebook = $('#txtUpdateFB').val();
        var Notes = $('#txtUpdateNotes').val();


        if (DogBreed == '') {
            $("#divAlertBoxUpdate").css("display", "block");
            $("#divAlertMsgTextUpdate").html("Dog bread cannot be empty");
            $("#divAlertBoxUpdate").removeClass("alert alert-success");
            $("#divAlertBoxUpdate").addClass("alert alert-danger");
        }
        else if (DogName == '') {
            $("#divAlertBoxUpdate").css("display", "block");
            $("#divAlertMsgTextUpdate").html("Dog name cannot be empty");
            $("#divAlertBoxUpdate").removeClass("alert alert-success");
            $("#divAlertBoxUpdate").addClass("alert alert-danger");

        } else if (OwnerFirstName == '') {
            $("#divAlertBoxUpdate").css("display", "block");
            $("#divAlertMsgTextUpdate").html("Owner first name cannot be empty");
            $("#divAlertBoxUpdate").removeClass("alert alert-success");
            $("#divAlertBoxUpdate").addClass("alert alert-danger");

        } else if (Email == '') {
            $("#divAlertBoxUpdate").css("display", "block");
            $("#divAlertMsgTextUpdate").html("Email cannot be empty");
            $("#divAlertBoxUpdate").removeClass("alert alert-success");
            $("#divAlertBoxUpdate").addClass("alert alert-danger");
        }
        else {

            var parameters = { DogID: DogID, DogBreed: DogBreed, DogName: DogName, OwnerFirstName: OwnerFirstName, OwnerSurname: OwnerSurname, TelNo: TelNo, Email: Email, Facebook: Facebook, Notes: Notes };

            $.post('/UpdateDogProfile', parameters)
            .done(function (data) {
                var Result = data.Result[0];

                if (Result.Result == 'Success') {
                    $("#divAlertBoxUpdate").css("display", "block");
                    $("#divAlertMsgTextUpdate").html("Dog profile updated successfully!");
                    $("#divAlertBoxUpdate").removeClass("alert alert-danger");
                    $("#divAlertBoxUpdate").addClass("alert alert-success");
                    $("#frmUpdateDogProfile").bootstrapValidator('resetForm', true);

                    var files = $("#upload-inputUpdate").get(0).files;

                    if (files.length > 0) {
                        // create a FormData object which will be sent as the data payload in the
                        // AJAX request
                        var formData = new FormData();

                        // loop through all the selected files and add them to the formData object
                        for (var i = 0; i < files.length; i++) {
                            var file = files[i];
                            // add the files to formData object for the data payload
                            formData.append('uploadsUpdate[]', file, file.name);
                        }

                        formData.append('DogID', DogID);


                        $.ajax({
                            url: '/uploadImage',
                            type: 'POST',
                            data: formData,
                            processData: false,
                            contentType: false,
                            success: function (data) {
                                console.log('upload successful!\n' + data);
                            },
                            xhr: function () {
                                // create an XMLHttpRequest
                                var xhr = new XMLHttpRequest();

                                // listen to the 'progress' event
                                xhr.upload.addEventListener('progress', function (evt) {

                                    if (evt.lengthComputable) {
                                        // calculate the percentage of upload completed
                                        var percentComplete = evt.loaded / evt.total;
                                        percentComplete = parseInt(percentComplete * 100);

                                        // update the Bootstrap progress bar with the new percentage
                                        $('.progress-bar').text(percentComplete + '%');
                                        $('.progress-bar').width(percentComplete + '%');

                                        // once the upload reaches 100%, set the progress bar text to done
                                        if (percentComplete === 100) {
                                            $('.progress-bar').html('Done');
                                        }

                                    }

                                }, false);

                                return xhr;
                            }
                        });

                    }


                }
                else {
                    $("#divAlertBoxUpdate").css("display", "block");
                    $("#divAlertMsgTextUpdate").html("Failed! Please try again or contact the site administrator");
                    $("#divAlertBoxUpdate").removeClass("alert alert-success");
                    $("#divAlertBoxUpdate").addClass("alert alert-danger");
                }

                setTimeout(function () {
                    $("#divAlertBoxUpdate").fadeOut("slow", function () {
                        window.location.assign("Profile");
                    });
                }, 1300);


            })
            .fail(function () {
                $('#divLoadingGifUpdate').removeClass("divLoadingGif");

            })
            .always(function () {
                $('#divLoadingGifUpdate').removeClass("divLoadingGif");
            });

        }

    });


    $('.DogUpdateHist').on("click", function (e) {
        $("#frmUpdateDogProfile").bootstrapValidator('resetForm', true);
        e.stopPropagation();
        var DogID = this.id;
        DogIDArr = DogID.split('-');
        DogID = DogIDArr[1];
        $("#HistSpan").html("");


        var parameters = { DogID: DogID };
        $.post('/GetDogHistory', parameters)
        .done(function (data) {
            var Result = data.Result;
            if (Result) {
                var html = "";
                for (i = 0; i < Result.length; i++) {

                    if ((i % 2) == 0) {
                        html += "<div class='row'>";
                    }
                    else {
                        html += "<div class='row  rowAltColor'>";
                    }


                    html += "<div class='col-xs-12 col-sm-3 col-md-3 col-lg-3'>";
                    html += Result[i].DogName;
                    html += "</div>";

                    html += "<div class='col-xs-12 col-sm-3 col-md-3 col-lg-3'>";
                    html += Result[i].OwnerName;
                    html += "</div>";

                    html += "<div class='col-xs-12 col-sm-3 col-md-3 col-lg-3'>";
                    html += Result[i].StartTime;
                    html += "</div>";

                    html += "<div class='col-xs-12 col-sm-3 col-md-3 col-lg-3'>";
                    html += Result[i].Services;
                    html += "</div>";


                    html += "</div>"
                    $("#HistSpan").html(html);
                };
            }
        })
        .fail(function () {
            $('#divLoadingGif').removeClass("divLoadingGif");

        })
        .always(function () {
            $('#divLoadingGif').removeClass("divLoadingGif");
        });


        $('#DogHistModal').modal('toggle');
        var options = {
            "backdrop": "static"
        }

        $('#DogHistModal').modal(options);
    });


    $('#btnSubmitAppointment').on("click", function () {

        var oneSelected = 0;
        $('input[type=checkbox]').each(function () {
            if (this.checked) {
                oneSelected = oneSelected + 1
            }
        });

        var DogID = $('#hidDogID').val();
        var StartDate = $('#startDate').val();
        var EndDate = $('#endDate').val();
        var AppointmentNotes = $('#txtnotes').val();
        var AppointmentID = 0;

        if (oneSelected == 0) {
            alert("Please select atleast one service!");
            $('#divLoadingGif').removeClass("divLoadingGif");
        }
        else if (StartDate == '') {
            alert("Start date can not be empty!");
            $('#divLoadingGif').removeClass("divLoadingGif");
        }
        else if (EndDate == '') {
            alert("End date can not be empty!");
            $('#divLoadingGif').removeClass("divLoadingGif");
        }
        else {

            var parameters = { DogID: DogID, StartDate: StartDate, EndDate: EndDate, AppointmentNotes: AppointmentNotes };

            $.post('/AddAppointment', parameters)
            .done(function (data) {
                var Result = data.Result[0];
                AppointmentID = Result.Result;
                //Add Appointment service
                $('input[type=checkbox]').each(function () {
                    if (this.checked) {
                        var parameters = { AppointmentID: AppointmentID, ServiceID: $(this).val() };

                        $.post('/AddDogService', parameters)
                        .done(function (data1) {
                            if (data1.Result[0].Result > 0) {

                                $("#divAlertBoxApp").css("display", "block");
                                $("#divAlertMsgTextApp").html("Appointment added successfully!");
                                $("#divAlertBoxApp").removeClass("alert alert-danger");
                                $("#divAlertBoxApp").addClass("alert alert-success");
                                $("#frmUpdateApp").bootstrapValidator('resetForm', true);

                                setTimeout(function () {
                                    window.location.assign("Appointments");
                                }, 2000);

                            }
                            else {
                                $("#divAlertBoxApp").css("display", "block");
                                $("#divAlertMsgTextApp").html("Failed! Please try again or contact the site administrator");
                                $("#divAlertBoxApp").removeClass("alert alert-success");
                                $("#divAlertBoxApp").addClass("alert alert-danger");
                            }
                        })
                        .fail(function () {

                        })
                        .always(function () {
                        });
                    }
                });
            })
            .fail(function () {
                $('#divLoadingGif').removeClass("divLoadingGif");

            })
            .always(function () {
                $('#divLoadingGif').removeClass("divLoadingGif");
            });
        }

    });

    $('#ModalAddDogProfile').on('hide.bs.modal', function () {
        $("#myAddAppointment").css("overflow-y", "auto"); // 'auto' or 'scroll'
    });

    function ViewAppointment(DogID) {
        var parameters = { DogID: DogID };

        $.post('/GetDogInfo', parameters)
        .done(function (data) {
            var Result = data.Result[0];
            $('#hidDogID').val(Result.DogID);
            $('#txtDogname').val(Result.DogName);
            $('#txtFName').val(Result.OwnerFirstName);
            $('#txtSname').val(Result.OwnerSurname);
            $('#txtTelno').val(Result.TelNo);
            $('#txtemail').val(Result.Email);
            $('#txtfb').val(Result.Facebook);

            //var day = date.getDate();
            //var monthIndex = date.getMonth();
            //var year = date.getFullYear();

            $('#startDate').val(Result.StartTime);
            $('#endDate').val(Result.EndDate);
            $('#txtnotes').val(Result.AppNotes);
        })
        .fail(function () {
            $('#divLoadingGif').removeClass("divLoadingGif");

        })
        .always(function () {
            $('#divLoadingGif').removeClass("divLoadingGif");
        });
        $('#ModalAddDogProfile').modal('hide');
    }

    $('.LinkAddDogAppointment').on("click", function (e) {
        e.stopPropagation();
        var DogID = this.id;
        DogIDArr = DogID.split('-');
        DogID = DogIDArr[1];
        ViewAppointment(DogID);

        $('#myAddAppointment').modal('toggle');
        var options = {
            "backdrop": "static"
        }

        $('#myAddAppointment').modal(options);
    });

    $('#ApointmentStartDate').datetimepicker({ format: 'YYYY-MM-DD hh:mm' });
    $('#ApointmentEndDate').datetimepicker({ format: 'YYYY-MM-DD hh:mm' });

    $('.date').on("click", function () {
        $('#' + this.id).datetimepicker({ format: 'YYYY-MM-DD hh:mm' });
    });

    $(document).on('dp.change', '#ApointmentStartDate', function () {
        var AppStartDate = new Date(document.getElementById("startDate").value);
        var hours = AppStartDate.getHours();
        hours = hours + 3;

        AppStartDate = moment(AppStartDate.setHours(hours));

        //console.log(AppStartDate);
        //var year = AppStartDate.getFullYear().toString();
        //console.log(year);
        //var month = AppStartDate.getMonth();
        //month = month + 1;
        //month = month.toString();
        //var day = AppStartDate.getDate().toString();

        //var hour = AppStartDate.getHours().toString();
        //var minute = AppStartDate.getMinutes().toString();
        //var second = AppStartDate.getSeconds().toString();
        //var milsec = AppStartDate.getMilliseconds().toString();

        ////var endtime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ":" + second + "." + milsec;
        //var endtime = year.concat('-', month, '-', day, ' ', hour, ':', minute);
        document.getElementById("endDate").value = AppStartDate;




        
    });


    $('.upload-btn').on('click', function () {
        $('#upload-input').click();
        $('.progress-bar').text('0%');
        $('.progress-bar').width('0%');
    });





    /* activate the carousel */
    $("#modal-carousel").carousel({ interval: false });

    /* change modal title when slide changes */
    $("#modal-carousel").on("slid.bs.carousel", function () {

    });

    /* when clicking a thumbnail */
    $(document).on('click', '.imgTitle .thumbnail', function () {
        //$(".row .thumbnail").on('click', function () {
        var content = $(".carousel-inner");

        content.empty();

        var id = this.id;
        var repo = $("#img-repo .item");
        var repoCopy = repo.filter("#" + id).clone();
        var active = repoCopy.first();

        active.addClass("active");

        content.append(repoCopy);

        // show the modal
        $("#modal-gallery").modal("show");
    });


    $("#frmAddDogProfile").submit(function () {
        return false;
    });

    $("#frmUpdateApp").submit(function () {
        return false;
    });

    $("#frmHistory").submit(function () {
        return false;
    });

    $("#frmUpdateDogProfile").submit(function () {
        return false;
    });

    $("#frmAddSearch").submit(function () {
        return false;
    });

    $("#txtSearchDogName").keyup(function (event) {
        if (event.keyCode == 13) {
            $("#btnSearchProfile").click();
        }
    });


    $("#txtSearchOwnerFirst").keyup(function (event) {
        if (event.keyCode == 13) {
            $("#btnSearchProfile").click();
        }
    });

    $("#txtSearchOwnerSurname").keyup(function (event) {
        if (event.keyCode == 13) {
            $("#btnSearchProfile").click();
        }
    });

    $("#txtSearchEmail").keyup(function (event) {
        if (event.keyCode == 13) {
            $("#btnSearchProfile").click();
        }
    });

    $('#startDate').change(function () {
        alert("hello");
    });




    //var AppStartDate = document.getElementById("startDate");

    //AppStartDate.removeEventListener("change", EditEndDate);

    
    //AppStartDate.addEventListener('change', EditEndDate, false);
    //alert(AppStartDate);

    //function EditEndDate()
    //{
    //    alert("hello");
    //}
    
    
    
    
    


});