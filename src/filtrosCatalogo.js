const productCatalog = document.getElementById('containerProduto');

// Função para mostrar todos os produtos na página principal
function ShowAll() {
  const hiddenProducts = Array.from(productCatalog.getElementsByClassName('hidden'));

  hiddenProducts.forEach((products) => {
    products.classList.remove('hidden');
  });
}

// Função para mostrar os produtos apple
function hiddenXioami() {
  ShowAll();
  const xiaomiProducts = Array.from(productCatalog.getElementsByClassName('xiaomi'));

  xiaomiProducts.forEach((products) => {
    products.classList.add('hidden');
  });
}

// Função para mostrar os produtos xiaomi
function hiddenApple() {
  ShowAll();
  const appleProducts = Array.from(productCatalog.getElementsByClassName('apple'));

  appleProducts.forEach((products) => {
    products.classList.add('hidden');
  });
}

export function initFilter() {
  document.getElementById('exibirApple').addEventListener('click', hiddenXioami);
  document.getElementById('exibirXiaomi').addEventListener('click', hiddenApple);
  document.getElementById('exibirTodos').addEventListener('click', ShowAll);
}
