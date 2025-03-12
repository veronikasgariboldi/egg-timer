document.addEventListener('DOMContentLoaded', function () {
  const startButton = document.getElementById('start-btn');
  
  if (startButton) {
    document.getElementById('start-btn').addEventListener('click', () => {
      window.location.href = 'selection/selection.html';
  });
  }

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
    
    // Example: You could redirect to a timer page using IPC
    // window.electron.send('navigate-to', `timer.html?type=${eggType}&minutes=${minutes}`);
    
    // Or you could trigger a function to start the timer directly
    // startTimer(minutes);
  }

  // Add click event listeners to each button if they exist
  if (softEggBtn) {
    console.log("Soft egg button found!");

    softEggBtn.addEventListener('click', () => {
      console.log("Soft egg button clicked! Sending navigation request...");
      window.electron.send('navigate', '/eggs/softboiled.html'); 
    });
  }

  if (hardEggBtn) {
    document.getElementById('hard-egg').addEventListener('click', () => {
      window.location.href = path.join(__dirname, 'eggs', 'mediumboiled.html');
  });
  }

  if (friedEggBtn) {
    document.getElementById('fried-egg').addEventListener('click', () => {
      window.location.href = path.join(__dirname, 'eggs', 'hardboiled.html');
  });
  }

  if (scrambledEggBtn) {
    document.getElementById('scrambled-egg').addEventListener('click', () => {
      window.location.href = path.join(__dirname, 'eggs', 'extrahardboiled.html');
  });
  }
});

// Add this to your existing renderer.js
document.addEventListener('DOMContentLoaded', function() {
  // Get references to your custom window buttons
  const closeButton = document.querySelector('.close-icon');
  const minimizeButton = document.querySelector('.shrink-icon');
  
  if (closeButton) {
    closeButton.addEventListener('click', function() {
      window.electron.send('window-control', 'quit');
    });
  }
  
  if (minimizeButton) {
    minimizeButton.addEventListener('click', function() {
      window.electron.send('window-control', 'minimize');
    });
  }
});

document.addEventListener('DOMContentLoaded', function () {
  console.log("DOM fully loaded!"); // Check if script runs at all
  
  const softEggBtn = document.getElementById('soft-egg');

  if (softEggBtn) {
    console.log("Soft egg button found!"); // Check if button exists

    softEggBtn.addEventListener('click', () => {
      console.log("Soft egg button clicked!"); // Check if event fires
    });
  } else {
    console.log("Soft egg button NOT found!");
  }
});