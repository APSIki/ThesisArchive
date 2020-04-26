package main

import (
	"fmt"
	"net/http"
)

func homePageHandler(w http.ResponseWriter, req *http.Request) {
	fmt.Fprintf(w, "No endpoints for now\n")
}


func main() {
	http.HandleFunc("/", homePageHandler)

	http.ListenAndServe(":8088", nil)
}
