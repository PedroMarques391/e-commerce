export const catalogo = [
  {
    id: '1', marca: 'Xiaomi', nome: 'Mi 13 pro', preco: '5.498,00', imagem: 'product-1', apple: false, memoria: '256GB',
  },
  {
    id: '2', marca: 'Apple', nome: 'iPhone 14 Pro Max', preco: '10.499,00', imagem: 'product-2', apple: true, memoria: '512GB',
  },
  {
    id: '3', marca: 'Xiaomi', nome: 'Mi 12T Pro', preco: '5.399,00', imagem: 'product-3', apple: false, memoria: '256GB',
  },
  {
    id: '4', marca: 'Apple', nome: 'iPhone 14', preco: '7.599,00', imagem: 'product-4', apple: true, memoria: '128GB',
  },
  {
    id: '5', marca: 'Xiaomi', nome: 'Poco F5', preco: '2.398,00', imagem: 'product-5', apple: false, memoria: '256GB',
  },
  {
    id: '6', marca: 'Apple', nome: 'iPhone SE', preco: '4.299,00', imagem: 'product-6', apple: true, memoria: '128GB',
  },
  {
    id: '7', marca: 'Xiaomi', nome: 'Mi 11T Pro', preco: '3.799,00', imagem: 'product-7', apple: false, memoria: '256GB',
  },
  {
    id: '8', marca: 'Apple', nome: 'iPhone 13', preco: '6.499,00', imagem: 'product-8', apple: true, memoria: '128GB',
  },
  {
    id: '9', marca: 'Xiaomi', nome: 'Poco X4 GT', preco: '2.929,00', imagem: 'product-9', apple: false, memoria: '256GB',
  },
  {
    id: '10', marca: 'Apple', nome: 'iPhone 12', preco: '5.699,00', imagem: 'product-10', apple: true, memoria: '128GB',
  },
  {
    id: '11', marca: 'Xiaomi', nome: 'Mi 13 Lite', preco: '2.499,00', imagem: 'product-11', apple: false, memoria: '256GB',
  },
  {
    id: '12', marca: 'Apple', nome: 'AirPods 3ª geração', preco: '1.899,00', imagem: 'product-12', apple: true, memoria: '',
  },
  {
    id: '13', marca: 'Xiaomi', nome: 'Mi True Wireless Earphones', preco: '0.499,00', imagem: 'product-13', apple: false, memoria: '',
  },
  {
    id: '14', marca: 'Apple', nome: 'iPad Pro de 11°', preco: '19.799,00', imagem: 'product-14', apple: true, memoria: '512GB',
  },
  {
    id: '15', marca: 'Xiaomi', nome: 'Redmi Buds 3', preco: '0.599,00', imagem: 'product-15', apple: false, memoria: '',
  },
  {
    id: '16', marca: 'Apple', nome: 'ipad Air', preco: '6.699,00', imagem: 'product-16', apple: true, memoria: '256GB',
  },
  {
    id: '17', marca: 'Xiaomi', nome: 'Redmi Buds 4', preco: '0.699,00', imagem: 'product-17', apple: false, memoria: '',
  },
  {
    id: '18', marca: 'Apple', nome: 'MacBook Pro de 13 pol', preco: '15.299,00', imagem: 'product-18', apple: true, memoria: '1T',
  },
  {
    id: '19', marca: 'Xiaomi', nome: 'Mi Watch', preco: '1.999,00', imagem: 'product-19', apple: false, memoria: '',
  },
  {
    id: '20', marca: 'Apple', nome: 'Apple Watch Ultra', preco: '10.299,00', imagem: 'product-20', apple: true, memoria: '',
  },
];

export function saveInLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function recoverFromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function deleteFromLocalStorage(key) {
  localStorage.removeItem(key);
}

export function desenharProdutoSimples(productId, containerHtmlId, quantidadeProduto) {
  const product = catalogo.find((p) => p.id === productId);
  let novoPreco = 0;

  if (/^0\./.test(product.preco)) {
    novoPreco = product.preco.replace(/^0\./, '');
  } else {
    novoPreco = product.preco;
  }

  const containerProdutosCarrinho = document.getElementById(containerHtmlId);
  const articleClasses = ['flex', 'bg-stone-200', 'rounded-lg', 'p-1', 'relative', 'mb-2', 'md:w-96', 'w-[225px]'];
  const elementArticle = document.createElement('article');

  for (const articleClass of articleClasses) {
    elementArticle.classList.add(articleClass);
  }

  const carProductCard = `
         <img src="./assets/img/${product.imagem}.jpg" alt="carrinho ${product.nome}" class="h-24 mt-5 rounded-lg md:h-20">
         <div class="p-2 flex flex-col justify-between">
             <p id="marcaProduto" class="text-slate-900 md:text-small">${product.marca}</p>
             <p id="nomeProduto" class="text-slate-900 md:text-small">${product.nome}</p>
             <p class="text-slate-400 md:text-xs">${product.memoria}</p>
             <p id="precoProduto" class="text-green-900 md:text-lg">R$${novoPreco}</p>
         </div>
          <div class='flex text-slate-950 items-end absolute bottom-0 right-2 text-lg'>
             <p id='amount-${product.id}' class='ml-2'>${quantidadeProduto}</p>
          </div>
                 `;

  elementArticle.innerHTML += carProductCard;
  containerProdutosCarrinho.appendChild(elementArticle);
}
