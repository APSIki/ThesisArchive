package searchTheses

import (
	"encoding/json"
	"log"
	"net/http"
	"server/pkg/db"
)

type ThesesData struct {
	ThesisID int `json:"id"`
	Name     string `json:"name"`
	Type     string `json:"type"`
	Author   string `json:"author"`
}

func Search(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	query := "select thesis.thesis_id, thesis.title, students.first_name, students.surname, thesis_type.name from thesis, thesis_type, students where thesis.thesis_type_id = thesis_type.thesis_type_id and thesis.title is not null and students.session_token = thesis.author_id"
	thesesData := make([]ThesesData, 0)
	dbConnection := db.GetDB()
	rows, err := dbConnection.Query(query)
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()
	for rows.Next() {
		var id int
		var title string
		var firstName string
		var surname string
		var kind string
		err := rows.Scan(&id, &title, &firstName, &surname, &kind)
		if err != nil {
			log.Fatal(err)
		}
		thesesData = append(thesesData, ThesesData{ThesisID: id, Name: title, Type: kind, Author: firstName + " " + surname})
	}
	if rows.Err() != nil {
		log.Fatal(err)
	}
	json.NewEncoder(w).Encode(thesesData)
}
