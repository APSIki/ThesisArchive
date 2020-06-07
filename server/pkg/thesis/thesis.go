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

//TODO add handler for required and optional fields
type Thesis struct {
	ThesisID           int     `json:"thesisid"`
	Name               string  `json:"name"`
	Type               string  `json:"type"`
	SubjectMatter      int     `json:"subjectMatter"`
	OrganizationalUnit int     `json:"organizationalUnit"`
	Abstract           string  `json:"abstract"`
	Keywords           string  `json:"keywords"`
	Review1            Review  `json:"review_reviewer"`
	Review2            Review  `json:"review_supervisor"`
	Defense            Defense `json:"defense"`
	FilePath           string  `json:"filePath"`
	Role               string  `json:"role"`
}

type Defense struct {
	Defendedbool bool           `json:"defended,omitempty"`
	Grade        sql.NullString `json:"grade,omitempty"`
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
	Grade      []uint8 `json:"grade,omitempty"`
}

//TODO remove after unifying mocks
type postedThesis struct {
	Title               string  `json:"title"`
	Type               string  `json:"type"`
}

func PostThesis(w http.ResponseWriter, req *http.Request) {
	//t := New()
	//if err := t.decodeJSON(w, req); err != nil {
	//	respond.With(w, req, http.StatusBadRequest, err)
	//	return
	//}
	auth := req.Header.Get("Authorization")
	var thesis postedThesis
	err := json.NewDecoder(req.Body).Decode(&thesis)
	if err != nil {
		respond.With(w, req, http.StatusBadRequest, err)
		return
	}
	insertStmt := `insert into thesis(thesis_type_id, title, author_id) values ($1 $2 $3)`
	dbConnection := db.GetDB()
	if _, err := dbConnection.Exec(insertStmt, thesis.Type, thesis.Title, auth); err != nil {
		log.Fatal(err)
	}
	//TODO create a service for DB communication and add thesis
	respond.WithStatus(w, req, http.StatusCreated)
}

