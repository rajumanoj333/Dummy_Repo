let count = 0;

const counterDisplay = document.getElementById('counter-value');
const btnIncrement = document.getElementById('btn-increment');
const btnDecrement = document.getElementById('btn-decrement');
const btnReset = document.getElementById('btn-reset');

function updateDisplay() {
  counterDisplay.textContent = count;
  if (count > 0) {
    counterDisplay.style.color = 'var(--primary)';
  } else if (count < 0) {
    counterDisplay.style.color = 'var(--danger)';
  } else {
    counterDisplay.style.color = 'var(--text-muted)';
  }
}

btnIncrement.addEventListener('click', () => {
  count++;
  updateDisplay();
});

btnDecrement.addEventListener('click', () => {
  count--;
  updateDisplay();
});

btnReset.addEventListener('click', () => {
  count = 0;
  updateDisplay();
});

// Keyboard Shortcuts Support
window.addEventListener('keydown', (event) => {
  if (event.ctrlKey || event.metaKey || event.altKey) {
    return;
  }

  if (event.key === '+' || event.key === '=' || event.key === 'ArrowUp') {
    event.preventDefault();
    count++;
    updateDisplay();
  } else if (event.key === '-' || event.key === 'ArrowDown') {
    event.preventDefault();
    count--;
    updateDisplay();
  } else if (event.key.toLowerCase() === 'r' || event.key === '0') {
    count = 0;
    updateDisplay();
  }
});

// Initialize on load
updateDisplay();
