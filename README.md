# 🎬 Movie Search App (OMDb API)

![Status](https://img.shields.io/badge/Status-Funcional-brightgreen)
![API](https://img.shields.io/badge/API-OMDb__API-yellow)
![JS](https://img.shields.io/badge/JS-Async%2FAwait-blue)

Uma aplicação de busca de filmes que consome dados em tempo real da **OMDb API**. O projeto permite que usuários pesquisem por títulos de filmes, séries e jogos, visualizando detalhes como ano de lançamento, pôster e classificação.

## 🎯 Objetivo do Projeto

Este projeto marca a transição do Front-end estático para o dinâmico, utilizando serviços externos. Os principais focos foram:

-   **Consumo de APIs REST:** Uso do método `fetch` para realizar requisições HTTP.
-   **JavaScript Assíncrono:** Implementação de `Async/Await` e tratamento de Promessas (Promises).
-   **Renderização Dinâmica:** Criação de cards de filmes baseados nos dados recebidos em formato JSON.
-   **Tratamento de Erros:** Exibição de mensagens caso o filme não seja encontrado ou haja falha na conexão.

## 🚀 Tecnologias Utilizadas

-   **HTML5:** Interface de busca e container de resultados.
-   **CSS3:** Layout moderno para exibição dos pôsteres e informações dos filmes.
-   **JavaScript (ES6+):** Lógica de busca, consumo de API e manipulação do DOM.
-   **OMDb API:** Banco de dados de filmes utilizado para alimentar a aplicação.

## ⚙️ Funcionalidades

-   [x] Busca de filmes por título.
-   [x] Exibição dinâmica de resultados (Pôster, Título e Ano).
-   [x] Suporte a teclas de atalho (Enter para buscar).
-   [x] Interface limpa e focada no conteúdo.

## 📂 Estrutura do Repositório

-   `/base`: Contém a estrutura inicial de design do projeto.
-   `index.html`: Página principal da aplicação.
-   `script.js`: O "coração" do projeto, onde as requisições à API acontecem.
-   `.gitignore`: Configurado para proteger chaves de API ou arquivos desnecessários.

---

## 🛠️ Como rodar o projeto

1. Clone este repositório:
    ```bash
    git clone [https://github.com/Eduardo-Y/Projeto-OMDB.git](https://github.com/Eduardo-Y/Projeto-OMDB.git)
    ```
2. Importante: Você precisará de uma chave de API (API Key) gratuita da OMDb API.

3. Insira sua chave no arquivo script.js na variável correspondente.

4. Abra o index.html no seu navegador.

👨‍💻 Autor

Desenvolvido por Yoda — Integrando mundos através de APIs.
