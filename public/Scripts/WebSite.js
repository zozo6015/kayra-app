$(document).ready(function () {


    $('#btnLogin').on("click", function () {
        $('#divLoadingGif').addClass("divLoadingGif");


        var Username = $('#txtUsername').val();
        var Password = $("#txtPassword").val();

        var parameters = { Username: Username, Password: Password };

        $.post('/LogUserIn', parameters)
        .done(function (data) {
            if (data.Result == 'Allow') {
                $("#divAlertBox").css("display", "block");
                $("#divAlertMsgText").html("Login successful! Redirecting...");
                $("#divAlertBox").removeClass("alert alert-danger");
                $("#divAlertBox").addClass("alert alert-success");
                setTimeout(function () {
                    if (data.Role == 0) {
                        window.location.assign("Profile");
                    }
                    else {
                        window.location.assign("Profile");
                    }
                }, 1000);
            }
            else {
                $("#divAlertBox").css("display", "block");
                $("#divAlertMsgText").html("Login failed! Please try again or contact your administrator!");
                $("#divAlertBox").removeClass("alert alert-success");
                $("#divAlertBox").addClass("alert alert-danger");
                setTimeout(function () {
                    $("#divAlertBox").fadeOut("slow", function () {

                    });
                }, 2000);
            }

            $('#divLoadingGif').removeClass("divLoadingGif");
            //if (data.IsValid == 'true') {
            //    $("#divAlertBoxClaim").css("display", "block");
            //    $("#divAlertMsgTextClaim").html("Your coupon will be redeemed on your next deposit.");
            //    $("#divAlertBoxClaim").removeClass("alert alert-danger");
            //    $("#divAlertBoxClaim").addClass("alert alert-success");
            //}
            //else {
            //    $("#divAlertBoxClaim").css("display", "block");
            //    $("#divAlertMsgTextClaim").html(data.Msg);
            //    $("#divAlertBoxClaim").removeClass("alert alert-success");
            //    $("#divAlertBoxClaim").addClass("alert alert-danger");
            //}
        })
        .fail(function () {
            $('#divLoadingGif').removeClass("divLoadingGif");
            $("#frmLogin").bootstrapValidator('resetForm', true);
        })
        .always(function () {
            $('#divLoadingGifClaim').removeClass("divLoadingGif");
            $("#frmLogin").bootstrapValidator('resetForm', true);

        });





    });

    $('#btnAddUser').on("click", function () {
        $('#divLoadingGif').addClass("divLoadingGif");
        var FirstName = $('#txtFirstName').val();
        var Surname = $("#txtSurname").val();
        var Email = $("#txtEmail").val();
        var TelNo = $("#txtTelNo").val();
        var UserName = $("#txtUsername").val();
        var Pass = $("#txtPass").val();
        var ConfPass = $("#txtConfPass").val();
        var FB = $("#txtFB").val();
        var Role = $("#ddRoles option:selected").val();


        if (FirstName == '') {
            $("#divAlertBox").css("display", "block");
            $("#divAlertMsgText").html("FirstName cannot be empty");
            $("#divAlertBox").removeClass("alert alert-success");
            $("#divAlertBox").addClass("alert alert-danger");
            $('#divLoadingGifUpdate').removeClass("divLoadingGif");
        } else if (Email == '') {
            $("#divAlertBox").css("display", "block");
            $("#divAlertMsgText").html("Email cannot be empty");
            $("#divAlertBox").removeClass("alert alert-success");
            $("#divAlertBox").addClass("alert alert-danger");
            $('#divLoadingGifUpdate').removeClass("divLoadingGif");
        } else if (UserName == '') {
            $("#divAlertBox").css("display", "block");
            $("#divAlertMsgText").html("UserName cannot be empty");
            $("#divAlertBox").removeClass("alert alert-success");
            $("#divAlertBox").addClass("alert alert-danger");
            $('#divLoadingGifUpdate').removeClass("divLoadingGif");
        } else if (Pass == '') {
            $("#divAlertBox").css("display", "block");
            $("#divAlertMsgText").html("Password cannot be empty");
            $("#divAlertBox").removeClass("alert alert-success");
            $("#divAlertBox").addClass("alert alert-danger");
            $('#divLoadingGifUpdate').removeClass("divLoadingGif");
        } else if (Pass != ConfPass) {
            $("#divAlertBox").css("display", "block");
            $("#divAlertMsgText").html("Passwords does not mach");
            $("#divAlertBox").removeClass("alert alert-success");
            $("#divAlertBox").addClass("alert alert-danger");
            $('#divLoadingGifUpdate').removeClass("divLoadingGif");
        } else if (Role == '') {
            $("#divAlertBox").css("display", "block");
            $("#divAlertMsgText").html("Role cannot be empty");
            $("#divAlertBox").removeClass("alert alert-success");
            $("#divAlertBox").addClass("alert alert-danger");
            $('#divLoadingGifUpdate').removeClass("divLoadingGif");
        }
        else {


            if ((FirstName != '') && (Email != '') && (UserName != '') && (Pass != '') && (Role != '')) {


                var parameters = { FirstName: FirstName, Surname: Surname, Email: Email, TelNo: TelNo, UserName: UserName, Pass: Pass, FB: FB, Role: Role };

                $.post('/AddUser', parameters)
                .done(function (data) {
                    if (data.Result[0].Result == 'Success') {
                        $("#divAlertBox").css("display", "block");
                        $("#divAlertMsgText").html("User added successfully!");
                        $("#divAlertBox").removeClass("alert alert-danger");
                        $("#divAlertBox").addClass("alert alert-success");
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
                    $("#frmLogin").bootstrapValidator('resetForm', true);
                })
                .always(function () {
                    $('#divLoadingGif').removeClass("divLoadingGif");
                    $("#frmLogin").bootstrapValidator('resetForm', true);

                });
            }
            else {
                alert("Please enter required values! (*)");
            }
        }
    });

    $('#btnSearch').on("click", function () {
        $('#divLoadingGif').addClass("divLoadingGif");
        var EmailUsername = $('#txtUsername').val();

        var parameters = { EmailUsername: EmailUsername };

        $.post('/SearchUser', parameters)
        .done(function (data) {
            $('#frmEditUser').css("display", "block");

            var FirstName = $('#txtFirstName').val(data.Result[0].Firstname);
            var Surname = $("#txtSurname").val(data.Result[0].Surname);
            var TelNo = $("#txtTelNo").val(data.Result[0].CellNo);
            var UserName = $("#txtUsername").val(data.Result[0].Username);
            $("#txtEmail").val(data.Result[0].Email);
            var Pass = $("#txtPass").val(data.Result[0].Password);
            var ConfirmPass = $("#txtConfPass").val(data.Result[0].Password);
            var FB = $("#txtFB").val(data.Result[0].FacebookAcc);
            var FB = $("#txtFB").val(data.Result[0].LastLoggedIn);
            $('select[name=ddRoles]').val(data.Result[0].RoleID);
            $('.selectpicker').selectpicker('refresh');

        })
        .fail(function () {
            $('#divLoadingGif').removeClass("divLoadingGif");
        })
        .always(function () {
            $('#divLoadingGif').removeClass("divLoadingGif");
        });

    });


    $('#btnUpdateUser').on("click", function () {
        $('#divLoadingGifUpdate').addClass("divLoadingGif");
        var FirstName = $('#txtFirstName').val();
        var Surname = $("#txtSurname").val();
        var Email = $("#txtEmail").val();
        var TelNo = $("#txtTelNo").val();
        var UserName = $("#txtUsername").val();
        var Pass = $("#txtPass").val();
        var ConfPass = $("#txtConfPass").val();
        var FB = $("#txtFB").val();
        var Role = $("#ddRoles option:selected").val();

        if (FirstName == '') {
            $("#divAlertBox").css("display", "block");
            $("#divAlertMsgText").html("FirstName cannot be empty");
            $("#divAlertBox").removeClass("alert alert-success");
            $("#divAlertBox").addClass("alert alert-danger");
            $('#divLoadingGifUpdate').removeClass("divLoadingGif");
        } else if (Email == '') {
            $("#divAlertBox").css("display", "block");
            $("#divAlertMsgText").html("Email cannot be empty");
            $("#divAlertBox").removeClass("alert alert-success");
            $("#divAlertBox").addClass("alert alert-danger");
            $('#divLoadingGifUpdate').removeClass("divLoadingGif");
        } else if (UserName == '') {
            $("#divAlertBox").css("display", "block");
            $("#divAlertMsgText").html("UserName cannot be empty");
            $("#divAlertBox").removeClass("alert alert-success");
            $("#divAlertBox").addClass("alert alert-danger");
            $('#divLoadingGifUpdate').removeClass("divLoadingGif");
        } else if (Pass == '') {
            $("#divAlertBox").css("display", "block");
            $("#divAlertMsgText").html("Password cannot be empty");
            $("#divAlertBox").removeClass("alert alert-success");
            $("#divAlertBox").addClass("alert alert-danger");
            $('#divLoadingGifUpdate').removeClass("divLoadingGif");
        } else if (Pass != ConfPass) {
            $("#divAlertBox").css("display", "block");
            $("#divAlertMsgText").html("Passwords does not mach");
            $("#divAlertBox").removeClass("alert alert-success");
            $("#divAlertBox").addClass("alert alert-danger");
            $('#divLoadingGifUpdate').removeClass("divLoadingGif");
        } else if (Role == '') {
            $("#divAlertBox").css("display", "block");
            $("#divAlertMsgText").html("Role cannot be empty");
            $("#divAlertBox").removeClass("alert alert-success");
            $("#divAlertBox").addClass("alert alert-danger");
            $('#divLoadingGifUpdate').removeClass("divLoadingGif");
        }
        else {

            var parameters = { FirstName: FirstName, Surname: Surname, Email: Email, Pass: Pass, TelNo: TelNo, UserName: UserName, FB: FB, Role: Role };

            $.post('/UpdateUser', parameters)
            .done(function (data) {
                if (data.Result[0].Result == 'Success') {
                    $("#divAlertBox").css("display", "block");
                    $("#divAlertMsgText").html("User updated successfully!");
                    $("#divAlertBox").removeClass("alert alert-danger");
                    $("#divAlertBox").addClass("alert alert-success");

                }
                else {
                    $("#divAlertBox").css("display", "block");
                    $("#divAlertMsgText").html("Failed! Please try again or contact the site administrator");
                    $("#divAlertBox").removeClass("alert alert-success");
                    $("#divAlertBox").addClass("alert alert-danger");
                }


            })
            .fail(function () {
                $('#divLoadingGifUpdate').removeClass("divLoadingGif");

            })
            .always(function () {
                $('#divLoadingGifUpdate').removeClass("divLoadingGif");
            });
        }


    });



    $('#btnDelete').on("click", function () {
        var UserName = $("#txtUsername").val();

        if (UserName != '')
        {

            if (confirm('Are you sure you want to delete this user?')) {
            

                var parameters = { UserName: UserName };

                $.post('/DeleteUser', parameters)
                .done(function (data) {
                    if (data.Result[0].Result == 'Success') {
                        $("#divAlertBox").css("display", "block");
                        $("#divAlertMsgText").html("User deleted successfully!");
                        $("#divAlertBox").removeClass("alert alert-danger");
                        $("#divAlertBox").addClass("alert alert-success");
                        $("#frmDeleteUser").bootstrapValidator('resetForm', true);
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
        }
        else
        {
            alert("Username can not be empty!");
        }

    });


    $(".UpdateServices").on("click", function () {
        var ServiceID = this.id;
        var parameters = { ServiceID: ServiceID };

        $.post('/GetServiceByID', parameters)
        .done(function (data) {
            $("#txtService").val(data[0].ServiceDesc);
            $("#hidServiceID").val(data[0].ServiceID);
            $('#UpdateServicesModal').modal('toggle');
            var options = {
                "backdrop": "static"
            }

            $('#UpdateServicesModal').modal(options);
        })
        .fail(function () {

        })
        .always(function () {

        });

    });

    $("#btnUpdateService").on("click", function () {
        var ServiceID = $("#hidServiceID").val();
        var ServiceDesc = $("#txtService").val();

        if (ServiceDesc != '') {


            var parameters = { ServiceID: ServiceID, ServiceDesc: ServiceDesc };

            $.post('/UpdateService', parameters)
            .done(function (data) {
                if (data[0].Result == 'Success') {
                    $("#divAlertBoxUpdateS").css("display", "block");
                    $("#divAlertMsgTextUpdateS").html("Service successfully added!");
                    $("#divAlertBoxUpdateS").removeClass("alert alert-danger");
                    $("#divAlertBoxUpdateS").addClass("alert alert-success");

                    setTimeout(function () {
                        $("#divAlertBoxUpdateS").fadeOut("slow", function () {
                            window.location.assign("/Config");
                        });
                    }, 1300);
                }
                else {
                    $("#divAlertBoxUpdateS").css("display", "block");
                    $("#divAlertMsgTextUpdateS").html("An error occurred!");
                    $("#divAlertBoxUpdateS").addClass("alert alert-danger");
                    $("#divAlertBoxUpdateS").removeClass("alert alert-success");
                }
            })
            .fail(function () {

            })
            .always(function () {

            });
        }
        else {
            alert("Service description can not be empty!");
        }
    });

    $("#btnDeleteService").on("click", function () {
        if (confirm('Are you sure you want to delete this service?')) {
            var ServiceID = $("#hidServiceID").val();
            var parameters = { ServiceID: ServiceID };

            $.post('/DeleteService', parameters)
            .done(function (data) {
                if (data[0].Result == 'Success') {
                    $("#divAlertBoxUpdateS").css("display", "block");
                    $("#divAlertMsgTextUpdateS").html("Service deleted successfully!");
                    $("#divAlertBoxUpdateS").removeClass("alert alert-danger");
                    $("#divAlertBoxUpdateS").addClass("alert alert-success");

                    setTimeout(function () {
                        $("#divAlertBoxUpdateS").fadeOut("slow", function () {
                            window.location.assign("/Config");
                        });
                    }, 1300);
                }
                else {
                    $("#divAlertBoxUpdateS").css("display", "block");
                    $("#divAlertMsgTextUpdateS").html("An error occurred!");
                    $("#divAlertBoxUpdateS").addClass("alert alert-danger");
                    $("#divAlertBoxUpdateS").removeClass("alert alert-success");
                }
            })
            .fail(function () {

            })
            .always(function () {

            });
        }
    });

    $("#btnAddService").on("click", function () {
        $('#AddServicesModal').modal('toggle');
        var options = {
            "backdrop": "static"
        }

        $('#AddServicesModal').modal(options);
    });


    $("#btnAddServiceModal").on("click", function () {


        var ServiceDesc = $("#txtServiceDesc").val();
        var parameters = { ServiceDesc: ServiceDesc };

        if (ServiceDesc == '') {
            alert("Service description can not be empty!");
        }
        else {
            $.post('/AddService', parameters)
            .done(function (data) {
                if (data[0].Result == 'Success') {
                    $("#divAlertBoxAdd").css("display", "block");
                    $("#divAlertMsgTextAdd").html("Service added successfully!");
                    $("#divAlertBoxAdd").removeClass("alert alert-danger");
                    $("#divAlertBoxAdd").addClass("alert alert-success");

                    setTimeout(function () {
                        $("#divAlertBoxAdd").fadeOut("slow", function () {
                            window.location.assign("/Config");
                        });
                    }, 1300);
                }
                else {
                    $("#divAlertBoxAdd").css("display", "block");
                    $("#divAlertMsgTextAdd").html("An error occurred!");
                    $("#divAlertBoxAdd").addClass("alert alert-danger");
                    $("#divAlertBoxAdd").removeClass("alert alert-success");
                }
            })
            .fail(function () {

            })
            .always(function () {

            });
        }

    });

    $("#btnForgotPassword").on("click", function () {
        var Email = $("#txtEmail").val();

        if (Email != '') {


            var parameters = { Email: Email };

            $.post('/ForgotPass', parameters)
                .done(function (data) {
                    alert(data.Result);
                    if (data.Result == 'Success') {
                        $("#divAlertBox").css("display", "block");
                        $("#divAlertMsgText").html("You password has been sent. Please check your email!");
                        $("#divAlertBox").removeClass("alert alert-danger");
                        $("#divAlertBox").addClass("alert alert-success");

                        setTimeout(function () {
                            $("#divAlertBox").fadeOut("slow", function () {
                                window.location.assign("/");
                            });
                        }, 5000);
                    }
                    else {
                        $("#divAlertBox").css("display", "block");
                        $("#divAlertMsgTextAdd").html("User not found, please contact the administrator!");
                        $("#divAlertBox").addClass("alert alert-danger");
                        $("#divAlertBox").removeClass("alert alert-success");
                    }
                })
                .fail(function () {

                })
                .always(function () {

                });
        }
        else {
            $("#divAlertBox").css("display", "block");
            $("#divAlertMsgText").html("Please enter an email address before submitting!");
            $("#divAlertBox").addClass("alert alert-danger");
            $("#divAlertBox").removeClass("alert alert-success");
            setTimeout(function () {
                $("#divAlertBox").fadeOut("slow", function () {

                });
            }, 2000);
        }
    });

    $('#frmUpdateService').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            txtService: {
                validators: {
                    notEmpty: {
                        message: 'Service description can not be empty'
                    }
                }
            }
        }
    });

    $('#frmAddService').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            txtServiceDesc: {
                validators: {
                    notEmpty: {
                        message: 'Service description can not be empty'
                    }
                }
            }
        }
    });

    $('#frmAddService').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            txtServiceDesc: {
                validators: {
                    notEmpty: {
                        message: 'Service description can not be empty'
                    }
                }
            }
        }
    });



    $('#frmEditUser').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            txtEmail: {
                validators: {
                    notEmpty: {
                        message: 'The email is required'
                    },
                    emailAddress: {
                        message: 'The email address is not a valid'
                    }
                }
            },
            txtUsername: {
                validators: {
                    notEmpty: {
                        message: 'The username is required'
                    }
                }
            },
            txtPass: {
                validators: {
                    notEmpty: {
                        message: 'The password is required'
                    },
                    different: {
                        field: 'txtUsername',
                        message: 'The password cannot be the same as username'
                    },
                    stringLength: {
                        min: 6,
                        message: 'The password must have at least 6 characters'
                    }
                }
            },
            txtConfPass: {
                validators: {
                    notEmpty: {
                        message: 'The confirm password is required'
                    },
                    identical: {
                        field: 'txtPass',
                        message: 'The password and its confirm are not the same'
                    },
                    stringLength: {
                        min: 6,
                        message: 'The password must have at least 6 characters'
                    }
                }
            }
        }
    });


    $('#frmAddUser').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            txtFirstName: {
                validators: {
                    notEmpty: {
                        message: 'The firstname is required'
                    }
                }
            },
            txtSurname: {
                validators: {
                    notEmpty: {
                        message: 'The surname is required'
                    }
                }
            },
            txtEmail: {
                validators: {
                    notEmpty: {
                        message: 'The email is required'
                    },
                    emailAddress: {
                        message: 'The email address is not a valid'
                    }
                }
            },
            txtUsername: {
                validators: {
                    notEmpty: {
                        message: 'The username is required'
                    }
                }
            },
            txtPass: {
                validators: {
                    notEmpty: {
                        message: 'The password is required'
                    },
                    different: {
                        field: 'txtUsername',
                        message: 'The password cannot be the same as username'
                    },
                    stringLength: {
                        min: 6,
                        message: 'The password must have at least 6 characters'
                    }
                }
            },
            txtConfPass: {
                validators: {
                    notEmpty: {
                        message: 'The confirm password is required'
                    },
                    identical: {
                        field: 'txtPass',
                        message: 'The password and its confirm are not the same'
                    },
                    stringLength: {
                        min: 6,
                        message: 'The password must have at least 6 characters'
                    }
                }
            }
        }
    });


    $('#frmLogin').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            txtUsername: {
                validators: {
                    notEmpty: {
                        message: 'The username is required'
                    }
                }
            },
            txtPassword: {
                validators: {
                    notEmpty: {
                        message: 'The password is required'
                    },
                    stringLength: {
                        min: 6,
                        message: 'The password must have at least 6 characters'
                    }
                }
            }
        }
    });












});