package searchTheses

import (
	"encoding/json"
	"log"
	"net/http"
	"net/url"
	"server/pkg/db"
	"time"
	"strings"
)

type ThesesData struct {
	ThesisID int    `json:"id"`
	Name     string `json:"name"`
	Type     string `json:"type"`
	Author   string `json:"author"`
}

func Search(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	
	u, _ := url.Parse(r.URL.String())
	v := u.Query()

	query := v["query"][0]
	thesis_type := v["type"][0]

	if len(thesis_type) > 0 {
		switch thesis_type {
			case "all":
				thesis_type = ""
			case "doctoral":
				thesis_type = "Praca doktorska"
			case "master":
				thesis_type = "Praca magisterska"
			case "engineering":
				thesis_type = "Praca inżynierska"
			}
	}

	author := v["author"][0]
	keyword := v["keyword"][0]
	defenseDateFrom := v["defenseDateFrom"][0]
	defenseDateTo := v["defenseDateTo"][0]
	publicationDateFrom := v["publicationDateFrom"][0]
	publicationDateTo := v["publicationDateTo"][0]
	
	const layoutISO = "2006-01-02"
	defenseDateFromAsDate, _ := time.Parse(layoutISO, defenseDateFrom)
	defenseDateToAsDate, _ := time.Parse(layoutISO, defenseDateTo)
	publicationDateFromAsDate, _ := time.Parse(layoutISO, publicationDateFrom)
	publicationDateToAsDate, _ := time.Parse(layoutISO, publicationDateTo)

	var sql_query string
	
	if len(query) > 0 { 
		sql_query = `select thesis.thesis_id, thesis.title, students.first_name, students.surname, thesis_type.name from thesis, thesis_type, students 
		where (
		LOWER(thesis.title) LIKE '%' || $1 || '%' OR 
		LOWER(students.first_name) LIKE '%' || $1 || '%' OR 
		LOWER(students.surname) LIKE '%' || $1 || '%') AND
		(($2 <> '') IS NOT TRUE  AND
		($3 <> '') IS NOT TRUE AND
		($4 <> '') IS NOT TRUE AND
		(thesis.defence_date > $5) AND
		(thesis.defence_date < $6) AND
		(thesis.defence_date > $7) AND
		(thesis.defence_date < $8))`
	} else {
		sql_query = `select thesis.thesis_id, thesis.title, students.first_name, students.surname, thesis_type.name from thesis, thesis_type, students  where 
		(($1 <> '') IS NOT TRUE) AND
		(($2 <> '') IS NOT TRUE OR thesis_type.name = $2) AND
		(($3 <> '') IS NOT TRUE OR LOWER(students.surname) LIKE '%' || $3 || '%' OR LOWER(students.first_name) LIKE '%' || $3 || '%') AND
		(($4 <> '') IS NOT TRUE OR LOWER(thesis.key_words) LIKE '%' || $4 || '%') AND
		(thesis.defence_date > $5) AND
		(thesis.defence_date < $6) AND
		(thesis.defence_date > $7) AND
		(thesis.defence_date < $8)`
	}

	thesesData := make([]ThesesData, 0)
	dbConnection := db.GetDB()

	rows, err := dbConnection.Query(sql_query, strings.ToLower(query), thesis_type, strings.ToLower(author), strings.ToLower(keyword), defenseDateFromAsDate, defenseDateToAsDate, publicationDateFromAsDate, publicationDateToAsDate)

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
