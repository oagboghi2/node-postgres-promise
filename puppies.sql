DROP DATABASE IF EXISTS puppies;
CREATE DATABASE puppies;

\c puppies;

CREATE TABLE pups (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  breed VARCHAR,
  age INTEGER,
  sex VARCHAR
);

INSERT INTO pups (name, breed, age, sex) VALUES ('Tyler', 'Retrieved', 3, 'M');
INSERT INTO pups (name, breed, age, sex) VALUES ('Rex', 'Pitbull', 4, 'F');
INSERT INTO pups (name, breed, age, sex) VALUES ('Spike', 'Retrieved', 4, 'M');
