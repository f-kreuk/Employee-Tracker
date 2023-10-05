DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_id INT,
    title varchar(30),
    salary decimal,
    FOREIGN KEY (department_id)
    REFERENCES departments(id)
    ON DELETE SET NULL
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name varchar(30),
    last_name varchar(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id)
    REFERENCES roles(id)
    ON DELETE SET NULL
);
