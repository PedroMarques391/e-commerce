// Função para preenher o endereço automaticamente na aba de checkout
export function getCep() {
  const mensagemError = document.getElementById('erro');
  const cep = document.getElementById('cep').value;
  if (cep !== '') {
    const url = `https://brasilapi.com.br/api/cep/v1/${cep}`;
    const request = new XMLHttpRequest();
    request.open('GET', url);
    request.send();

    request.onload = () => {
      if (request.status === 200) {
        mensagemError.innerHTML = '';
        const endereco = JSON.parse(request.response);
        document.getElementById('rua').value = endereco.street;
        document.getElementById('bairro').value = endereco.neighborhood;
        document.getElementById('cidade').value = endereco.city;
        document.getElementById('uf').value = endereco.state;
      } else if (request.status === 404) {
        mensagemError.innerHTML = '';
        mensagemError.innerHTML += `CEP inválido. Erro ${request.status}.`;
      } else {
        (
          mensagemError.innerHTML = '',
          mensagemError.innerHTML += `Erro ao fazer Requisição. Code ${request.status}.`
        );
      }
    };
  }
}

window.onload = () => {
  const Cep = document.getElementById('cep');
  Cep.addEventListener('blur', getCep);
};
