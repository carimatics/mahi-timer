const timerDisplay = document.getElementById('timer-display');
const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const resetButton = document.getElementById('reset-button');
const characterImage = document.getElementById('character-image');
const characterMessage = document.getElementById('character-message');
const characterButtons = document.querySelectorAll('.character-button');

const messages = [
  'がんばって！',
  'その調子！',
  'あと少し！',
  'いい感じ！',
  'ファイト！'
];

let elapsedSeconds = 0;
let timerId = null;
let animationId = null;
let messageId = null;
let currentCharacter = 'cat';
let currentFrame = 1;

function formatTime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
}

function updateTimer() {
  elapsedSeconds++;
  timerDisplay.textContent = formatTime(elapsedSeconds);
}

function updateCharacterFrame() {
  currentFrame = currentFrame === 1 ? 2 : 1;
  characterImage.src = 'images/' + currentCharacter + '-' + currentFrame + '.svg';
}

function updateMessage() {
  const index = Math.floor(Math.random() * messages.length);
  characterMessage.textContent = messages[index];
}

function selectCharacter(character) {
  currentCharacter = character;
  currentFrame = 1;
  characterImage.src = 'images/' + currentCharacter + '-1.svg';

  characterButtons.forEach((btn) => {
    if (btn.dataset.character === character) {
      btn.classList.add('selected');
    } else {
      btn.classList.remove('selected');
    }
  });
}

function startTimer() {
  timerId = setInterval(updateTimer, 1000);
  animationId = setInterval(updateCharacterFrame, 500);
  messageId = setInterval(updateMessage, 3000);

  startButton.disabled = true;
  stopButton.disabled = false;
  updateMessage();
}

function stopTimer() {
  clearInterval(timerId);
  clearInterval(animationId);
  clearInterval(messageId);
  timerId = null;
  animationId = null;
  messageId = null;

  currentFrame = 1;
  characterImage.src = 'images/' + currentCharacter + '-1.svg';
  characterMessage.textContent = 'おつかれさま！';

  startButton.disabled = false;
  stopButton.disabled = true;
}

function resetTimer() {
  if (timerId !== null) {
    stopTimer();
  }
  elapsedSeconds = 0;
  timerDisplay.textContent = formatTime(0);
  characterMessage.textContent = 'ボタンを押して作業を始めよう！';
}

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);

characterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    selectCharacter(btn.dataset.character);
  });
});

selectCharacter('cat');
