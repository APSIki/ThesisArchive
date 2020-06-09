package thesis

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"server/pkg/db"

	"strings"

	"github.com/golang/gddo/httputil/header"
	"github.com/gorilla/mux"
	"gopkg.in/matryer/respond.v1"
)

type Thesis struct {
	ThesisID           int     `json:"thesisid"`
	Name               string  `json:"name"`
	Type               string  `json:"type"`
	SubjectMatter      int     `json:"subjectMatter"`
	OrganizationalUnit int     `json:"organizationalUnit"`
	Abstract           string  `json:"abstract"`
	Keywords           string  `json:"keywords"`
	Review1            Review  `json:"review1"`
	Review2            Review  `json:"review2"`
	Defense            Defense `json:"defense"`
	FilePath           string  `json:"filePath"`
	Role               string  `json:"role"`
}

type Defense struct {
	Defendedbool bool           `json:"defended,omitempty"`
	Grade        float32 `json:"grade,omitempty"`
	DefenseDate  string         `json:"date,omitempty"`
	Committee    CommitteeGet   `json:"commitee,omitempty"`
}

type CommitteeGet struct {
	Chairman   Person `json:"chairman"`
	Member     Person `json:"member"`
	Reviewer   Person `json:"reviewer"`
	Supervisor Person `json:"supervisor"`
}

type Person struct {
	Name string `json:"name"`
	ID   int    `json:"id"`
}

type DefenseDate struct {
	Date string `json:"date"`
}

type FilePath struct {
	Path string `json:"path"`
}

type ThesisDetails struct {
	Abstract string `json:"abstract"`
	Keywords string `json:"keywords"`
}

type Committee struct {
	Chairman   string `json:"chairman"`
	Member     string `json:"member"`
	Reviewer   string `json:"reviewer"`
	Supervisor string `json:"supervisor"`
}

type Review struct {
	Name       string  `json:"reviewerName,omitempty"`
	ReviewerID int     `json:"reviewerId",omitempty`
	Text       string  `json:"text"`
	Grade      float32 `json:"grade,omitempty"`
}

func PostThesis(w http.ResponseWriter, req *http.Request) {
	thesis := New()
	if err := thesis.decodeJSON(w, req); err != nil {
		respond.With(w, req, http.StatusBadRequest, err)
		return
	}
	auth := req.Header.Get("Authorization")
	insertStmt := `insert into thesis(thesis_type_id, title, author_id) values ($1 $2 $3)`
	dbConnection := db.GetDB()
	if _, err := dbConnection.Exec(insertStmt, thesis.Type, thesis.Name, auth); err != nil {
		log.Fatal(err)
	}
	respond.WithStatus(w, req, http.StatusCreated)
}

