// Get DOM elements
const yearsInput = document.getElementById('years');
const hoursPerWeekInput = document.getElementById('hoursPerWeek');
const weeksPerYearInput = document.getElementById('weeksPerYear');
const calculateWorkBtn = document.getElementById('calculateWorkBtn');
const workResultDiv = document.getElementById('workResult');
const totalWorkHoursSpan = document.getElementById('totalWorkHours');
const workDaysSpan = document.getElementById('workDays');
const workWeeksSpan = document.getElementById('workWeeks');
const workMonthsSpan = document.getElementById('workMonths');
const workTimestampSpan = document.getElementById('workTimestamp');

// Calculate work hours
function calculateWorkHours() {
  const years = parseFloat(yearsInput.value);
  const hoursPerWeek = parseFloat(hoursPerWeekInput.value);
  const weeksPerYear = parseFloat(weeksPerYearInput.value);

  // Validate inputs
  if (!years || years < 0) {
    alert('Please enter a valid number of years!');
    return;
  }

  if (!hoursPerWeek || hoursPerWeek < 0 || hoursPerWeek > 168) {
    alert('Please enter valid hours per week (0-168)!');
    return;
  }

  if (!weeksPerYear || weeksPerYear < 0 || weeksPerYear > 52) {
    alert('Please enter valid weeks per year (0-52)!');
    return;
  }

  // Calculate total work hours
  const totalHours = years * weeksPerYear * hoursPerWeek;

  // Calculate additional metrics
  const totalDays = (totalHours / 24).toFixed(1);
  const totalWeeks = (totalHours / 168).toFixed(1);
  const totalMonths = (totalHours / (24 * 30)).toFixed(1);

  // Get current time for timestamp
  const currentTime = new Date();

  // Display results with animation
  workResultDiv.classList.remove('hidden');

  // Animate the hours counter
  animateValue(totalWorkHoursSpan, 0, Math.floor(totalHours), 1500);

  // Update additional info
  workDaysSpan.textContent = parseFloat(totalDays).toLocaleString();
  workWeeksSpan.textContent = parseFloat(totalWeeks).toLocaleString();
  workMonthsSpan.textContent = parseFloat(totalMonths).toLocaleString();

  // Show when calculation was performed
  workTimestampSpan.textContent = currentTime.toLocaleString();
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
calculateWorkBtn.addEventListener('click', calculateWorkHours);

// Allow Enter key to trigger calculation
yearsInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') calculateWorkHours();
});

hoursPerWeekInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') calculateWorkHours();
});

weeksPerYearInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') calculateWorkHours();
});
