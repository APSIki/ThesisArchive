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
	// TODO change session_token in DB
	if id == "1" {
		query = `select first_name, surname from students where session_token = $1`
	} else {
		query = `select first_name, surname from staff_person where session_token = $1`
	}
	row := dbConnection.QueryRow(query, id)
	var firstName string
	var surname string
	if err := row.Scan(&firstName, &surname); err != nil {
			log.Fatal(err)
	}
	name := firstName + " " + surname
	person = Person{Name: name}

	json.NewEncoder(w).Encode(person)
}
