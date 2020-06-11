/*
Created: 22.04.2020
Modified: 21.05.2020
Model: PostgreSQL 11
Database: PostgreSQL 11
*/

-- Create tables section -------------------------------------------------

-- Table thesis

CREATE TABLE "thesis"
(
  "thesis_id" Integer NOT NULL GENERATED ALWAYS AS IDENTITY
    (INCREMENT BY 1 NO MINVALUE NO MAXVALUE START WITH 1 CACHE 1),
  "defence_date" Date,
  "thesis_type_id" Integer NOT NULL,
  "major_speciality_id" Integer,
  "title" Text NOT NULL,
  "key_words" Text,
  "organizational_unit_id" Integer,
  "subject_matter_id" Integer,
  "committee_id" Integer,
  "grade_defence" Numeric(2,1),
  "grade_review_supervisor" Numeric(2,1),
  "grade_review_reviewer" Numeric(2,1),
  "grade_avg" Numeric(3,2),
  "author_id" Integer NOT NULL,
  "abstract" Text,
  "reviewer_review" Text,
  "supervisor_review" Text,
  "file_path" Text
)
WITH (
  autovacuum_enabled=true)
;

CREATE INDEX "IX_Relationship6" ON "thesis" ("organizational_unit_id")
;
CREATE INDEX "IX_Relationship8" ON "thesis" ("subject_matter_id")
;
CREATE INDEX "IX_Relationship1" ON "thesis" ("author_id")
;
CREATE INDEX "IX_thesis_has_commitee" ON "thesis" ("committee_id")
;
ALTER TABLE "thesis" ADD CONSTRAINT "PK_thesis" PRIMARY KEY ("thesis_id")
;
ALTER TABLE "thesis" ADD CONSTRAINT "thesis_id" UNIQUE ("thesis_id")
;
-- Table staff_person

CREATE TABLE "staff_person"
(
  "staff_person_id" Integer NOT NULL GENERATED ALWAYS AS IDENTITY
    (INCREMENT BY 1 NO MINVALUE NO MAXVALUE START WITH 2 CACHE 1),
  "session_token" Integer NOT NULL,
  "first_name" Text NOT NULL,
  "second_name" Text,
  "surname" Text NOT NULL,
  "person_title_id" Integer NOT NULL,
  "is_admin" BOOLEAN NOT NULL
)
WITH (
  autovacuum_enabled=true)
;

CREATE INDEX "IX_Relationship27" ON "staff_person" ("person_title_id")
;
ALTER TABLE "staff_person" ADD CONSTRAINT "PK_staff_person" PRIMARY KEY ("staff_person_id")
;
-- Table organizational_unit

CREATE TABLE "organizational_unit"
(
  "organizational_unit_id" Integer NOT NULL GENERATED ALWAYS AS IDENTITY
    (INCREMENT BY 1 NO MINVALUE NO MAXVALUE START WITH 1 CACHE 1),
  "name" Text NOT NULL
)
WITH (
  autovacuum_enabled=true)
;

ALTER TABLE "organizational_unit" ADD CONSTRAINT "PK_organizational_unit" PRIMARY KEY ("organizational_unit_id")
;
-- Table subject_matter

CREATE TABLE "subject_matter"
(
  "subject_matter_id" Integer NOT NULL GENERATED ALWAYS AS IDENTITY
    (INCREMENT BY 1 NO MINVALUE NO MAXVALUE START WITH 1 CACHE 1),
  "name" Text NOT NULL
)
WITH (
  autovacuum_enabled=true)
;

ALTER TABLE "subject_matter" ADD CONSTRAINT "PK_subject_matter" PRIMARY KEY ("subject_matter_id")
;
-- Table thesis_type

CREATE TABLE "thesis_type"
(
  "thesis_type_id" Integer NOT NULL GENERATED ALWAYS AS IDENTITY
    (INCREMENT BY 1 NO MINVALUE NO MAXVALUE START WITH 1 CACHE 1),
  "name" Text NOT NULL
)
WITH (
  autovacuum_enabled=true)
;

ALTER TABLE "thesis_type" ADD CONSTRAINT "PK_thesis_type" PRIMARY KEY ("thesis_type_id")
;
-- Table major_speciality

CREATE TABLE "major_speciality"
(
  "major_speciality_id" Integer NOT NULL GENERATED ALWAYS AS IDENTITY
    (INCREMENT BY 1 NO MINVALUE NO MAXVALUE START WITH 1 CACHE 1),
  "major" Text NOT NULL,
  "speciality" Text NOT NULL
)
WITH (
  autovacuum_enabled=true)
;

ALTER TABLE "major_speciality" ADD CONSTRAINT "PK_major_speciality" PRIMARY KEY ("major_speciality_id")
;
-- Table commitee_person