func GetThesis(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(req)
	auth := req.Header.Get("Authorization")
	dbConnection := db.GetDB()
	var thesisTypeID int
	var MajorSpecialityID int
	var commiteeID int
	var gradeAvg sql.NullString
	var authorID int
	var thesis Thesis

	getAllThesisStmt := `SELECT * FROM thesis WHERE thesis_id=$1;`
	row := dbConnection.QueryRow(getAllThesisStmt, params["id"])
	err := row.Scan(&thesis.ThesisID, &thesis.Defense.DefenseDate, &thesisTypeID, &MajorSpecialityID, &thesis.Name, &thesis.Keywords, &thesis.OrganizationalUnit, &thesis.SubjectMatter, &commiteeID, &thesis.Defense.Grade, &thesis.Review2.Grade, &thesis.Review1.Grade, &gradeAvg, &authorID, &thesis.Abstract, &thesis.Review1.Text, &thesis.Review2.Text, &thesis.FilePath)
	if err == sql.ErrNoRows {
		log.Fatal("No rows were returned!")
	} else if err != nil {
		log.Fatal(err)
	}

	thesis.Defense.Defendedbool = false
	if thesis.Defense.Grade != 0 {
		thesis.Defense.Defendedbool = true
	}

	thesisTypeNameStmt := `SELECT name FROM thesis_type WHERE thesis_type_id=$1;`
	row = dbConnection.QueryRow(thesisTypeNameStmt, thesisTypeID)
	err = row.Scan(&thesis.Type)
	if err == sql.ErrNoRows {
		log.Fatal("No rows were returned!")
	} else if err != nil {
		log.Fatal(err)
	}

	switch auth {
	case "1":
		thesis.Role = "STUDENT"
	case "2","4":
		thesis.Role = "MEMBER"
	case "3":
		thesis.Role = "CHAIRMAN"
	case "5":
		thesis.Role = "ADMIN"
	}

	reviewerNameAndIDStmt := `SELECT commitee_person.person_id, staff_person.first_name, staff_person.surname FROM commitee_person, staff_person WHERE committee_id=$1 and committee_role=$2 and staff_person.staff_person_id=commitee_person.person_id`
	row = dbConnection.QueryRow(reviewerNameAndIDStmt, commiteeID, 3)
	var reviewerName string
	var reviewerSurname string
	err = row.Scan(&thesis.Review1.ReviewerID, &reviewerName, &reviewerSurname)
	if err == sql.ErrNoRows {
		log.Fatal("No rows were returned!")
	} else if err != nil {
		log.Fatal(err)
	}
	thesis.Review1.Name = reviewerName + " " + reviewerSurname
	row = dbConnection.QueryRow(reviewerNameAndIDStmt, commiteeID, 4)
	err = row.Scan(&thesis.Review1.ReviewerID, &reviewerName, &reviewerSurname)
	if err == sql.ErrNoRows {
		log.Fatal("No rows were returned!")
	} else if err != nil {
		log.Fatal(err)
	}
	thesis.Review2.Name = reviewerName + " " + reviewerSurname
	thesis.Defense.Committee.Reviewer.Name = thesis.Review1.Name
	thesis.Defense.Committee.Reviewer.ID = thesis.Review1.ReviewerID
	thesis.Defense.Committee.Supervisor.Name = thesis.Review2.Name
	thesis.Defense.Committee.Supervisor.ID = thesis.Review2.ReviewerID
	row = dbConnection.QueryRow(reviewerNameAndIDStmt, commiteeID, 1)
	var chairmanName string
	var chairmanSurname string
	err = row.Scan(&thesis.Defense.Committee.Chairman.ID, &chairmanName, &chairmanSurname)
	if err == sql.ErrNoRows {
		log.Fatal("No rows were returned!")
	} else if err != nil {
		log.Fatal(err)
	}
	thesis.Defense.Committee.Chairman.Name = chairmanName + " " + chairmanSurname

	row = dbConnection.QueryRow(reviewerNameAndIDStmt, commiteeID, 2)
	var memberName string
	var memberSurname string
	err = row.Scan(&thesis.Defense.Committee.Chairman.ID, &memberName, &memberSurname)
	if err == sql.ErrNoRows {
		log.Fatal("No rows were returned!")
	} else if err != nil {
		log.Fatal(err)
	}
	thesis.Defense.Committee.Member.Name = memberName + " " + memberSurname

	json.NewEncoder(w).Encode(thesis)
}

func PostCommittee(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(req)

	var committee Committee
	_ = json.NewDecoder(req.Body).Decode(&committee)
	dbConnection := db.GetDB()
	sqlStatement1 := `SELECT committee_id FROM thesis WHERE thesis_id=$1;`
	var committeeID int

	row := dbConnection.QueryRow(sqlStatement1, params["id"])
	err := row.Scan(&committeeID)
	if err == sql.ErrNoRows {
		log.Fatal("No rows were returned!")
	} else if err != nil {
		log.Fatal(err)
	}

	sqlStatementChairman := "update commitee_person set person_id = $1 where committee_id = $2 and committee_role = 1"
	sqlStatementMember := "update commitee_person set person_id = $1 where committee_id = $2 and committee_role = 2"
	sqlStatementReviewer := "update commitee_person set person_id = $1 where committee_id = $2 and committee_role = 3"
	sqlStatementSupervisor := "update commitee_person set person_id = $1 where committee_id = $2 and committee_role = 4"
	if _, err := dbConnection.Exec(sqlStatementChairman, committee.Chairman, committeeID); err != nil {
		panic(err)
	}
	if _, err := dbConnection.Exec(sqlStatementMember, committee.Member, committeeID); err != nil {
		panic(err)
	}
	if _, err := dbConnection.Exec(sqlStatementReviewer, committee.Reviewer, committeeID); err != nil {
		panic(err)
	}
	if _, err := dbConnection.Exec(sqlStatementSupervisor, committee.Supervisor, committeeID); err != nil {
		panic(err)
	}
	json.NewEncoder(w).Encode(committee)
}

