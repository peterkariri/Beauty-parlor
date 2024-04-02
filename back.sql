CREATE TABLE Users (
    user_id INT AUTO_INCREMENT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100), 
    password VARCHAR(100),
    phone_number VARCHAR(50),
    PRIMARY KEY(user_id)
);


CREATE TABLE Services (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  description VARCHAR(255) NOT NULL,
  price DECIMAL(5,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Appointments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  service_id INT NOT NULL,
  stylist_id INT NOT NULL,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES Users(id),
  FOREIGN KEY (service_id) REFERENCES Services(id),
  FOREIGN KEY (stylist_id) REFERENCES Users(id)
);

CREATE TABLE Stylists (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  bio TEXT,
  rating DECIMAL(3,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES Users(id)
);
///
CREATE TABLE Stylist(stylist_id INT AUTO_INCREMENT,fullname VARCHAR(50),email VARCHAR(50),PRIMARY KEY(stylist_id));

CREATE TABLE Products(product_id INT AUTO_INCREMENT,product_name VARCHAR(50),PRIMARY KEY(product_id));

CREATE TABLE booked(book_id INT AUTO_INCREMENT,book_type VARCHAR(50),book_time VARCHAR(50),PRIMARY KEY(book_id));