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
	ThesisID           int     `json:"id"`
	Name               string  `json:"name"`
	Type               string  `json:"type"`
	SubjectMatter      int64   `json:"subjectMatter"`
	OrganizationalUnit int64   `json:"organizationalUnit"`
	Abstract           string  `json:"abstract"`
	Keywords           string  `json:"keywords"`
	Review1            Review  `json:"reviewer1"`
	Review2            Review  `json:"reviewer2"`
	Defense            Defense `json:"defense"`
	FilePath           string  `json:"filePath"`
	Role               string  `json:"role"`
}

type Defense struct {
	Defendedbool bool         `json:"defended"`
	Grade        float64      `json:"grade,omitempty"`
	DefenseDate  string       `json:"date,omitempty"`
	Committee    CommitteeGet `json:"commitee,omitempty"`
}

type CommitteeGet struct {
	Chairman   Person `json:"chairman"`
	Member     Person `json:"member2"`
	Reviewer   Person `json:"member1"`
	Supervisor Person `json:"advisor"`
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
	Abstract           string `json:"abstract"`
	Keywords           string `json:"keywords"`
	OrganizationalUnit int    `json:"organizationalUnit"`
	SubjectMatter      int    `json:"subjectMatter"`
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
	Grade      float64 `json:"grade,omitempty"`
}

type Reviewers struct {
	Reviewer1 int `json:"reviewer1"`
	Reviewer2 int `json:"reviewer2"`
}

func PostThesis(w http.ResponseWriter, req *http.Request) {
	thesis := New()
	if err := thesis.decodeJSON(w, req); err != nil {
		respond.With(w, req, http.StatusBadRequest, err)
		return
	}
	dbConnection := db.GetDB()

	lastInsertId := 0
	dbConnection.QueryRow("INSERT INTO committee DEFAULT VALUES RETURNING committee_id").Scan(&lastInsertId)

	_, err := dbConnection.Exec("INSERT INTO commitee_person (committee_id, committee_role, person_id) VALUES ($1, 1, 0)", lastInsertId)

	if err != nil {
		log.Print(err)
	}

	dbConnection.Exec("INSERT INTO commitee_person (committee_id, committee_role, person_id) VALUES ($1, 2, 0)", lastInsertId)
	dbConnection.Exec("INSERT INTO commitee_person (committee_id, committee_role, person_id) VALUES ($1, 3, 0)", lastInsertId)
	dbConnection.Exec("INSERT INTO commitee_person (committee_id, committee_role, person_id) VALUES ($1, 4, 0)", lastInsertId)


	auth := req.Header.Get("Authorization")
	insertStmt := `insert into thesis(thesis_type_id, title, author_id, committee_id, defence_date) values ($1, $2, $3, $4, '2020-06-28T12:00:00.000Z')`
	if _, err := dbConnection.Exec(insertStmt, thesis.Type, thesis.Name, auth, lastInsertId); err != nil {
		log.Print(err)
	}

	log.Print(lastInsertId)
	respond.WithStatus(w, req, http.StatusCreated)
}

