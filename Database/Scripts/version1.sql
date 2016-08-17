CREATE TABLE `salonkayra`.`vets` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `VetFirstname` VARCHAR(45) NULL,
  `VetSurname` VARCHAR(45) NULL,
  `AuditDate` DATETIME NULL,
  PRIMARY KEY (`ID`));
  
  

USE `salonkayra`;
DROP procedure IF EXISTS `sp_AddVet`;

DELIMITER $$
USE `salonkayra`$$
CREATE DEFINER=`kayra`@`%` PROCEDURE `sp_AddVet`(
	_Firstname VARCHAR(45),
    _Surname VARCHAR(45)
)
BEGIN

	IF NOT EXISTS (SELECT ID FROM vets WHERE VetFirstname = _Firstname AND VetSurname = _Surname) THEN
		INSERT INTO vets(VetFirstname, VetSurname, AuditDate)
		VALUES(_Firstname, _Surname, NOW());
		
		SELECT LAST_INSERT_ID() AS VetID;
	 ELSE
		SELECT -1 AS VetID;
     END IF; 

END$$

DELIMITER ;


USE `salonkayra`;
DROP procedure IF EXISTS `sp_GetVets`;

DELIMITER $$
USE `salonkayra`$$
CREATE DEFINER=`kayra`@`%` PROCEDURE `sp_GetVets`(
	_VetID INT
)
BEGIN

	SELECT ID, VetFirstname, VetSurname, AuditDate
    FROM vets
    WHERE (_VetID = -1 OR ID = _VetID)
    ORDER BY VetFirstname;
END$$

DELIMITER ;

USE `salonkayra`;
DROP procedure IF EXISTS `sp_UpdateVet`;

DELIMITER $$
USE `salonkayra`$$
CREATE PROCEDURE `sp_UpdateVet` (
	_VetID INT,
    _Firstname VARCHAR(45),
    _Surname VARCHAR(45)
)
BEGIN

	UPDATE vets
    SET VetFirstname = _Firstname,
		VetSurname = _Surname
	WHERE ID = _VetID;
	
    SELECT 'Success' AS Result;

END

$$

DELIMITER ;


CREATE TABLE `salonkayra`.`discount` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `DiscountDesc` VARCHAR(45) NULL,
  `DiscountAmtPerc` VARCHAR(45) NULL,
  `Color` VARCHAR(45) NULL,
  `AuditDate` DATETIME NULL,
  PRIMARY KEY (`ID`));


USE `salonkayra`;
DROP procedure IF EXISTS `sp_AddDiscount`;

DELIMITER $$
USE `salonkayra`$$
CREATE PROCEDURE `sp_AddDiscount` (
	_DiscountDesc VARCHAR(45),
    _DiscountAmountPerc VARCHAR(45),
    _Color VARCHAR(45)
)
BEGIN

	INSERT INTO discount(DiscountDesc, DiscountAmtPerc, Color, AuditDate)
    VALUES (_DiscountDesc, _DiscountAmountPerc, _Color, NOW());
    
    
	SELECT LAST_INSERT_ID() AS Result;
END
$$

DELIMITER ;

USE `salonkayra`;
DROP procedure IF EXISTS `sp_GetDiscount`;

DELIMITER $$
USE `salonkayra`$$
CREATE DEFINER=`kayra`@`%` PROCEDURE `sp_GetDiscount`(
	_DiscID INT
)
BEGIN

	SELECT ID, DiscountDesc, DiscountAmtPerc, Color, AuditDate
    FROM discount
    WHERE (_DiscID = -1 OR ID = _DiscID)
    ORDER BY DiscountDesc;

END$$

DELIMITER ;


USE `salonkayra`;
DROP procedure IF EXISTS `sp_UpdateDiscount`;

