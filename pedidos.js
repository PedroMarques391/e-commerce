import { recoverFromLocalStorage, desenharProdutoSimples } from './src/utilidades';

function createOrderHistory(pedidoComData) {
  const elementOrder = `
    <section id='containerPedidos-${pedidoComData.dataPedido}' class='flex flex-col h-[650px] overflow-y-auto bg-slate-300 p-5 mt-5 rounded-lg mx-auto md:-[424px] md:mx-2'>
    <p class='text-xl text-bold my-5 border-2 text-center'>
    ${new Date(pedidoComData.dataPedido).toLocaleDateString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  })}.
</p>
    </section>

    `;

  const main = document.getElementsByTagName('main')[0];
  main.innerHTML += elementOrder;

  for (const productId in pedidoComData.pedido) {
    desenharProdutoSimples(
      productId,
      `containerPedidos-${pedidoComData.dataPedido}`,
      pedidoComData.pedido[productId],
    );
  }
}

function rederHistory() {
  const historico = recoverFromLocalStorage('historico');
  for (const pedidoComData of historico) {
    createOrderHistory(pedidoComData);
  }
}

rederHistory();
