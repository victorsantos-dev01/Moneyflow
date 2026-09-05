import { useState } from "react";
import { CATEGORIES, TRANSACTION_TYPES } from "../utils/constants";
import { todayISO } from "../utils/format";

const estadoInicial = {
  descricao: "",
  valor: "",
  tipo: TRANSACTION_TYPES.DESPESA,
  categoria: CATEGORIES[0],
  data: todayISO(),
};

export default function TransactionForm({ onAdicionar }) {
  const [form, setForm] = useState(estadoInicial);
  const [erro, setErro] = useState("");

  function handleChange(campo, valor) {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.descricao.trim()) {
      setErro("Informe uma descrição.");
      return;
    }
    if (!form.valor || Number(form.valor) <= 0) {
      setErro("O valor precisa ser maior que zero.");
      return;
    }

    onAdicionar(form);
    setForm({ ...estadoInicial, data: todayISO() });
    setErro("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-tipo-toggle">
        <button
          type="button"
          data-tipo="receita"
          className={form.tipo === TRANSACTION_TYPES.RECEITA ? "ativo" : ""}
          onClick={() => handleChange("tipo", TRANSACTION_TYPES.RECEITA)}
        >
          Receita
        </button>
        <button
          type="button"
          data-tipo="despesa"
          className={form.tipo === TRANSACTION_TYPES.DESPESA ? "ativo" : ""}
          onClick={() => handleChange("tipo", TRANSACTION_TYPES.DESPESA)}
        >
          Despesa
        </button>
      </div>

      <div className="form-field">
        <label htmlFor="descricao">Descrição</label>
        <input
          id="descricao"
          type="text"
          value={form.descricao}
          onChange={(e) => handleChange("descricao", e.target.value)}
          placeholder="Ex: Supermercado"
        />
      </div>

      <div className="form-field">
        <label htmlFor="valor">Valor (R$)</label>
        <input
          id="valor"
          type="number"
          step="0.01"
          min="0"
          value={form.valor}
          onChange={(e) => handleChange("valor", e.target.value)}
          placeholder="0,00"
        />
      </div>

      <div className="form-field">
        <label htmlFor="categoria">Categoria</label>
        <select
          id="categoria"
          value={form.categoria}
          onChange={(e) => handleChange("categoria", e.target.value)}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="data">Data</label>
        
        <input
          id="data"
          type="date"
          lang="pt-BR"
          value={form.data}
          onChange={(e) => handleChange("data", e.target.value)}
        />
      </div>

      {erro && <p className="form-field__error">{erro}</p>}

      <button type="submit" className="btn-primary">Adicionar transação</button>
    </form>
  );
}