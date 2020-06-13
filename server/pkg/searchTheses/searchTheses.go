package searchTheses

import (
	"encoding/json"
	"log"
	"net/http"
	"net/url"
	"server/pkg/db"
	"time"
	"fmt"
	"reflect"
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

	fmt.Println(defenseDateFromAsDate)
	fmt.Println(defenseDateToAsDate)
	fmt.Println(publicationDateFromAsDate)
	fmt.Println(publicationDateToAsDate)
	fmt.Println(thesis_type)
	fmt.Println(reflect.TypeOf(defenseDateFromAsDate))

	var sql_query string
	
	if len(query) > 0 { 
		sql_query = `select thesis.thesis_id, thesis.title, students.first_name, students.surname, thesis_type.name from thesis, thesis_type, students 
		where (thesis.title LIKE $1 OR students.first_name LIKE $1 OR students.surname LIKE $1) AND
		(($2 <> '') IS NOT TRUE  AND
		($3 <> '') IS NOT TRUE AND
		($4 <> '') IS NOT TRUE AND
		$5 IS NULL AND
		$6 IS NULL AND
		$7 IS NULL AND
		$8 IS NULL)`
	} else {
		sql_query = `select thesis.thesis_id, thesis.title, students.first_name, students.surname, thesis_type.name from thesis, thesis_type, students  where 
		(($1 <> '') IS NOT TRUE) AND
		(($2 <> '') IS NOT TRUE OR thesis_type.name = $2) AND
		(($3 <> '') IS NOT TRUE OR students.surname = $3) AND
		(($4 <> '') IS NOT TRUE OR thesis.key_words LIKE $4) AND
		(thesis.defence_date > $5) AND
		(thesis.defence_date < $6) AND
		(thesis.defence_date > $7) AND
		(thesis.defence_date < $8)`
	}

	thesesData := make([]ThesesData, 0)
	dbConnection := db.GetDB()

	rows, err := dbConnection.Query(sql_query, query, thesis_type, author, keyword, defenseDateFromAsDate, defenseDateToAsDate, publicationDateFromAsDate, publicationDateToAsDate)

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
