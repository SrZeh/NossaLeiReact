package main

import (
	"encoding/json"
	"io"
	"log"
	"net/http"
)

// Noticia represents the structure of a news article
type Noticia struct {
	Titulo     string `json:"titulo"`
	Introducao string `json:"introducao"`
	Link       string `json:"link"`
}

// FetchNoticiasHandler handles the HTTP request and returns news data
func FetchNoticiasHandler(w http.ResponseWriter, r *http.Request) {
	url := "http://servicodados.ibge.gov.br/api/v3/noticias/?tipo=noticia&qtd=10&destaque=1&de=01-01-2022"

	resp, err := http.Get(url)
	if err != nil {
		http.Error(w, "Failed to fetch noticias", http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		http.Error(w, "Failed to read response body", http.StatusInternalServerError)
		return
	}

	// Assuming the JSON response has a structure with an "items" field that contains the list of news
	var responseData struct {
		Items []Noticia `json:"items"`
	}
	if err := json.Unmarshal(body, &responseData); err != nil {
		http.Error(w, "Failed to parse noticias", http.StatusInternalServerError)
		return
	}

	// Limit to the first 10 noticias (if more exist)
	if len(responseData.Items) > 10 {
		responseData.Items = responseData.Items[:10]
	}

	// Convert the selected noticias to JSON and return in the response
	jsonResponse, err := json.Marshal(responseData.Items)
	if err != nil {
		http.Error(w, "Failed to serialize noticias", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(jsonResponse)
}

func main() {
	http.HandleFunc("/noticias", FetchNoticiasHandler)

	log.Println("Server running on :8080...")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
