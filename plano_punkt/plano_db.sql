SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL';

CREATE SCHEMA IF NOT EXISTS `plano` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci ;
USE `plano` ;

-- -----------------------------------------------------
-- Table `plano`.`groups`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `plano`.`groups` ;

CREATE  TABLE IF NOT EXISTS `plano`.`groups` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `group_name` VARCHAR(45) NOT NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `plano`.`activities`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `plano`.`activities` ;

CREATE  TABLE IF NOT EXISTS `plano`.`activities` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `activity_name` VARCHAR(45) NOT NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `plano`.`group_x_activity`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `plano`.`group_x_activity` ;

CREATE  TABLE IF NOT EXISTS `plano`.`group_x_activity` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `groups_id` INT NOT NULL ,
  `activities_id` INT NOT NULL ,
  `time_raster` ENUM('15min', '30min', '60min', '1440min') NOT NULL ,
  `min_val` INT NOT NULL ,
  `max_val` INT NOT NULL ,
  `target_val` INT NOT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_group_x_activity_groups` (`groups_id` ASC) ,
  INDEX `fk_group_x_activity_activities1` (`activities_id` ASC) ,
  CONSTRAINT `fk_group_x_activity_groups`
    FOREIGN KEY (`groups_id` )
    REFERENCES `plano`.`groups` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_group_x_activity_activities1`
    FOREIGN KEY (`activities_id` )
    REFERENCES `plano`.`activities` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `plano`.`employees_x_activities`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `plano`.`employees_x_activities` ;

CREATE  TABLE IF NOT EXISTS `plano`.`employees_x_activities` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `group_x_activity_id` INT NOT NULL ,
  `employee_count` INT NOT NULL ,
  `insert_time` TIMESTAMP NOT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_employees_x_activities_group_x_activity1` (`group_x_activity_id` ASC) ,
  CONSTRAINT `fk_employees_x_activities_group_x_activity1`
    FOREIGN KEY (`group_x_activity_id` )
    REFERENCES `plano`.`group_x_activity` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;



SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `plano`.`groups`
-- -----------------------------------------------------
START TRANSACTION;
USE `plano`;
INSERT INTO `plano`.`groups` (`id`, `group_name`) VALUES (1, 'group1');
INSERT INTO `plano`.`groups` (`id`, `group_name`) VALUES (2, 'group2');
INSERT INTO `plano`.`groups` (`id`, `group_name`) VALUES (3, 'group3');

COMMIT;

-- -----------------------------------------------------
-- Data for table `plano`.`activities`
-- -----------------------------------------------------
START TRANSACTION;
USE `plano`;
INSERT INTO `plano`.`activities` (`id`, `activity_name`) VALUES (1, 'cashpoint');
INSERT INTO `plano`.`activities` (`id`, `activity_name`) VALUES (2, 'repository');
INSERT INTO `plano`.`activities` (`id`, `activity_name`) VALUES (3, 'sales');

COMMIT;

-- -----------------------------------------------------
-- Data for table `plano`.`group_x_activity`
-- -----------------------------------------------------
START TRANSACTION;
USE `plano`;
INSERT INTO `plano`.`group_x_activity` (`id`, `groups_id`, `activities_id`, `time_raster`, `min_val`, `max_val`, `target_val`) VALUES (1, 1, 1, '\'15min\'', 2, 10, 10);
INSERT INTO `plano`.`group_x_activity` (`id`, `groups_id`, `activities_id`, `time_raster`, `min_val`, `max_val`, `target_val`) VALUES (2, 1, 2, '\'15min\'', 4, 9, 9);
INSERT INTO `plano`.`group_x_activity` (`id`, `groups_id`, `activities_id`, `time_raster`, `min_val`, `max_val`, `target_val`) VALUES (3, 1, 3, '\'15min\'', 3, 12, 10);

COMMIT;
