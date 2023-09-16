import { atualizarPrecoCarrinho } from './src/menuCarrinho';
import {
  desenharProdutoSimples, recoverFromLocalStorage, deleteFromLocalStorage, saveInLocalStorage, catalogo,
} from './src/utilidades';
import { getCep } from './src/cep';

const nomeProduto = [];
const marcaProduto = [];
const precoProduto = [];
let pedido1;
let pedido2;
let pedido3;
let precoTotalCarrinho = 0;

// Desenhando os produtos na aba de checkout
function desenharProdutosCheckout() {
  const cartProductIdsWithQuantity = recoverFromLocalStorage('carrinho') ?? {};
  for (const productId in cartProductIdsWithQuantity) {
    desenharProdutoSimples(productId, 'containerProdutosCheckout', cartProductIdsWithQuantity[productId]);
    const product = catalogo.find((p) => p.id === productId);
    // Pegando preço total
    if (product) {
      const ProdutoPreco = parseFloat(product.preco);
      const quantidade = cartProductIdsWithQuantity[productId];
      precoTotalCarrinho += ProdutoPreco * quantidade;
    }
    // Pegando detalhes dos produtos para adicinar ao resumo
    nomeProduto.push(product.nome);
    marcaProduto.push(product.marca);
    precoProduto.push(product.preco);
    pedido1 = `Gostaria de pedir um ${marcaProduto[0]} ${nomeProduto[0]} no valor de R$${precoProduto[0]},`;
    pedido2 = `um ${marcaProduto[1]} ${nomeProduto[1]} no valor de R$${precoProduto[1]},`;
    pedido3 = `um ${marcaProduto[2]} ${nomeProduto[2]} no valor de R$${precoProduto[2]},`;
  }
  // Verificando se o stot em que vou armazenar o produto está vazio
  if (marcaProduto[1] === undefined) {
    pedido2 = '';
    pedido3 = '';
  } else if (marcaProduto[2] === undefined) {
    pedido3 = '';
  }
}

function finalizarCompra(e) {
  e.preventDefault();
  enviarResumoParaWhatsApp();
  const cartProductIdsWithQuantity = recoverFromLocalStorage('carrinho') ?? {};
  if (Object.keys(cartProductIdsWithQuantity).length === 0) {
    return;
  }
  const dataAtual = new Date();
  const pedidoFeito = {
    dataPedido: dataAtual,
    pedido: cartProductIdsWithQuantity,
  };
  const historicoPedidos = recoverFromLocalStorage('historico') ?? [];
  const historicoPedidosAtualizados = [pedidoFeito, ...historicoPedidos];
  saveInLocalStorage('historico', historicoPedidosAtualizados);
  deleteFromLocalStorage('carrinho');
  window.location.href = './pedidos.html';
}

desenharProdutosCheckout();
atualizarPrecoCarrinho();
getCep();

document.addEventListener('submit', (e) => finalizarCompra(e));

// Função para enviar um resumo do pedido para o whatsapp da loja

function enviarResumoParaWhatsApp() {
  const nome = document.getElementById('nome').value;
  const telefone = document.getElementById('numero').value;

  const dinheiro = document.getElementById('dinheiro');
  const pix = document.getElementById('pix');
  const cartao = document.getElementById('cartao');
  let pagamento = 'Dinheiro';

  // Verificando a forma de pagamento selecionada no checkout

  if (dinheiro.checked === true) {
    pagamento = 'dinheiro';
  } else if (pix.checked === true) {
    pagamento = 'pix';
  } else if (cartao.checked === true) {
    pagamento = 'cartão';
  }

  const cidade = document.getElementById('cidade').value;
  const bairro = document.getElementById('bairro').value;
  const numero = document.getElementById('numeroRua').value;
  const complemento = document.getElementById('complemento').value;
  const rua = document.getElementById('rua').value;
  const resumoPedido = `Olá, meu nome é ${nome}. ${pedido1} ${pedido2} ${pedido3} que ficou no preço total de R$${precoTotalCarrinho} reais. Para entregar no seguinte endereço:
Cidade: ${cidade};
Bairro: ${bairro};
Rua: ${rua};
numero: ${numero};
complemento: ${complemento}.
Telefone para contato: ${telefone}.
Pagamento vai ser no ${pagamento}.`;

  const numeroWhatsApp = '';// Numero de whatsapp da loja

  const urlWhatsApp = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(resumoPedido)}`;

  window.open(urlWhatsApp, '_blank');
}
