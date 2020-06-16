package main

import (
	"database/sql"
	"log"
	"net/http"
	"server/pkg/db"
	"server/pkg/theses"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"github.com/spf13/viper"

	"server/pkg/dashbordInfo"
	"server/pkg/person"
	"server/pkg/searchTheses"
	"server/pkg/subjectMatters"
	"server/pkg/thesis"
	"server/pkg/users"
	"server/pkg/staffPersons"
)

type dbConn struct {
	dbService *sql.DB
}

func main() {
	viper.SetConfigFile("config.yaml")
	viper.AddConfigPath(".")
	if err := viper.ReadInConfig(); err != nil {
		log.Print(err)
		panic(err)
	}

	enableDB := viper.GetBool("enable_db")
	if enableDB {
		dbService, err := db.NewService()
		if err != nil {
			log.Print(err)
			panic(err)
		}
		defer dbService.DB.Close()
	}

	r := mux.NewRouter()
	r.HandleFunc("/thesis", thesis.PostThesis).Methods("POST")
	r.HandleFunc("/thesis", thesis.PutThesis).Methods("PUT")
	r.HandleFunc("/theses", theses.GetTheses).Methods("GET")
	r.HandleFunc("/dashboard-info", dashbordInfo.GetDashboard).Methods("GET")
	r.HandleFunc("/person/{id}", person.GetPerson).Methods("GET")
	r.HandleFunc("/searchTheses", searchTheses.Search).Methods("GET")
	r.HandleFunc("/subject-matters", subjectMatters.GetSubjects).Methods("GET")
	r.HandleFunc("/users", users.GetUser).Methods("GET")
	r.HandleFunc("/staff-persons", staffPersons.GetStaffPersons).Methods("GET")
	r.HandleFunc("/thesis/{id}", thesis.GetThesis).Methods("GET")
	r.HandleFunc("/thesis/{id}/committee", thesis.PostCommittee).Methods("POST")
	r.HandleFunc("/thesis/{id}/defense", thesis.PostDefense).Methods("POST")
	r.HandleFunc("/thesis/{id}/defense-date", thesis.PostDefenseDate).Methods("POST")
	r.HandleFunc("/thesis/{id}/file", thesis.PostFile).Methods("POST")
	r.HandleFunc("/thesis/{id}/review1", thesis.PostReview1).Methods("POST")
	r.HandleFunc("/thesis/{id}/review2", thesis.PostReview2).Methods("POST")
	r.HandleFunc("/thesis/{id}/thesis-details", thesis.PostThesisDetails).Methods("POST")
	r.HandleFunc("/thesis/{id}/reviewers", thesis.PostReviewers).Methods("POST")


	c := cors.New(cors.Options {
		AllowedOrigins: []string{"*"},
		AllowCredentials: true,
		AllowedHeaders: []string{"Expires", "Origin", "Language", "Pragma", "Accept", "Last-Modified", "X-XSRF-Token", "X-Requested-With", "Content-Type", "location", "Cache-Control", "Content-Language", "Authorization"},
		AllowedMethods: []string{"POST", "GET", "OPTIONS"},
	})

	handler := c.Handler(r)

	if err := http.ListenAndServe(":8088", handler); err != nil {
		log.Print(err)
	}

	//func getDbService() {
	//	return dbService
	//}
}
