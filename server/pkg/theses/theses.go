package theses

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"server/pkg/db"
)

type Theses struct {
	ThesisID       int    `json:"id"`
	Name           string `json:"name"`
	Type           string `json:"type"`
	Role           string `json:"role"`
	AdditionalText string `json:"additionalText,omitempty"`
}

func QueryDB(query string) (int, string, string) {
	dbConnection := db.GetDB()
	rows, err := dbConnection.Query(query)
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()
	var title string
	var id int
	var kind string
	for rows.Next() {
		err := rows.Scan(&id, &title, &kind)
		if err != nil {
			log.Fatal(err)
		}
	}
	err = rows.Err()
	if err != nil {
		log.Fatal(err)
	}
	//log.Println(rows)
	fmt.Println(id, title, kind)
	return id, title, kind
}
func GetTheses(w http.ResponseWriter, r *http.Request) {
	token := r.Header.Get("Authorization")
	w.Header().Set("Content-Type", "application/json")
	id, title, kind := QueryDB("select thesis.thesis_id, thesis.title, thesis_type.name from thesis, thesis_type where thesis.thesis_type_id = thesis_type.thesis_type_id")
	if token == "1" {
		thesesData := []Theses{{ThesisID: id, Name: title, Type: kind, Role: "STUDENT"}, {ThesisID: 1}}
		json.NewEncoder(w).Encode(thesesData)
	} else if token == "2" {
		thesesData := []Theses{{ThesisID: id, Name: title, Type: kind, Role: "MEMBER"}}
		json.NewEncoder(w).Encode(thesesData)
	} else if token == "3" {
		thesesData := []Theses{{ThesisID: id, Name: title, Type: kind, Role: "CHAIRMAN"}}
		json.NewEncoder(w).Encode(thesesData)
	} else if token == "4" {
		thesesData := []Theses{{ThesisID: id, Name: title, Type: kind, Role: "MEMBER"}}
		json.NewEncoder(w).Encode(thesesData)
	} else if token == "5" {
		thesesData := []Theses{{ThesisID: id, Name: title, Type: kind, Role: "ADMIN"}}
		json.NewEncoder(w).Encode(thesesData)
	} else {
		w.WriteHeader(http.StatusBadRequest)
	}
}