func PostDefense(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(req)
	var defense Defense
	_ = json.NewDecoder(req.Body).Decode(&defense)
	dbConnection := db.GetDB()
	sqlStatement := "update thesis set grade_defence = $1 where thesis_id = $2"
	_, err := dbConnection.Exec(sqlStatement, defense.Grade, params["id"])
	if err != nil {
		log.Fatal(err)
	}
	json.NewEncoder(w).Encode(defense)
}

func PostDefenseDate(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(req)
	var date DefenseDate
	_ = json.NewDecoder(req.Body).Decode(&date)
	split := strings.Split(date.Date, "T")
	date_final := split[0]
	dbConnection := db.GetDB()
	sqlStatement := "update thesis set defence_date = $1 where thesis_id = $2"
	_, err := dbConnection.Exec(sqlStatement, date_final, params["id"])
	if err != nil {
		log.Fatal(err)
	}
	json.NewEncoder(w).Encode(date_final)
}

func PostFile(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(req)
	var path FilePath
	_ = json.NewDecoder(req.Body).Decode(&path)
	dbConnection := db.GetDB()
	sqlStatement := "update thesis set file_path = $1 where thesis_id = $2"
	_, err := dbConnection.Exec(sqlStatement, path.Path, params["id"])
	if err != nil {
		log.Fatal(err)
	}
	json.NewEncoder(w).Encode(path)
}

func PostReview1(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(req)
	var review Review
	_ = json.NewDecoder(req.Body).Decode(&review)
	dbConnection := db.GetDB()
	sqlStatement := "update thesis set supervisor_review = $1, grade_review_supervisor = $2 where thesis_id = $3"
	_, err := dbConnection.Exec(sqlStatement, review.Text, review.Grade, params["id"])
	if err != nil {
		log.Fatal(err)
	}
	json.NewEncoder(w).Encode(review)
}

func PostReview2(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(req)
	var review Review
	_ = json.NewDecoder(req.Body).Decode(&review)
	dbConnection := db.GetDB()
	sqlStatement := "update thesis set reviewer_review = $1, grade_review_reviewer = $2 where thesis_id = $3"
	_, err := dbConnection.Exec(sqlStatement, review.Text, review.Grade, params["id"])
	if err != nil {
		log.Fatal(err)
	}
	json.NewEncoder(w).Encode(review)
}

func PostThesisDetails(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(req)
	var details ThesisDetails
	_ = json.NewDecoder(req.Body).Decode(&details)
	dbConnection := db.GetDB()
	sqlStatement := "update thesis set key_words = $1, abstract = $2 where thesis_id = $3"
	_, err := dbConnection.Exec(sqlStatement, details.Keywords, details.Abstract, params["id"])
	if err != nil {
		log.Fatal(err)
	}
	json.NewEncoder(w).Encode(details)
}

func New() *Thesis {
	return &Thesis{}
}

func (t *Thesis) decodeJSON(w http.ResponseWriter, req *http.Request) error {
	if req.Header.Get("Content-Type") != "" {
		value, _ := header.ParseValueAndParams(req.Header, "Content-Type")
		if value != "application/json" {
			msg := "Content-Type header is not application/json"
			return fmt.Errorf(msg)
		}
	}
	decoder := json.NewDecoder(req.Body)
	err := decoder.Decode(&t)
	return err
}

func PutThesis(w http.ResponseWriter, req *http.Request) {
	t := New()
	if err := t.decodeJSON(w, req); err != nil {
		respond.With(w, req, http.StatusBadRequest, err)
		return
	}
	respond.WithStatus(w, req, http.StatusCreated)
}
