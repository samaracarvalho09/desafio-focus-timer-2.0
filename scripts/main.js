const firstTimer = document.getElementById('#first-timer');
const secondTimer = document.getElementById('#second-timer');

document.querySelectorAll('input[type="number"]').forEach(input => {
  input.addEventListener('input', function () {
    if (this.value.length > 2) {
      this.value = this.value.slice(0, 2); // Limita a dois dígitos
    }
  });
});






