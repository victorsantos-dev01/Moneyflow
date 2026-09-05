const STORAGE_KEY = "moneyflow_transactions";

export function carregarTransacoes() {
  try {
    const dados = localStorage.getItem(STORAGE_KEY);
    return dados ? JSON.parse(dados) : [];
  } catch (erro) {
    console.error("Erro ao carregar transações:", erro);
    return [];
  }
}

export function salvarTransacoes(transacoes) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transacoes));
  } catch (erro) {
    console.error("Erro ao salvar transações:", erro);
  }
}

export function criarTransacao({ descricao, valor, tipo, categoria, data }) {
  return {
    id: crypto.randomUUID(),
    descricao: descricao.trim(),
    valor: Number(valor),
    tipo,
    categoria,
    data, 
  };
}