func GetThesis(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(req)
	//token := req.Header.Get("Authorization")
	fmt.Println("Jestem1")
	dbConnection := db.GetDB()
	sqlStatement1 := `SELECT * FROM thesis WHERE thesis_id=$1;`
	//sqlStatement1 := `SELECT thesis_id, defence_date FROM thesis WHERE thesis_id=$1;`
	row1 := dbConnection.QueryRow(sqlStatement1, params["id"])
	//switch err1 := row1.Scan(&id); err1 {

	var thesisTypeID int
	var MajorSpecialityID int
	var commiteeID int
	//var gradeDefence int
	var gradeAvg sql.NullString
	var authorID int
	var thesis Thesis

	fmt.Println("Jestem11")
	switch err1 := row1.Scan(&thesis.ThesisID, &thesis.Defense.DefenseDate, &thesisTypeID, &MajorSpecialityID, &thesis.Name, &thesis.Keywords, &thesis.OrganizationalUnit, &thesis.SubjectMatter, &commiteeID, &thesis.Defense.Grade, &thesis.Review2.Grade, &thesis.Review1.Grade, &gradeAvg, &authorID, &thesis.Abstract, &thesis.Review1.Text, &thesis.Review2.Text, &thesis.FilePath); err1 {
	case sql.ErrNoRows:
		fmt.Println("No rows were returned!")
	case nil:
		fmt.Println(thesis.ThesisID, thesis.Defense.DefenseDate)
	default:
		panic(err1)
	}
	fmt.Println("Jestem2")
	sqlStatement2 := `SELECT name FROM thesis_type WHERE thesis_type_id=$1;`
	row2 := dbConnection.QueryRow(sqlStatement2, thesisTypeID)
	switch err2 := row2.Scan(&thesis.Type); err2 {
	case sql.ErrNoRows:
		fmt.Println("No rows were returned!")
	case nil:
		fmt.Println(thesis.Type)
	default:
		panic(err2)
	}
	fmt.Println("Jestem3")
	thesis.Role = "admin"
	sqlStatementReviewerID := `SELECT person_id FROM commitee_person WHERE committee_id=$1 and committee_role=3`
	sqlStatementSupervisorID := `SELECT person_id FROM commitee_person WHERE committee_id=$1 and committee_role=4`
	row3 := dbConnection.QueryRow(sqlStatementReviewerID, commiteeID)
	switch err3 := row3.Scan(&thesis.Review1.ReviewerID); err3 {
	case sql.ErrNoRows:
		fmt.Println("No rows were returned!")
	case nil:
		fmt.Println(thesis.Review1.ReviewerID)
	default:
		panic(err3)
	}
	fmt.Println("Jestem4")
	row4 := dbConnection.QueryRow(sqlStatementSupervisorID, commiteeID)
	switch err4 := row4.Scan(&thesis.Review2.ReviewerID); err4 {
	case sql.ErrNoRows:
		fmt.Println("No rows were returned!")
	case nil:
		fmt.Println(thesis.Review2.ReviewerID)
	default:
		panic(err4)
	}
	fmt.Println("Jestem5")
	var first_name_reviewer string
	var surname_reviewer string
	var first_name_supervisor string
	var surname_supervisor string
	sqlStatementReviewerName := `SELECT first_name, surname FROM staff_person WHERE staff_person_id=$1`
	sqlStatementSupervisorName := `SELECT first_name, surname FROM staff_person WHERE staff_person_id=$1`
	row5 := dbConnection.QueryRow(sqlStatementReviewerName, thesis.Review1.ReviewerID)
	switch err5 := row5.Scan(&first_name_reviewer, &surname_reviewer); err5 {
	case sql.ErrNoRows:
		fmt.Println("No rows were returned!")
	case nil:
		fmt.Println(first_name_reviewer, surname_reviewer)
	default:
		panic(err5)
	}
	thesis.Review1.Name = first_name_reviewer + " " + surname_reviewer
	row6 := dbConnection.QueryRow(sqlStatementSupervisorName, thesis.Review2.ReviewerID)
	switch err6 := row6.Scan(&first_name_supervisor, &surname_supervisor); err6 {
	case sql.ErrNoRows:
		fmt.Println("No rows were returned!")
	case nil:
		fmt.Println(first_name_supervisor, surname_supervisor)
	default:
		panic(err6)
	}
	thesis.Review2.Name = first_name_supervisor + " " + surname_supervisor
	thesis.Defense.Committee.Reviewer.Name = thesis.Review1.Name
	thesis.Defense.Committee.Reviewer.ID = thesis.Review1.ReviewerID
	thesis.Defense.Committee.Supervisor.Name = thesis.Review2.Name
	thesis.Defense.Committee.Supervisor.ID = thesis.Review2.ReviewerID
	sqlStatementChairmanID := `SELECT person_id FROM commitee_person WHERE committee_id=$1 and committee_role=1`
	sqlStatementMemberID := `SELECT person_id FROM commitee_person WHERE committee_id=$1 and committee_role=2`
	row7 := dbConnection.QueryRow(sqlStatementChairmanID, commiteeID)
	switch err7 := row7.Scan(&thesis.Defense.Committee.Chairman.ID); err7 {
	case sql.ErrNoRows:
		fmt.Println("No rows were returned!")
	case nil:
		fmt.Println(thesis.Defense.Committee.Member.ID)
	default:
		panic(err7)
	}
	row8 := dbConnection.QueryRow(sqlStatementMemberID, commiteeID)
	switch err8 := row8.Scan(&thesis.Defense.Committee.Member.ID); err8 {
	case sql.ErrNoRows:
		fmt.Println("No rows were returned!")
	case nil:
		fmt.Println(thesis.Defense.Committee.Member.ID)
	default:
		panic(err8)
	}

	var first_name_chairman string
	var surname_chairman string
	var first_name_member string
	var surname_member string
	sqlStatementCharimanName := `SELECT first_name, surname FROM staff_person WHERE staff_person_id=$1`
	sqlStatementMemberName := `SELECT first_name, surname FROM staff_person WHERE staff_person_id=$1`
	row9 := dbConnection.QueryRow(sqlStatementCharimanName, thesis.Defense.Committee.Chairman.ID)
	switch err9 := row9.Scan(&first_name_chairman, &surname_chairman); err9 {
	case sql.ErrNoRows:
		fmt.Println("No rows were returned!")
	case nil:
		fmt.Println(first_name_chairman, surname_chairman)
	default:
		panic(err9)
	}

	thesis.Defense.Committee.Chairman.Name = first_name_chairman + " " + surname_chairman

	row10 := dbConnection.QueryRow(sqlStatementMemberName, thesis.Defense.Committee.Member.ID)
	switch err10 := row10.Scan(&first_name_member, &surname_member); err10 {
	case sql.ErrNoRows:
		fmt.Println("No rows were returned!")
	case nil:
		fmt.Println(thesis.Defense.Committee.Member.ID)
	default:
		panic(err10)
	}
	thesis.Defense.Committee.Member.Name = first_name_member + " " + surname_member

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
	//TODO create a service for DB communication and add thesis
	respond.WithStatus(w, req, http.StatusCreated)
}
