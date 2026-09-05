import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid, ReferenceLine,
} from "recharts";
import { CATEGORY_COLORS, TRANSACTION_TYPES } from "../utils/constants";
import { formatCurrency, formatDateBR } from "../utils/format";

function formatCurrencyCompact(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
}

export default function Charts({ transacoes }) {
  const despesasPorCategoria = Object.entries(
    transacoes
      .filter((t) => t.tipo === TRANSACTION_TYPES.DESPESA)
      .reduce((acc, t) => {
        acc[t.categoria] = (acc[t.categoria] || 0) + t.valor;
        return acc;
      }, {})
  ).map(([categoria, valor]) => ({ categoria, valor }));

  const ordenadas = [...transacoes].sort((a, b) => a.data.localeCompare(b.data));
  let acumulado = 0;
  const evolucaoSaldo = ordenadas.map((t) => {
    acumulado += t.tipo === TRANSACTION_TYPES.RECEITA ? t.valor : -t.valor;
    return { data: formatDateBR(t.data), saldo: acumulado };
  });

  return (
    <div className="charts-grid">
      <div>
        <p className="chart-panel__title">Despesas por categoria</p>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={despesasPorCategoria}
              dataKey="valor"
              nameKey="categoria"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={2}
            >
              {despesasPorCategoria.map((entrada) => (
                <Cell key={entrada.categoria} fill={CATEGORY_COLORS[entrada.categoria]} />
              ))}
            </Pie>
            <Tooltip formatter={(valor) => formatCurrency(valor)} />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              wrapperStyle={{ fontSize: 12, color: "#9fb3a4" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div>
        <p className="chart-panel__title">Evolução do saldo</p>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={evolucaoSaldo} margin={{ left: 8, right: 8 }}>
            <CartesianGrid stroke="#2e4735" strokeDasharray="3 3" />
            <XAxis dataKey="data" stroke="#9fb3a4" fontSize={11} />
            <YAxis
              stroke="#9fb3a4"
              fontSize={11}
              tickFormatter={formatCurrencyCompact}
              width={72}
            />
            <Tooltip formatter={(valor) => formatCurrency(valor)} />
            <ReferenceLine y={0} stroke="#9fb3a4" strokeDasharray="4 4" />
            <Line type="monotone" dataKey="saldo" stroke="#d4af6a" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}