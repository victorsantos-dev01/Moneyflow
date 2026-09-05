import { useState, useEffect } from "react";
import Header from "./components/Header";
import SummaryCards from "./components/SummaryCards";
import TransactionForm from "./components/TransactionForm";
import Filters from "./components/Filters";
import Charts from "./components/Charts";
import TransactionList from "./components/TransactionList";
import { carregarTransacoes, salvarTransacoes, criarTransacao } from "./utils/storage";
import "./App.css";

const filtrosIniciais = { mes: "", categoria: "", tipo: "" };

export default function App() {
  const [transacoes, setTransacoes] = useState(() => carregarTransacoes());
  const [filtros, setFiltros] = useState(filtrosIniciais);

  useEffect(() => {
    salvarTransacoes(transacoes);
  }, [transacoes]);

  function adicionarTransacao(dados) {
    setTransacoes((prev) => [criarTransacao(dados), ...prev]);
  }

  function removerTransacao(id) {
    setTransacoes((prev) => prev.filter((t) => t.id !== id));
  }

  const transacoesFiltradas = transacoes.filter((t) => {
    if (filtros.mes && t.data.slice(5, 7) !== filtros.mes) return false;
    if (filtros.categoria && t.categoria !== filtros.categoria) return false;
    if (filtros.tipo && t.tipo !== filtros.tipo) return false;
    return true;
  });

  return (
    <div className="app">
      <Header />
      <SummaryCards transacoes={transacoesFiltradas} />

      <div className="app-grid">
        <div className="panel">
          <p className="panel__title">Nova transação</p>
          <TransactionForm onAdicionar={adicionarTransacao} />
        </div>

        <div>
          <div className="panel">
            <p className="panel__title">Filtros</p>
            <Filters filtros={filtros} onChange={setFiltros} />
          </div>

          <div className="panel">
            <Charts transacoes={transacoesFiltradas} />
          </div>

          <div className="panel">
            <p className="panel__title">Transações</p>
            <TransactionList transacoes={transacoesFiltradas} onRemover={removerTransacao} />
          </div>
        </div>
      </div>
    </div>
  );
}