var http = require('http');
var https = require('https');
var mysql = require('mysql');

//var connection = mysql.createConnection({
//    host     : 'localhost',
//    user     : 'kayra',
//    password : 'kayra123$',
//    database : 'salonkayra'
//});

//connection.connect(function (err) {
//    if (!err) {
//        console.log("Database is connected ... nn");
//    } else {
//        console.log("Error connecting database ... nn");
//    }
//});

var pool = mysql.createPool({
    connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'kayra',
    password : 'kayra123$',
    database : 'salonkayra',
    debug    : false
});

//var pool = mysql.createPool(connection);



function CheckUserLogin(Username, Password, callback)
{
    pool.getConnection(function (err, connection) {
        connection.query('CALL SP_GetUser(' + mysql.escape(Username) + ', ' + mysql.escape(Password) + ')', function (err, rows) {
            if (err) throw err;
            else {
                callback(rows[0]);
            }
        });
        
        connection.release();
    });   
}

function GetAllUsers(callback) {
    pool.getConnection(function (err, connection) {
        connection.query('CALL SP_GetAllUsers()', function (err, rows) {
            if (err) throw err;
            else {
                callback(rows[0]);
            }
        });

        connection.release();
    });
}


function GetServices(callback) {
    pool.getConnection(function (err, connection) {
        connection.query('CALL SP_GetServices', function (err, rows) {
            if (err) throw err;
            else {
                callback(rows[0]);
            }
        });
        
        connection.release();
    });
}

function AddUser(FirstName, Surname, Email, TelNo, UserName, Pass, FB, Role, callback)
{
    console.log(FirstName);
    console.log(Surname);
    console.log(Email);
    console.log(TelNo);
    console.log(UserName);
    console.log(Pass);
    console.log(FB);
    console.log(Role);
    pool.getConnection(function (err, connection) {
        connection.query('CALL SP_AddUser(' + mysql.escape(FirstName) + ', ' + mysql.escape(Surname) + ', ' + mysql.escape(Email) + ', ' + mysql.escape(TelNo) + ', ' + mysql.escape(UserName) + ', ' + mysql.escape(Pass) + ', ' + mysql.escape(FB) + ', ' + mysql.escape(Role) + ')', function (err, rows) {
            if (err) throw err;
            else {
                callback(rows[0]);
            }
        });
        connection.release();//release the connection
    });
}

function GetUserByEmailOrUsername(Username, callback) {
    pool.getConnection(function (err, connection) {
        connection.query('CALL SP_GetUserByEmailOrusername(' + mysql.escape(Username) + ')', function (err, rows) {
            if (err) throw err;
            else {
                callback(rows[0]);
            }
        });
        connection.release();//release the connection
    });
}

function UpdateUser(FirstName, Surname, Email, TelNo, UserName, Pass, FB, Role, callback)
{
    pool.getConnection(function (err, connection) {
        connection.query('CALL SP_UpdateUser(' + mysql.escape(FirstName) + ', ' + mysql.escape(Surname) + ', ' + mysql.escape(Email) + ', ' + mysql.escape(TelNo) + ', ' + mysql.escape(UserName) + ', ' + mysql.escape(Pass) + ', ' + mysql.escape(FB) + ', ' + mysql.escape(Role) + ')', function (err, rows) {
            if (err) throw err;
            else {
                callback(rows[0]);
            }
        });
        connection.release();//release the connection
    });
}

function DeleteUser(Username, callback)
{
    pool.getConnection(function (err, connection) {
        connection.query('CALL SP_DeleteUser(' + mysql.escape(Username) + ')', function (err, rows) {
            if (err) throw err;
            else {
                callback(rows[0]);
            }
        });
        connection.release();//release the connection
    });
}

function AddDogProfile(DogBreed, DogName, FirstName, Surname, Email, VetID, DiscountID, TelNo, FB, Notes, OwnerAddress, callback) {
    pool.getConnection(function (err, connection) {
        connection.query('CALL SP_AddDogProfile(' + mysql.escape(DogBreed) + ', ' + mysql.escape(DogName) + ', ' + mysql.escape(FirstName) + ', ' + mysql.escape(Surname) + ', ' + mysql.escape(Email) + ', ' + mysql.escape(VetID) + ', ' + mysql.escape(DiscountID) + ', ' + mysql.escape(TelNo) + ', ' + mysql.escape(FB) + ', ' + mysql.escape(Notes) + ', ' + mysql.escape(OwnerAddress) + ')', function (err, rows) {
            if (err) throw err;
            else {
                callback(rows[0]);
            }
        });
        connection.release();//release the connection
    });
}


