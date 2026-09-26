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
  if (event.key === '+' || event.key === '=' || event.key === 'ArrowUp') {
    count++;
    updateDisplay();
  } else if (event.key === '-' || event.key === 'ArrowDown') {
    count--;
    updateDisplay();
  } else if (event.key.toLowerCase() === 'r' || event.key === '0') {
    count = 0;
    updateDisplay();
  }
});

// Theme Management
const themeToggleBtn = document.getElementById('theme-toggle');

function getInitialTheme() {
  try {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
  } catch (error) {
    // localStorage may be unavailable or throw in restricted environments
  }
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  if (themeToggleBtn) {
    themeToggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
    themeToggleBtn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    themeToggleBtn.setAttribute('title', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
  }
}

let currentTheme = getInitialTheme();
applyTheme(currentTheme);

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    try {
      localStorage.setItem('theme', currentTheme);
    } catch (error) {
      // Ignore write errors when storage is restricted
    }
    applyTheme(currentTheme);
  });
}

if (window.matchMedia) {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const handleMediaChange = (event) => {
    let savedTheme = null;
    try {
      savedTheme = localStorage.getItem('theme');
    } catch (error) {
      // Ignore read errors when storage is restricted
    }
    if (!savedTheme) {
      currentTheme = event.matches ? 'dark' : 'light';
      applyTheme(currentTheme);
    }
  };

  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener('change', handleMediaChange);
  } else if (mediaQuery.addListener) {
    mediaQuery.addListener(handleMediaChange);
  }
}

// Initialize on load
updateDisplay();