DELIMITER $$
USE `salonkayra`$$
CREATE PROCEDURE `sp_UpdateDiscount` (
	_DiscID INT,
    _DiscountDesc VARCHAR(45),
    _DiscountAmtPerc VARCHAR(45),
    _Color VARCHAR(45)
)
BEGIN

	UPDATE discount
    SET DiscountDesc = _DiscountDesc,
		DiscountAmtPerc = _DiscountAmtPerc,
        Color = _Color
	WHERE ID = _DiscID;
    
    SELECT 'Success' AS Result;

END
$$

DELIMITER ;


ALTER TABLE `salonkayra`.`dogs` 
ADD COLUMN `VetID` INT NULL AFTER `Email`,
ADD COLUMN `DiscountID` INT NULL AFTER `VetID`;

UPDATE dogs
SET VetID = -1,
	DiscountID = -1;
    
    
USE `salonkayra`;
DROP procedure IF EXISTS `SP_AddDogProfile`;

DELIMITER $$
USE `salonkayra`$$
CREATE DEFINER=`kayra`@`%` PROCEDURE `SP_AddDogProfile`(
	dogbreed INT,
    dogname VARCHAR(45),
    firstname  VARCHAR(45),
    surname VARCHAR(45),
    email VARCHAR(45),
    vetid INT,
    discid INT,
    telno VARCHAR(45),
    fb VARCHAR(45),
    notes VARCHAR(15000)
)
BEGIN

	INSERT INTO dogs(DogBreed, DogName, OwnerFirstName, OwnerSurname, Email, VetID, DiscountID, TelNo, Facebook, Notes, AuditDate)
    VALUES(dogbreed, dogname, firstname, surname, email, vetid, discid, telno, fb, notes, NOW());
    
    SELECT LAST_INSERT_ID() AS Result;
    

END$$

DELIMITER ;



USE `salonkayra`;
DROP procedure IF EXISTS `SP_UpdateDogProfile`;

DELIMITER $$
USE `salonkayra`$$
CREATE DEFINER=`kayra`@`%` PROCEDURE `SP_UpdateDogProfile`(
	_DogID INT,
    _DogBreed INT,
    _DogName VARCHAR(45),
    _FirstName VARCHAR(45),
    _Surname VARCHAR(45),
    _TelNo VARCHAR(45),
    _Email VARCHAR(45),
    _Vet INT,
    _Discount INT,
    _FB VARCHAR(100),
    _Notes VARCHAR(15000)
)
BEGIN

	UPDATE dogs
	SET DogBreed = _DogBreed,
		DogName = _DogName,
        OwnerFirstName = _FirstName,
        OwnerSurname = _Surname,
        TelNo = _TelNo,
        Email = _Email,
        VetID = _Vet,
        DiscountID = _Discount,
        Facebook = _FB,
        Notes = _Notes,
        AuditDate = NOW()
	WHERE DogID = _DogID;
    
    SELECT 'Success' AS Result;

END$$

DELIMITER ;

USE `salonkayra`;
DROP procedure IF EXISTS `SP_GetAllDogs`;

DELIMITER $$
USE `salonkayra`$$
CREATE DEFINER=`kayra`@`%` PROCEDURE `SP_GetAllDogs`(
	_DogName VARCHAR(45),
    _DogBread INT,
    _FirstName VARCHAR(45),
    _Surname VARCHAR(45),
    _Email VARCHAR(45),
    _Vet INT
)
BEGIN

	SELECT D.DogID, DB.ID AS BreedID, DB.Breed AS DogBreed, D.DogName, D.OwnerFirstName, D.OwnerSurname, D.TelNo, D.Email, V.ID AS VetID, IFNULL(V.VetFirstname, 'N/A') AS VetFirstName, V.VetSurname AS VetSurname, Disc.ID AS DiscID, Disc.DiscountDesc, Disc.DiscountAmtPerc, Disc.Color, D.Facebook, D.Notes, D.DogImg, D.AuditDate
    FROM dogs D
    LEFT JOIN dogbreed DB ON DB.ID = DogBreed
    LEFT JOIN vets V ON V.ID = D.VetID
    LEFT JOIN discount Disc ON Disc.ID = D.DiscountID
    WHERE (_DogName = '' OR D.DogName LIKE CONCAT('%', _DogName, '%'))
    AND (_DogBread = -1 OR DB.ID = _DogBread)
    AND (_FirstName = '' OR D.OwnerFirstName LIKE CONCAT('%', _FirstName, '%'))
    AND (_Surname = '' OR D.OwnerSurname LIKE CONCAT('%', _Surname, '%'))
    AND (_Email = '' OR D.Email LIKE CONCAT('%', _Email, '%'))
    AND (_Vet = -1 OR D.VetID =_Vet)
    ORDER BY DogName;