function GetAllDogDetails(callback) {
    pool.getConnection(function (err, connection) {
        connection.query('CALL SP_AddDogProfile(' + mysql.escape(DogName) + ', ' + mysql.escape(FirstName) + ', ' + mysql.escape(Surname) + ', ' + mysql.escape(Email) + ', ' + mysql.escape(TelNo) + ', ' + mysql.escape(FB) + ', ' + mysql.escape(Notes) + ')', function (err, rows) {
            if (err) throw err;
            else {
                callback(rows[0]);
            }
        });
        connection.release();//release the connection
    });
}

function GetDogInfo(DogID, callback)
{
    pool.getConnection(function (err, connection) {
        connection.query('CALL SP_GetDogInfo(' + mysql.escape(DogID) + ')', function (err, rows) {
            if (err) throw err;
            else {
                callback(rows[0]);
            }
        });
        connection.release();//release the connection
    });
}

function AddDogApointment(DogID, StartDate, EndDate, AppointmentNotes, Price, PriceComment, callback)
{
    pool.getConnection(function (err, connection) {
        connection.query('CALL SP_AddDogAppointment(' + mysql.escape(DogID) + ', ' + mysql.escape(StartDate) + ', ' + mysql.escape(EndDate) + ', ' + mysql.escape(AppointmentNotes) + ', ' + mysql.escape(Price) + ', ' + mysql.escape(PriceComment) + ')', function (err, rows) {
            if (err) throw err;
            else {
                callback(rows[0]);
            }
        });
        connection.release();//release the connection
    });
}

function AddDogService(AppointmentID, ServiceID, callback) {
    pool.getConnection(function (err, connection) {
        connection.query('CALL SP_AddDogService(' + mysql.escape(AppointmentID) + ', ' + mysql.escape(ServiceID) + ')', function (err, rows) {
            if (err) throw err;
            else {
                callback(rows[0]);
            }
        });
        connection.release();//release the connection
    });
}

function GetAllDogAppointments(callback)
{
    pool.getConnection(function (err, connection) {
        connection.query('CALL SP_GetAllDogAppointments', function (err, rows) {
            if (err) throw err;
            else {
                callback(rows[0]);
            }
        });
        connection.release();//release the connection
    });
}

function UpdateAppointment(AppointmentID, StartDate, EndDate, AppNotes, Price, PriceNote, callback)
{
    console.log("heelo");
    pool.getConnection(function (err, connection) {
        connection.query('CALL SP_UpdateAppointment(' + mysql.escape(AppointmentID) + ', ' + mysql.escape(StartDate) + ', ' + mysql.escape(EndDate) + ', ' + mysql.escape(AppNotes) + ', ' + mysql.escape(Price) + ', ' + mysql.escape(PriceNote) + ')', function (err, rows) {
            if (err) throw err;
            else {
                callback(rows[0]);
            }
        });
        connection.release();//release the connection
    });
}

function GetAllDogs(DogName, Bread, FirstName, Surname, Email, VetID, callback)
{

    pool.getConnection(function (err, connection) {
        connection.query('CALL SP_GetAllDogs(' + mysql.escape(DogName) + ', ' + mysql.escape(Bread) + ', ' + mysql.escape(FirstName) + ', ' + mysql.escape(Surname) + ', ' + mysql.escape(Email) + ', ' + mysql.escape(VetID) + ')', function (err, rows) {
            if (err) throw err;
            else {
                callback(rows[0]);
            }
        });
        connection.release();//release the connection
    });

}

