package handlers

import (
	"context"
	"encoding/json"
	"net/http"
	"time"

	"nossaleireact/go-n2/services"
)

// FetchNoticiasHandler handles the HTTP request and returns news data
func FetchNoticiasHandler(w http.ResponseWriter, r *http.Request) {
	// Define a timeout for the request context
	ctx, cancel := context.WithTimeout(r.Context(), 5*time.Second)
	defer cancel()

	// Fetch noticias using the service layer
	noticias, err := services.FetchNoticias(ctx)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Convert the selected noticias to JSON and return in the response
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(noticias); err != nil {
		http.Error(w, "Failed to serialize noticias", http.StatusInternalServerError)
		return
	}
}
