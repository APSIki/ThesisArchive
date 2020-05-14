package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

type UserData struct {
	UserID    string  `json:"userid"`
	Firstname string  `json:"firstname"`
	Lastname  string  `json:"lastname"`
	Thesis    *Thesis `json:"thesis"`
}

type Thesis struct {
	ThesisID string `json:"thesisid"`
	Title    string `json:"title"`
	Type     string `json:"type"`
}

var userdata []UserData

func homePageHandler(w http.ResponseWriter, req *http.Request) {
	fmt.Fprintf(w, "No endpoints for now\n")
}

func getAllUserData(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(userdata)
}

func getUserData(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r) //get parameters

	for _, item := range userdata {
		if item.UserID == params["id"] {
			json.NewEncoder(w).Encode(item)
			return
		}
	}
	json.NewEncoder(w).Encode(&UserData{})
}

func main() {

	r := mux.NewRouter()

	//Mock data - @todo - implement connection with DB
	userdata = append(userdata, UserData{UserID: "1", Firstname: "Bulezi", Lastname: "Gurera", Thesis: &Thesis{ThesisID: "1", Title: "Kryptografia postkwantowa", Type: "Praca inzynierska"}})

	r.HandleFunc("/user-data", getAllUserData).Methods("GET")
	r.HandleFunc("/theses/{id}", getUserData).Methods("GET")

	//http.HandleFunc("/", homePageHandler)

	//http.ListenAndServe(":8088", nil)
	log.Fatal(http.ListenAndServe(":8088", r))
}
