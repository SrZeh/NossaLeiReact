package main

import (
	"log"
	"net/http"

	"nossaleireact/go-n2/handlers"
)

func main() {
	http.HandleFunc("/noticias", handlers.FetchNoticiasHandler)

	log.Println("Server running on :8080...")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
