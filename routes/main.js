var express = require('express');
var router = express.Router();
var DA = require('../models/da.js');
var hbs = require('hbs');
var http = require('http');
var async = require('async');
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var mkdirp = require('mkdirp');
var dir = require('node-dir');
var Mailgun = require('mailgun-js');


hbs.registerHelper('ifCond', function (v1, v2, options) {
    if (v1 === v2) {
        return options.fn(this);
    }
    return options.inverse(this);
});

hbs.registerHelper("everyOther", function (index, amount, scope) {
    if (++index % amount)
        return scope.inverse(this);
    else
        return scope.fn(this);
});

router.get('/test', function (req, res, next) {
    res.render('Test', { layout: 'AdminLayout', MenuActive: 'AdminHome' });
});

router.get('/', function (req, res, next) {
    res.render('login');
});

router.get('/LogOut', function (req, res, next) {
    req.session.UserID = null;
    res.render('login');
});

router.get('/forgotpassword', function (req, res, next) {
    res.render('forgotpassword');
});


router.post('/ForgotPass', function (req, res, next) {
    //Password Encryption
    var crypto = require('crypto')
      , key = 'salt_from_the_user_document'
      , cipher = crypto.createCipher('aes-256-cbc', key)
      , decipher = crypto.createDecipher('aes-256-cbc', key);

    var Email = req.param("Email");
    var locals = {};

    DA.GetUserByEmailOrUsername(Email, function (LoginResluts, err) {
        console.log(LoginResluts);
        if (LoginResluts.length > 0) {
            locals.Result = "Success";

            var UserName = LoginResluts[0].Username;
            var Password = LoginResluts[0].Password;
            var API_key = 'key-cfd8f5933f8139e106f76ef1e419ccef';
            var domain = 'kayra.ro';
            var from = 'noreply@kayra.ro';
            //We pass the api_key and domain to the wrapper, or it won't be able to identify + send emails
            var mailgun = new Mailgun({ apiKey: API_key, domain: domain });

            //Decrypting Password
            decipher.update(encryptedPassword, 'base64', 'utf8');
            var decryptedPassword = decipher.final('utf8');

            var msg = '<p>Your login details for Salon Kayra follows: </p>';
            msg += 'Username: ' + UserName + "<br>";
            msg += 'Password: ' + decryptedPassword + "<br>";

            var data = {
                //Specify email data
                from: from,
                //The email to contact
                to: Email,
                //Subject and text data  
                subject: 'Salon Kayra Login Details',
                html: msg
            }


            //Invokes the method to send emails given the above data with the helper library
            mailgun.messages().send(data, function (err, body) {
                //If there is an error, render the error page
                if (err) {
                    res.render('error', { error: err });
                    console.log("got an error: ", err);
                }
                    //Else we can greet    and leave
                else {
                    //Here "submitted.jade" is the view file for this landing page 
                    //We pass the variable "email" from the url parameter in an object rendered by Jade
                    res.render('submitted', { email: req.params.mail });
                    console.log(body);
                }
            });


        }
        else {
            locals.Result = "UserNotFound";
        }
        console.log(locals);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(locals));

    });
});

router.post('/LogUserIn', function (req, res, next) {
    //Password Encryption
    var crypto = require('crypto')
      , key = 'salt_from_the_user_document'
      , cipher = crypto.createCipher('aes-256-cbc', key)
      , decipher = crypto.createDecipher('aes-256-cbc', key);

    var Username = req.param("Username");
    var Password = req.param("Password");
    var locals = {};

    //Encrypting Password
    cipher.update(Password, 'utf8', 'base64');
    var encryptedPassword = cipher.final('base64');

    DA.CheckUserLogin(Username, encryptedPassword, function (LoginResluts, err) {
        if (LoginResluts.length > 0) {
            req.session.UserRole = LoginResluts[0].RoleID;
            locals.Result = 'Allow';
            req.session.RoleID = LoginResluts[0].RoleID;
            req.session.UserID = LoginResluts[0].ID;
            locals.Role = LoginResluts[0].RoleID;
        }
        else {
            locals.Result = 'deny';
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(locals));
    });


});

