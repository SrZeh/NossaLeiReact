# NossaLei

NossaLei é um projeto desenvolvido como parte da disciplina PMI da Faculdade Cesusc. O objetivo principal deste projeto é criar uma plataforma web para criação e assinatura de futuros projetos de lei.

## Integrantes

- Filipe Polnow
- Vinicius Guimarães de Oliveira
- Jose Gabriel Berton

## Tecnologias Utilizadas

- React: Uma biblioteca JavaScript para construção de interfaces de usuário.
- Firebase: Uma plataforma de desenvolvimento de aplicativos móveis e web desenvolvida pelo Google.
- Firestore: Um banco de dados NoSql da plataforma Firebase.

## Funcionalidades

- Cadastro e Login de Usuários: Permitirá que os usuários criem contas e façam login na plataforma.
- Visualização de Legislações: Os usuários poderão visualizar as legislações municipais disponíveis na plataforma.
- Busca Avançada: Funcionalidade de busca avançada para facilitar a localização de legislações específicas.
- Assinaturas: Permitirá que os usuários assinem leis específicas.

## Instalação e Uso

1. Clone este repositório: `<code id="cloneCommand" onclick="copyToClipboard('git clone https://github.com/viniciusgdoliveira/NossaLeiReact.git')">git clone https://github.com/viniciusgdoliveira/NossaLeiReact.git</code>`
2. Navegue até o diretório do projeto: `<code id="navigateCommand" onclick="copyToClipboard('cd NossaLeiReact')">cd NossaLeiReact</code>`
3. Instale as dependências: `<code id="installCommand" onclick="copyToClipboard('npm install')">npm install</code>`
4. Execute o projeto: `<code id="startCommand" onclick="copyToClipboard('npm start')">npm start</code>`
5. Acesse a aplicação em seu navegador: [http://localhost:3000](http://localhost:3000)

<script>
function copyToClipboard(text) {
  var textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
  alert("Comando copiado para a área de transferência!");
}
</script>
