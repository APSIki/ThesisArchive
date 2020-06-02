package searchTheses

import (
	"encoding/json"
	"net/http"
)

type ThesisData struct {
	ThesisID string `json:"userid"`
	Name     string `json:"name"`
	Type     string `json:"type"`
	Author   string `json:"author"`
}

func Search(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	//Mock data - @todo - implement connection with DB
	thesisData := []ThesisData{{ThesisID: "1", Name: "Bulezi", Type: "Gurera", Author: "Bulezi Gurera"}}
	json.NewEncoder(w).Encode(thesisData)
}
