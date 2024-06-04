package main

import (
	"fmt"
	"fun-api/endpoint"
	"fun-api/utils"
	"log"
	"net/http"

	"github.com/joho/godotenv"
)

func main() {

	if err := godotenv.Load(".env"); err != nil {
		fmt.Println("Error loading .env file")
	}

	http.HandleFunc("/", endpoint.Index)
	http.HandleFunc("/message", endpoint.Message)

	http.HandleFunc("/forum", endpoint.Forum)
	http.HandleFunc("/playlist", endpoint.Playlist)

	http.HandleFunc("/media/", utils.MediaRedirector)
	http.HandleFunc("/music/", utils.MediaRedirector)

	fmt.Println("Listening on http://localhost:3000")
	log.Fatal(http.ListenAndServe(utils.GetPort("3000"), nil))
}