function UpdateDogProfile(DogID, DogBreed, DogName, OwnerFirstName, OwnerSurname, TelNo, Email, Vet, Discount, Facebook, Notes, OwnerAddress, callback) {
    pool.getConnection(function (err, connection) {
        console.log('CALL SP_UpdateDogProfile(' + mysql.escape(DogID) + ', ' + mysql.escape(DogBreed) + ', ' + mysql.escape(DogName) + ', ' + mysql.escape(OwnerFirstName) + ', ' + mysql.escape(OwnerSurname) + ', ' + mysql.escape(TelNo) + ', ' + mysql.escape(Email) + ', ' + mysql.escape(Vet) + ', ' + mysql.escape(Discount) + ', ' + mysql.escape(Facebook) + ', ' + mysql.escape(Notes) + ', ' + mysql.escape(OwnerAddress) + ')');
        connection.query('CALL SP_UpdateDogProfile(' + mysql.escape(DogID) + ', ' + mysql.escape(DogBreed) + ', ' + mysql.escape(DogName) + ', ' + mysql.escape(OwnerFirstName) + ', ' + mysql.escape(OwnerSurname) + ', ' + mysql.escape(TelNo) + ', ' + mysql.escape(Email) + ', ' + mysql.escape(Vet) + ', ' + mysql.escape(Discount) + ', ' + mysql.escape(Facebook) + ', ' + mysql.escape(Notes) + ', ' + mysql.escape(OwnerAddress) + ')', function (err, rows) {
            if (err) throw err;
            else {
                callback(rows[0]);
            }
        });
        connection.release();//release the connection
    });
}

function GetAppointmentHistory(DogID, callback) {
    pool.getConnection(function (err, connection) {
        connection.query('CALL SP_GetDogAppointHistory(' + mysql.escape(DogID) + ')', function (err, rows) {
            if (err) throw err;
            else {
                callback(rows[0]);
            }
        });
        connection.release();//release the connection
    });
}

function GetAppointmentByID(AppointmentID, callback) {
    pool.getConnection(function (err, connection) {
        connection.query('CALL SP_GetDogAppointmentByID(' + mysql.escape(AppointmentID) + ')', function (err, rows) {
            if (err) throw err;
            else {
                callback(rows[0]);
            }
        });
        connection.release();//release the connection
    });
}

function DeleteAppointment(AppointmentID, callback)
{
    pool.getConnection(function (err, connection) {
        connection.query('CALL SP_DeleteAppointment(' + mysql.escape(AppointmentID) + ')', function (err, rows) {
            if (err) throw err;
            else {
                callback(rows[0]);
            }
        });
        connection.release();//release the connection
    });
}

function GetServiceByID(ServiceID, callback) {
    pool.getConnection(function (err, connection) {
        connection.query('CALL SP_GetServiceByID(' + mysql.escape(ServiceID) + ')', function (err, rows) {
            if (err) throw err;
            else {
                callback(rows[0]);
            }
        });
        connection.release();//release the connection
    });
}

function UpddateService(ServiceID, ServiceDesc, callback) {
    pool.getConnection(function (err, connection) {
        connection.query('CALL SP_UpdateService(' + mysql.escape(ServiceID) + ', ' + mysql.escape(ServiceDesc) + ')', function (err, rows) {
            if (err) throw err;
            else {
                callback(rows[0]);
            }
        });
        connection.release();//release the connection
    });
}

function DeleteService(ServiceID, callback) {
    pool.getConnection(function (err, connection) {
        connection.query('CALL SP_DeleteService(' + mysql.escape(ServiceID) + ')', function (err, rows) {
            if (err) throw err;
            else {
                callback(rows[0]);
            }
        });
        connection.release();//release the connection
    });
}

function AddService(ServiceDesc, callback) {
    pool.getConnection(function (err, connection) {
        connection.query('CALL SP_AddService(' + mysql.escape(ServiceDesc) + ')', function (err, rows) {
            if (err) throw err;
            else {
                callback(rows[0]);
            }
        });
        connection.release();//release the connection
    });
}

function GetBreeds(BreedID, callback)
{
    pool.getConnection(function (err, connection) {
        connection.query('CALL SP_GetDogBreed(' + mysql.escape(BreedID) + ')', function (err, rows) {
            if (err) throw err;
            else {
                callback(rows[0]);
            }
        });
        connection.release();//release the connection
    });
    
}

function UpdateDogBreed(BreedID, BreedName, callback)
{
    pool.getConnection(function (err, connection) {
        connection.query('CALL SP_UpdateDogBreed(' + mysql.escape(BreedID) + ', ' + mysql.escape(BreedName) + ')', function (err, rows) {
            if (err) throw err;
            else {
                callback(rows[0]);
            }
        });
        connection.release();//release the connection
    });
}

function DeleteDogBreed(BreedID, callback) {
    pool.getConnection(function (err, connection) {
        connection.query('CALL SP_DeleteDogBreed(' + mysql.escape(BreedID) + ')', function (err, rows) {
            if (err) throw err;
            else {
                callback(rows[0]);
            }
        });
        connection.release();//release the connection
    });
}

