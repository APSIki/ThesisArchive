package person

import (
	"encoding/json"
	"github.com/gorilla/mux"
	"log"
	"net/http"
	"server/pkg/db"
)

type Person struct {
	Name string `json:name`
}

func GetPerson(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	var person Person
	dbConnection := db.GetDB()
	var query string
	id := params["id"]
	if id == "1" {
		query = "select first_name, surname from students where session_token = id"
	} else {
		query = "select first_name, surname from staff_person where session_token = id"
	}
	rows, err := dbConnection.Query(query)
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()
	var firstName string
	var surname string
	for rows.Next() {
		err := rows.Scan(&firstName, &surname)
		if err != nil {
			log.Fatal(err)
		}
	}
	if rows.Err() != nil {
		log.Fatal(err)
	}
	name := firstName + " " + surname
	person = Person{Name: name}

	json.NewEncoder(w).Encode(person)
}
