package dashbordInfo

import (
	"encoding/json"
	"fmt"
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
	query := "select thesis.thesis_id, thesis.title, thesis_type.name, commitee_person.person_id from thesis, thesis_type, commitee_person where thesis.thesis_type_id = thesis_type.thesis_type_id and thesis.title is not null and thesis.committee_id = commitee_person.committee_id and commitee_person.person_id = " + auth
	rows, err := dbConnection.Query(query)
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()
	var defences []NearestDefense
	for rows.Next() {
		var id int
		var date string
		var name string
		var kind string
		var personID int
		err := rows.Scan(&id, &date, &name, &kind, &personID)
		if err != nil {
			log.Fatal(err)
		}
		defences = append(defences, NearestDefense{Date: date, ThesisID: id, ThesisName: name, ThesisType: kind})
		fmt.Println(personID)
	}
	if rows.Err() != nil {
		log.Fatal(err)
	}
	json.NewEncoder(w).Encode(defences)
}
