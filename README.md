<h1 align="center">
    <img src="./.github/assets/cover.png">
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
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- [csv-parse](https://csv.js.org/parse/)
- [dayjs](https://day.js.org/en/)
- [multer](https://github.com/expressjs/multer)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- [supertest](https://github.com/ladjs/supertest)
- [tsyringe](https://github.com/microsoft/tsyringe)
- [typeorm](https://typeorm.io/)
- [uuid](https://github.com/uuidjs/uuid)
- [Ethereal](https://ethereal.email/) Serviço SMTP falso, para testes de envido de e-mail
- [Nodemailer](https://nodemailer.com/) Serviço SMTP falso, para testes de envido de e-mail
- [handlebarsjs](https://handlebarsjs.com/) Criar template de e-mail
- [AWS SES](https://aws.amazon.com/pt/ses/)
- [AWS S3](https://aws.amazon.com/pt/s3/)
- [AWS EC2](hhttps://aws.amazon.com/pt/ec2/)
- [Sentry](https://sentry.io/welcome/)

### Instalação

```sh
yarn
```

### Documentaçao

```sh
http://localhost:[PORT]/api-docs/
```

### Requisitos da aplicação

<details>
  <summary>Clique aqui para visualizar</summary>

```
 RF:  Requisitos Funcionais
 RNF: Requisitos Não Funcionais
 RN:  Regra de negócio
```

**Cadastro de carro**

- **RF**
  - Deve ser possível cadastrar um novo carro
- **RN**
  - Não deve ser possível cadastrar um carro com uma placa já existente
  - Não deve ser possível alterar a placa de um carro já cadastrado
  - O carro deve ser cadastrado, por padrão, como disponível
  - Apenas usuários administradores pode cadastrar um novo carro

**Listar carros**

- **RF**
  - Deve ser possível listar apenas os carros disponíveis
  - Deve ser possível listar todos os carros disponível pelo nome da categoria
  - Deve ser possível listar todos os carros disponível pelo nome do carro
  - Deve ser possível listar todos os carros disponível pelo nome da marca
- **RN**
  - Não é necessário está logado no sistema para listar os carros cadastrados

**Cadastro de especificações no carro**

- **RF**
  - Deve ser possível cadastrar uma ou mais especificações para um carro
  - Apenas usuários administradores pode cadastrar uma nova especificação
- **RN**
  - Não deve ser possível cadastrar uma especificação para um carro não cadastrado
  - Não deve ser possível cadastrar especificações com nomes duplicados para um mesmo carro

**Cadastro de imagens do carro**

- **RF**

  - Deve ser possível cadastrar a imagem do carro

- **RNF**
  - Utilizar o multer para upload dos arquivos
- **RN**
  - O usuário pode cadastrar mais de uma imagem para o mesmo carro
  - Apenas usuários administradores pode cadastrar as imagens

**Aluguel de carro**

- **RF**
  - Deve ser possível cadastrar um aluguel
- **RN**
  - O aluguel deve ter duração mínima de 24 hora
  - Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário
  - Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro
  - O usuário deve está logado na aplicação
  - Ao realizar um aluguel, o status do carro deverá ser alterado para indisponível

**Devolução de carro**

- **RF**
  - Deve ser possível realizar a devolução de um carro
- **RN**

  - Se o carro for devolvido com menos de 24 horas, deverá ser cobrado diário completa
  - Ao realizar a devolução, o carro deverá ser liberado para outro aluguel
  - Ao realizar a devolução, o carro deverá ser liberado para outro aluguel
  - Ao realizar a devolução, deverá ser calculado o total do aluguel
  - Cao o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado
    multa proporcional aos dias de atraso.
  - Caso haja multa, deverá ser somado ao total do aluguel
  - O usuário deve está logado na aplicação

  **Listagem de alugueis para usuário**

- **RF**
  - Deve ser possível realizar a busca de todos os alugueis para o usuário
- **RN**

  - O Usuário deve estar logado na aplicação

  **Recuperar Senha**

- **RF**
  - Deve ser possível o usuário recuperar a senha informando o e-mail
  - O usuário deve receber um e-mail com o passo a passo para recuperar a recuperação da senha
  - O usuário deve conseguir inserir uma nova senha
- **RN**
  - O Usuário precisa informar uma nova senha
  - O link enviado para recuperação deve expirar em 3 horas Comandos

</details>

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
$ docker inspect --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' [name]

# Executar container em background
# -p => realizar o direcionamento da porta do docker para o SO
$ docker run -p 3333:3333 [name] -d

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

# Desfazer a ultima migration
$ yarn typeorm migration:revert
```

### Contribuição

Contribuições são bem-vindas! Para contribuir, basta abrir uma issue ou pull request neste repositório.

### Autor

Feito por Mauricio Aires 👋🏽
