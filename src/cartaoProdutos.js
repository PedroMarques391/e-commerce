import { catalogo } from './utilidades';
import { adicionarAoCarrinho } from './menuCarrinho';

// Função para renderizar os cartões dos produtos na página principal do site
export function render() {
  let novoPreco = 0;
  catalogo.forEach((products) => {
    if (/^0\./.test(products.preco)) {
      novoPreco = products.preco.replace(/^0\./, '');
    } else {
      novoPreco = products.preco;
    }
    const productCard = `
      <div class='border-solid shadow-xl shadow-slate-400 rounded-lg w-[137px] md:w-48 m-2 flex flex-col p-2 justify-between group ${products.apple ? 'apple' : 'xiaomi'} ' id="cardProduto${products.id}">
          <img src="../assets/img/${products.imagem}.jpg" alt="${products.nome} da Marques Magazine"
          class='h-40 w-auto md:h-44 md:w-auto group-hover:scale-110 duration-300 my-3 rounded-lg'
          >
          <p class='text-sm'>${products.marca}</p>
          <p class='text-sm'>${products.nome}</p>
          <p class='text-sm'>${products.memoria}</p>
          <p class='text-lg'>R$${novoPreco}</p>
          <button id='adicionar-${products.id}' class='bg-slate-950 hover:bg-slate-700 text-slate-200'><i class="fa-solid fa-cart-plus"></i></button>
      </div>
      `;

    document.getElementById('containerProduto').innerHTML += productCard;
  });

  for (const products of catalogo) {
    document.getElementById(`adicionar-${products.id}`).addEventListener('click', () => adicionarAoCarrinho(products.id));
  }
}
