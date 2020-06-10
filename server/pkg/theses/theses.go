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

func QueryDB(query string) ([]int, []string, []string) {
	dbConnection := db.GetDB()
	rows, err := dbConnection.Query(query)
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()
	id_slice := make([]int, 0)
	title_slice := make([]string, 0)
	kind_slice := make([]string, 0)
	var id int
	var title string
	var kind string
	for rows.Next() {
		err := rows.Scan(&id, &title, &kind)
		if err != nil {
			log.Fatal(err)
		}
		id_slice = append(id_slice, id)
		title_slice = append(title_slice, title)
		kind_slice = append(kind_slice, kind)
	}
	err = rows.Err()
	if err != nil {
		log.Fatal(err)
	}
	//log.Println(rows)
	fmt.Println(id, title, kind)
	fmt.Println(len(id_slice))
	return id_slice, title_slice, kind_slice
}
func GetTheses(w http.ResponseWriter, r *http.Request) {
	token := r.Header.Get("Authorization")
	w.Header().Set("Content-Type", "application/json")

	id, title, kind := QueryDB("select thesis.thesis_id, thesis.title, thesis_type.name from thesis, thesis_type where thesis.thesis_type_id = thesis_type.thesis_type_id and thesis.title is not null")
	fmt.Println(len(id))
	w.Header().Set("Access-Control-Allow-Origin", "*")
	var returnData []Theses
	if token == "1" {
		for i := 0; i < len(id); i++ {
			returnData = append(returnData, Theses{ThesisID: id[i], Name: title[i], Type: kind[i], Role: "STUDENT"})
		}
		
		json.NewEncoder(w).Encode(returnData)
	} else if token == "2" {
		for i := 0; i < len(id); i++ {
			returnData = append(returnData, Theses{ThesisID: id[i], Name: title[i], Type: kind[i], Role: "MEMBER", AdditionalText: "Oczekuje na recenzję"})
		}
		json.NewEncoder(w).Encode(returnData)
	} else if token == "3" {
		for i := 0; i < len(id); i++ {
			returnData = append(returnData, Theses{ThesisID: id[i], Name: title[i], Type: kind[i], Role: "CHAIRMAN"})
		}
		json.NewEncoder(w).Encode(returnData)
	} else if token == "4" {
		for i := 0; i < len(id); i++ {
			returnData = append(returnData, Theses{ThesisID: id[i], Name: title[i], Type: kind[i], Role: "MEMBER", AdditionalText: "Oczekuje na recenzję"})
		}
		json.NewEncoder(w).Encode(returnData)
	} else if token == "5" {
		for i := 0; i < len(id); i++ {
			returnData = append(returnData, Theses{ThesisID: id[i], Name: title[i], Type: kind[i], Role: "ADMIN"})
		}
		json.NewEncoder(w).Encode(returnData)
	} else {
		w.WriteHeader(http.StatusBadRequest)
	}
}