router.get('/GroomerHome', Authenticate, function (req, res, next) {
    res.render('groomer');
});

router.get('/AdminHome', Authenticate, function (req, res, next) {
    res.render('Admin/Home', { layout: 'AdminLayout', MenuActive: 'AdminHome', RoleID: req.session.RoleID });
});

router.get('/AddUsers', Authenticate, function (req, res, next) {
    res.render('Admin/AddUsers', { layout: 'AdminLayout', MenuActive: 'AdminUsers', RoleID: req.session.RoleID });
});

router.get('/EditUsers', Authenticate, function (req, res, next) {

    DA.GetAllUsers(function (UsersResluts, err) {
        res.render('Admin/EditUsers', { layout: 'AdminLayout', MenuActive: 'AdminUsers', Users: UsersResluts, RoleID: req.session.RoleID });
    });
});

router.post('/DeleteAppointment', Authenticate, function (req, res, next) {
    var AppointmentID = req.param("AppointmentID");
    DA.DeleteAppointment(AppointmentID, function (DeleteResluts, err) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(DeleteResluts));
    })
});

router.get('/Appointments', Authenticate, function (req, res, next) {
    var locals = {};
    var AppointmentsArr = [];
    async.series([
        function (callback) {
            DA.GetServices(function (ServicesResluts, err) {
                locals.ServicesResluts = ServicesResluts;
                callback();
            });
        },
        function (callback) {
            DA.GetAllDogAppointments(function (AppointmentsResluts, err) {
                locals.DogAppointments = AppointmentsResluts;

                for (i = 0; i < AppointmentsResluts.length; i++) {
                    if (AppointmentsResluts[i].AppointmentID != null) {


                        var AppointmentID = AppointmentsResluts[i].AppointmentID;
                        var DogID = AppointmentsResluts[i].DogID;
                        var DogBreed = AppointmentsResluts[i].DogBreed;
                        var DogName = AppointmentsResluts[i].DogName;
                        var OwnerFirstName = AppointmentsResluts[i].OwnerFirstName;
                        var OwnerSurname = AppointmentsResluts[i].OwnerSurname;
                        var TelNo = AppointmentsResluts[i].TelNo;
                        var Email = AppointmentsResluts[i].Email;
                        var Facebook = AppointmentsResluts[i].Facebook;
                        var Notes = AppointmentsResluts[i].Notes;
                        var DogImg = AppointmentsResluts[i].DogImg;

                        var JSStartDate = AppointmentsResluts[i].StartTime;
                        var StartSec = JSStartDate.getSeconds();
                        var StartMin = JSStartDate.getMinutes();
                        var StartHour = JSStartDate.getHours();
                        var StartDay = JSStartDate.getDate();
                        var StartMonth = JSStartDate.getMonth();
                        StartMonth = StartMonth + 1;
                        var StartYear = JSStartDate.getFullYear();


                        var StartTime = StartYear + '-' + ('0' + StartMonth).slice(-2) + '-' + ('0' + StartDay).slice(-2) + ' ' + ('0' + StartHour).slice(-2) + ':' + ('0' + StartMin).slice(-2) + ':' + ('0' + StartSec).slice(-2);

                        var JSEndDate = AppointmentsResluts[i].EndDate;
                        var EndSec = JSEndDate.getSeconds();
                        var EndMin = JSEndDate.getMinutes();
                        var EndHour = JSEndDate.getHours();
                        var EndDay = JSEndDate.getDate();
                        var EndMonth = JSEndDate.getMonth();
                        EndMonth = EndMonth + 1;
                        var EndYear = JSEndDate.getFullYear();
                        var EndDate = EndYear + '-' + ('0' + EndMonth).slice(-2) + '-' + ('0' + EndDay).slice(-2) + ' ' + ('0' + EndHour).slice(-2) + ':' + ('0' + EndMin).slice(-2) + ':' + ('0' + EndSec).slice(-2);

                        var ServiceIDsArr = AppointmentsResluts[i].ServicesID.split(",");

                        var AppNotes = AppointmentsResluts[i].AppNotes;

                        var Period = AppointmentsResluts[i].Period;

                        var Appointments = { AppointmentID: AppointmentID, DogID: DogID, DogBreed: DogBreed, DogName: DogName, OwnerFirstName: OwnerFirstName, TelNo: TelNo, Email: Email, Facebook: Facebook, Notes: Notes, DogImg: DogImg, StartTime: StartTime, EndDate: EndDate, Period: Period, AppNotes: AppNotes, ServiceIDsArr: ServiceIDsArr }
                        AppointmentsArr.push(Appointments);

                    }
                }
                locals.DogAppointments = AppointmentsArr;

                callback();
            });

        }
    ],
    function (err) {
        res.render('Appointments', { layout: 'AdminLayout', MenuActive: 'Appointments', Services: locals.ServicesResluts, Appointments: locals.DogAppointments, RoleID: req.session.RoleID });
    });
});

