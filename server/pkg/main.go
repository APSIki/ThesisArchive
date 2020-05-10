package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"

	"server/pkg/thesis"
	"server/pkg/userdata"
)

func main() {
	r := mux.NewRouter()
	r.HandleFunc("/thesis", thesis.PostTheses).Methods("POST")
	r.HandleFunc("/thesis", thesis.PutThesis).Methods("PUT")
	r.HandleFunc("/user-data", userdata.GetAllUserData).Methods("GET")
	r.HandleFunc("/theses/{id}", userdata.GetUserData).Methods("GET")
	if err := http.ListenAndServe(":8088", r); err != nil {
		log.Fatal(err)
	}
}
