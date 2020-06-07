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
	params := mux.Vars(r) //get parameters
	var person Person
	dbConnection := db.GetDB()
	var query string
	switch params["id"] {
	case "1":
		query = "select first_name, surname from students"
	case "2":
		query = "select first_name, surname from staff_person where surname = 'Promotorska'"
	case "3":
		query = "select first_name, surname from staff_person where surname = 'Przewodniczącki'"
	case "4":
		query = "select first_name, surname from staff_person where surname = 'Członkowska'"
	case "5":
		query = "select first_name, surname from staff_person where surname = 'Admiński'"
	case "6":
		query = "select first_name, surname from staff_person where surname = 'Przykładowa'"
	case "7":
		query = "select first_name, surname from staff_person where surname = 'Elektroniczny'"
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
