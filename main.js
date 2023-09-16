import { inicializarCarrinho, productRender, atualizarPrecoCarrinho } from './src/menuCarrinho';
import { render } from './src/cartaoProdutos';
import { initFilter } from './src/filtrosCatalogo';

render();
inicializarCarrinho();
productRender();
atualizarPrecoCarrinho();
initFilter();
