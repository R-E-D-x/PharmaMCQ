CREATE TABLE questions (
	id serial PRIMARY KEY,
	category text NOT NULL,
	question text NOT NULL,
	a text NOT NULL,
	b text NOT NULL,
	c text NOT NULL,
	d text NOT NULL,
	answer text NOT NULL,
	tip text NOT NULL,
	year int NOT NULL,
);