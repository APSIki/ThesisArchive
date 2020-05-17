package thesis

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/golang/gddo/httputil/header"
	"gopkg.in/matryer/respond.v1"
)

//TODO add handler for required and optional fields
type Thesis struct {
	ThesisID             string   `json:"thesisid"`
	Type                 string   `json:"type"`
	Title                string   `json:"title"`
	OrganizationalEntity string   `json:"organizationalentity"`
	FieldOfStudy         string   `json:"fieldofstudy"`
	Keywords             []string `json:"keywords"`
	ExamDate             string   `json:"examdate"`
	PublishDate          string   `json:"publishdate"`
	Authors              []string `json:"authors"`
	Reviewers            []string `json:"reviewers"`
	ExamCommitteeMembers []string `json:"examcommitteemembers"`
	Tags                 string   `json:"tags"`
}

func PostTheses(w http.ResponseWriter, req *http.Request) {
	t := New()
	if err := t.decodeJSON(w, req); err != nil {
		respond.With(w, req, http.StatusBadRequest, err)
		return
	}
	//TODO create a service for DB communication and add thesis
	respond.WithStatus(w, req, http.StatusCreated)
}
func New() *Thesis {
	return &Thesis{}
}

func (t *Thesis) decodeJSON(w http.ResponseWriter, req *http.Request) error {
	if req.Header.Get("Content-Type") != "" {
		value, _ := header.ParseValueAndParams(req.Header, "Content-Type")
		if value != "application/json" {
			msg := "Content-Type header is not application/json"
			return fmt.Errorf(msg)
		}
	}
	decoder := json.NewDecoder(req.Body)
	err := decoder.Decode(&t)
	return err
}

func PutThesis(w http.ResponseWriter, req *http.Request) {
	t := New()
	if err := t.decodeJSON(w, req); err != nil {
		respond.With(w, req, http.StatusBadRequest, err)
		return
	}
	//TODO create a service for DB communication and add thesis
	respond.WithStatus(w, req, http.StatusCreated)
}
