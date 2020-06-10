package searchTheses

import (
	"encoding/json"
	"log"
	"net/http"
	"server/pkg/db"

	"github.com/gorilla/mux"
)

type ThesesData struct {
	ThesisID int    `json:"id"`
	Name     string `json:"name"`
	Type     string `json:"type"`
	Author   string `json:"author"`
}

func Search(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	kind := params["type"]
	var query string
	switch kind {
	case "all":
		query = "select thesis.thesis_id, thesis.title, students.first_name, students.surname, thesis_type.name from thesis, thesis_type, students where thesis.thesis_type_id = thesis_type.thesis_type_id and thesis.title is not null and students.session_token = thesis.author_id"
	case "doctoral":
		query = "select thesis.thesis_id, thesis.title, students.first_name, students.surname, thesis_type.name from thesis, thesis_type, students where thesis.thesis_type_id = thesis_type.thesis_type_id and thesis.title is not null and students.session_token = thesis.author_id and thesis_type.name = 'Doktorska'"
	case "master":
		query = "select thesis.thesis_id, thesis.title, students.first_name, students.surname, thesis_type.name from thesis, thesis_type, students where thesis.thesis_type_id = thesis_type.thesis_type_id and thesis.title is not null and students.session_token = thesis.author_id and thesis_type.name = 'Magisterska'"
	case "engineering":
		query = "select thesis.thesis_id, thesis.title, students.first_name, students.surname, thesis_type.name from thesis, thesis_type, students where thesis.thesis_type_id = thesis_type.thesis_type_id and thesis.title is not null and students.session_token = thesis.author_id and thesis_type.name = 'Inżynierska'"
	}
	thesesData := make([]ThesesData, 0)
	dbConnection := db.GetDB()
	rows, err := dbConnection.Query(query)
	if err != nil {
		log.Print(err)
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
			log.Print(err)
		}
		thesesData = append(thesesData, ThesesData{ThesisID: id, Name: title, Type: kind, Author: firstName + " " + surname})
	}
	if rows.Err() != nil {
		log.Print(err)
	}

	w.Header().Set("Access-Control-Allow-Origin", "*")
	json.NewEncoder(w).Encode(thesesData)
}
