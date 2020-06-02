package theses

import (
	"encoding/json"
	"net/http"
)

type Theses struct {
	ThesisID string `json:"id"`
	Name     string `json:"name"`
	Type     string `json:"type"`
	Role     string `json:"role"`
}

func GetTheses(w http.ResponseWriter, r *http.Request) {
	token := r.Header.Get("Authorization")

	if token == "1" {
		w.Header().Set("Content-Type", "application/json")
		//Mock data - @todo - implement connection with DB
		thesesData := []Theses{{ThesisID: "1", Name: "Wpływ zaćmienia księżyca na dorożkarstwo w Kenii", Type: "Praca inżynierska", Role: "STUDENT"}}
		json.NewEncoder(w).Encode(thesesData)
	} else if token == "2" {
		w.Header().Set("Content-Type", "application/json")
		//Mock data - @todo - implement connection with DB
		thesesData := []Theses{{ThesisID: "2", Name: "Wpływ zaćmienia księżyca na dorożkarstwo w Kenii", Type: "Praca inżynierska", Role: "STUDENT"}}
		json.NewEncoder(w).Encode(thesesData)
	} else if token == "3" {
		w.Header().Set("Content-Type", "application/json")
		//Mock data - @todo - implement connection with DB
		thesesData := []Theses{{ThesisID: "3", Name: "Wpływ zaćmienia księżyca na dorożkarstwo w Kenii", Type: "Praca inżynierska", Role: "STUDENT"}}
		json.NewEncoder(w).Encode(thesesData)
	} else if token == "4" {
		w.Header().Set("Content-Type", "application/json")
		//Mock data - @todo - implement connection with DB
		thesesData := []Theses{{ThesisID: "4", Name: "Wpływ zaćmienia księżyca na dorożkarstwo w Kenii", Type: "Praca inżynierska", Role: "STUDENT"}}
		json.NewEncoder(w).Encode(thesesData)
	} else if token == "5" {
		w.Header().Set("Content-Type", "application/json")
		//Mock data - @todo - implement connection with DB
		thesesData := []Theses{{ThesisID: "5", Name: "Wpływ zaćmienia księżyca na dorożkarstwo w Kenii", Type: "Praca inżynierska", Role: "STUDENT"}}
		json.NewEncoder(w).Encode(thesesData)
	} else {
		w.WriteHeader(http.StatusBadRequest)
	}
}
