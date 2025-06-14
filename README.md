# Sistema de Gestão de Resíduos Urbanos

Este projeto é uma solução completa para monitoramento e gestão de pontos de coleta de lixo em cidades, permitindo visualização em mapa, cadastro, manutenção, relatórios avançados e histórico de manutenções. O sistema foi desenvolvido para facilitar a tomada de decisão e otimizar rotas de coleta, usando como exemplo a cidade de Floresta-PR.

## Tecnologias Utilizadas

### Frontend

- React
- Material-UI (interface moderna)
- Leaflet (mapas interativos)
- Recharts (gráficos avançados)
- Axios (requisições HTTP)

### Backend

- NestJS (API robusta)
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

- **Dashboard moderno:** visão geral dos pontos, cards de status e mapa imersivo
- **Mapa interativo:** pontos de coleta exibidos com ícones coloridos por status (cheio, normal, vazio)
- **Cadastro de pontos:** adicione novos pontos com endereço, latitude e longitude
- **Manutenção de pontos:** registre manutenções, altere status, adicione observações e veja o histórico completo
- **Relatórios avançados:** gráficos de barras, pizza, linha e barras horizontais para análise de status, evolução e manutenções
- **Histórico de manutenções:** cada ponto armazena todas as manutenções realizadas
- **Padronização de status:** todos os status são em maiúsculo (`CHEIO`, `NORMAL`, `VAZIO`)
- **Exemplo real:** pontos e coordenadas reais de Floresta-PR

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
