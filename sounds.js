export default function setupSounds() {
  const sounds = {
    forest: new Audio("./assets/sounds/forest.wav"),
    rain: new Audio("./assets/sounds/rain.wav"),
    coffee: new Audio("./assets/sounds/coffee.wav"),
    fireplace: new Audio("./assets/sounds/fireplace.wav")
  };

  const cards = document.querySelectorAll(".card");
  let currentSound = null;

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const soundName = card.dataset.sound;
      console.log(soundName);
      // chama a função para tocar o som
      toggleSound(soundName, card);
    });
  });

   function toggleSound(soundName, clickedCard) {
    const sound = sounds[soundName];
    if (!sound) return;

    if (currentSound && currentSound !== sound) {
      currentSound.pause();
      currentSound.currentTime = 0;
      removeActiveClass();
    }

    if (sound.paused) {
      sound.play();
      clickedCard.classList.add('active-card');
      currentSound = sound;
    } else {
      sound.pause();
      sound.currentTime = 0;
      clickedCard.classList.remove('active-card');
      currentSound = null;
    }
  }
  function removeActiveClass() {
    cards.forEach(card => card.classList.remove('active-card'));
  }

}
