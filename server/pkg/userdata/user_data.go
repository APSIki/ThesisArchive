package userdata

import (
	"encoding/json"
	"github.com/gorilla/mux"
	"net/http"
	"server/pkg/thesis"
)

func GetAllUserData(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	//Mock data - @todo - implement connection with DB
	userData := []UserData{{UserID: "1", Firstname: "Bulezi", Lastname: "Gurera", Thesis: &thesis.Thesis{ThesisID: "1", Title: "Kryptografia postkwantowa", Type: "Praca inzynierska"}}}
	json.NewEncoder(w).Encode(userData)
}

type UserData struct {
	UserID    string         `json:"userid"`
	Firstname string         `json:"firstname"`
	Lastname  string         `json:"lastname"`
	Thesis    *thesis.Thesis `json:"thesis"`
}

func GetUserData(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r) //get parameters
	//Mock data - @todo - implement connection with DB
	userData := []UserData{{UserID: "1", Firstname: "Bulezi", Lastname: "Gurera", Thesis: &thesis.Thesis{ThesisID: "1", Title: "Kryptografia postkwantowa", Type: "Praca inzynierska"}}}
	for _, item := range userData {
		if item.UserID == params["id"] {
			json.NewEncoder(w).Encode(item)
			return
		}
	}
	json.NewEncoder(w).Encode(&UserData{})
}
