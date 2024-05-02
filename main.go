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
		fmt.Println("Error loading .env file (most likely because it's in prod)")
	}

	http.HandleFunc("/", endpoint.Index)

	http.HandleFunc("/media/", utils.MediaRedirector)

	fmt.Println("Listening on http://localhost:3000")
	log.Fatal(http.ListenAndServe(utils.GetPort("3000"), nil))
}
