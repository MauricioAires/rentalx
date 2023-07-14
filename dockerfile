# Imagem
FROM node:latest

# Onde será criado as informações do container
WORKDIR /usr/app

# Copiar o package.json para o diretorio workdir
COPY package.json ./

# Baixar as dependencias
RUN npm install

# Copiar tudo e jogar no diretorio workdir
COPY . .

# Expor a porta
EXPOSE 3333

# Inicializar o projeto
CMD ["npm", "run", "dev"]