func GetThesis(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(req)
	auth := req.Header.Get("Authorization")
	dbConnection := db.GetDB()
	var thesisTypeID int
	//var MajorSpecialityID int
	//var commiteeID int
	var gradeAvg sql.NullFloat64
	var defGrade sql.NullFloat64
	var grade1 sql.NullFloat64
	var grade2 sql.NullFloat64
	var defenseDate sql.NullString
	var majorSpecID sql.NullInt64
	var keywords sql.NullString
	var organizationID sql.NullInt64
	var subjectMatter sql.NullInt64
	var committeeID sql.NullInt64
	var abstract sql.NullString
	var review1 sql.NullString
	var review2 sql.NullString
	var filePath sql.NullString
	var authorID int
	var thesis Thesis

	getAllThesisStmt := `SELECT * FROM thesis WHERE thesis_id=$1;`
	row := dbConnection.QueryRow(getAllThesisStmt, params["id"])
	//err := row.Scan(&thesis.ThesisID, &thesis.Defense.DefenseDate, &thesisTypeID, &MajorSpecialityID, &thesis.Name, &thesis.Keywords, &thesis.OrganizationalUnit, &thesis.SubjectMatter, &commiteeID, &defGrade, &grade2, &grade1, &gradeAvg, &authorID, &thesis.Abstract, &thesis.Review1.Text, &thesis.Review2.Text, &thesis.FilePath)
	err := row.Scan(&thesis.ThesisID, &defenseDate, &thesisTypeID, &majorSpecID, &thesis.Name, &keywords, &organizationID, &subjectMatter, &committeeID, &defGrade, &grade2, &grade1, &gradeAvg, &authorID, &abstract, &review1, &review2, &filePath)
	if err == sql.ErrNoRows {
		log.Print("No rows were returned!")
	} else if err != nil {
		log.Print(err)
	}
	thesis.Defense.Grade = 0
	if defGrade.Valid {
		thesis.Defense.Grade = defGrade.Float64
	}
	thesis.Review1.Grade = 0
	if grade1.Valid {
		thesis.Review1.Grade = grade1.Float64
	}
	thesis.Review2.Grade = 0
	if grade2.Valid {
		thesis.Review2.Grade = grade2.Float64
	}
	thesis.Defense.Defendedbool = false
	if thesis.Defense.Grade != 0 {
		thesis.Defense.Defendedbool = true
	}
	thesis.Defense.DefenseDate = ""
	if defenseDate.Valid {
		thesis.Defense.DefenseDate = defenseDate.String
	}
	//..thesis.
	//if majorSpecID.Valid {
	//
	//}
	thesis.Keywords = ""
	if keywords.Valid {
		thesis.Keywords = keywords.String
	}
	thesis.OrganizationalUnit = 0
	if organizationID.Valid {
		thesis.OrganizationalUnit = organizationID.Int64
	}
	thesis.SubjectMatter = 0
	if subjectMatter.Valid {
		thesis.SubjectMatter = subjectMatter.Int64
	}
	//thesis.Defense.Committee.
	//if committeeID.Valid {
	//
	//}
	thesis.Abstract = ""
	if abstract.Valid {
		thesis.Abstract = abstract.String
	}
	thesis.Review1.Text = ""
	if review1.Valid {
		thesis.Review1.Text = review1.String
	}
	thesis.Review2.Text = ""
	if review2.Valid {
		thesis.Review2.Text = review2.String
	}
	thesis.FilePath = ""
	if filePath.Valid {
		thesis.FilePath = filePath.String
	}

	thesisTypeNameStmt := `SELECT name FROM thesis_type WHERE thesis_type_id=$1;`
	row = dbConnection.QueryRow(thesisTypeNameStmt, thesisTypeID)
	err = row.Scan(&thesis.Type)
	if err == sql.ErrNoRows {
		log.Print("No rows were returned!")
	} else if err != nil {
		log.Print(err)
	}

	switch auth {
	case "1":
		thesis.Role = "STUDENT"
	case "2", "4":
		thesis.Role = "MEMBER"
	case "3":
		thesis.Role = "CHAIRMAN"
	case "5":
		thesis.Role = "ADMIN"
	}

	reviewerNameAndIDStmt := `SELECT commitee_person.person_id, staff_person.first_name, staff_person.surname FROM commitee_person, staff_person WHERE committee_id=$1 and committee_role=$2 and staff_person.staff_person_id=commitee_person.person_id`
	row = dbConnection.QueryRow(reviewerNameAndIDStmt, committeeID, 3)
	var reviewerName string
	var reviewerSurname string
	err = row.Scan(&thesis.Review1.ReviewerID, &reviewerName, &reviewerSurname)
	if err == sql.ErrNoRows {
		log.Print("No rows were returned!")
	} else if err != nil {
		log.Print(err)
	}
	thesis.Review1.Name = reviewerName + " " + reviewerSurname
	row = dbConnection.QueryRow(reviewerNameAndIDStmt, committeeID, 4)
	err = row.Scan(&thesis.Review2.ReviewerID, &reviewerName, &reviewerSurname)
	if err == sql.ErrNoRows {
		log.Print("No rows were returned!")
	} else if err != nil {
		log.Print(err)
	}
	thesis.Review2.Name = reviewerName + " " + reviewerSurname
	thesis.Defense.Committee.Reviewer.Name = thesis.Review1.Name
	thesis.Defense.Committee.Reviewer.ID = thesis.Review1.ReviewerID
	thesis.Defense.Committee.Supervisor.Name = thesis.Review2.Name
	thesis.Defense.Committee.Supervisor.ID = thesis.Review2.ReviewerID
	row = dbConnection.QueryRow(reviewerNameAndIDStmt, committeeID, 1)
	var chairmanName string
	var chairmanSurname string
	err = row.Scan(&thesis.Defense.Committee.Chairman.ID, &chairmanName, &chairmanSurname)
	if err == sql.ErrNoRows {
		log.Print("No rows were returned!")
	} else if err != nil {
		log.Print(err)
	}
	thesis.Defense.Committee.Chairman.Name = chairmanName + " " + chairmanSurname

	row = dbConnection.QueryRow(reviewerNameAndIDStmt, committeeID, 2)
	var memberName string
	var memberSurname string
	err = row.Scan(&thesis.Defense.Committee.Member.ID, &memberName, &memberSurname)
	if err == sql.ErrNoRows {
		log.Print("No rows were returned!")
	} else if err != nil {
		log.Print(err)
	}
	thesis.Defense.Committee.Member.Name = memberName + " " + memberSurname

	w.Header().Set("Access-Control-Allow-Origin", "*")
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
		log.Print("No rows were returned!")
	} else if err != nil {
		log.Print(err)
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
	w.Header().Set("Access-Control-Allow-Origin", "*")

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
		log.Print(err)
	}
	w.Header().Set("Access-Control-Allow-Origin", "*")

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
		log.Print(err)
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
		log.Print(err)
	}
	w.Header().Set("Access-Control-Allow-Origin", "*")

	json.NewEncoder(w).Encode(path)
}

