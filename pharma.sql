CREATE DATABASE pharma WITH OWNER = postgres ENCODING = 'UTF8' CONNECTION LIMIT = -1 IS_TEMPLATE = False;

CREATE TABLE questions (
	id serial PRIMARY KEY,
	category text,
	question text,
	a text,
	b text,
	c text,
	d text,
	answer text,
	tip text
);