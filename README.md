# GRUPO 404 - Backend

Manual de configuração do ambiente local

##  Instalação ambiente Linux
1.1 Necessário realizar a instalação dos ítens abaixo, abra o terminal e execute comando por comando:

```bash
 > apt-get update
 > sudo apt-get install docker docker-compose git
```
1.2 Criar uma pasta de projetos e clonar o repositório
```bash
> git clone git@github.com:jhonysantos28/grupo-404-backend.git
> cd grupo-404-backend
```

## Configuração do arquivo .env
1.3 Necessário criar um arquivo na raiz chamado .env, existe um arquivo de exemplo chamado .env.dist.

Exemplo de configuração arquivo .env
```bash
###### PARAMETERS TO PostgreSQL ###
DB_HOST=db
DB_NAME=grupo_404
DB_USER=root
DB_PASSWORD=root
```
Descrição das variáveis de ambiente (.env):
```
DB_HOST -> Recebe o host, no exemplo acima estou passando o container do docker("db") correspondente ao banco de dados.

DB_NAME -> Nome do banco de dados que será criado automaticamente quando subir a instância do docker

DB_USER -> Usuário do banco que será criado

DB_PASSWORD -> Senha do banco para o usuário criado
```

## Conclusão da instalação
Rodar o comando abaixo estando no raiz do projeto para iniciar o container
```
> docker-compose up
```

Após as configurações e execução do comando acima, será criado automaticamente o banco, aplicado as configurações do ambiente e instalações de dependências. 

Será disponibilizada a seguinte url após quando o container da aplicação estiver executando:
```bash
http://localhost:2000
```

## Comandos adicionais Docker compose
```
> docker-compose up -> subir docker
> docker-compose stop -> parar docker
> docker ps -> listar containers
> docker exec -it <container> /bin/sh -> entrar em um container específico
```

## Notas
```
 - Existe uma collection das APIs criadas na pasta postman no raiz do projeto
```




## Links Úteis
[Docker](https://docs.docker.com/compose/)