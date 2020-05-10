package main

import (
	"log"
	"net/http"
	"server/pkg/userdata"

	"github.com/gorilla/mux"

	"server/pkg/thesis"
)

func main() {
	r := mux.NewRouter()
	r.HandleFunc("/thesis", thesis.PostTheses).Methods("POST")
	r.HandleFunc("/user-data", userdata.GetAllUserData).Methods("GET")
	r.HandleFunc("/theses/{id}", userdata.GetUserData).Methods("GET")
	if err := http.ListenAndServe(":8088", r); err != nil {
		log.Fatal(err)
	}
}
