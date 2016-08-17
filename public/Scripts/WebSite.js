$(document).ready(function () {

    $("#lkLogout").on("click", function () {
        window.location.assign("LogOut");
    });

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

        if (UserName != '') {

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
        else {
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



    $(".UpdateBreed").on("click", function () {
        var BreedIDArr = this.id.split('-');
        var BreedID = BreedIDArr[1];
        var parameters = { BreedID: BreedID };

        $.post('/GetBreedByID', parameters)
        .done(function (data) {
            $("#txtBreed").val(data[0].Breed);
            $("#hidBreedID").val(data[0].ID);
            $('#UpdateBreedModal').modal('toggle');
            var options = {
                "backdrop": "static"
            }

            $('#UpdateBreedModal').modal(options);
        })
        .fail(function () {

        })
        .always(function () {

        });

    });

    $("#btnUpdateBreed").on("click", function () {
        var BreedName = document.getElementById("txtBreed").value;
        var BreedID = document.getElementById("hidBreedID").value;

        var parameters = { BreedID: BreedID, BreedName: BreedName };

        $.post('/UpdateDogBreed', parameters)
            .done(function (data) {
                if (data[0].Result == 'Success') {
                    $("#divAlertBoxUpdateBreed").css("display", "block");
                    $("#divAlertMsgTextUpdateBreed").html("Dog breed updated successfully");
                    $("#divAlertBoxUpdateBreed").removeClass("alert alert-danger");
                    $("#divAlertBoxUpdateBreed").addClass("alert alert-success");

                    setTimeout(function () {
                        $("#divAlertBoxUpdateBreed").fadeOut("slow", function () {
                            window.location.assign("/Config");
                        });
                    }, 2000);
                }
                else {
                    $("#divAlertBoxUpdateBreed").css("display", "block");
                    $("#divAlertMsgTextUpdateBreed").html("An error occurred. Please contact the site administrator");
                    $("#divAlertBoxUpdateBreed").addClass("alert alert-danger");
                    $("#divAlertBoxUpdateBreed").removeClass("alert alert-success");
                }
            })
            .fail(function () {

            })
            .always(function () {

            });

    });

    $("#btnDeleteBreed").on("click", function () {
        if (confirm('Are you sure you want to delete this dog breed?')) {
            var BreedID = document.getElementById("hidBreedID").value;
            var parameters = { BreedID: BreedID };

            $.post('/DeletDogBreed', parameters)
                .done(function (data) {
                    if (data[0].Result == 'Success') {
                        $("#divAlertBoxUpdateBreed").css("display", "block");
                        $("#divAlertMsgTextUpdateBreed").html("Dog breed deleted successfully");
                        $("#divAlertBoxUpdateBreed").removeClass("alert alert-danger");
                        $("#divAlertBoxUpdateBreed").addClass("alert alert-success");

                        setTimeout(function () {
                            $("#divAlertBoxUpdateBreed").fadeOut("slow", function () {
                                window.location.assign("/Config");
                            });
                        }, 2000);
                    }
                    else {
                        $("#divAlertBoxUpdateBreed").css("display", "block");
                        $("#divAlertMsgTextUpdateBreed").html("An error occurred. Please contact the site administrator");
                        $("#divAlertBoxUpdateBreed").addClass("alert alert-danger");
                        $("#divAlertBoxUpdateBreed").removeClass("alert alert-success");
                    }
                })
                .fail(function () {

                })
                .always(function () {

                });

        }
    });


    $("#btnAddBreed").on("click", function () {
        $('#AddBreedModal').modal('toggle');
        var options = {
            "backdrop": "static"
        }

        $('#AddBreedModal').modal(options);
    });

    $("#btnAddBreedModal").on("click", function () {
        var DogBreed = document.getElementById("txtBreedDesc").value;

        var parameters = { DogBreed: DogBreed };

        $.post('/AddDogBreed', parameters)
            .done(function (data) {
                if (data[0].Result == 'Success') {
                    $("#divAlertBoxAddBreed").css("display", "block");
                    $("#divAlertMsgTextAddBreed").html("Dog breed addded successfully");
                    $("#divAlertBoxAddBreed").removeClass("alert alert-danger");
                    $("#divAlertBoxAddBreed").addClass("alert alert-success");

                    setTimeout(function () {
                        $("#divAlertBoxAddBreed").fadeOut("slow", function () {
                            window.location.assign("/Config");
                        });
                    }, 2000);
                }
                else {
                    $("#divAlertBoxAddBreed").css("display", "block");
                    $("#divAlertMsgTextAddBreed").html("An error occurred. Please contact the site administrator");
                    $("#divAlertBoxAddBreed").addClass("alert alert-danger");
                    $("#divAlertBoxAddBreed").removeClass("alert alert-success");
                }
            })
            .fail(function () {

            })
            .always(function () {

            });
    });




    $("#btnForgotPassword").on("click", function () {
        var Email = $("#txtEmail").val();

        if (Email != '') {


            var parameters = { Email: Email };

            $.post('/ForgotPass', parameters)
                .done(function (data) {
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

    $("#btnAddVetModal").on("click", function (e) {
        e.preventDefault();
        var Firstname = $("#txtVetFirstName").val();
        var Surname = $("#txtVetSurname").val();

        var parameters = { Firstname: Firstname, Surname: Surname };
        if (Firstname != '') {


            $.post('/AddVet', parameters)
                .done(function (data) {
                    if (data[0].VetID != '-1') {
                        $("#divAlertBoxAddVet").css("display", "block");
                        $("#divAlertMsgTextAddVet").html("Vet added successfully!");
                        $("#divAlertBoxAddVet").removeClass("alert alert-danger");
                        $("#divAlertBoxAddVet").addClass("alert alert-success");
                        
                        setTimeout(function () {
                            $("#divAlertBoxAddVet").fadeOut("slow", function () {
                                window.location.assign("/Config");
                            });
                        }, 3000);
                    }
                    else {
                        $("#divAlertBoxAddVet").css("display", "block");
                        $("#divAlertMsgTextAddVet").html("Vet already exist!");
                        $("#divAlertBoxAddVet").addClass("alert alert-danger");
                        $("#divAlertBoxAddVet").removeClass("alert alert-success");
                    }
                })
                .fail(function () {

                })
                .always(function () {

                });
        }
    });


    
    $("#btnUpdateVetModal").on("click", function (e) {
        e.preventDefault();
        var VetID = $("#hidVetID").val();
        var Firstname = $("#txtVetUpdateFirstName").val();
        var Surname = $("#txtVetUpdateSurname").val();

        var parameters = { VetID: VetID, Firstname: Firstname, Surname: Surname };
        if (Firstname != '') {


            $.post('/UpdateVet', parameters)
                .done(function (data) {
                    if (data[0].Result == 'Success') {
                        $("#divAlertBoxUpdateVet").css("display", "block");
                        $("#divAlertMsgTextUpdateVet").html("Vet update successfully!");
                        $("#divAlertBoxUpdateVet").removeClass("alert alert-danger");
                        $("#divAlertBoxUpdateVet").addClass("alert alert-success");

                        setTimeout(function () {
                            $("#divAlertBoxUpdateVet").fadeOut("slow", function () {
                                window.location.assign("/Config");
                            });
                        }, 2000);
                    }
                    else {
                        $("#divAlertBoxUpdateVet").css("display", "block");
                        $("#divAlertMsgTextUpdateVet").html("Unable to Update! Please contact support");
                        $("#divAlertBoxUpdateVet").addClass("alert alert-danger");
                        $("#divAlertBoxUpdateVet").removeClass("alert alert-success");
                    }
                })
                .fail(function () {

                })
                .always(function () {

                });
        }
    });

    


    $("#btnAddVet").on("click", function () {
        $('#AddVetModal').modal('toggle');

        var options = {
            "backdrop": "static"
        }

        $('#AddVetModal').modal(options);
    });

    $(".UpdateVet").on("click", function () {
        var VetID = this.id;
        VetIDArr = VetID.split('-');
        VetID = VetIDArr[1];

        var parameters = { VetID: VetID };
        $.post('/GetVetByID', parameters)
            .done(function (data) {
                data[0].VetFirstname;
                $('#txtVetUpdateFirstName').val(data[0].VetFirstname);
                $('#txtVetUpdateSurname').val(data[0].VetSurname);
                $('#hidVetID').val(data[0].ID);

                //var Result = data.Resluts[0];
                //alert(Result.VetFirstname)
                $('#UpdateVetModal').modal('toggle');
                var options = {
                    "backdrop": "static"
                }

                $('#UpdateVetModal').modal(options);

            })
            .fail(function () {

            })
            .always(function () {

            });

        

        
    });

    $("#btnAddDiscount").on("click", function () {
        $('#AddDiscountModal').modal('toggle');

        var options = {
            "backdrop": "static"
        }

        $('#AddDiscountModal').modal(options);
    });


    var color = '';
    $("#btnAddDiscModal").on("click", function (e) {
        e.preventDefault();
        color = '';
        var DiscDesc = $("#txtDiscName").val();
        var DiscAmountPerc = $("#txtAmountPerc").val();
        var parameters = { DiscountDesc: DiscDesc };

        
        var x = $("#btncolorPicker").css('backgroundColor');
        hexc(x);

        var parameters = { DiscDesc: DiscDesc, DiscAmountPerc: DiscAmountPerc, color: color };
        
        $.post('/AddDiscount', parameters)
            .done(function (data) {

                if (data[0].Result > 0)
                {
                    $("#divAlertBoxAddDisc").css("display", "block");
                    $("#divAlertMsgTextAddSic").html("Discount added successfully!");
                    $("#divAlertBoxAddDisc").removeClass("alert alert-danger");
                    $("#divAlertBoxAddDisc").addClass("alert alert-success");

                    setTimeout(function () {
                        $("#divAlertBoxAddDisc").fadeOut("slow", function () {
                            window.location.assign("/Config");
                        });
                    }, 2000);
                }
                else
                {
                    $("#divAlertBoxAddDisc").css("display", "block");
                    $("#divAlertMsgTextAddSic").html("Unable to add discount! Please contact the systems administrator.");
                    $("#divAlertBoxAddDisc").addClass("alert alert-danger");
                    $("#divAlertBoxAddDisc").removeClass("alert alert-success");
                }

            })
            .fail(function () {

            })
            .always(function () {

            });

    });

    $(".UpdateDisc").on("click", function (e) {
        e.preventDefault();

        var DiscountID = this.id;
        DiscountIDArr = DiscountID.split('-');
        DiscountID = DiscountIDArr[1];

        var parameters = { DiscountID: DiscountID };

        $.post('/GetDiscount', parameters)
            .done(function (data) {

                
                $("#hidDiscID").val(data[0].ID);
                $("#txtUpdateDiscName").val(data[0].DiscountDesc);
                $("#txtUpdateAmountPerc").val(data[0].DiscountAmtPerc);
                
                $("#btnUpdatecolorPicker").css("background-color", data[0].Color);
            })
            .fail(function () {

            })
            .always(function () {

            });

        $('#UpdateDiscountModal').modal('toggle');

        var options = {
            "backdrop": "static"
        }

        $('#UpdateDiscountModal').modal(options);
        
    });

    $("#btnUpdateDiscModal").on("click", function (e) {
        e.preventDefault();
        color = '';

        var DiscID = $("#hidDiscID").val();
        var DiscDesc = $("#txtUpdateDiscName").val();
        var DiscAmtPerc = $("#txtUpdateAmountPerc").val();
        var x = $("#btnUpdatecolorPicker").css('backgroundColor');
        hexc(x);

        var parameters = { DiscID: DiscID, DiscDesc: DiscDesc, DiscAmtPerc: DiscAmtPerc, color: color };

        $.post('/UpdateDiscount', parameters)
            .done(function (data) {
                if (data[0].Result == 'Success')
                {
                    $("#divAlertBoxUpdateDisc").css("display", "block");
                    $("#divAlertMsgTextUpdateSic").html("Discount updated successfully!");
                    $("#divAlertBoxUpdateDisc").removeClass("alert alert-danger");
                    $("#divAlertBoxUpdateDisc").addClass("alert alert-success");

                    setTimeout(function () {
                        $("#divAlertBoxUpdateDisc").fadeOut("slow", function () {
                            window.location.assign("/Config");
                        });
                    }, 2000);
                }
                else
                {
                    $("#divAlertBoxUpdateDisc").css("display", "block");
                    $("#divAlertMsgTextUpdateSic").html("Unable to update discount! Please contact the systems administrator.");
                    $("#divAlertBoxUpdateDisc").addClass("alert alert-danger");
                    $("#divAlertBoxUpdateDisc").removeClass("alert alert-success");
                }
            })
            .fail(function () {

            })
            .always(function () {

            });

    });
    
    

    function hexc(colorval) {
        var parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        delete (parts[0]);
        for (var i = 1; i <= 3; ++i) {
            parts[i] = parseInt(parts[i]).toString(16);
            if (parts[i].length == 1) parts[i] = '0' + parts[i];
        }
        color = '#' + parts.join('');
    }
    

    $('#frmAddDisc').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            txtDiscName: {
                validators: {
                    notEmpty: {
                        message: 'Discount description can not be empty'
                    }
                }
            },
            txtAmountPerc: {
                validators: {
                    notEmpty: {
                        message: 'Amount or % can not be empty'
                    }
                }
            }
        }
    });
    

    $('#frmUpdateVet').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            txtVetUpdateFirstName: {
                validators: {
                    notEmpty: {
                        message: 'Firstname can not be empty'
                    }
                }
            }
        }
    });

    $('#frmAddVet').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            txtVetFirstName: {
                validators: {
                    notEmpty: {
                        message: 'Firstname can not be empty'
                    }
                }
            }
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






    //Prevent a form from submiting on enter key press
    $("#frmLogin").submit(function () {
        return false;
    });

    $("#txtPassword").keyup(function (event) {
        if (event.keyCode == 13) {
            $("#btnLogin").click();
        }
    });

    $("#txtUsername").keyup(function (event) {
        if (event.keyCode == 13) {
            $("#btnLogin").click();
        }
    });








});