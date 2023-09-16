let count = 1;
document.getElementById('radio1').checked = true;

setInterval(() => {
  proxima();
}, 3000);

function proxima() {
  count++;
  if (count > 6) {
    count = 1;
  }
  document.getElementById(`radio${count}`).checked = true;
}