router.post('/ViewAppointmentDetails', Authenticate, function (req, res, next) {
    var AppointmentID = req.param("AppointmentID");
    var AppointmentsArr = [];
    var locals = {};

    DA.GetAppointmentByID(AppointmentID, function (AppointmentsResluts, err) {



        for (i = 0; i < AppointmentsResluts.length; i++) {
            if (AppointmentsResluts[i].AppointmentID != null) {


                var AppointmentID = AppointmentsResluts[i].AppointmentID;
                var DogID = AppointmentsResluts[i].DogID;
                var DogBreed = AppointmentsResluts[i].DogBreed;
                var DogName = AppointmentsResluts[i].DogName;
                var OwnerFirstName = AppointmentsResluts[i].OwnerFirstName;
                var OwnerSurname = AppointmentsResluts[i].OwnerSurname;
                var TelNo = AppointmentsResluts[i].TelNo;
                var Email = AppointmentsResluts[i].Email;
                var Facebook = AppointmentsResluts[i].Facebook;
                var Price = AppointmentsResluts[i].Price;
                var PriceNotes = AppointmentsResluts[i].PriceNotes;
                var AppNotes = AppointmentsResluts[i].AppNotes;

                var JSStartDate = AppointmentsResluts[i].StartTime;
                var StartSec = JSStartDate.getSeconds();
                var StartMin = JSStartDate.getMinutes();
                var StartHour = JSStartDate.getHours();
                var StartDay = JSStartDate.getDate();
                var StartMonth = JSStartDate.getMonth();
                StartMonth = StartMonth + 1;
                var StartYear = JSStartDate.getFullYear();


                var StartTime = StartYear + '-' + ('0' + StartMonth).slice(-2) + '-' + ('0' + StartDay).slice(-2) + ' ' + ('0' + StartHour).slice(-2) + ':' + ('0' + StartMin).slice(-2) + ':' + ('0' + StartSec).slice(-2);

                var JSEndDate = AppointmentsResluts[i].EndDate;
                var EndSec = JSEndDate.getSeconds();
                var EndMin = JSEndDate.getMinutes();
                var EndHour = JSEndDate.getHours();
                var EndDay = JSEndDate.getDate();
                var EndMonth = JSEndDate.getMonth();
                EndMonth = EndMonth + 1;
                var EndYear = JSEndDate.getFullYear();
                var EndDate = EndYear + '-' + ('0' + EndMonth).slice(-2) + '-' + ('0' + EndDay).slice(-2) + ' ' + ('0' + EndHour).slice(-2) + ':' + ('0' + EndMin).slice(-2) + ':' + ('0' + EndSec).slice(-2);

                var ServiceIDsArr = AppointmentsResluts[i].ServicesID.split(",");



                var Period = AppointmentsResluts[i].Period;

                var Appointments = { AppointmentID: AppointmentID, DogID: DogID, DogBreed: DogBreed, DogName: DogName, OwnerFirstName: OwnerFirstName, TelNo: TelNo, Email: Email, Facebook: Facebook, StartTime: StartTime, EndDate: EndDate, Period: Period, Price: Price, PriceNotes: PriceNotes, AppNotes: AppNotes, ServiceIDsArr: ServiceIDsArr }
                AppointmentsArr.push(Appointments);

            }
        }

        locals.AppointmentsResluts = AppointmentsArr;

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(locals));
    });
});

