package subjectMatters

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

func GetSubjects(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	//Mock data - @todo - implement connection with DB
	subjectData := []ThesisData{{ThesisID: "1", Name: "teleinformatyka"}}
	json.NewEncoder(w).Encode(subjectData)
}
