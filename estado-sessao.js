// Utilitário compartilhado: guarda o estado de cada página (filtros + últimos
// resultados) no sessionStorage, pra sobreviver quando o usuário troca de aba
// no menu e volta — sem precisar buscar tudo de novo. Some só se a aba do
// navegador for fechada (sessionStorage é por aba/sessão, não permanente).
function salvarEstadoPagina(chave, estado) {
  try {
    sessionStorage.setItem(chave, JSON.stringify(estado));
  } catch (erro) {
    console.warn('Não deu pra salvar o estado da página:', erro.message);
  }
}

function carregarEstadoPagina(chave) {
  try {
    const bruto = sessionStorage.getItem(chave);
    return bruto ? JSON.parse(bruto) : null;
  } catch (erro) {
    console.warn('Não deu pra carregar o estado salvo da página:', erro.message);
    return null;
  }
}

function limparEstadoPagina(chave) {
  try {
    sessionStorage.removeItem(chave);
  } catch (erro) { /* ignora */ }
}
