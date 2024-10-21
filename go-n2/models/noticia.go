package models

// Noticia represents the structure of a news article
type Noticia struct {
	Titulo     string `json:"titulo"`
	Introducao string `json:"introducao"`
	Link       string `json:"link"`
}
