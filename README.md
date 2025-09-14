# Instruções de inicialização



## Como Rodar o Front-end

Acesse a pasta do front-end
Abra o terminal e navegue até a pasta onde o código do front-end está localizado.

`cd front`


Instale as dependências
No diretório do front-end, execute o seguinte comando para instalar todas as dependências necessárias:

`npm install`


Inicie o servidor de desenvolvimento
Após as dependências estarem instaladas, execute o comando abaixo para rodar o front-end localmente:

`npm start`


O front-end estará disponível em http://localhost:3000/


## Como Rodar o Back-end


Instale as dependências
No diretório do back-end, execute o seguinte comando para instalar todas as dependências necessárias:

`npm install`


Inicie o servidor
Após as dependências estarem instaladas, execute o seguinte comando para rodar o servidor do back-end:

`npm start`


O back-end estará rodando na porta 8000. Se for necessário, ajuste a configuração de ambiente no arquivo .env.


# Exemplo de .env

`SUPABASE_KEY= Sua chave de API do Supabase`


# Banco de Dados (Supabase)

A aplicação utiliza o Supabase como banco de dados PostgreSQL gerenciado e provedor de autenticação.

## Autenticação

Login e registro via Supabase Auth.


## Estrutura do Banco de Dados


| Coluna       | Tipo      | Descrição                         |
|--------------|-----------|-----------------------------------|
| id           | uuid (PK) | Identificador único do usuário.  |
| created_at   | timestamp | Data de criação do registro.     |
| first_name   | varchar   | Primeiro nome do usuário.        |
| surname      | varchar   | Sobrenome do usuário.            |
| address      | varchar   | Endereço do usuário.             |
| zip_code     | varchar   | CEP do usuário.                  |
| username     | varchar   | E-mail do usuário.               |
| password     | varchar   | Senha do usuário.                |

## Relações

Não existem relações entre tabelas no momento.



