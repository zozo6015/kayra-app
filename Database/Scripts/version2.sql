ALTER TABLE `salonkayra`.`dogs` 
ADD COLUMN `OwnerAddress` VARCHAR(5000) NULL AFTER `Email`;

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
    notes VARCHAR(15000),
    OwnerAddress varchar(5000)
)
BEGIN

	IF NOT EXISTS (SELECT DogID FROM dogs WHERE OwnerSurname = surname AND TelNo = telno AND DogName = dogname) THEN
		IF NOT EXISTS (SELECT DogID FROM dogs WHERE OwnerFirstName = firstname AND TelNo = telno) THEN
			INSERT INTO dogs(DogBreed, DogName, OwnerFirstName, OwnerSurname, Email, OwnerAddress, VetID, DiscountID, TelNo, Facebook, Notes, AuditDate)
			VALUES(dogbreed, dogname, firstname, surname, email, OwnerAddress, vetid, discid, telno, fb, notes, NOW());
			
			SELECT LAST_INSERT_ID() AS Result;
		 ELSE
			SELECT -2 AS Result; #FirstName and TelNo already exists
		 END IF; 
	ELSE
		 SELECT -3 AS Result; #Surname + TelNo +  DogName already exists
	END IF;
	
    

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

	SELECT D.DogID, DB.ID AS BreedID, DB.Breed AS DogBreed, D.DogName, D.OwnerFirstName, D.OwnerSurname, D.TelNo, D.Email, D.OwnerAddress, D.Facebook, D.Notes, D.DogImg, A.AppNotes, StartTime AS AppStartDate, EndDate AS AppEndDate, V.ID AS VetID, IFNULL(V.VetFirstname, 'N/A') AS VetFirstName, V.VetSurname AS VetSurname, Disc.ID AS DiscID, Disc.DiscountDesc, Disc.DiscountAmtPerc, Disc.Color
    FROM dogs D
    LEFT JOIN appointments A ON A.DogID = D.DogID
    LEFT JOIN dogbreed DB ON DB.ID = D.DogBreed
    LEFT JOIN vets V ON V.ID = D.VetID
    LEFT JOIN discount Disc ON Disc.ID = D.DiscountID
    WHERE D.DogID = _DogID;

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
    _Notes VARCHAR(15000),
    _OwnerAddress VARCHAR(5000)
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
        OwnerAddress = _OwnerAddress,
        AuditDate = NOW()
	WHERE DogID = _DogID;
    
    SELECT 'Success' AS Result;

END$$

DELIMITER ;


