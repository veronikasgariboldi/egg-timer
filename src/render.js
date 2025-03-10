const { ipcRenderer } = require('electron');

document.addEventListener('DOMContentLoaded', function () {
  const startButton = document.getElementById('start-btn');

  startButton.addEventListener('click', function () {
    // Send a message to the main process to load selection.html
    ipcRenderer.send('navigate-to', 'selection.html');
  });
});

// Get references to all egg buttons
const softEggBtn = document.getElementById('soft-egg');
const hardEggBtn = document.getElementById('hard-egg');
const friedEggBtn = document.getElementById('fried-egg');
const scrambledEggBtn = document.getElementById('scrambled-egg');

// Function to handle egg selection
function handleEggSelection(eggType, minutes) {
  console.log(`Selected ${eggType} egg, timer set for ${minutes} minutes`);
  
  // Here you can implement your timer functionality
  // For example, you could navigate to a timer page, or show a timer overlay
  
  // Example: You could redirect to a timer page
  // window.location.href = `timer.html?type=${eggType}&minutes=${minutes}`;
  
  // Or you could trigger a function to start the timer directly
  // startTimer(minutes);
}

// Add click event listeners to each button
softEggBtn.addEventListener('click', () => {
  handleEggSelection('soft boiled', softEggBtn.getAttribute('data-time'));
});

hardEggBtn.addEventListener('click', () => {
  handleEggSelection('hard boiled', hardEggBtn.getAttribute('data-time'));
});

friedEggBtn.addEventListener('click', () => {
  handleEggSelection('fried', friedEggBtn.getAttribute('data-time'));
});

scrambledEggBtn.addEventListener('click', () => {
  handleEggSelection('scrambled', scrambledEggBtn.getAttribute('data-time'));
});