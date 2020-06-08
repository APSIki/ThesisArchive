package person

import (
	"encoding/json"
	"net/http"
)

type Person struct {
	Name string `json:name`
}

func GetPerson(w http.ResponseWriter, r *http.Request) {
	//TODO handle {id}
	w.Header().Set("Content-Type", "application/json")
	//Mock data - @todo - implement connection with DB
	personData := []Person{{Name: "Krzysztof Przewodniczącki"}}
	json.NewEncoder(w).Encode(personData)
}
