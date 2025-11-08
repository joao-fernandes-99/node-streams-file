# Node Streams File Processor

Projeto Node.js que processa arquivos CSV armazenados no Cloudflare R2 (compatível com S3) usando Streams e armazena os dados no MongoDB.

## 📋 Descrição

Este projeto utiliza Node.js Streams para processar arquivos CSV de forma eficiente, transformando os dados em JSON e inserindo-os no MongoDB. O processamento é feito em streaming, o que permite lidar com arquivos grandes sem sobrecarregar a memória.

### Principais Funcionalidades

- 🔄 Processamento de arquivos CSV em streaming
- 📦 Integração com Cloudflare R2 (S3-compatible)
- 🗄️ Armazenamento automático no MongoDB
- ⚡ Pipeline de transformação customizável

## 🏗️ Arquitetura

O projeto utiliza uma arquitetura baseada em Streams do Node.js:

```
R2 (S3) → LineSplitter → JsonTransform → MongoWriter
```

- **LineSplitter**: Divide o arquivo em linhas
- **JsonTransform**: Converte cada linha CSV em JSON
- **MongoWriter**: Insere os dados no MongoDB

## 📦 Pré-requisitos

- Node.js 22.17.0 ou superior
- MongoDB (local ou Atlas)
- Conta Cloudflare R2 ou AWS S3

## 🚀 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/joao-fernandes-99/node-streams-file.git
cd node-streams-file
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Cloudflare R2 / AWS S3
R2_ACCOUNT_ID=seu_account_id
R2_ACCESS_KEY_ID=sua_access_key
R2_SECRET_ACCESS_KEY=sua_secret_key
R2_DEFAULT_BUCKET=seu_bucket

# MongoDB
MONGODB_ATLAS_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/
DATABASE=nome_do_database
```

## ▶️ Como Executar

### Executar o processamento

```bash
npm start
```

Ou diretamente com Node:

```bash
node Index.js
```

## 📁 Estrutura do Projeto

```
node-streams-file/
├── services/
│   └── R2Service.js          # Serviço de integração com R2/S3
├── transforms/
│   ├── JsonTransform.js      # Transform stream para conversão em JSON
│   └── LineSplitterTransform.js  # Transform stream para dividir linhas
├── writables/
│   └── MongoWritable.js      # Writable stream para MongoDB
├── util/
│   └── Headers.js            # Definição dos cabeçalhos CSV
├── Index.js                  # Arquivo principal
├── readableStream.js         # Exemplo de processamento com streams
├── package.json
└── .env                      # Variáveis de ambiente (não versionado)
```

## 🔧 Configuração dos Headers CSV

Os headers do arquivo CSV devem ser configurados no arquivo apropriado. O formato esperado é:

```
seller,amount,operation,currency,description,replace,movement_reference,movement_replacement
```

## 📝 Dependências

- **@aws-sdk/client-s3**: Cliente AWS SDK para integração com S3/R2
- **dotenv**: Gerenciamento de variáveis de ambiente
- **mongodb**: Driver oficial do MongoDB para Node.js

## 🐛 Troubleshooting

### Erro de conexão com MongoDB

Verifique se:
- A URI do MongoDB está correta no `.env`
- Seu IP está na whitelist do MongoDB Atlas
- As credenciais estão corretas

### Erro ao acessar R2/S3

Verifique se:
- As credenciais R2 estão corretas
- O bucket existe e está acessível
- O arquivo especificado existe no bucket

### Processo não encerra

Se o processo não encerrar automaticamente:
- Certifique-se de que a conexão MongoDB está sendo fechada
- Verifique se todas as Promises estão sendo aguardadas

```

## 📄 Licença

ISC

## 👤 Autor

**João Fernandes**

---

⭐ Se este projeto foi útil para você, considere dar uma estrela no repositório!