END$$

DELIMITER ;


ALTER TABLE `salonkayra`.`appointments` 
ADD COLUMN `Price` VARCHAR(45) NULL AFTER `AppNotes`,
ADD COLUMN `PriceNotes` VARCHAR(5000) NULL AFTER `Price`;


USE `salonkayra`;
DROP procedure IF EXISTS `SP_AddDogAppointment`;

DELIMITER $$
USE `salonkayra`$$
CREATE DEFINER=`kayra`@`%` PROCEDURE `SP_AddDogAppointment`(
	_DogID INT,
    _StartDate DATETIME,
    _EndDate DATETIME,
    _Notes NVARCHAR(15000),
    _Price VARCHAR(45),
    _PriceNotes VARCHAR(5000)
)
BEGIN
	
    INSERT INTO appointments(DogID, StartTime, EndDate, AuditDate, Active, AppNotes, Price, PriceNotes)
    VALUES (_DogID, _StartDate, _EndDate, NOW(), 1, _Notes, _Price, _PriceNotes);
    
    SELECT LAST_INSERT_ID() AS Result;
    
END$$

DELIMITER ;

USE `salonkayra`;
DROP procedure IF EXISTS `SP_UpdateAppointment`;

DELIMITER $$
USE `salonkayra`$$
CREATE DEFINER=`kayra`@`%` PROCEDURE `SP_UpdateAppointment`(
	_AppointmentID INT,
    _StartDate DATETIME,
    _EndDate DATETIME,
    _AppNotes NVARCHAR(15000),
    _Price VARCHAR(45),
    _PriceNotes VARCHAR(5000)    
    
)
BEGIN

	DELETE FROM dogservice WHERE AppointmentID = _AppointmentID;
    
	UPDATE appointments
	SET StartTime = _StartDate,
		EndDate = _EndDate,
        AppNotes = _AppNotes,
        Price = _Price,
        PriceNotes = _PriceNotes
	WHERE AppointmentID = _AppointmentID;
    
    SELECT 'Success' AS Result;
    
END$$

DELIMITER ;

USE `salonkayra`;
DROP procedure IF EXISTS `SP_GetDogAppointmentByID`;

DELIMITER $$
USE `salonkayra`$$
CREATE DEFINER=`kayra`@`%` PROCEDURE `SP_GetDogAppointmentByID`(
	_AppointmentID INT
)
BEGIN

	SELECT A.AppointmentID, A.DogID, DB.ID AS BreedID, DB.Breed AS DogBreed, D.DogName, D.OwnerFirstName, D.OwnerSurname, D.TelNo, D.Email, D.Facebook, D.Notes AS DogNotes, D.DogImg, GROUP_CONCAT(S.ServiceID) AS ServicesID, GROUP_CONCAT(S.ServiceDesc) AS Services, A.StartTime, A.EndDate, A.AppNotes, A.Price, A.PriceNotes
    FROM appointments A
    INNER JOIN dogs D ON D.DogID = A.DogID
    INNER JOIN dogservice DS ON DS.AppointmentID = A.AppointmentID
    INNER JOIN services S ON S.ServiceID = DS.ServiceID
    LEFT JOIN dogbreed DB ON DB.ID = D.DogBreed
    WHERE A.AppointmentID = _AppointmentID;

