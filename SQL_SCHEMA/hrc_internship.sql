/*
SQLyog Community v13.1.6 (64 bit)
MySQL - 5.6.24-log : Database - h2h_internship
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`h2h_internship` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `h2h_internship`;

/*Table structure for table `invoice_details` */

DROP TABLE IF EXISTS `invoice_details`;

CREATE TABLE `invoice_details` (
  `business_code` char(4) DEFAULT NULL,
  `cust_number` varchar(255) DEFAULT NULL,
  `name_customer` varchar(255) DEFAULT NULL,
  `clear_date` datetime DEFAULT NULL,
  `business_year` year(4) DEFAULT NULL,
  `doc_id` int(11) NOT NULL,
  `posting_date` date DEFAULT NULL,
  `document_create_date` date DEFAULT NULL,
  `due_in_date` date DEFAULT NULL,
  `invoice_currency` char(3) DEFAULT NULL,
  `document_type` char(2) DEFAULT NULL,
  `posting_id` tinyint(4) DEFAULT NULL,
  `area_business` varchar(255) DEFAULT NULL,
  `total_open_amount` double DEFAULT NULL,
  `baseline_create_date` date DEFAULT NULL,
  `cust_payment_terms` char(4) DEFAULT NULL,
  `invoice_id` int(11) DEFAULT NULL,
  `isOpen` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`doc_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `invoice_details` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
