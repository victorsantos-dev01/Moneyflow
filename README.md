# MoneyFlow

Dashboard de finanças pessoais desenvolvido com React, para controle de receitas e despesas.

## Sobre o projeto

O MoneyFlow é uma aplicação web desenvolvida para simular um dashboard de controle financeiro pessoal.

O projeto permite cadastrar receitas e despesas, acompanhar o saldo em tempo real e visualizar a distribuição dos gastos e a evolução financeira através de gráficos.

O objetivo foi aprofundar conceitos de React, como componentização, gerenciamento de estado e persistência de dados, construindo uma aplicação completa, responsiva e funcional.

## Funcionalidades

- Cadastro de transações (receitas e despesas)
- Validação de formulário
- Listagem de transações
- Remoção de transações
- Cards de resumo (saldo, receitas, despesas e quantidade)
- Filtro por mês
- Filtro por categoria
- Filtro por tipo (receita/despesa)
- Gráfico de pizza com despesas por categoria
- Gráfico de linha com evolução do saldo
- Persistência dos dados utilizando LocalStorage
- Layout responsivo
- Compatibilidade com desktop, tablet e celular

## Tecnologias utilizadas

- React
- Vite
- JavaScript
- Recharts
- CSS3
- LocalStorage
- Git
- GitHub

## Estrutura do projeto

MoneyFlow/
│
├── index.html
├── README.md
├── .gitignore
├── package.json
│
└── src/
├── components/
│ ├── Header.jsx
│ ├── SummaryCards.jsx
│ ├── TransactionForm.jsx
│ ├── Filters.jsx
│ ├── Charts.jsx
│ └── TransactionList.jsx
│
├── utils/
│ ├── constants.js
│ ├── format.js
│ └── storage.js
│
├── App.jsx
├── App.css
└── index.css