router.post('/uploadImage', Authenticate, function (req, res, next) {
    // create an incoming form object
    var form = new formidable.IncomingForm();

    // specify that we want to allow the user to upload multiple files in a single request
    form.multiples = true;

    // store all uploads in the /uploads directory
    form.uploadDir = path.join(__dirname, '../public/images/DogImages');

    form.on('field', function (field, value) {

        // every time a file has been uploaded successfully,
        // rename it to it's orignal name
        form.on('file', function (field, file) {
            var Directory = form.uploadDir + '\\' + value;

            if (!fs.existsSync(Directory)) {
                fs.mkdirSync(Directory);
            }

            fs.rename(file.path, Directory + '\\' + file.name);
        });
    });

    // log any errors that occur
    form.on('error', function (err) {
        console.log('An error has occured: \n' + err);
    });

    // once all the files have been uploaded, send a response to the client
    form.on('end', function () {
        res.end('success');
    });

    // parse the incoming request containing the form data
    form.parse(req);

})

router.post('/GetDogImages', Authenticate, function (req, res, next) {
    var DogID = req.param("DogID");


    var dirpath = __dirname + 'public\\images\\DogImages\\' + DogID + '\\';;
    dirpath = dirpath.replace("routes", "");
    dirpath = dirpath.replace(/\\/g, "\\\\");
    dirpath2 = dirpath.replace(/\\\\/g, "\\");


    var DirectoryArray = [];
    var FileArr = [];
    var FileArr1 = [];


    async.series([
        function (callback) {
            dir.files(dirpath, function (err, files) {
                if (err) next();
                console.log(files);
                DirectoryArray.push(files);
                callback();
            });
        },
        function (callback) {
            //if (DirectoryArray[0]) {
            //    for (i = 0; i < DirectoryArray.length; i++) {
            //        var filestr = DirectoryArray[i].toString();
            //        FileArr = filestr.split(',');
            //        for (i1 = 0; i1 < FileArr.length; i1++) {
            //            var f = FileArr[i1].replace(dirpath2);
            //            f = f.replace("undefined", "");
            //            f = '\\images\\DogImages\\' + DogID + '\\' + f;
            //            FileArr1.push(f)
            //        }

            //    }
            //}
            callback();
        }
    ],
    function (err) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(FileArr1));
    });




    //dir.readFiles(dirpath, function (err, content, filename, next) {

    //    var Fname = filename;
    //    Fname = Fname.replace(dirpath2);
    //    Fname = Fname.replace("undefined", "");
    //    Fname = '\\images\\DogImages\\' + DogID + '\\' + Fname;
    //    DirectoryArray.push(Fname);
    //    next();
    //    //callback();
    //});








});


router.post('/UpdateAppointment', Authenticate, function (req, res, next) {
    var AppointmentID = req.param("AppointmentID");
    var StartDate = req.param("StartDate");
    var EndDate = req.param("EndDate");
    var Price = req.param("Price");
    var Pricenotes = req.param("Pricenotes");
    var AppNotes = req.param("AppNote");
    var locals = {};




    DA.UpdateAppointment(AppointmentID, StartDate, EndDate, AppNotes, Price, Pricenotes, function (AppointmentsUpdateResluts, err) {
        locals.AppointmentsUpdateResluts = AppointmentsUpdateResluts;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(locals));
    });


});


