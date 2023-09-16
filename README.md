# e-commerce


# Projeto de Aprendizado em JavaScript e Tailwind CSS

Este projeto foi construído em JavaScript e estilizado com Tailwind CSS. O objetivo principal era aprimorar minhas habilidades em JavaScript e praticar o uso de classes do Tailwind CSS.

## Funcionalidades

O projeto consiste em quatro arquivos HTML:

### INDEX

- Landing page do site, estilizada com classes do Tailwind CSS.
- Para dispositivos móveis, adicionei um carrossel estilizado com CSS (foi necessário adicionar CSS, pois o Tailwind não foi suficiente).
- Usei JavaScript para fazer a troca de itens no carrossel a cada 3 segundos.

### CATALOGO

- Este arquivo é responsável por mostrar o catálogo, que inclui 20 produtos.
- Os produtos foram adicionados dinamicamente através do arquivo "cartaoProdutos".
- Isso permite adicionar produtos sem a necessidade de repetir código.
- O catálogo também possui um menu lateral (carrinho) que exibe os produtos adicionados.
- Os usuários podem incrementar, decrementar e remover produtos, além de ver o valor total no carrinho de compras.
- O menu lateral é oculto por padrão, mas se torna visível com um clique que ativa eventos para adicionar e remover classes do Tailwind via JavaScript.

### CHECKOUT

- A página de checkout é composta por duas seções com formulários e uma seção para resumo do pedido.
- A primeira seção coleta os dados do usuário, a segunda trata da forma de pagamento e do endereço.
- O endereço é preenchido automaticamente usando a API da brasilapi, o que simplifica o processo para o usuário.
- O usuário precisa apenas informar um CEP válido.
- A última seção exibe o resumo do pedido, quantidade de itens e valor total.
- Um botão permite enviar o resumo do pedido para a página de pedidos.
- Além disso, uma função em JavaScript envia o resumo do pedido para o WhatsApp da loja.

### PEDIDOS

- Essa aba exibe os resumos dos pedidos.
- Cada pedido aparece em um card com tamanho fixo, junto com o horário em que o pedido foi concluído.
- Todos os pedidos são armazenados no LocalStorage.

## Design Responsivo

O projeto foi desenvolvido seguindo a abordagem Mobile First, garantindo que o site seja completamente responsivo.
As funcionalidades foram inicialmente projetadas para dispositivos móveis e posteriormente adaptadas para desktop.