CREATE TABLE "commitee_person"
(
  "committee_person_id" Integer NOT NULL GENERATED ALWAYS AS IDENTITY
    (INCREMENT BY 1 NO MINVALUE NO MAXVALUE START WITH 1 CACHE 1),
  "committee_id" Integer NOT NULL,
  "committee_role" Integer,
  "person_id" Integer NOT NULL
)
WITH (
  autovacuum_enabled=true)
;

CREATE INDEX "IX_Relationship31" ON "commitee_person" ("committee_role")
;
CREATE INDEX "IX_Relationship19" ON "commitee_person" ("person_id")
;
ALTER TABLE "commitee_person" ADD CONSTRAINT "PK_commitee_person" PRIMARY KEY ("committee_id","committee_person_id")
;
-- Table committee

CREATE TABLE "committee"
(
  "committee_id" Integer NOT NULL GENERATED ALWAYS AS IDENTITY
    (INCREMENT BY 1 NO MINVALUE NO MAXVALUE START WITH 1 CACHE 1)
)
WITH (
  autovacuum_enabled=true)
;

ALTER TABLE "committee" ADD CONSTRAINT "PK_committee" PRIMARY KEY ("committee_id")
;
-- Table person_title

CREATE TABLE "person_title"
(
  "person_title_id" Integer NOT NULL GENERATED ALWAYS AS IDENTITY
    (INCREMENT BY 1 NO MINVALUE NO MAXVALUE START WITH 1 CACHE 1),
  "name" Text NOT NULL
)
WITH (
  autovacuum_enabled=true)
;

ALTER TABLE "person_title" ADD CONSTRAINT "PK_person_title" PRIMARY KEY ("person_title_id")
;
-- Table committee_roles

CREATE TABLE "committee_roles"
(
  "committee_role_id" Integer NOT NULL GENERATED ALWAYS AS IDENTITY
    (INCREMENT BY 1 NO MINVALUE NO MAXVALUE START WITH 1 CACHE 1),
  "name" Text NOT NULL
)
WITH (
  autovacuum_enabled=true)
;

ALTER TABLE "committee_roles" ADD CONSTRAINT "PK_committee_roles" PRIMARY KEY ("committee_role_id")
;
-- Table students

CREATE TABLE "students"
(
  "student_id" Integer NOT NULL GENERATED ALWAYS AS IDENTITY
    (INCREMENT BY 1 NO MINVALUE NO MAXVALUE START WITH 1 CACHE 1),
  "session_token" Integer NOT NULL,
  "first_name" Text NOT NULL,
  "second_name" Text,
  "surname" Text NOT NULL
)
WITH (
  autovacuum_enabled=true)
;

ALTER TABLE "students" ADD CONSTRAINT "PK_students" PRIMARY KEY ("student_id")
;
-- Create foreign keys (relationships) section ------------------------------------------------- 


ALTER TABLE "thesis" ADD CONSTRAINT "thesis_has_type" FOREIGN KEY ("thesis_type_id") REFERENCES "thesis_type" ("thesis_type_id") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "thesis" ADD CONSTRAINT "theses_has_major_speciality" FOREIGN KEY ("major_speciality_id") REFERENCES "major_speciality" ("major_speciality_id") ON DELETE NO ACTION ON UPDATE NO ACTION
;


ALTER TABLE "thesis" ADD CONSTRAINT "thesis_has_commitee" FOREIGN KEY ("committee_id") REFERENCES "committee" ("committee_id") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "commitee_person" ADD CONSTRAINT "committee_person_has_committee" FOREIGN KEY ("committee_id") REFERENCES "committee" ("committee_id") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "staff_person" ADD CONSTRAINT "person_has_title" FOREIGN KEY ("person_title_id") REFERENCES "person_title" ("person_title_id") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "commitee_person" ADD CONSTRAINT "committee_person_has_role" FOREIGN KEY ("committee_role") REFERENCES "committee_roles" ("committee_role_id") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "thesis" ADD CONSTRAINT "thesis_has_author" FOREIGN KEY ("author_id") REFERENCES "students" ("student_id") ON DELETE NO ACTION ON UPDATE NO ACTION
;



INSERT INTO public.person_title(
	name)VALUES
	('prof.'),
	('dr hab.'),
	('dr'),
	('mgr inż.'),
	('mgr');

INSERT INTO public.staff_person(
	session_token, first_name, second_name, surname, person_title_id, is_admin)
	VALUES (2, 'Wiesława', null, 'Promotorska', 1, FALSE),
	(3, 'Krzysztof', null, 'Przewodniczącki', 1, FALSE),
	(4, 'Krystyna', null, 'Członkowska', 3, FALSE),
	(5, 'Janusz', null, 'Admiński', 4, TRUE),
	(6, 'Monika', null, 'Przykładowa', 4, FALSE),
	(7, 'Wiesław', null, 'Elektroniczny', 5, FALSE);

