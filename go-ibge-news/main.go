package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"cloud.google.com/go/firestore"
	firebase "firebase.google.com/go"
	"google.golang.org/api/option"
)

// Noticia represents the structure of a news article
type Noticia struct {
	Titulo     string `json:"titulo"`
	Introducao string `json:"introducao"`
	Link       string `json:"link"`
}

// APIResponse represents the structure of the API response
type APIResponse struct {
	Items []Noticia `json:"items"`
}

// InitializeFirebase initializes a connection to Firestore
func InitializeFirebase() (*firestore.Client, error) {
	// Use a service account
	ctx := context.Background()
	sa := option.WithCredentialsFile("/Users/viniciusgdoliveira/workspace/NossaLeiReact/go-ibge-news/nossalei-bd3b6-firebase-adminsdk-vxihr-a9f8edcdb8.json") // Replace with your service account file
	app, err := firebase.NewApp(ctx, nil, sa)
	if err != nil {
		return nil, fmt.Errorf("error initializing Firebase app: %v", err)
	}

	client, err := app.Firestore(ctx)
	if err != nil {
		return nil, fmt.Errorf("error initializing Firestore: %v", err)
	}

	return client, nil
}

// SaveNoticiasToFirestore saves the fetched noticias to Firestore
func SaveNoticiasToFirestore(client *firestore.Client, noticias []Noticia) error {
	ctx := context.Background()

	// Add each news item to Firestore
	for _, noticia := range noticias {
		_, _, err := client.Collection("noticias").Add(ctx, map[string]interface{}{
			"titulo":     noticia.Titulo,
			"introducao": noticia.Introducao,
			"link":       noticia.Link,
		})
		if err != nil {
			return fmt.Errorf("Failed to add noticia to Firestore: %v", err)
		}
	}

	return nil
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

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		http.Error(w, "Failed to read response body", http.StatusInternalServerError)
		return
	}

	// Parse the API response
	var apiResponse APIResponse
	if err := json.Unmarshal(body, &apiResponse); err != nil {
		http.Error(w, "Failed to parse noticias", http.StatusInternalServerError)
		return
	}

	// Initialize Firebase
	client, err := InitializeFirebase()
	if err != nil {
		http.Error(w, "Failed to initialize Firebase", http.StatusInternalServerError)
		return
	}
	defer client.Close()

	// Save noticias to Firestore
	if err := SaveNoticiasToFirestore(client, apiResponse.Items); err != nil {
		http.Error(w, "Failed to save noticias to Firestore", http.StatusInternalServerError)
		return
	}

	// Convert the selected noticias to JSON and return in the response
	jsonResponse, err := json.Marshal(apiResponse.Items)
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
