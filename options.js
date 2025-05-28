// Elements
const delayInput = document.getElementById('delay');
const statusDiv = document.getElementById('status');
const form = document.getElementById('settings-form');

// Load saved delay on page load
browser.storage.sync.get({ clearDelay: 60 }).then((data) => {
  delayInput.value = data.clearDelay;
});

// Save delay when form is submitted
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const secs = parseInt(delayInput.value, 10);
  browser.storage.sync.set({ clearDelay: secs }).then(() => {
    statusDiv.textContent = 'Saved!';
    setTimeout(() => { statusDiv.textContent = ''; }, 1500);
  });
});