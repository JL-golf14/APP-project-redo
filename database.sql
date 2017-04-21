-- //CHRIS

CREATE TABLE main_topics (
  id SERIAL PRIMARY KEY,
  title VARCHAR(80),
  description VARCHAR(10000),
  active boolean DEFAULT false,
  upcoming boolean DEFAULT false
);

CREATE TABLE subtopics (
  id SERIAL PRIMARY KEY,
  title VARCHAR(80),
  description VARCHAR(10000),
  main_id integer REFERENCES main_topics
  active boolean DEFAULT false,
  upcoming boolean DEFAULT false
);

CREATE TABLE ideas (
  id SERIAL PRIMARY KEY,
  title VARCHAR(80),
  description VARCHAR(5000),
  subtopics_id integer REFERENCES subtopics (id),
  users_email integer REFERENCES users (email)
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  description VARCHAR(2500),
  idea_id integer REFERENCES ideas,
  user_id integer REFERENCES users
);

CREATE TABLE comments_likes (
  id SERIAL PRIMARY KEY,
  user_id integer REFERENCES users,
  comment_id integer REFERENCES comments
);

CREATE TABLE comments_flags (
  id SERIAL PRIMARY KEY,
  user_id integer REFERENCES users,
  comment_id integer REFERENCES comments
);

CREATE TABLE subcomments (
  id SERIAL PRIMARY KEY,
  description VARCHAR(2500),
  user_id integer REFERENCES users,
  comment_id integer REFERENCES comments
);

CREATE TABLE sublikes (
  id SERIAL PRIMARY KEY,
  user_id integer REFERENCES users,
  subcomment_id integer REFERENCES subcomments
);

CREATE TABLE subflags (
  id SERIAL PRIMARY KEY,
  user_id integer REFERENCES users,
  subcomment_id integer REFERENCES subcomments
);

CREATE TABLE ideas_likes (
  id SERIAL PRIMARY KEY,
  user_id integer REFERENCES users,
  idea_id integer REFERENCES ideas
);

CREATE TABLE ideas_loves (
  id SERIAL PRIMARY KEY,
  user_id integer REFERENCES users,
  idea_id integer REFERENCES ideas
);

CREATE TABLE ideas_flags (
  id SERIAL PRIMARY KEY,
  user_id integer REFERENCES users,
  idea_id integer REFERENCES ideas
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(80) NOT NULL,
  email VARCHAR(100) NOT NULL,
  address VARCHAR(2500) NOT NULL,
  city VARCHAR(2500) NOT NULL,
  state VARCHAR(2500) NOT NULL,
  zipCode VARCHAR(2500) NOT NULL, 
  ward VARCHAR(80),
  admin BOOLEAN DEFAULT false,
  photo VARCHAR(80)
);

ALTER TABLE users
ADD active BOOLEAN DEFAULT true;

CREATE TABLE user_filter (
  id SERIAL PRIMARY KEY,
  filter VARCHAR(80) NOT NULL
);

INSERT INTO user_filter (id, filter)
VALUES(1, 'name'),
(2, 'email'),
(3, 'ward');


ALTER TABLE main_topics
ADD upcoming BOOLEAN DEFAULT false;
