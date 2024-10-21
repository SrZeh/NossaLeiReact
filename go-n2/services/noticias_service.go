package services

import (
	"context"
	"encoding/json"
	"errors"
	"net/http"
	"time"

	"nossaleireact/go-n2/models"
)

var newsAPIURL = "http://servicodados.ibge.gov.br/api/v3/noticias/?tipo=noticia&qtd=10&destaque=1&de=01-01-2022"

// FetchNoticias fetches news data from IBGE API
func FetchNoticias(ctx context.Context) ([]models.Noticia, error) {
	// Create an HTTP client with a timeout
	client := &http.Client{
		Timeout: 10 * time.Second,
	}

	// Create a new request with context (to manage timeouts and cancellations)
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, newsAPIURL, nil)
	if err != nil {
		return nil, err
	}

	resp, err := client.Do(req)
	if err != nil {
		return nil, errors.New("failed to fetch noticias")
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, errors.New("received non-200 response from API")
	}

	// Parse response
	var responseData struct {
		Items []models.Noticia `json:"items"`
	}
	if err := json.NewDecoder(resp.Body).Decode(&responseData); err != nil {
		return nil, errors.New("failed to decode noticias")
	}

	// Return first 10 noticias
	if len(responseData.Items) > 10 {
		return responseData.Items[:10], nil
	}

	return responseData.Items, nil
}
