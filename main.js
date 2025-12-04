// Get DOM elements
const birthdateInput = document.getElementById('birthdate');
const birthtimeInput = document.getElementById('birthtime');
const calculateBtn = document.getElementById('calculateBtn');
const resultDiv = document.getElementById('result');
const hoursValueSpan = document.getElementById('hoursValue');
const daysSpan = document.getElementById('days');
const remainingHoursSpan = document.getElementById('remainingHours');
const timestampSpan = document.getElementById('timestamp');

// Calculate hours alive
function calculateHoursAlive() {
  const birthdate = birthdateInput.value;
  const birthtime = birthtimeInput.value;

  // Validate inputs
  if (!birthdate || !birthtime) {
    alert('Please enter both your date and time of birth!');
    return;
  }

  // Combine date and time into a single datetime string
  const birthDateTime = new Date(`${birthdate}T${birthtime}`);

  // Check if the date is valid
  if (isNaN(birthDateTime.getTime())) {
    alert('Please enter a valid date and time!');
    return;
  }

  // Get current system time for accurate calculation
  const currentTime = new Date();

  // Check if birth date is in the future
  if (birthDateTime > currentTime) {
    alert('Birth date cannot be in the future!');
    return;
  }

  // Calculate the difference in milliseconds
  const diffInMilliseconds = currentTime - birthDateTime;

  // Convert to hours
  const hoursAlive = Math.floor(diffInMilliseconds / (1000 * 60 * 60));

  // Calculate days and remaining hours for additional info
  const days = Math.floor(hoursAlive / 24);
  const remainingHours = hoursAlive % 24;

  // Display results with animation
  resultDiv.classList.remove('hidden');

  // Animate the hours counter
  animateValue(hoursValueSpan, 0, hoursAlive, 1500);

  // Update additional info
  daysSpan.textContent = days.toLocaleString();
  remainingHoursSpan.textContent = remainingHours;

  // Show when calculation was performed
  timestampSpan.textContent = currentTime.toLocaleString();
}

// Animate number counting up
function animateValue(element, start, end, duration) {
  const range = end - start;
  const increment = range / (duration / 16); // 60fps
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= end) {
      element.textContent = end.toLocaleString();
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current).toLocaleString();
    }
  }, 16);
}

// Add event listener to calculate button
calculateBtn.addEventListener('click', calculateHoursAlive);

// Allow Enter key to trigger calculation
birthdateInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') calculateHoursAlive();
});

birthtimeInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') calculateHoursAlive();
});
