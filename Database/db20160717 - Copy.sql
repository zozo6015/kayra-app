USE `salonkayra`;
DROP procedure IF EXISTS `SP_GetAllDogAppointments`;

DELIMITER $$
USE `salonkayra`$$
CREATE DEFINER=`kayra`@`%` PROCEDURE `SP_GetAllDogAppointments`()
BEGIN

	DECLARE _DayStart DATETIME;
    DECLARE _DayEnd DATETIME;
	DECLARE _WeekStart DATETIME;
	DECLARE _WeekEnd DATETIME;
	DECLARE _MonthStart DATETIME;
    DECLARE _MonthEnd DATETIME;
    
    
    SET _DayStart = DATE_FORMAT(DATE_FORMAT(NOW(), '%Y-%m-%d'), '%Y-%m-%d %T.%f');
    SET _DayEnd = DATE_FORMAT(DATE_FORMAT(NOW() + INTERVAL 1 DAY, '%Y-%m-%d') - INTERVAL 1 SECOND, '%Y-%m-%d %T.%f');
    
    SET _WeekStart = DATE_FORMAT(DATE_FORMAT(NOW() + INTERVAL 1 DAY, '%Y-%m-%d'), '%Y-%m-%d %T.%f');
    SET _WeekEnd = DATE_FORMAT(DATE_FORMAT(DATE_ADD(NOW(), INTERVAL(7-DAYOFWEEK(NOW())) DAY ), '%Y-%m-%d') + INTERVAL 2 DAY, '%Y-%m-%d %T.%f') - INTERVAL 1 SECOND;
    
    SET _MonthStart = DATE_FORMAT(DATE_FORMAT(DATE_ADD(NOW(), INTERVAL(7-DAYOFWEEK(NOW())) DAY ), '%Y-%m-%d') + INTERVAL 2 DAY, '%Y-%m-%d %T.%f');
    SET _MonthEnd = (DATE_FORMAT(NOW(),'%Y-%m-01') - INTERVAL - 1 MONTH) - INTERVAL 1 SECOND;
    
    
	SELECT A.AppointmentID, A.DogID, DB.ID AS DogBreadID, DB.Breed AS DogBreed, D.DogName, D.OwnerFirstName, D.OwnerSurname, D.TelNo, D.Email, D.Facebook, D.Notes AS DogNotes, D.DogImg, GROUP_CONCAT(S.ServiceID) AS ServicesID, GROUP_CONCAT(S.ServiceDesc) AS Services, A.StartTime, A.EndDate, A.AppNotes, 'Day' AS Period
    FROM appointments A
    INNER JOIN dogs D ON D.DogID = A.DogID
    INNER JOIN dogservice DS ON DS.AppointmentID = A.AppointmentID
    INNER JOIN services S ON S.ServiceID = DS.ServiceID
    LEFT JOIN dogbreed DB on DB.ID = D.DogBreed
    WHERE A.StartTime BETWEEN _DayStart AND _DayEnd
    AND A.Active = 1
    GROUP BY A.AppointmentID
    UNION ALL
    SELECT A.AppointmentID, A.DogID, DB.ID AS DogBreadID, DB.Breed AS DogBreed, D.DogName, D.OwnerFirstName, D.OwnerSurname, D.TelNo, D.Email, D.Facebook, D.Notes AS DogNotes, D.DogImg, GROUP_CONCAT(S.ServiceID) AS ServicesID, GROUP_CONCAT(S.ServiceDesc) AS Services, A.StartTime, A.EndDate, A.AppNotes, 'Week' AS Period
    FROM appointments A
    INNER JOIN dogs D ON D.DogID = A.DogID
    INNER JOIN dogservice DS ON DS.AppointmentID = A.AppointmentID
    INNER JOIN services S ON S.ServiceID = DS.ServiceID
    LEFT JOIN dogbreed DB on DB.ID = D.DogBreed
    WHERE A.StartTime BETWEEN _WeekStart AND _WeekEnd
    AND A.Active = 1
    GROUP BY A.AppointmentID
    UNION ALL
    SELECT A.AppointmentID, A.DogID, DB.ID AS DogBreadID, DB.Breed AS DogBreed, D.DogName, D.OwnerFirstName, D.OwnerSurname, D.TelNo, D.Email, D.Facebook, D.Notes AS DogNotes, D.DogImg, GROUP_CONCAT(S.ServiceID) AS ServicesID, GROUP_CONCAT(S.ServiceDesc) AS Services, A.StartTime, A.EndDate, A.AppNotes, 'Month' AS Period
    FROM appointments A
    INNER JOIN dogs D ON D.DogID = A.DogID
    INNER JOIN dogservice DS ON DS.AppointmentID = A.AppointmentID
    INNER JOIN services S ON S.ServiceID = DS.ServiceID
    LEFT JOIN dogbreed DB on DB.ID = D.DogBreed
    WHERE A.StartTime BETWEEN _MonthStart AND _MonthEnd
    AND A.Active = 1
    GROUP BY A.AppointmentID
    ORDER BY StartTime;
   

END$$

DELIMITER ;

