package users

import (
	"encoding/json"
	"log"
	"net/http"
	"server/pkg/db"
	"strconv"
)

type User struct {
	Authorization string `json:"authorization"`
	Name          string `json:"name"`
}

func GetUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	dbConnection := db.GetDB()
	rows, err := dbConnection.Query("select first_name, surname from students")
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
	err = rows.Err()
	if err != nil {
		log.Fatal(err)
	}
	name := firstName + " " + surname
	var userData []User
	userData = append(userData, User{Authorization: "1", Name: name})
	rows2, err2 := dbConnection.Query("select first_name, surname from staff_person where surname = 'Promotorska' or surname = 'Przewodniczącki' or surname = 'Członkowska' or surname = 'Admiński'")
	if err2 != nil {
		log.Fatal(err2)
	}
	defer rows2.Close()
	nameSlice := make([]string, 0)
	//var firstName string
	//var surname string
	for rows2.Next() {
		err2 := rows2.Scan(&firstName, &surname)
		if err2 != nil {
			log.Fatal(err2)
		}
		name := firstName + " " + surname
		nameSlice = append(nameSlice, name)
	}
	err2 = rows2.Err()
	if err2 != nil {
		log.Fatal(err2)
	}

	for i := 0; i < len(nameSlice); i++ {
		userData = append(userData, User{Authorization: strconv.Itoa(i + 2), Name: nameSlice[i]})
	}

	json.NewEncoder(w).Encode(userData)
}