INSERT INTO public.students(
	session_token, first_name, second_name, surname)
	VALUES (1, 'Jan', null, 'Studencki'), (100, 'Adam', null, 'Krupa');

INSERT INTO public.organizational_unit(
	name)
	VALUES ('Instytut Telekomunikacji'),
	('Instytut Informatyki'),
	('Instytut Radiokomunikacji i Mulitimediów');

INSERT INTO public.subject_matter(
	name)
	VALUES ('teleinformatyka'),
	('dorożkarstwo'),
	('systemy wbudowane'),
	('systemy operacyjne');

INSERT INTO public.committee_roles(
	name)
	VALUES ('Chairman'),
	('Member'),
	('Reviewer'),
	('Thesis supervisor');

INSERT INTO public.committee DEFAULT VALUES;
INSERT INTO public.committee DEFAULT VALUES;
INSERT INTO public.committee DEFAULT VALUES;
INSERT INTO public.committee DEFAULT VALUES;
INSERT INTO public.committee DEFAULT VALUES;
INSERT INTO public.committee DEFAULT VALUES;

INSERT INTO public.commitee_person(
	committee_id, committee_role, person_id)
	VALUES 
	(1, 1, 3),
	(1, 2, 4),
	(1, 4, 2),
	(1, 3, 7),
	(2, 1, 3),
	(2, 2, 4),
	(2, 4, 2),
	(2, 3, 7),
	(3, 1, 3),
	(3, 2, 4),
	(3, 4, 2),
	(3, 3, 7),
  (4, 1, 3),
  (4, 2, 2),
  (4, 3, 4),
  (5, 4, 7),
  (5, 1, 2),
  (5, 2, 3),
  (5, 3, 4),
  (5, 4, 6),
  (6, 1, 2),
  (6, 2, 3),
  (6, 3, 4),
  (6, 4, 6);

INSERT INTO public.thesis_type(
	name)
	VALUES ('Praca inżynierska'),
	('Praca magisterska'),
	('Praca doktorska');

INSERT INTO public.major_speciality(
	major, speciality)
	VALUES ('Telekomunikacja', 'Teleinformatyka i Cyberbezpieczeństwo'),
	('Dorożkarstwo', 'Budowa linijek i powozów wyścigowych'),
	('Automatyka i Robotyka', 'Coś ze żwirem'),
	('Informatyka', 'Systemy operacyjne');

INSERT INTO public.thesis(
	defence_date, thesis_type_id, major_speciality_id, title, key_words, organizational_unit_id, subject_matter_id, committee_id, grade_defence, grade_review_supervisor, grade_review_reviewer, grade_avg, author_id, abstract, reviewer_review, supervisor_review, file_path)
	VALUES 	
('2020-05-23', 2, 2, 'Wpływ zaćmień księżyca na jakość dorożkarstwa w Kenii', 'dorożkarstwo, Kenia, zaćmienie księżyca', 3, 2, 1, null, 5.0, 5.0, null, 1, 'Praca opisuje wpływ zaćmień księżyca na jakość dorożkarstwa w Kenii.', 'Bardzo dobrze, super recenzja, 10/10', 'Bardzo dobrze, super recenzja, 10/10', '/thesis1.html'),

('2020-05-21', 1, 1, 'Wwpływ studiowania na Wydziale Elektroniki i Technik Informacyjnych na zdrowie psychiczne.', 'zdrowie psychiczne, studia, WEiTI', 1, 1, 2, null, 5.0, 5.0, null, 1, 'Praca opisuje wpływ studiowania na Wydziale Elektroniki i Technik Informacyjnych na zdrowie psychiczne.', 'Bardzo dobrze, super recenzja, 10/10', 'Bardzo dobrze, super recenzja, 10/10', '/thesis2.html'),

('2020-06-25', 3, 3, 'Sieci SDN', 'SDN, kontroler, sieci', 1, 1, 4, 4.0, 5.0, 5.0, 4.00, 100, 'Praca opisuje sieci SDN', 'Bardzo dobrze, super recenzja, 10/10', 'Bardzo dobrze, super recenzja, 10/10', '/praca.html'),

('2020-06-26', 3, 3, 'Systemy operacyjne', 'Linux, Windows', 2, 1, 5, null, 5.0, 5.0, null, 100, 'Praca opisuje systemy operacyjne', 'Bardzo dobrze, super recenzja, 10/10', 'Bardzo dobrze, super recenzja, 10/10', '/praca.html'),

('2020-06-27', 1, 3, 'Swiatlowody', 'swiatlowod, kwarc', 2, 1, 6, null, 3.0, 3.0, null, 100, 'Praca opisuje swiatlowody', 'Marnie, 0/10', 'Bardzo dobrze, super recenzja, 10/10', '/praca.html');