END$$

DELIMITER ;


USE `salonkayra`;
DROP procedure IF EXISTS `SP_GetDogInfo`;

DELIMITER $$
USE `salonkayra`$$
CREATE DEFINER=`kayra`@`%` PROCEDURE `SP_GetDogInfo`(
	_DogID INT
)
BEGIN

	SELECT D.DogID, DB.ID AS BreedID, DB.Breed AS DogBreed, D.DogName, D.OwnerFirstName, D.OwnerSurname, D.TelNo, D.Email, D.Facebook, D.Notes, D.DogImg, A.AppNotes, StartTime AS AppStartDate, EndDate AS AppEndDate, V.ID AS VetID, IFNULL(V.VetFirstname, 'N/A') AS VetFirstName, V.VetSurname AS VetSurname, Disc.ID AS DiscID, Disc.DiscountDesc, Disc.DiscountAmtPerc, Disc.Color
    FROM dogs D
    LEFT JOIN appointments A ON A.DogID = D.DogID
    LEFT JOIN dogbreed DB ON DB.ID = D.DogBreed
    LEFT JOIN vets V ON V.ID = D.VetID
    LEFT JOIN discount Disc ON Disc.ID = D.DiscountID
    WHERE D.DogID = _DogID;

END$$

DELIMITER ;

USE `salonkayra`;
DROP procedure IF EXISTS `SP_GetDogAppointHistory`;

DELIMITER $$
USE `salonkayra`$$
CREATE DEFINER=`kayra`@`%` PROCEDURE `SP_GetDogAppointHistory`(
	_DogID INT
)
BEGIN

	SELECT A.AppointmentID, A.DogID, D.DogName, D.OwnerFirstName, D.OwnerSurname, A.StartTime, GROUP_CONCAT(S.ServiceDesc) AS Services, IFNULL(Price, '') AS Price, IFNULL(PriceNotes, '') AS PriceNotes
    FROM dogservice DS
    INNER JOIN services S ON S.ServiceID = DS.ServiceID
    INNER JOIN appointments A ON A.AppointmentID = DS.AppointmentID
    INNER JOIN dogs D ON D.DogID = A.DogID
    WHERE A.DogID = _DogID
    GROUP BY A.StartTime, A.AppointmentID, A.DogID, D.DogName, D.OwnerFirstName, D.OwnerSurname, Price, PriceNotes;
    
    
    


END$$

DELIMITER ;


USE `salonkayra`;
DROP procedure IF EXISTS `SP_AddDogProfile`;

DELIMITER $$
USE `salonkayra`$$
CREATE DEFINER=`kayra`@`%` PROCEDURE `SP_AddDogProfile`(
	dogbreed INT,
    dogname VARCHAR(45),
    firstname  VARCHAR(45),
    surname VARCHAR(45),
    email VARCHAR(45),
    vetid INT,
    discid INT,
    telno VARCHAR(45),
    fb VARCHAR(45),
    notes VARCHAR(15000)
)
BEGIN

	IF NOT EXISTS (SELECT DogID FROM dogs WHERE OwnerSurname = surname AND TelNo = telno AND DogName = dogname) THEN
		IF NOT EXISTS (SELECT DogID FROM dogs WHERE OwnerFirstName = firstname AND TelNo = telno) THEN
			INSERT INTO dogs(DogBreed, DogName, OwnerFirstName, OwnerSurname, Email, VetID, DiscountID, TelNo, Facebook, Notes, AuditDate)
			VALUES(dogbreed, dogname, firstname, surname, email, vetid, discid, telno, fb, notes, NOW());
			
			SELECT LAST_INSERT_ID() AS Result;
		 ELSE
			SELECT -2 AS Result; #FirstName and TelNo already exists
		 END IF; 
	ELSE
		 SELECT -3 AS Result; #Surname + TelNo +  DogName already exists
	END IF;
	
    

END$$

DELIMITER ;


















