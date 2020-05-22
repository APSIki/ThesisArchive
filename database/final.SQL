﻿/*
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
    (INCREMENT BY 1 NO MINVALUE NO MAXVALUE START WITH 0 CACHE 1),
  "date" Date NOT NULL,
  "thesis_type_id" Integer NOT NULL,
  "major_speciality_id" Integer NOT NULL,
  "title" Text NOT NULL,
  "key_words" Text NOT NULL,
  "organizational_unit_id" Integer NOT NULL,
  "subject_matter_id" Integer NOT NULL,
  "committee_id" Integer NOT NULL,
  "grade_defence" Numeric(2,1),
  "grade_avg" Numeric(3,2),
  "author_id" Integer NOT NULL,
  "Abstract" Text,
  "Review" Text
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
ALTER TABLE "thesis" ADD CONSTRAINT "PK_thesis" PRIMARY KEY ("thesis_id","thesis_type_id","major_speciality_id","author_id")
;
ALTER TABLE "thesis" ADD CONSTRAINT "thesis_id" UNIQUE ("thesis_id")
;
-- Table staff_person

CREATE TABLE "staff_person"
(
  "staff_person_id" Integer NOT NULL GENERATED ALWAYS AS IDENTITY
    (INCREMENT BY 1 NO MINVALUE NO MAXVALUE START WITH 0 CACHE 1),
  "session_token" Name NOT NULL,
  "first_name" Text NOT NULL,
  "second_name" Text,
  "surname" Text NOT NULL,
  "person_title_id" Integer NOT NULL
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
    (INCREMENT BY 1 NO MINVALUE NO MAXVALUE START WITH 0 CACHE 1),
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
    (INCREMENT BY 1 NO MINVALUE NO MAXVALUE START WITH 0 CACHE 1),
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
    (INCREMENT BY 1 NO MINVALUE NO MAXVALUE START WITH 0 CACHE 1),
  "name" Integer NOT NULL
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
    (INCREMENT BY 1 NO MINVALUE NO MAXVALUE START WITH 0 CACHE 1),
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
    (INCREMENT BY 1 NO MINVALUE NO MAXVALUE START WITH 0 CACHE 1),
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
    (INCREMENT BY 1 NO MINVALUE NO MAXVALUE START WITH 0 CACHE 1)
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
    (INCREMENT BY 1 NO MINVALUE NO MAXVALUE START WITH 0 CACHE 1),
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
    (INCREMENT BY 1 NO MINVALUE NO MAXVALUE START WITH 0 CACHE 1),
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
  "student_id" Integer NOT NULL,
  "session_token" Text NOT NULL,
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

ALTER TABLE "thesis" ADD CONSTRAINT "thesis_has_organizational_unit" FOREIGN KEY ("organizational_unit_id") REFERENCES "organizational_unit" ("organizational_unit_id") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "thesis" ADD CONSTRAINT "thesis_has_subject_matter" FOREIGN KEY ("subject_matter_id") REFERENCES "subject_matter" ("subject_matter_id") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "thesis" ADD CONSTRAINT "thesis_has_type" FOREIGN KEY ("thesis_type_id") REFERENCES "thesis_type" ("thesis_type_id") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "thesis" ADD CONSTRAINT "theses_has_major_speciality" FOREIGN KEY ("major_speciality_id") REFERENCES "major_speciality" ("major_speciality_id") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "commitee_person" ADD CONSTRAINT "committee_person_has_person" FOREIGN KEY ("person_id") REFERENCES "staff_person" ("staff_person_id") ON DELETE NO ACTION ON UPDATE NO ACTION
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



