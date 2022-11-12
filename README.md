# NestSlsMonorepo

This project was generated using [Nx](https://nx.dev). 

## Settings

-   Ensure your environment is available in local machine in the path `config/development/.env` - Refer this template [env](env-template/template.json).
-   Made use of different debugging for each app - Refer [launch.json](apps/sq-module/README.md).
-   Used husky with a precommit hook to make sure formatting is applied before checking in the code to github ( can be improved by making sure that the code always build before pushing to github)

## Workspace details

-   Using `Nestjs` for the backend
-   Making use of nestjs as the wrapper framework around fastify to build my graphql
-   Run `nx g @nrwl/nest:app nest-sls-monorepo` to generate an application.
-   All executions are added to project.json. I have created a standalone nest module and a graphql nest module to showcase nx capabilities
-   Added husky to lint files before checkin as a precommit hook

### Patterns used :

-   Refer respective README.md files [libs](libs/common/README.md) [sqModule](apps/sq-module/README.md)

---

> Nx will be used to generate docker images for both of them . Building them as part of ci is what we are going to acheive. It is capable of detecting only the changes made and build them `nx affected --target=<executor name from project.json>`

---

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@nest-sls-monorepo/mylib`.

## Development server

Run `nx serve <name of the project from nx.json>` for a dev server. Navigate to http://localhost:3002/. The app will automatically reload if you change any of the source files.

> Note: The default port is 4200 but configured the port in .env file that is not checkedin

## Build

Run `nx build <name of the project from nx.json>` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `nx test <name of the project from nx.json>` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `nx e2e <name of the project from nx.json>` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.

## ☁ Nx Cloud

### Distributed Computation Caching & Distributed Task Execution

Nx Cloud pairs with Nx in order to enable you to build and test code more rapidly, by up to 10 times. Even teams that are new to Nx can connect to Nx Cloud and start saving time instantly.

Teams using Nx gain the advantage of building full-stack applications with their preferred framework alongside Nx’s advanced code generation and project dependency graph, plus a unified experience for both frontend and backend developers.

Visit [Nx Cloud](https://nx.app/) to learn more.
