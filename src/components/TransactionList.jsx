import { CATEGORY_COLORS, TRANSACTION_TYPES } from "../utils/constants";
import { formatCurrency, formatDateBR } from "../utils/format";

export default function TransactionList({ transacoes, onRemover }) {
  if (transacoes.length === 0) {
    return <p className="transaction-list__empty">Nenhuma transação encontrada.</p>;
  }

  return (
    <ul className="transaction-list">
      {transacoes.map((t) => (
        <li key={t.id} className="transaction-row">
          <span
            className="transaction-row__stub"
            style={{ background: CATEGORY_COLORS[t.categoria] }}
          />
          <div className="transaction-row__desc">
            <p className="transaction-row__desc-title">{t.descricao}</p>
            <p className="transaction-row__meta">{t.categoria} · {formatDateBR(t.data)}</p>
          </div>
          <span className={`transaction-row__valor transaction-row__valor--${t.tipo}`}>
            {t.tipo === TRANSACTION_TYPES.DESPESA ? "− " : "+ "}
            {formatCurrency(t.valor)}
          </span>
          <button className="transaction-row__remover" onClick={() => onRemover(t.id)} aria-label="Remover transação">
            ✕
          </button>
        </li>
      ))}
    </ul>
  );
}