func PostReview1(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(req)
	var review Review
	_ = json.NewDecoder(req.Body).Decode(&review)
	dbConnection := db.GetDB()
	sqlStatement := "update thesis set reviewer_review = $1, grade_review_reviewer = $2 where thesis_id = $3"
	_, err := dbConnection.Exec(sqlStatement, review.Text, review.Grade, params["id"])
	if err != nil {
		log.Print(err)
	}
	w.Header().Set("Access-Control-Allow-Origin", "*")

	json.NewEncoder(w).Encode(review)
}

func PostReview2(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(req)
	var review Review
	_ = json.NewDecoder(req.Body).Decode(&review)
	dbConnection := db.GetDB()
	sqlStatement := "update thesis set supervisor_review = $1, grade_review_supervisor = $2 where thesis_id = $3"
	_, err := dbConnection.Exec(sqlStatement, review.Text, review.Grade, params["id"])
	if err != nil {
		log.Print(err)
	}
	w.Header().Set("Access-Control-Allow-Origin", "*")

	json.NewEncoder(w).Encode(review)
}

func PostThesisDetails(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(req)
	var details ThesisDetails
	_ = json.NewDecoder(req.Body).Decode(&details)
	dbConnection := db.GetDB()
	log.Print(details.SubjectMatter)
	sqlStatement := "update thesis set key_words = $1, abstract = $2, organizational_unit_id = $3, subject_matter_id = $4 where thesis_id = $5"
	_, err := dbConnection.Exec(sqlStatement, details.Keywords, details.Abstract, details.OrganizationalUnit, details.SubjectMatter, params["id"])
	if err != nil {
		log.Print(err)
	}
	w.Header().Set("Access-Control-Allow-Origin", "*")

	json.NewEncoder(w).Encode(details)
}

func PostReviewers(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(req)

	var reviewers Reviewers
	_ = json.NewDecoder(req.Body).Decode(&reviewers)

	dbConnection := db.GetDB()

	sqlStatement1 := "update commitee_person set person_id = $1 where committee_role=3 and committee_id = (select committee_id from thesis where thesis_id = $2)"
	sqlStatement2 := "update commitee_person set person_id = $1 where committee_role=4 and committee_id = (select committee_id from thesis where thesis_id = $2)"

	 _, err1 := dbConnection.Exec(sqlStatement1, reviewers.Reviewer1, params["id"])
	if err1 != nil {
		log.Print(err1)
	}

	_, err2 := dbConnection.Exec(sqlStatement2, reviewers.Reviewer2, params["id"])
	if err2 != nil {
		log.Print(err2)
	}

	json.NewEncoder(w).Encode(reviewers)
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
