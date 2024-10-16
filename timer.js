export default function setupTimer() {
  let timer;
  let isRunning = false;
  let remainingTime = 0;

  const minutesInput = document.querySelector('.minutes');
  const secondsInput = document.querySelector('.seconds');
  const playButton = document.getElementById('btn-play');
  const pauseButton = document.getElementById('btn-pause');
  const stopButton = document.getElementById('btn-stop');
  const plusButton = document.getElementById('btn-plus');
  const minusButton = document.getElementById('btn-minus');

  const initialMinutes = 25;

  function validateInput(input) {
    let value = parseInt(input.value);
    if (isNaN(value) || value < 0) {
      value = 0;
    } else if (value > 59) {
      value = 59;
    }
    input.value = value.toString().padStart(2, '0');
    return value;
  }

  function updateDisplay() {
    let minutes = Math.floor(remainingTime / 60);
    let seconds = remainingTime % 60;
    minutesInput.value = String(minutes).padStart(2, '0');
    secondsInput.value = String(seconds).padStart(2, '0');
  }

  function togglePlayPauseButtons() {
    playButton.style.display = isRunning ? 'none' : 'inline-block';
    pauseButton.style.display = isRunning ? 'inline-block' : 'none';
  }

  function startTimer() {
    if (!isRunning) {
      isRunning = true;
      remainingTime = validateInput(minutesInput) * 60 + validateInput(secondsInput);
      
      timer = setInterval(() => {
        if (remainingTime > 0) {
          remainingTime--;
          updateDisplay();
        } else {
          clearInterval(timer);
          isRunning = false;
          togglePlayPauseButtons();
        }
      }, 1000);
      togglePlayPauseButtons();
    }
  }

  function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
    togglePlayPauseButtons();
  }

  function stopTimer() {
    clearInterval(timer);
    isRunning = false;
    remainingTime = initialMinutes * 60;
    updateDisplay();
    togglePlayPauseButtons();
  }

  function addFiveMinutes() {
    remainingTime = Math.min(remainingTime + 300, 3540); // 3540 segundos = 59 minutos
    updateDisplay();
  }

  function subtractFiveMinutes() {
    remainingTime = Math.max(remainingTime - 300, 0);
    updateDisplay();
  }

  minutesInput.addEventListener('input', () => {
    if (!isRunning) {
      remainingTime = validateInput(minutesInput) * 60 + validateInput(secondsInput);
    }
  });

  secondsInput.addEventListener('input', () => {
    if (!isRunning) {
      remainingTime = validateInput(minutesInput) * 60 + validateInput(secondsInput);
    }
  });

  playButton.addEventListener('click', startTimer);
  pauseButton.addEventListener('click', pauseTimer);
  stopButton.addEventListener('click', stopTimer);
  plusButton.addEventListener('click', addFiveMinutes);
  minusButton.addEventListener('click', subtractFiveMinutes);

  // Inicializa o display com os valores padrão
  remainingTime = initialMinutes * 60;
  updateDisplay();
}
