package main

import (
	"database/sql"
	"log"
	"net/http"
	"server/pkg/db"
	"server/pkg/theses"

	"github.com/gorilla/mux"
	"github.com/spf13/viper"

	"server/pkg/dashbordInfo"
	"server/pkg/person"
	"server/pkg/searchTheses"
	"server/pkg/subjectMatters"
	"server/pkg/thesis"
	"server/pkg/userdata"
	"server/pkg/users"
)

type dbConn struct {
	dbService *sql.DB
}

func main() {
	viper.SetConfigFile("config.yaml")
	viper.AddConfigPath(".")
	if err := viper.ReadInConfig(); err != nil {
		log.Fatal(err)
		panic(err)
	}

	enableDB := viper.GetBool("enable_db")
	if enableDB {
		dbService, err := db.NewService()
		if err != nil {
			log.Fatal(err)
			panic(err)
		}
		defer dbService.DB.Close()
	}

	r := mux.NewRouter()
	r.HandleFunc("/thesis", thesis.PostThesis).Methods("POST")
	r.HandleFunc("/thesis", thesis.PutThesis).Methods("PUT")
	r.HandleFunc("/user-data", userdata.GetAllUserData).Methods("GET")
	r.HandleFunc("/theses", theses.GetTheses).Methods("GET")
	r.HandleFunc("/dashbord-info/", dashbordInfo.GetDashbord).Methods("GET")
	r.HandleFunc("/person/{id}", person.GetPerson).Methods("GET")
	r.HandleFunc("/searchTheses", searchTheses.Search).Methods("GET")
	r.HandleFunc("/subject-matters", subjectMatters.GetSubjects).Methods("GET")
	r.HandleFunc("/users", users.GetUser).Methods("GET")
	r.HandleFunc("/thesis/{id}/committee", thesis.PostCommittee).Methods("POST")
	r.HandleFunc("/thesis/{id}/defense", thesis.PostDefense).Methods("POST")
	r.HandleFunc("/thesis/{id}/defense-date", thesis.PostDefenseDate).Methods("POST")
	r.HandleFunc("/thesis/{id}/file", thesis.PostFile).Methods("POST")
	r.HandleFunc("/thesis/{id}/review1", thesis.PostReview1).Methods("POST")
	r.HandleFunc("/thesis/{id}/review2", thesis.PostReview2).Methods("POST")
	r.HandleFunc("/thesis/{id}/thesis-details", thesis.PostThesisDetails).Methods("POST")

	if err := http.ListenAndServe(":8088", r); err != nil {
		log.Fatal(err)
	}

	//func getDbService() {
	//	return dbService
	//}
}
