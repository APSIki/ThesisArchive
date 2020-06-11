package theses

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"server/pkg/db"
	"time"
)

type Theses struct {
	ThesisID       int    `json:"id"`
	Name           string `json:"name"`
	Type           string `json:"type"`
	Role           string `json:"role"`
	AdditionalText string `json:"additionalText,omitempty"`
}

func GetTheses(w http.ResponseWriter, r *http.Request) {
	token := r.Header.Get("Authorization")
	w.Header().Set("Content-Type", "application/json")
	dbConnection := db.GetDB()
	w.Header().Set("Access-Control-Allow-Origin", "*")
	returnData :=  make([]Theses, 0)
	var query string
	if token == "1" {
		query = `select thesis.thesis_id, thesis.title, thesis_type.name from thesis, thesis_type where thesis.thesis_type_id = thesis_type.thesis_type_id and thesis.title is not null and thesis.author_id = $1`
		rows, err := dbConnection.Query(query, token)
		if err != nil {
			log.Print(err)
		}
		defer rows.Close()
		for rows.Next() {
			var thesis Theses
			err := rows.Scan(&thesis.ThesisID, &thesis.Name, &thesis.Type)
			if err != nil {
				log.Print(err)
			}
			thesis.Role = "STUDENT"
			returnData = append(returnData, thesis)
		}
		if rows.Err() != nil {
			log.Print(err)
		}

	} else if token == "5" {
		query = "select thesis.thesis_id, thesis.title, thesis_type.name from thesis, thesis_type where thesis.thesis_type_id = thesis_type.thesis_type_id and thesis.title is not null"
		rows, err := dbConnection.Query(query)
		if err != nil {
			log.Print(err)
		}
		defer rows.Close()
		for rows.Next() {
			var thesis Theses
			err := rows.Scan(&thesis.ThesisID, &thesis.Name, &thesis.Type)
			if err != nil {
				log.Print(err)
			}
			thesis.Role = "ADMIN"
			returnData = append(returnData, thesis)
		}
		if rows.Err() != nil {
			log.Print(err)
		}
	} else {
		query = `select thesis.thesis_id, thesis.title, thesis.defence_date, thesis.grade_defence, thesis.reviewer_review, thesis.supervisor_review, thesis_type.name, commitee_person.committee_role from thesis, thesis_type, commitee_person where thesis.thesis_type_id = thesis_type.thesis_type_id and thesis.title is not null and commitee_person.committee_id = thesis.committee_id and commitee_person.person_id = $1`
		var review1 sql.NullString
		var review2 sql.NullString
		var defenceDate sql.NullString
		var defenceGrade sql.NullFloat64
		var roleID int
		rows, err := dbConnection.Query(query, token)
		if err != nil {
			log.Print(err)
		}
		defer rows.Close()
		for rows.Next() {
			var thesis Theses
			err := rows.Scan(&thesis.ThesisID, &thesis.Name, &defenceDate, &defenceGrade, &review1, &review2, &thesis.Type, &roleID)
			if err != nil {
				log.Print(err)
			}

			if roleID == 2 || roleID == 3 {
				thesis.Role = "MEMBER"
			} else if roleID == 1 {
				thesis.Role = "CHAIRMAN"
			} else {
				thesis.Role = "ADVISOR"
			}
			 if (roleID == 3 && !review1.Valid) || (roleID == 4 && !review2.Valid)  {
				thesis.AdditionalText = "Oczekuje na recenzję"
			 }
			 if defenceDate.Valid {
				 now := time.Now()
				 defDate, _ := time.Parse(time.RFC3339, defenceDate.String)
				 if roleID == 1 && !defenceGrade.Valid && now.After(defDate){
					 thesis.AdditionalText = "Oczekuje na zatwierdzenie"
				 }
			 }

			returnData = append(returnData, thesis)
		}
		if rows.Err() != nil {
			log.Print(err)
		}
	}
	json.NewEncoder(w).Encode(returnData)

}
