# Innyx Frontend

## Instalação

Siga os passos abaixo para configurar o ambiente de desenvolvimento:

1.  **Clone o repositório:**

    ```sh
    git clone <URL_DO_REPOSITORIO>
    cd innyx_frontend
    ```

2.  **Instale as dependências:**
    ```sh
    npm install
    ```

## Scripts Disponíveis

No diretório do projeto, você pode executar os seguintes comandos:

- ### `npm run dev`

  Inicia o servidor de desenvolvimento com hot-reload. Abra [http://localhost:5173](http://localhost:5173) (a porta pode variar) para visualizá-lo no navegador.

- ### `npm run build`

  Compila e minifica o projeto para produção. Os arquivos finais estarão na pasta `dist/`.

- ### `npm run lint`

  Executa o ESLint para analisar o código e encontrar problemas.

- ### `npm run format`

  Executa o Prettier para formatar todos os arquivos no diretório `src/`.

- ### `npm run preview`
  Inicia um servidor local para visualizar a versão de produção do seu aplicativo.

## Principais Tecnologias e Bibliotecas

- **[Vue.js 3](https://vuejs.org/):** O framework progressivo para a construção de interfaces de usuário.
- **[Vite](https://vitejs.dev/):** Uma ferramenta de build extremamente rápida que oferece uma experiência de desenvolvimento mais ágil.
- **[TypeScript](https://www.typescriptlang.org/):** Um superset do JavaScript que adiciona tipagem estática ao código.
- **[Vue Router](https://router.vuejs.org/):** A biblioteca de roteamento oficial para Vue.js.
- **[TanStack Vue Query](https://tanstack.com/query/v5/docs/vue/overview):** Para gerenciamento de estado do servidor, cache, e sincronização de dados.
- **[Axios](https://axios-http.com/):** Um cliente HTTP baseado em Promises para o navegador e Node.js.
- **[Tailwind CSS](https://tailwindcss.com/):** Um framework CSS utility-first para criar designs customizados rapidamente.
- **[ESLint](https://eslint.org/):** Ferramenta para identificar e reportar padrões encontrados no código ECMAScript/JavaScript.
- **[Prettier](https://prettier.io/):** Um formatador de código opinativo para manter um estilo de código consistente.