router.get('/SearchDog', Authenticate, function (req, res, next) {
    var DogName = req.query.DogName;
    var Bread = req.query.Bread;
    var FirstName = req.query.FirstName;
    var Surname = req.query.Surname;
    var Email = req.query.Email;
    var Vet = req.query.Vet;
    var locals = {};


    async.series([
        function (callback) {
            DA.GetServices(function (ServicesResluts, err) {
                locals.ServicesResluts = ServicesResluts;
                callback();
            });
        },
        function (callback) {
            DA.GetAllDogs(DogName, Bread, FirstName, Surname, Email, Vet, function (DogResluts, err) {
                locals.Dogs = DogResluts;
                callback();
            });
        },
        function (callback) {
            DA.GetBreeds(-1, function (BreedResluts, err) {
                locals.Breeds = BreedResluts;
                callback();
            });
        },
        function (callback) {
            DA.GetVetByID(-1, function (Resluts, err) {
                locals.Vets = Resluts;
                callback();
            });
        }
    ],
    function (err) {
        res.render('Admin/Profile', { layout: 'AdminLayout', MenuActive: 'Profile', Services: locals.ServicesResluts, Dogs: locals.Dogs, AppHist: locals.HistResluts, Breeds: locals.Breeds, Vets: locals.Vets, RoleID: req.session.RoleID });
    });


});

router.get('/Profile', Authenticate, function (req, res, next) {
    var locals = {};
    var AppointmentsArr = [];
    async.series([
        function (callback) {
            DA.GetServices(function (ServicesResluts, err) {
                locals.ServicesResluts = ServicesResluts;
                callback();
            });
        },
        function (callback) {
            DA.GetAllDogs('', -1, '', '', '', -1, function (DogResluts, err) {
                locals.Dogs = DogResluts;
                callback();
            });
        },
        function (callback) {
            DA.GetBreeds(-1, function (BreedResluts, err) {
                locals.Breeds = BreedResluts;
                callback();
            });
        },
        function (callback) {
            DA.GetVetByID(-1, function (Resluts, err) {
                locals.Vets = Resluts;
                callback();
            });
        },
        function (callback) {
            DA.GetDiscount(-1, function (Resluts, err) {
                locals.Discounts = Resluts;
                callback();
            });
        }


    ],
    function (err) {
        console.log(req.session.RoleID);
        res.render('Admin/Profile', { layout: 'AdminLayout', MenuActive: 'Profile', Services: locals.ServicesResluts, Dogs: locals.Dogs, AppHist: locals.HistResluts, Breeds: locals.Breeds, Vets: locals.Vets, Disccounts: locals.Discounts, RoleID: req.session.RoleID });
    });
});

router.post('/GetDogHistory', Authenticate, function (req, res, next) {
    var locals = {};
    var DogID = req.param("DogID");
    var AppHistArr = [];
    DA.GetAppointmentHistory(DogID, function (HistResluts, err) {
        for (i = 0; i < HistResluts.length; i++) {
            var AppointmentID = HistResluts[i].AppointmentID;
            var DogID = HistResluts[i].DogID;
            var DogName = HistResluts[i].DogName;
            var OwnerName = HistResluts[i].OwnerFirstName + ' ' + HistResluts[i].OwnerSurname;
            var Price = HistResluts[i].Price;
            var PriceNote = HistResluts[i].PriceNotes;

            var JSStartDate = HistResluts[i].StartTime;
            var StartSec = JSStartDate.getSeconds();
            var StartMin = JSStartDate.getMinutes();
            var StartHour = JSStartDate.getHours();
            var StartDay = JSStartDate.getDate();
            var StartMonth = JSStartDate.getMonth();
            StartMonth = StartMonth + 1;
            var StartYear = JSStartDate.getFullYear();

            var StartTime = StartYear + '-' + ('0' + StartMonth).slice(-2) + '-' + ('0' + StartDay).slice(-2) + ' ' + ('0' + StartHour).slice(-2) + ':' + ('0' + StartMin).slice(-2) + ':' + ('0' + StartSec).slice(-2);
            var Services = HistResluts[i].Services;

            var Hist = { DogName: DogName, OwnerName: OwnerName, StartTime: StartTime, Services: Services, Price: Price, PriceNote: PriceNote }
            AppHistArr.push(Hist);
        }

        locals.Result = AppHistArr

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(locals));

    });
});


