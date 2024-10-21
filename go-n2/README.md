
# Documentação - Organização de Projeto em Go

Esta documentação visa fornecer uma estrutura e boas práticas para organizar um projeto em Go que faz requisições HTTP e segue princípios de modularização.

## Estrutura do Projeto

A estrutura de pastas recomendada para o seu projeto Go é a seguinte:

```
nossaleireact/
    go-n2/
        handlers/    # Manipuladores de rotas HTTP
        models/      # Definição de modelos (estruturas de dados)
        services/    # Lógica de negócios e interação com APIs externas
        main.go      # Arquivo principal para iniciar o servidor HTTP
```

### Passo a Passo para Implementação

1. **Inicializar o Módulo Go**

No diretório `go-n2`, inicialize o módulo Go para gerenciar dependências e importações:

```bash
go mod init nossaleireact/go-n2
```

Isso cria o arquivo `go.mod` com o caminho do módulo definido como `nossaleireact/go-n2`. Este caminho será usado para importar pacotes internos.

2. **Arquivo `main.go`**

Este arquivo será o ponto de entrada do servidor HTTP e definirá as rotas:

```go
package main

import (
    "log"
    "net/http"

    "nossaleireact/go-n2/handlers" // Importação do pacote handlers
)

func main() {
    http.HandleFunc("/noticias", handlers.FetchNoticiasHandler)

    log.Println("Servidor rodando na porta :8080...")
    if err := http.ListenAndServe(":8080", nil); err != nil {
        log.Fatalf("Falha ao iniciar o servidor: %v", err)
    }
}
```

3. **Pacote `handlers`**

Dentro do diretório `handlers/`, você deve criar o arquivo `noticias.go`, onde a lógica de manipulação da rota `/noticias` ficará localizada:

```go
package handlers

import (
    "context"
    "encoding/json"
    "net/http"
    "time"

    "nossaleireact/go-n2/services" // Importação do pacote services
)

func FetchNoticiasHandler(w http.ResponseWriter, r *http.Request) {
    ctx, cancel := context.WithTimeout(r.Context(), 5*time.Second)
    defer cancel()

    noticias, err := services.FetchNoticias(ctx)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    w.Header().Set("Content-Type", "application/json")
    if err := json.NewEncoder(w).Encode(noticias); err != nil {
        http.Error(w, "Falha ao serializar notícias", http.StatusInternalServerError)
        return
    }
}
```

4. **Pacote `services`**

No diretório `services/`, crie o arquivo `noticias_service.go`, onde a lógica de comunicação com a API externa do IBGE será implementada:

```go
package services

import (
    "context"
    "encoding/json"
    "errors"
    "net/http"
    "time"

    "nossaleireact/go-n2/models" // Importação do pacote models
)

var newsAPIURL = "http://servicodados.ibge.gov.br/api/v3/noticias/?tipo=noticia&qtd=10&destaque=1&de=01-01-2022"

func FetchNoticias(ctx context.Context) ([]models.Noticia, error) {
    client := &http.Client{
        Timeout: 10 * time.Second,
    }

    req, err := http.NewRequestWithContext(ctx, http.MethodGet, newsAPIURL, nil)
    if err != nil {
        return nil, err
    }

    resp, err := client.Do(req)
    if err != nil {
        return nil, errors.New("falha ao buscar notícias")
    }
    defer resp.Body.Close()

    if resp.StatusCode != http.StatusOK {
        return nil, errors.New("resposta da API com erro")
    }

    var responseData struct {
        Items []models.Noticia `json:"items"`
    }
    if err := json.NewDecoder(resp.Body).Decode(&responseData); err != nil {
        return nil, errors.New("falha ao decodificar notícias")
    }

    // Limita a 10 notícias
    if len(responseData.Items) > 10 {
        return responseData.Items[:10], nil
    }

    return responseData.Items, nil
}
```

5. **Pacote `models`**

No diretório `models/`, defina a estrutura dos dados que serão manipulados. No caso, crie um arquivo `noticia.go` para representar o modelo de notícia:

```go
package models

// Noticia representa a estrutura de uma notícia
type Noticia struct {
    Titulo     string `json:"titulo"`
    Introducao string `json:"introducao"`
    Link       string `json:"link"`
}
```

### Explicação dos Componentes:

- **`main.go`**: Configura o servidor HTTP e define as rotas principais. Aqui, você mapeia a rota `/noticias` para o manipulador `FetchNoticiasHandler`.
- **`handlers/`**: Armazena os manipuladores das requisições HTTP. Cada manipulador lida com uma rota específica e delega a lógica de negócios para os serviços.
- **`services/`**: Contém a lógica de negócios, como a interação com APIs externas. O serviço é responsável por obter, processar e retornar os dados.
- **`models/`**: Define as estruturas de dados usadas na aplicação. Aqui, temos a estrutura `Noticia`, que representa os dados das notícias buscadas na API do IBGE.

### Executando o Projeto

Após configurar a estrutura e escrever o código, execute o projeto com o comando:

```bash
go run main.go
```

O servidor ficará ativo na porta `8080` e você poderá acessar a rota `/noticias` para obter as notícias da API do IBGE.

### Considerações Finais

Seguindo essa estrutura modular, seu projeto em Go ficará mais organizado, permitindo fácil manutenção e escalabilidade. Cada responsabilidade é separada em seu próprio pacote (`handlers`, `services`, `models`), facilitando o entendimento e a extensão da aplicação.
