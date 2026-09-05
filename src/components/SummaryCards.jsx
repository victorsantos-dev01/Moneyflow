import { formatCurrency } from "../utils/format";
import { TRANSACTION_TYPES } from "../utils/constants";

export default function SummaryCards({ transacoes }) {
  const totalReceitas = transacoes
    .filter((t) => t.tipo === TRANSACTION_TYPES.RECEITA)
    .reduce((soma, t) => soma + t.valor, 0);

  const totalDespesas = transacoes
    .filter((t) => t.tipo === TRANSACTION_TYPES.DESPESA)
    .reduce((soma, t) => soma + t.valor, 0);

  const saldo = totalReceitas - totalDespesas;

  return (
    <div className="summary-cards">
      <div className="summary-card summary-card--saldo">
        <p className="summary-card__label">Saldo atual</p>
        <p className="summary-card__value">{formatCurrency(saldo)}</p>
      </div>
      <div className="summary-card summary-card--receitas">
        <p className="summary-card__label">Receitas</p>
        <p className="summary-card__value">{formatCurrency(totalReceitas)}</p>
      </div>
      <div className="summary-card summary-card--despesas">
        <p className="summary-card__label">Despesas</p>
        <p className="summary-card__value">{formatCurrency(totalDespesas)}</p>
      </div>
      <div className="summary-card">
        <p className="summary-card__label">Transações</p>
        <p className="summary-card__value">{transacoes.length}</p>
      </div>
    </div>
  );
}