router.get('/DeleteUser', Authenticate, function (req, res, next) {

    DA.GetAllUsers(function (UsersResluts, err) {
        res.render('Admin/DeleteUser', { layout: 'AdminLayout', MenuActive: 'AdminUsers', Users: UsersResluts, RoleID: req.session.RoleID });
    });
});

router.get('/Config', Authenticate, function (req, res, next) {


    var locals = {};
    async.series([
        function (callback) {
            DA.GetBreeds(-1, function (BreedResluts, err) {
                locals.Breeds = BreedResluts;
                callback();
            });
        },
        function (callback) {
            DA.GetServices(function (ServicesResluts, err) {
                locals.Services = ServicesResluts;
                callback();
            });
        },
        function (callback) {
            DA.GetVets(-1, function (VetResluts, err) {
                locals.Vets = VetResluts;
                callback();
            });
        },
        function (callback) {
            DA.GetDiscount(-1, function (DiscResluts, err) {
                locals.Discounts = DiscResluts;
                callback();
            });
        }
    ],
    function (err) {
        res.render('Admin/Config', { layout: 'AdminLayout', MenuActive: 'Config', Services: locals.Services, Breeds: locals.Breeds, Vets: locals.Vets, Discounts: locals.Discounts, RoleID: req.session.RoleID });
    });
});

router.post('/GetBreedByID', Authenticate, function (req, res, next) {
    var BreedID = req.param("BreedID");

    DA.GetBreeds(BreedID, function (BreedResluts, err) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(BreedResluts));
    });
});


router.post('/UpdateDogBreed', Authenticate, function (req, res, next) {
    var BreedID = req.param("BreedID");
    var BreedName = req.param("BreedName");

    DA.UpdateDogBreed(BreedID, BreedName, function (BreedResluts, err) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(BreedResluts));
    });
});

router.post('/DeletDogBreed', Authenticate, function (req, res, next) {
    var BreedID = req.param("BreedID");

    DA.DeleteDogBreed(BreedID, function (BreedResluts, err) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(BreedResluts));
    });
});



router.post('/AddDogBreed', Authenticate, function (req, res, next) {
    var DogBreed = req.param("DogBreed");

    DA.AddDogBreed(DogBreed, function (BreedResluts, err) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(BreedResluts));
    });
});




router.post('/DeleteUser', Authenticate, function (req, res, next) {
    var EmailUsername = req.param("UserName");
    var locals = {};

    DA.DeleteUser(EmailUsername, function (Resluts, err) {
        locals.Result = Resluts;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(locals));
    });

});

router.post('/SearchUser', Authenticate, function (req, res, next) {
    var EmailUsername = req.param("EmailUsername");
    var locals = {};

    DA.GetUserByEmailOrUsername(EmailUsername, function (Resluts, err) {
        locals.Result = Resluts;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(locals));
    });

});



