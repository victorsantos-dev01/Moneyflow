import { CATEGORIES, MONTHS_PT, TRANSACTION_TYPES } from "../utils/constants";

export default function Filters({ filtros, onChange }) {
  return (
    <div className="filters">
      <div className="form-field">
        <label htmlFor="filtro-mes">Mês</label>
        <select
          id="filtro-mes"
          value={filtros.mes}
          onChange={(e) => onChange({ ...filtros, mes: e.target.value })}
        >
          <option value="">Todos</option>
          {MONTHS_PT.map((mes, index) => (
            <option key={mes} value={String(index + 1).padStart(2, "0")}>{mes}</option>
          ))}
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="filtro-categoria">Categoria</label>
        <select
          id="filtro-categoria"
          value={filtros.categoria}
          onChange={(e) => onChange({ ...filtros, categoria: e.target.value })}
        >
          <option value="">Todas</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="filtro-tipo">Tipo</label>
        <select
          id="filtro-tipo"
          value={filtros.tipo}
          onChange={(e) => onChange({ ...filtros, tipo: e.target.value })}
        >
          <option value="">Todos</option>
          <option value={TRANSACTION_TYPES.RECEITA}>Receita</option>
          <option value={TRANSACTION_TYPES.DESPESA}>Despesa</option>
        </select>
      </div>
    </div>
  );
}