function AddDogBreed(DogBreed, callback) {
    pool.getConnection(function (err, connection) {
        connection.query('CALL SP_AddDogBreed(' + mysql.escape(DogBreed) + ')', function (err, rows) {
            if (err) throw err;
            else {
                callback(rows[0]);
            }
        });
        connection.release();//release the connection
    });
}

function AddVet(Firstname, Surname, callback) {
    pool.getConnection(function (err, connection) {
        connection.query('CALL sp_AddVet(' + mysql.escape(Firstname) + ', ' + mysql.escape(Surname) + ')', function (err, rows) {
            if (err) throw err;
            else {
                callback(rows[0]);
            }
        });
        connection.release();//release the connection
    });
}

function GetVets(VetID, callback) {
    pool.getConnection(function (err, connection) {
        connection.query('CALL sp_GetVets(' + mysql.escape(VetID) + ')', function (err, rows) {
            if (err) throw err;
            else {
                callback(rows[0]);
            }
        });
        connection.release();//release the connection
    });
}


function UpdateVet(VetID, Firstname, Surname, callback) {
    pool.getConnection(function (err, connection) {
        connection.query('CALL sp_UpdateVet(' + mysql.escape(VetID) + ', ' + mysql.escape(Firstname) + ',' + mysql.escape(Surname) + ')', function (err, rows) {
            if (err) throw err;
            else {
                callback(rows[0]);
            }
        });
        connection.release();//release the connection
    });
}

function GetVetByID(VetID, callback) {
    pool.getConnection(function (err, connection) {
        connection.query('CALL sp_GetVets(' + mysql.escape(VetID) + ')', function (err, rows) {
            if (err) throw err;
            else {
                callback(rows[0]);
            }
        });
        connection.release();//release the connection
    });
}

function AddDiscount(DiscDesc, DiscAmountPerc, color, callback) {
    pool.getConnection(function (err, connection) {
        connection.query('CALL sp_AddDiscount(' + mysql.escape(DiscDesc) + ', ' + mysql.escape(DiscAmountPerc) + ', ' + mysql.escape(color) + ')', function (err, rows) {
            if (err) throw err;
            else {
                callback(rows[0]);
            }
        });
        connection.release();//release the connection
    });
}


function GetDiscount(DiscID, callback) {
    pool.getConnection(function (err, connection) {
        connection.query('CALL sp_GetDiscount(' + mysql.escape(DiscID) + ')', function (err, rows) {
            if (err) throw err;
            else {
                callback(rows[0]);
            }
        });
        connection.release();//release the connection
    });
}

function UpdateDiscount(DiscID, DiscDesc, DiscAmtPerc, color, callback) {
    pool.getConnection(function (err, connection) {
        connection.query('CALL sp_UpdateDiscount(' + mysql.escape(DiscID) + ', ' + mysql.escape(DiscDesc) + ', ' + mysql.escape(DiscAmtPerc) + ', ' + mysql.escape(color) + ')', function (err, rows) {
            if (err) throw err;
            else {
                callback(rows[0]);
            }
        });
        connection.release();//release the connection
    });
}









module.exports = {
    CheckUserLogin: CheckUserLogin,
    AddUser: AddUser,
    GetUserByEmailOrUsername: GetUserByEmailOrUsername,
    UpdateUser: UpdateUser,
    DeleteUser: DeleteUser,
    GetServices: GetServices,
    AddDogProfile: AddDogProfile,
    GetDogInfo: GetDogInfo,
    AddDogApointment: AddDogApointment,
    AddDogService: AddDogService,
    GetAllDogAppointments: GetAllDogAppointments,
    UpdateAppointment: UpdateAppointment,
    GetAllDogs: GetAllDogs,
    UpdateDogProfile: UpdateDogProfile,
    GetAppointmentHistory: GetAppointmentHistory,
    GetAppointmentByID: GetAppointmentByID,
    GetAllUsers: GetAllUsers,
    DeleteAppointment: DeleteAppointment,
    GetServiceByID: GetServiceByID,
    UpddateService: UpddateService,
    DeleteService: DeleteService,
    AddService: AddService,
    GetBreeds: GetBreeds,
    UpdateDogBreed: UpdateDogBreed,
    DeleteDogBreed: DeleteDogBreed,
    AddDogBreed: AddDogBreed,
    AddVet: AddVet,
    GetVets: GetVets,
    UpdateVet: UpdateVet,
    GetVetByID: GetVetByID,
    AddDiscount: AddDiscount,
    GetDiscount: GetDiscount,
    UpdateDiscount: UpdateDiscount
};