router.post('/AddUser', Authenticate, function (req, res, next) {

    //Password Encryption
    var crypto = require('crypto')
      , key = 'salt_from_the_user_document'
      , cipher = crypto.createCipher('aes-256-cbc', key)
      , decipher = crypto.createDecipher('aes-256-cbc', key);

    var FirstName = req.param("FirstName");
    var Surname = req.param("Surname");
    var Email = req.param("Email");
    var TelNo = req.param("TelNo");
    var UserName = req.param("UserName");
    var Pass = req.param("Pass");
    var FB = req.param("FB");
    var Role = req.param("Role");
    var locals = {};

    //Encrypting Password
    cipher.update(Pass, 'utf8', 'base64');
    var encryptedPassword = cipher.final('base64');


    DA.AddUser(FirstName, Surname, Email, TelNo, UserName, encryptedPassword, FB, Role, function (AddResluts, err) {
        locals.Result = AddResluts;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(locals));
    });

});

router.post('/UpdateUser', Authenticate, function (req, res, next) {

    //Password Encryption
    var crypto = require('crypto')
      , key = 'salt_from_the_user_document'
      , cipher = crypto.createCipher('aes-256-cbc', key)
      , decipher = crypto.createDecipher('aes-256-cbc', key);

    var FirstName = req.param("FirstName");
    var Surname = req.param("Surname");
    var Email = req.param("Email");
    var TelNo = req.param("TelNo");
    var UserName = req.param("UserName");
    var Pass = req.param("Pass");
    var FB = req.param("FB");
    var Role = req.param("Role");
    var locals = {};

    //Encrypting Password
    cipher.update(Pass, 'utf8', 'base64');
    var encryptedPassword = cipher.final('base64');

    DA.UpdateUser(FirstName, Surname, Email, TelNo, UserName, encryptedPassword, FB, Role, function (EditResluts, err) {
        locals.Result = EditResluts;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(locals));
    });

});

router.post('/AddDogProfile', Authenticate, function (req, res, next) {
    var DogBreed = req.param("DogBreed");
    var DogName = req.param("DogName");
    var FirstName = req.param("FirstName");
    var Surname = req.param("Surname");
    var Email = req.param("Email");
    var VetID = req.param("Vet");
    var DiscountID = req.param("Discount");
    var TelNo = req.param("TelNo");
    var FB = req.param("FB");
    var Notes = req.param("Notes");
    var OwnerAddress = req.param("OwnerAddress");
    var locals = {};

    DA.AddDogProfile(DogBreed, DogName, FirstName, Surname, Email, VetID, DiscountID, TelNo, FB, Notes, OwnerAddress, function (DogProfileAddResluts, err) {
        locals.Result = DogProfileAddResluts;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(locals));
    });

});

router.post('/GetDogInfo', Authenticate, function (req, res, next) {
    var DogID = req.param("DogID");
    var locals = {};

    DA.GetDogInfo(DogID, function (DogInfoResluts, err) {
        locals.Result = DogInfoResluts;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(locals));
    });

});

router.post('/UpdateDogProfile', Authenticate, function (req, res, next) {
    var DogID = req.param("DogID");
    var DogBreed = req.param("DogBreed");
    var DogName = req.param("DogName");
    var OwnerFirstName = req.param("OwnerFirstName");
    var OwnerSurname = req.param("OwnerSurname");
    var TelNo = req.param("TelNo");
    var Email = req.param("Email");
    var Vet = req.param("Vet");
    var Discount = req.param("Discount");
    var Facebook = req.param("Facebook");
    var Notes = req.param("Notes");
    var OwnerAddress = req.param("OwnerAddress");

    console.log('Vet: ', Vet);
    console.log('Discount: ', Discount);
    console.log('OwnerAddress: ', OwnerAddress);

    var locals = {};

    DA.UpdateDogProfile(DogID, DogBreed, DogName, OwnerFirstName, OwnerSurname, TelNo, Email, Vet, Discount, Facebook, Notes, OwnerAddress, function (DogUpdateResluts, err) {
        locals.Result = DogUpdateResluts;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(locals));
    });

});

