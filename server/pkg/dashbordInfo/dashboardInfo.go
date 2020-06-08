package dashbordInfo

import (
	"encoding/json"
	"log"
	"net/http"
	"server/pkg/db"
)

type NearestDefense struct {
	Date       string `json:"date"`
	ThesisID   int `json:"thesisId"`
	ThesisName string `json:"thesisName"`
	ThesisType string `json:"thesisType"`
}

func GetDashboard(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	dbConnection := db.GetDB()
	auth := r.Header.Get("Authorization")
	var query string
	query = "select thesis.thesis_id, thesis.defence_date, thesis.title, thesis_type.name from thesis, thesis_type, commitee_person where thesis.thesis_type_id = thesis_type.thesis_type_id and thesis.title is not null and thesis.committee_id = commitee_person.committee_id and commitee_person.person_id = " + auth
	if auth == "1" {
		query = "select thesis.thesis_id, thesis.defence_date, thesis.title, thesis_type.name from thesis, thesis_type where thesis.thesis_type_id = thesis_type.thesis_type_id and thesis.title is not null and thesis.author_id = " + auth
	}
	rows, err := dbConnection.Query(query)
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()
	defences := make([]NearestDefense, 0)
	for rows.Next() {
		var id int
		var date string
		var name string
		var kind string
		err := rows.Scan(&id, &date, &name, &kind)
		if err != nil {
			log.Fatal(err)
		}
		defences = append(defences, NearestDefense{Date: date, ThesisID: id, ThesisName: name, ThesisType: kind})
	}
	if rows.Err() != nil {
		log.Fatal(err)
	}

	json.NewEncoder(w).Encode(defences)
}
