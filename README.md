# Sistema de Gestão de Resíduos Urbanos

Este projeto é um sistema para monitorar os pontos de coleta de lixo na cidade, permitindo que os usuários visualizem quais pontos estão cheios e precisam de coleta. O sistema ajuda a melhorar a eficiência das rotas dos caminhões de coleta, garantindo que a cidade seja atendida de maneira mais organizada e ágil.

## Tecnologias Utilizadas

### Frontend

- React
- Material-UI
- Leaflet (mapas)
- Recharts (gráficos)
- Axios

### Backend

- NestJS
- TypeScript

## Estrutura do Projeto

O projeto está dividido em duas partes principais:

1. `/web` - Frontend em React
2. `/api` - Backend em NestJS

## Requisitos

- Node.js 16+
- Yarn ou NPM

## Instalação

### Backend

```bash
cd api
yarn install
```

### Frontend

```bash
cd web
yarn install
```

## Executando o Projeto

### Backend

```bash
cd api
yarn start:dev
```

O servidor estará disponível em `http://localhost:3001`

### Frontend

```bash
cd web
yarn start
```

A aplicação estará disponível em `http://localhost:3000`

## Funcionalidades

- Visualização de pontos de coleta em um mapa
- Cadastro de novos pontos de coleta
- Atualização do status dos pontos
- Relatórios e estatísticas
- Dashboard com visão geral do sistema

## API Endpoints

### Pontos de Coleta

- `GET /collection-points` - Lista todos os pontos
- `GET /collection-points/:id` - Obtém um ponto específico
- `POST /collection-points` - Cria um novo ponto
- `PUT /collection-points/:id` - Atualiza um ponto
- `DELETE /collection-points/:id` - Remove um ponto

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request
