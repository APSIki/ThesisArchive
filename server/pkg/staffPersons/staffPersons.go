package staffPersons

import (
	"encoding/json"
	"log"
	"net/http"
	"server/pkg/db"
	"strconv"
)

type StaffPerson struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

func GetStaffPersons(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	dbConnection := db.GetDB()

	rows, err := dbConnection.Query("select staff_person_id, first_name || ' ' || surname from staff_person")
	if err != nil {
		log.Print(err)
	}
	defer rows.Close()

	idSlice := make([]int, 0)
	nameSlice := make([]string, 0)
	var id int
	var name string
	for rows.Next() {
		err := rows.Scan(&id, &name)
		if err != nil {
			log.Print(err)
		}
		idSlice = append(idSlice, id)
		nameSlice = append(nameSlice, name)
	}
	err = rows.Err()
	if err != nil {
		log.Print(err)
	}
	var staffPersons []StaffPerson
	for i := 0; i < len(idSlice); i++ {
		staffPersons = append(staffPersons, StaffPerson{ID: strconv.Itoa(idSlice[i]), Name: nameSlice[i]})
	}

	w.Header().Set("Access-Control-Allow-Origin", "*")
	json.NewEncoder(w).Encode(staffPersons)
}
