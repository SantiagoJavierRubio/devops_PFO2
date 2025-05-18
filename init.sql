-- Crear base de datos si no existe
CREATE DATABASE IF NOT EXISTS db;

USE db;

-- Crear tabla de tareas si no existe
CREATE TABLE IF NOT EXISTS `db`.`tareas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `hecha` TINYINT NULL DEFAULT 0,
  PRIMARY KEY (`id`));


-- Insertar campos de prueba inicial
INSERT INTO tareas (nombre, hecha) VALUES ('Hacer la cena', true),('Preparar el postre', false);