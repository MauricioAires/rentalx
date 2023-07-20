<h1 align="center">
    <img src="./github/assets/cover.png">
</h1>

### Sobre o projeto

API de aluguel de carros usando TypeScript seguindo padrões de código e princípios SOLID.

### Tecnologias

- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [Docker](https://docs.docker.com/)
- [PostgreSQL](https://www.postgresql.org/docs/)
- [ESLint](https://eslint.org/docs/user-guide/getting-started)
- [Prettier](https://prettier.io/docs/en/)
- [Swagger](https://swagger.io/docs/)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)

### Instalação

```sh
yarn
```

### Documentaçao

```sh
http://localhost:[PORT]/api-docs/
```

### Comandos

```bash
# Versão do docker
$ docker -v

# Criar container
$ docker build -t node-rentalx .

# Listar os containers em execução
$ docker ps

# Listar os containers em execução ou não
$ docker ps -a

# Remover container (o container precisa está pausado)
$ docker rm [id] or [name]

# Iniciar container
$ docker start [id] or [name]

# Reiniciar container
$ docker restart [id] or [name]

# Reiniciar container
$ docker stop [id] or [name]

# Acessar o container (ctrl + d para sair)
$ docker exec -it [id] or [name] /bin/bash

# Exibir os logs de um container em background
$ docker logs node-rentalx -f

# Exibir o IP do container
$ docker inspect --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' node-rentalx or [name]

# Executar container em background
# -p => realizar o direcionamento da porta do docker para o SO
$ docker run -p 3333:3333 node-rentalx -d

# Executar o docker-compose em background
$ docker-compose up

#  Forçar a recriação de todos os contêineres
$ docker-compose up --force-recreate

# Iniciar o serviço recuperando os dados já existentes
$ docker-compose start

# Pausar serviço
$ docker-compose stop

# Pausar serviço e excluir dados e containers
$ docker-compose down

# Remover todos os contêineres, redes, volumes e imagens criados pelo docker-compose up
$ docker-compose down -v --rmi local

# Comando para criar uma migration utilizando typeorm
$ yarn typeorm migration:create -n CreateCategories

# Comando para executar as migrations
$ yarn typeorm migration:run

### Contribuição

Contribuições são bem-vindas! Para contribuir, basta abrir uma issue ou pull request neste repositório.

### Autor

Feito por Mauricio Aires 👋🏽
```
