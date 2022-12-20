CREATE USER admin WITH ENCRYPTED PASSWORD 'admin';
GRANT ALL PRIVILEGES ON DATABASE vaccine_management TO admin;

-- Create necessary schemas.
CREATE SCHEMA core AUTHORIZATION admin;
