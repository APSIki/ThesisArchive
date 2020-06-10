package subjectMatters

import (
	"encoding/json"
	"log"
	"net/http"
	"server/pkg/db"
	"strconv"
)

type Subject struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

func GetSubjects(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	dbConnection := db.GetDB()
	rows, err := dbConnection.Query("select subject_matter_id, name from subject_matter")
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
	var subjectData []Subject
	for i := 0; i < len(idSlice); i++ {
		subjectData = append(subjectData, Subject{ID: strconv.Itoa(idSlice[i]), Name: nameSlice[i]})
	}

	w.Header().Set("Access-Control-Allow-Origin", "*")
	json.NewEncoder(w).Encode(subjectData)
}
