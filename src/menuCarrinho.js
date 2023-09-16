import { catalogo, saveInLocalStorage, recoverFromLocalStorage } from './utilidades';

// Recuperando os produtos do localStorage
const cartProductIdsWithQuantity = recoverFromLocalStorage('carrinho') ?? {};

// Abrindo barra lateral na página de catálogo
function openCar() {
  document.getElementById('carrinho').classList.add('right-[0px]');
  document.getElementById('carrinho').classList.remove('right-[-365px]');
}
// Fechando a barra lateral na página do catálogo
function closeCar() {
  document.getElementById('carrinho').classList.remove('right-[0px]');
  document.getElementById('carrinho').classList.add('right-[-365px]');
}

// Função para encaminhar o usuário da página de catálogo para a página de checkout
function goToCheckout() {
  if (Object.keys(cartProductIdsWithQuantity).length === 0) {
    return;
  }
  window.location.href = './checkout.html';
}

export function inicializarCarrinho() {
  const botaoFecharCarrinho = document.getElementById('fecharCarrinho');
  const botaoAbrirCarrinho = document.getElementById('abrirCarrinho');
  const botaoIrParaCheckout = document.getElementById('finalizarCompra');

  botaoFecharCarrinho.addEventListener('click', closeCar);
  botaoAbrirCarrinho.addEventListener('click', openCar);
  botaoIrParaCheckout.addEventListener('click', goToCheckout);
}

// Função para atualizar a quantidade de produtos no carrinho
function atualizarInfoQuantidade(productId) {
  document.getElementById(`amount-${productId}`).innerText = cartProductIdsWithQuantity[productId];
}

// Função para incrementar a quantidade de produtos
function incrementarId(productId) {
  cartProductIdsWithQuantity[productId]++;
  saveInLocalStorage('carrinho', cartProductIdsWithQuantity);
  atualizarPrecoCarrinho();
  atualizarInfoQuantidade(productId);
}
// Função para decrementar a quantidade de produtos
function decrementarId(productId) {
  if (cartProductIdsWithQuantity[productId] === 1) {
    remove(productId);
    return;
  }
  cartProductIdsWithQuantity[productId]--;
  saveInLocalStorage('carrinho', cartProductIdsWithQuantity);
  atualizarPrecoCarrinho();
  atualizarInfoQuantidade(productId);
}

// Função para desenhar o produto de forma dinâmica no carrinho
function desenharProduto(productId) {
  const product = catalogo.find((p) => p.id === productId);

  let novoPreco = 0;
  if (/^0\./.test(product.preco)) {
    novoPreco = product.preco.replace(/^0\./, '');
  } else {
    novoPreco = product.preco;
  }

  const containerProdutosCarrinho = document.getElementById('produtosCarrinho');
  const articleClasses = ['flex', 'bg-slate-100', 'rounded-lg', 'p-1', 'relative'];
  const elementArticle = document.createElement('article');

  for (const articleClass of articleClasses) {
    elementArticle.classList.add(articleClass);
  }

  const carProductCard = `
                <button id="removeItem-${product.id}" class="absolute top-0 right-2 hover:text-slate-900"><i class="fa-solid fa-xmark text-red-500 hover:text-slate-900"></i></button>
                <img src="./assets/img/${product.imagem}.jpg" alt="carrinho ${product.nome}" class="md:h-24 h-24 w-auto rounded-lg">
                <div class="p-2 flex flex-col justify-between">
                    <p class="text-slate-900 text-small">${product.marca}</p>
                    <p class="text-slate-900 text-small">${product.nome}</p>
                    <p class="text-slate-400 text-xs">${product.memoria}</p>
                    <p class="text-green-900 text-lg">R$${novoPreco}</p>
                </div>
                 <div class='flex text-slate-950 items-end absolute bottom-0 right-2 text-lg'>
                    <button id='decrementarProduto-${product.id}'
                        ><i class="fa-solid fa-minus"></i>
                    </button>
                    <p id='amount-${product.id}' class='ml-2'>${cartProductIdsWithQuantity[product.id]}</p>
                    <button id='incrementarProduto-${product.id}'
                        class='ml-2'><i class="fa-solid fa-plus"></i>
                    </button>
                 </div>
               `;

  elementArticle.innerHTML += carProductCard;
  containerProdutosCarrinho.appendChild(elementArticle);

  document.getElementById(`decrementarProduto-${product.id}`)
    .addEventListener(
      'click',
      () => decrementarId(product.id),
    );

  document.getElementById(`incrementarProduto-${product.id}`)
    .addEventListener(
      'click',
      () => incrementarId(product.id),
    );

  document.getElementById(`removeItem-${product.id}`)
    .addEventListener(
      'click',
      () => remove(product.id),
    );
}

export function productRender() {
  const containerProdutosCarrinho = document.getElementById('produtosCarrinho');
  containerProdutosCarrinho.innerHTML = '';
  for (const productId in cartProductIdsWithQuantity) {
    desenharProduto(productId);
  }
}
// Função para remover um produto do carrinho
function remove(productId) {
  delete cartProductIdsWithQuantity[productId];
  saveInLocalStorage('carrinho', cartProductIdsWithQuantity);
  atualizarPrecoCarrinho();
  productRender();
}

// Função para adicionar um produto no carrinho
export function adicionarAoCarrinho(productId) {
  if (productId in cartProductIdsWithQuantity) {
    incrementarId(productId);

    return;
  }

  cartProductIdsWithQuantity[productId] = 1;
  desenharProduto(productId);
  saveInLocalStorage('carrinho', cartProductIdsWithQuantity);
  atualizarPrecoCarrinho();
}

// Função para atulizar o preço total dos produdos de forma dinâmica
export function atualizarPrecoCarrinho() {
  const precoCarrinho = document.getElementById('precoTotal');
  let precoTotalCarrinho = 0;
  for (const idProdutoNoCarrinho in cartProductIdsWithQuantity) {
    const product = catalogo.find((p) => p.id === idProdutoNoCarrinho);
    if (product) {
      const precoProduto = parseFloat(product.preco);
      const quantidade = cartProductIdsWithQuantity[idProdutoNoCarrinho];
      precoTotalCarrinho += precoProduto * (quantidade);
    }
  }
  precoCarrinho.innerText = `Total: R$${precoTotalCarrinho.toFixed(3)}`;
}
