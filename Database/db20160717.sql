-- MySQL dump 10.13  Distrib 5.6.17, for Win32 (x86)
--
-- Host: 127.0.0.1    Database: salonkayra
-- ------------------------------------------------------
-- Server version	5.6.22-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `appointments`
--

DROP TABLE IF EXISTS `appointments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `appointments` (
  `AppointmentID` int(11) NOT NULL AUTO_INCREMENT,
  `DogID` int(11) DEFAULT NULL,
  `StartTime` datetime DEFAULT NULL,
  `EndDate` datetime DEFAULT NULL,
  `AuditDate` datetime DEFAULT NULL,
  `Active` int(11) DEFAULT NULL,
  `AppNotes` varchar(15000) DEFAULT NULL,
  PRIMARY KEY (`AppointmentID`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointments`
--

LOCK TABLES `appointments` WRITE;
/*!40000 ALTER TABLE `appointments` DISABLE KEYS */;
INSERT INTO `appointments` VALUES (65,139,'2016-07-04 08:02:00','2016-07-04 08:02:00','2016-07-04 20:02:56',1,'Appointment1'),(66,139,'2016-07-07 08:03:00','2016-07-07 08:03:00','2016-07-04 20:03:21',1,'Appointment2'),(67,139,'2016-07-27 08:03:00','2016-07-27 08:03:00','2016-07-04 20:03:52',1,'Appointment3'),(68,140,'2016-07-06 12:03:00','2016-07-06 12:03:00','2016-07-06 12:03:42',1,'Appointment with cutting, Ear Cleaning, and snipping'),(69,142,'2016-07-13 12:12:00','2016-07-13 12:12:00','2016-07-06 12:12:26',1,'Special treatment'),(70,141,'2016-07-13 12:20:00','2016-07-13 12:20:00','2016-07-06 12:20:34',1,'Special treatment'),(71,142,'2016-07-08 11:54:00','2016-07-08 11:54:00','2016-07-07 23:54:09',1,'Special treatment please'),(72,140,'2016-07-09 02:11:00','2016-07-09 02:11:00','2016-07-09 14:11:11',1,'Appointment with cutting, Ear Cleaning, and snipping');
/*!40000 ALTER TABLE `appointments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dogbreed`
--

DROP TABLE IF EXISTS `dogbreed`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dogbreed` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Breed` varchar(45) DEFAULT NULL,
  `AuditDate` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dogbreed`
--

LOCK TABLES `dogbreed` WRITE;
/*!40000 ALTER TABLE `dogbreed` DISABLE KEYS */;
INSERT INTO `dogbreed` VALUES (1,'Staffie','2016-07-14 00:00:00'),(2,'Jack Russel','2016-07-14 00:00:00'),(3,'Labrodoure','2016-07-15 16:05:24'),(4,'St Bernard','2016-07-14 00:00:00'),(9,'Poodle','2016-07-14 00:00:00');
/*!40000 ALTER TABLE `dogbreed` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dogs`
--

DROP TABLE IF EXISTS `dogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dogs` (
  `DogID` int(11) NOT NULL AUTO_INCREMENT,
  `DogBreed` int(11) DEFAULT NULL,
  `DogName` varchar(45) DEFAULT NULL,
  `OwnerFirstName` varchar(45) DEFAULT NULL,
  `OwnerSurname` varchar(45) DEFAULT NULL,
  `TelNo` varchar(45) DEFAULT NULL,
  `Email` varchar(45) DEFAULT NULL,
  `Facebook` varchar(45) DEFAULT NULL,
  `Notes` varchar(15000) DEFAULT NULL,
  `DogImg` longblob,
  `AuditDate` datetime DEFAULT NULL,
  PRIMARY KEY (`DogID`)
) ENGINE=InnoDB AUTO_INCREMENT=144 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dogs`
--

LOCK TABLES `dogs` WRITE;
/*!40000 ALTER TABLE `dogs` DISABLE KEYS */;
INSERT INTO `dogs` VALUES (139,1,'Bruno','Bruce','Roy','0987899876','bruce@gmail.com','www.facebook.com/bruce','Dog is beautiful',NULL,'2016-07-04 20:01:17'),(140,3,'Abby','Lynn','Demeyer','0986564783','lynn@gmail.com','www.facebook.com/lynn','test',NULL,'2016-07-15 17:11:34'),(141,9,'Brutt','adsa','asd','23123','sadas@asd.com','sfsdf','sdfs',NULL,'2016-07-17 16:01:07');
/*!40000 ALTER TABLE `dogs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dogservice`
--

DROP TABLE IF EXISTS `dogservice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dogservice` (
  `AppointmentID` int(11) NOT NULL,
  `ServiceID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dogservice`
--

LOCK TABLES `dogservice` WRITE;
/*!40000 ALTER TABLE `dogservice` DISABLE KEYS */;
INSERT INTO `dogservice` VALUES (65,2),(65,12),(66,2),(66,4),(67,4),(70,8),(70,7),(70,6),(68,6),(71,8),(71,6),(71,7),(72,6);
/*!40000 ALTER TABLE `dogservice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `services` (
  `ServiceID` int(11) NOT NULL AUTO_INCREMENT,
  `ServiceDesc` varchar(45) DEFAULT NULL,
  `Active` int(11) DEFAULT NULL,
  `AuditDate` datetime DEFAULT NULL,
  PRIMARY KEY (`ServiceID`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (2,'Combing',0,'2016-06-09 00:00:00'),(4,'Ear cleaning',0,'2016-06-09 00:00:00'),(6,'General',1,'2016-06-09 00:00:00'),(7,'General for show',1,'2016-06-09 00:00:00'),(8,'Washing',1,'2016-07-01 16:37:34'),(12,'Cutting',0,'2016-07-02 10:20:45'),(13,'Snipping',0,'2016-07-04 20:12:43'),(14,'Snipping',0,'2016-07-04 20:13:20'),(15,'Snipping',1,'2016-07-07 23:55:51'),(16,'test',0,'2016-07-07 23:56:06');
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userroles`
--

DROP TABLE IF EXISTS `userroles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userroles` (
  `RoleID` int(11) NOT NULL,
  `RoleDesc` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`RoleID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userroles`
--

LOCK TABLES `userroles` WRITE;
/*!40000 ALTER TABLE `userroles` DISABLE KEYS */;
INSERT INTO `userroles` VALUES (0,'Admin'),(1,'Groomer');
/*!40000 ALTER TABLE `userroles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Firstname` varchar(45) DEFAULT NULL,
  `Surname` varchar(45) DEFAULT NULL,
  `Username` varchar(45) DEFAULT NULL,
  `Password` varchar(45) DEFAULT NULL,
  `Email` varchar(45) DEFAULT NULL,
  `CellNo` varchar(45) DEFAULT NULL,
  `FacebookAcc` varchar(100) DEFAULT NULL,
  `RoleID` int(11) DEFAULT NULL,
  `RegistrationDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `LastLoggedIn` datetime DEFAULT NULL,
  `Active` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (67,'Bruce Roy','Roy','broy','QmTXJUGvQhF5XBcmFDVn7Q==','bruceroy@gmail.com','324234234234','bruceroy@gmail.com',0,'2016-07-14 15:41:22',NULL,1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'salonkayra'
--

--
-- Dumping routines for database 'salonkayra'
--
/*!50003 DROP PROCEDURE IF EXISTS `SP_AddDogAppointment` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`kayra`@`%` PROCEDURE `SP_AddDogAppointment`(
	_DogID INT,
    _StartDate DATETIME,
    _EndDate DATETIME,
    _Notes NVARCHAR(15000)
)
BEGIN
	
    INSERT INTO appointments(DogID, StartTime, EndDate, AuditDate, Active, AppNotes)
    VALUES (_DogID, _StartDate, _EndDate, NOW(), 1, _Notes);
    
    SELECT LAST_INSERT_ID() AS Result;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SP_AddDogBreed` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`kayra`@`%` PROCEDURE `SP_AddDogBreed`(
	_DogBreed VARCHAR(45)
)
BEGIN

	INSERT INTO dogbreed(Breed, AuditDate)
				VALUES(_DogBreed, NOW());
                
	SELECT 'Success' AS Result;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SP_AddDogProfile` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`kayra`@`%` PROCEDURE `SP_AddDogProfile`(
	dogbreed INT,
    dogname VARCHAR(45),
    firstname  VARCHAR(45),
    surname VARCHAR(45),
    email VARCHAR(45),
    telno VARCHAR(45),
    fb VARCHAR(45),
    notes VARCHAR(15000)
)
BEGIN

	INSERT INTO dogs(DogBreed, DogName, OwnerFirstName, OwnerSurname, Email, TelNo, Facebook, Notes, AuditDate)
    VALUES(dogbreed, dogname, firstname, surname, email, telno, fb, notes, NOW());
    
    SELECT LAST_INSERT_ID() AS Result;
    

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SP_AddDogService` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`kayra`@`%` PROCEDURE `SP_AddDogService`(
	_AppointmentID INT,
    _ServiceID INT
)
BEGIN

	INSERT INTO dogservice(AppointmentID, ServiceID)
    VALUES(LAST_INSERT_ID(_AppointmentID), _ServiceID);
    
    SELECT LAST_INSERT_ID() AS Result;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SP_AddService` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`kayra`@`%` PROCEDURE `SP_AddService`(
	_ServiceDesc VARCHAR(50)
)
BEGIN

	INSERT INTO services(ServiceDesc, Active, AuditDate)
    VALUES(_ServiceDesc, 1, NOW());
    
    SELECT 'Success' AS Result;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SP_AddUser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`kayra`@`%` PROCEDURE `SP_AddUser`(
	FirstName VARCHAR(45),
    Surname VARCHAR(45),
    Email VARCHAR(45),
    TelNo VARCHAR(45),
    UserName VARCHAR(45),
    Pass VARCHAR(45),
    FB VARCHAR(100),
    RoleID INT
)
BEGIN

	INSERT INTO users(Firstname, Surname, Username, Password, Email, CellNo, FacebookAcc, RoleID, Active)
    VALUES (FirstName, Surname, UserName, Pass, Email, TelNo, FB, RoleID, 1);

	SELECT 'Success' AS Result;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SP_DeleteAppointment` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`kayra`@`%` PROCEDURE `SP_DeleteAppointment`(
	_AppointmentID INT
)
BEGIN

	DELETE FROM appointments WHERE AppointmentID = _AppointmentID;
	
    SELECT 'Success' AS Result;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SP_DeleteDogBreed` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`kayra`@`%` PROCEDURE `SP_DeleteDogBreed`(
	_BreedID INT
)
BEGIN

	DELETE FROM dogbreed
	WHERE ID = _BreedID;
    
    SELECT 'Success' AS Result;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SP_DeleteService` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`kayra`@`%` PROCEDURE `SP_DeleteService`(
	_ServiceID INT
)
BEGIN

	UPDATE services
    SET Active = 0
    WHERE ServiceID = _ServiceID;
    
    SELECT 'Success' AS Result;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SP_DeleteUser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`kayra`@`%` PROCEDURE `SP_DeleteUser`(
	Uname VARCHAR(45)
)
BEGIN
	DELETE FROM salonkayra.users WHERE Username = Uname OR Email = Uname;
    
    SELECT 'Success' AS Result;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SP_GetAllDogAppointments` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
    LEFT JOIN dogbreed db on DB.ID = D.DogBreed
    WHERE A.StartTime BETWEEN _DayStart AND _DayEnd
    AND A.Active = 1
    GROUP BY A.AppointmentID
    UNION ALL
    SELECT A.AppointmentID, A.DogID, DB.ID AS DogBreadID, DB.Breed AS DogBreed, D.DogName, D.OwnerFirstName, D.OwnerSurname, D.TelNo, D.Email, D.Facebook, D.Notes AS DogNotes, D.DogImg, GROUP_CONCAT(S.ServiceID) AS ServicesID, GROUP_CONCAT(S.ServiceDesc) AS Services, A.StartTime, A.EndDate, A.AppNotes, 'Week' AS Period
    FROM appointments A
    INNER JOIN dogs D ON D.DogID = A.DogID
    INNER JOIN dogservice DS ON DS.AppointmentID = A.AppointmentID
    INNER JOIN services S ON S.ServiceID = DS.ServiceID
    LEFT JOIN dogbreed db on DB.ID = D.DogBreed
    WHERE A.StartTime BETWEEN _WeekStart AND _WeekEnd
    AND A.Active = 1
    GROUP BY A.AppointmentID
    UNION ALL
    SELECT A.AppointmentID, A.DogID, DB.ID AS DogBreadID, DB.Breed AS DogBreed, D.DogName, D.OwnerFirstName, D.OwnerSurname, D.TelNo, D.Email, D.Facebook, D.Notes AS DogNotes, D.DogImg, GROUP_CONCAT(S.ServiceID) AS ServicesID, GROUP_CONCAT(S.ServiceDesc) AS Services, A.StartTime, A.EndDate, A.AppNotes, 'Month' AS Period
    FROM appointments A
    INNER JOIN dogs D ON D.DogID = A.DogID
    INNER JOIN dogservice DS ON DS.AppointmentID = A.AppointmentID
    INNER JOIN services S ON S.ServiceID = DS.ServiceID
    LEFT JOIN dogbreed db on DB.ID = D.DogBreed
    WHERE A.StartTime BETWEEN _MonthStart AND _MonthEnd
    AND A.Active = 1
    GROUP BY A.AppointmentID
    ORDER BY StartTime;
   

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SP_GetAllDogDetail` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`kayra`@`%` PROCEDURE `SP_GetAllDogDetail`(
	_email VARCHAR(45),
    _dogname VARCHAR(45),
    _dogbreed INT,
    _ownername VARCHAR(45),
    _ownersurname VARCHAR(45),
    _ownertel VARCHAR(45)
)
BEGIN

	SELECT D.DogID, DB.ID AS BreedID, DB.Breed AS DogBreed, D.DogName, D.OwnerFirstName, D.OwnerSurname, D.TelNo, D.Email, D.Facebook, D.Notes
    FROM dogs D
    LEFT JOIN dogbreed DB ON DB.ID = D.DogBreed
    WHERE (_email = '' OR D.Email = _email)
    AND (_dogname = '' OR D.DogName = _dogname)
    AND (_dogbreed = '' OR DB.ID = _dogbreed)
    AND (_ownername = '' OR D.OwnerFirstName = _ownername)
    AND (_ownersurname = '' OR D.OwnerSurname = _ownersurname)
    AND (_ownertel = '' OR D.TelNo = _ownertel)
    ORDER BY D.AuditDate DESC;
	
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SP_GetAllDogs` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`kayra`@`%` PROCEDURE `SP_GetAllDogs`(
	_DogName VARCHAR(45),
    _DogBread INT,
    _FirstName VARCHAR(45),
    _Surname VARCHAR(45),
    _Email VARCHAR(45)
)
BEGIN
	SELECT D.DogID, DB.ID AS BreedID, DB.Breed AS DogBreed, D.DogName, D.OwnerFirstName, D.OwnerSurname, D.TelNo, D.Email, D.Facebook, D.Notes, D.DogImg, D.AuditDate
    FROM dogs D
    LEFT JOIN dogbreed DB ON DB.ID = D.DogBreed
    WHERE (_DogName = '' OR D.DogName LIKE CONCAT('%', _DogName, '%'))
    AND (_DogBread = -1 OR DB.ID = _DogBread)
    AND (_FirstName = '' OR D.OwnerFirstName LIKE CONCAT('%', _FirstName, '%'))
    AND (_Surname = '' OR D.OwnerSurname LIKE CONCAT('%', _Surname, '%'))
    AND (_Email = '' OR D.Email LIKE CONCAT('%', _Email, '%'))
    ORDER BY DogName;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SP_GetAllUsers` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`kayra`@`%` PROCEDURE `SP_GetAllUsers`()
BEGIN
	SELECT U.ID, U.Firstname, U.Surname, U.Username, U.Password, U.Email, U.CellNo, U.FacebookAcc, U.RoleID, UR.RoleDesc, U.RegistrationDate, U.LastLoggedIn 
	FROM users U
	LEFT JOIN userroles UR ON UR.RoleID = U.RoleID
    ORDER BY U.Firstname;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SP_GetDogAppointHistory` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`kayra`@`%` PROCEDURE `SP_GetDogAppointHistory`(
	_DogID INT
)
BEGIN

	SELECT A.AppointmentID, A.DogID, D.DogName, D.OwnerFirstName, D.OwnerSurname, A.StartTime, GROUP_CONCAT(S.ServiceDesc) AS Services
    FROM dogservice DS
    INNER JOIN services S ON S.ServiceID = DS.ServiceID
    INNER JOIN appointments A ON A.AppointmentID = DS.AppointmentID
    INNER JOIN dogs D ON D.DogID = A.DogID
    WHERE A.DogID = _DogID
    GROUP BY A.StartTime, A.AppointmentID, A.DogID, D.DogName, D.OwnerFirstName, D.OwnerSurname;
    
    
    


END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SP_GetDogAppointmentByID` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`kayra`@`%` PROCEDURE `SP_GetDogAppointmentByID`(
	_AppointmentID INT
)
BEGIN

	SELECT A.AppointmentID, A.DogID, DB.ID AS BreedID, DB.Breed AS DogBreed, D.DogName, D.OwnerFirstName, D.OwnerSurname, D.TelNo, D.Email, D.Facebook, D.Notes AS DogNotes, D.DogImg, GROUP_CONCAT(S.ServiceID) AS ServicesID, GROUP_CONCAT(S.ServiceDesc) AS Services, A.StartTime, A.EndDate, A.AppNotes
    FROM appointments A
    INNER JOIN dogs D ON D.DogID = A.DogID
    INNER JOIN dogservice DS ON DS.AppointmentID = A.AppointmentID
    INNER JOIN services S ON S.ServiceID = DS.ServiceID
    LEFT JOIN dogbreed DB ON DB.ID = D.DogBreed
    WHERE A.AppointmentID = _AppointmentID;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SP_GetDogBreed` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`kayra`@`%` PROCEDURE `SP_GetDogBreed`(
	_DogBreedID INT
)
BEGIN

	SELECT ID, Breed, AuditDate
    FROM dogbreed
    WHERE (_DogBreedID = -1 OR ID = _DogBreedID)
    ORDER BY Breed;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SP_GetDogInfo` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`kayra`@`%` PROCEDURE `SP_GetDogInfo`(
	_DogID INT
)
BEGIN

	SELECT D.DogID, DB.ID AS BreedID, DB.Breed AS DogBreed, D.DogName, D.OwnerFirstName, D.OwnerSurname, D.TelNo, D.Email, D.Facebook, D.Notes, D.DogImg, A.AppNotes, StartTime AS AppStartDate, EndDate AS AppEndDate
    FROM dogs D
    LEFT JOIN appointments A ON A.DogID = D.DogID
    LEFT JOIN dogbreed DB ON DB.ID = D.DogBreed
    WHERE D.DogID = _DogID;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SP_GetServiceByID` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`kayra`@`%` PROCEDURE `SP_GetServiceByID`(
	_ServiceID INT
)
BEGIN

	SELECT ServiceID, ServiceDesc, AuditDate
    FROM services
    WHERE ServiceID = _ServiceID
    AND Active = 1;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SP_GetServices` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`kayra`@`%` PROCEDURE `SP_GetServices`()
BEGIN
	SELECT ServiceID, ServiceDesc, AuditDate
    FROM services
    WHERE Active = 1
    ORDER BY ServiceDesc;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SP_GetServicesForAppointment` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`kayra`@`%` PROCEDURE `SP_GetServicesForAppointment`(
	_AppointmentID INT
)
BEGIN

	SELECT DS.ServiceID, S.ServiceDesc
    FROM services S
    LEFT JOIN dogservice DS ON S.ServiceID = DS.ServiceID
    WHERE DS.AppointmentID = _AppointmentID;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SP_GetUser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`kayra`@`%` PROCEDURE `SP_GetUser`(
	Uname VARCHAR(45),
    Pass VARCHAR(45)
)
BEGIN

	SELECT ID, Firstname, Surname, Username, Password, Email, CellNo, FacebookAcc, RoleID, RegistrationDate, LastLoggedIn 
    FROM salonkayra.users 
    where Username = Uname 
    and Password = Pass
    AND Active = 1;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SP_GetUserByEmailOrusername` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`kayra`@`%` PROCEDURE `SP_GetUserByEmailOrusername`(
    UserN VARCHAR(45)
)
BEGIN

	SELECT U.ID, U.Firstname, U.Surname, U.Username, U.Password, U.Email, U.CellNo, U.FacebookAcc, U.RoleID, UR.RoleDesc, RegistrationDate, LastLoggedIn 
    FROM salonkayra.users U
    LEFT JOIN userroles UR ON UR.RoleID = U.RoleID
    where (Username = UserN OR Email = UserN)
    AND Active = 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SP_UpdateAppointment` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`kayra`@`%` PROCEDURE `SP_UpdateAppointment`(
	_AppointmentID INT,
    _StartDate DATETIME,
    _EndDate DATETIME,
    _AppNotes NVARCHAR(15000)
    
)
BEGIN

	DELETE FROM dogservice WHERE AppointmentID = _AppointmentID;
    
	UPDATE appointments
	SET StartTime = _StartDate,
		EndDate = _EndDate,
        AppNotes = _AppNotes
	WHERE AppointmentID = _AppointmentID;
    
    SELECT 'Success' AS Result;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SP_UpdateDogBreed` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`kayra`@`%` PROCEDURE `SP_UpdateDogBreed`(
	_BreedID INT,
    _BreedName varchar(45)
)
BEGIN


	UPDATE dogbreed
    SET Breed = _BreedName,
		AuditDate = NOW()
	WHERE ID = _BreedID;
    
    SELECT 'Success' AS Result;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SP_UpdateDogProfile` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`kayra`@`%` PROCEDURE `SP_UpdateDogProfile`(
	_DogID INT,
    _DogBreed INT,
    _DogName VARCHAR(45),
    _FirstName VARCHAR(45),
    _Surname VARCHAR(45),
    _TelNo VARCHAR(45),
    _Email VARCHAR(45),
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
        Facebook = _FB,
        Notes = _Notes,
        AuditDate = NOW()
	WHERE DogID = _DogID;
    
    SELECT 'Success' AS Result;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SP_UpdateService` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`kayra`@`%` PROCEDURE `SP_UpdateService`(
	_ServiceID INT,
    _ServiceDesc VARCHAR(50)
)
BEGIN

	UPDATE services
    SET ServiceDesc = _ServiceDesc
    WHERE ServiceID = _ServiceID;
    
    SELECT 'Success' AS Result;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SP_UpdateUser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`kayra`@`%` PROCEDURE `SP_UpdateUser`(
	FName VARCHAR(45),
    Sname VARCHAR(45),
    EmailAdd VARCHAR(45),
    TelNumber VARCHAR(45),
    UName VARCHAR(45),
    Pass VARCHAR(45),
    FB VARCHAR(45),
    Role INT
)
BEGIN
	UPDATE users
    SET Firstname = FName,
		Surname = Sname,
        Password = Pass,
        Email = EmailAdd,
        CellNo = TelNumber,
        FacebookAcc = FB,
        RoleID = Role
	WHERE Username = UName;
    
    SELECT 'Success' AS Result;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-07-17 16:02:15
