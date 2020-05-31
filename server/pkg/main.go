package main

import (
	"log"
	"net/http"
	"server/pkg/db"

	"github.com/gorilla/mux"
	"github.com/spf13/viper"

	"server/pkg/thesis"
	"server/pkg/userdata"
)

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
	r.HandleFunc("/thesis", thesis.PostTheses).Methods("POST")
	r.HandleFunc("/thesis", thesis.PutThesis).Methods("PUT")
	r.HandleFunc("/user-data", userdata.GetAllUserData).Methods("GET")
	r.HandleFunc("/theses/{id}", userdata.GetUserData).Methods("GET")
	if err := http.ListenAndServe(":8088", r); err != nil {
		log.Fatal(err)
	}

}