router.post('/AddAppointment', Authenticate, function (req, res, next) {
    var DogID = req.param("DogID");
    var StartDate = req.param("StartDate");
    var EndDate = req.param("EndDate");
    var Price = req.param("Price");
    var Pricenotes = req.param("Pricenotes");
    var AppointmentNotes = req.param("AppointmentNotes");
    var locals = {};

    DA.AddDogApointment(DogID, StartDate, EndDate, AppointmentNotes, Price, Pricenotes, function (AppointmentResluts, err) {
        locals.Result = AppointmentResluts;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(locals));
    });
});

router.post('/AddDogService', Authenticate, function (req, res, next) {
    var AppointmentID = req.param("AppointmentID");
    var ServiceID = req.param("ServiceID");
    var locals = {};

    DA.AddDogService(AppointmentID, ServiceID, function (AppointmentResluts, err) {
        locals.Result = AppointmentResluts;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(locals));
    });

});

router.post('/GetServiceByID', Authenticate, function (req, res, next) {
    var ServiceID = req.param("ServiceID");

    DA.GetServiceByID(ServiceID, function (ServiceResluts, err) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(ServiceResluts));
    });
});

router.post('/UpdateService', Authenticate, function (req, res, next) {
    var ServiceID = req.param("ServiceID");
    var ServiceDesc = req.param("ServiceDesc");


    DA.UpddateService(ServiceID, ServiceDesc, function (ServiceResluts, err) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(ServiceResluts));
    });
});

router.post('/DeleteService', Authenticate, function (req, res, next) {
    var ServiceID = req.param("ServiceID");

    DA.DeleteService(ServiceID, function (ServiceResluts, err) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(ServiceResluts));
    });
});

router.post('/AddService', Authenticate, function (req, res, next) {
    var ServiceDesc = req.param("ServiceDesc");

    DA.AddService(ServiceDesc, function (ServiceResluts, err) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(ServiceResluts));
    });
});


router.post('/GetDogBreed', Authenticate, function (req, res, next) {

});

router.post('/AddVet', Authenticate, function (req, res, next) {
    var Firstname = req.param("Firstname");
    var Surname = req.param("Surname");

    DA.AddVet(Firstname, Surname, function (Resluts, err) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(Resluts));
    });
});

router.post('/UpdateVet', Authenticate, function (req, res, next) {
    var VetID = req.param("VetID");
    var Firstname = req.param("Firstname");
    var Surname = req.param("Surname");

    DA.UpdateVet(VetID, Firstname, Surname, function (Resluts, err) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(Resluts));
    });
});


router.post('/GetVetByID', Authenticate, function (req, res, next) {
    var VetID = req.param("VetID");

    DA.GetVetByID(VetID, function (Resluts, err) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(Resluts));
    });
});


router.post('/AddDiscount', Authenticate, function (req, res, next) {
    var DiscDesc = req.param("DiscDesc");
    var DiscAmountPerc = req.param("DiscAmountPerc");
    var color = req.param("color");

    DA.AddDiscount(DiscDesc, DiscAmountPerc, color, function (Resluts, err) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(Resluts));
    });
});

router.post('/GetDiscount', Authenticate, function (req, res, next) {
    var DiscountID = req.param("DiscountID");

    DA.GetDiscount(DiscountID, function (Resluts, err) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(Resluts));
    });
});

router.post('/UpdateDiscount', Authenticate, function (req, res, next) {
    var DiscID = req.param("DiscID");
    var DiscDesc = req.param("DiscDesc");
    var DiscAmtPerc = req.param("DiscAmtPerc");
    var color = req.param("color");

    DA.UpdateDiscount(DiscID, DiscDesc, DiscAmtPerc, color, function (Resluts, err) {
        console.log(Resluts);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(Resluts));
    });
});











function Authenticate(req, res, next) {
    if (!req.session.UserID) {
        res.render('login', { Result: "Session Expired. Please login.", AlertText: "alert alert-danger", classname: "msgAllertBoxShow" });
    } else {

        next();
    }

}

module.exports = router;
