package searchTheses

import (
	"encoding/json"
	"log"
	"net/http"
	"net/url"
	"server/pkg/db"
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

	query := v["query"]
	kind := v["type"]
	author := v["author"]
	keyword := v["keyword"]
	defenseDateFrom := v["defenseDateFrom"]
	defenseDateTo := v["defenseDateTo"]
	publicationDateFrom := v["publicationDateFrom"]
	publicationDateTo := v["publicationDateTo"]
		
	var sql_query string
	
	if len(query) > 0 { 
		sql_query = `select thesis.thesis_id, thesis.title, students.first_name, students.surname, thesis_type.name from thesis, thesis_type, students 
		where thesis.title LIKE '%$1%' OR students.first_name LIKE '%$1%' OR students.surname LIKE '%$1%'`;
	} else {
		sql_query = `select thesis.thesis_id, thesis.title, students.first_name, students.surname, thesis_type.name from thesis, thesis_type, students, commitee, commitee_person where 
		(kind IS NULL OR thesis_type.name = $2) AND
		(author IS NULL OR students.surname LIKE '%$3%') AND
		(keyword IS NULL OR thesis.key_words LIKE '%$4%') AND
		(defenseDateFrom IS NULL OR thesis.date > $5) AND
		(defenseDateTo IS NULL OR thesis.date > $6) AND
		(publicationDateFrom IS NULL OR thesis.date > $7) AND
		(publicationDateTo IS NULL OR thesis.date > $8)`
	}

	thesesData := make([]ThesesData, 0)
	dbConnection := db.GetDB()
	rows, err := dbConnection.Query(sql_query, query, kind, author, keyword, defenseDateFrom, defenseDateTo, publicationDateFrom, publicationDateTo)
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
