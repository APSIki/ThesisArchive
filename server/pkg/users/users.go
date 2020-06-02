package users

import (
	"encoding/json"
	"net/http"
)

type UserData struct {
	UserID string `json:"userid"`
	Name   string `json:"name"`
}

func GetUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	//Mock data - @todo - implement connection with DB
	userData := []UserData{{UserID: "1", Name: "Bulezi"}}
	json.NewEncoder(w).Encode(userData)
}
