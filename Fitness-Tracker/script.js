
function showError(message) {
    const errorDiv = document.getElementById("error-message");
    errorDiv.textContent = message;
    errorDiv.style.display = "block";
    setTimeout(() => {
        errorDiv.style.display = "none";
    }, 5000);
}

// Function to toggle loading state
function toggleLoading(show) {
    const loading = document.getElementById("loading");
    const submitButton = document.querySelector("button");
    loading.style.display = show ? "block" : "none";
    submitButton.disabled = show;
}

// Function to close modal
function closeModal() {
    document.getElementById("modal").style.display = "none";
}

// Function to check server health
async function checkServerHealth() {
    try {
        const response = await fetch('http://localhost:5001/health');
        const data = await response.json();
        return data.status === 'ok' && data.mongodb;
    } catch (error) {
        return false;
    }
}

// Function to fetch data and display in modal
async function fetchData() {
    const name = document.getElementById("name").value.trim();
    const day = document.getElementById("day").value;
    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("modal-title");
    const modalBody = document.getElementById("modal-body");

    // Input validation
    if (!name) {
        showError("Please enter your name");
        return;
    }
    if (!day) {
        showError("Please select a day");
        return;
    }

    toggleLoading(true);

    try {
        // Check server health first
        const isServerHealthy = await checkServerHealth();
        if (!isServerHealthy) {
            throw new Error("Server or database is not available");
        }

        const response = await fetch(`http://localhost:5001/fitness-data?name=${encodeURIComponent(name)}&day=${encodeURIComponent(day)}`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch fitness data');
        }

        modalTitle.textContent = `${name}'s Fitness Data (${day})`;
        modalBody.innerHTML = `
          <p><strong>Steps:</strong> ${data.steps || 'N/A'}</p>
          <p><strong>Calories Burned:</strong> ${data.caloriesBurned || 'N/A'}</p>
          <p><strong>Heart Rate:</strong> ${data.heartRate || 'N/A'} bpm</p>
          <p><strong>Active Minutes:</strong> ${data.activeMinutes || 'N/A'}</p>
          ${data.sleep ? `
          <h3>Sleep</h3>
          <p><strong>Total Sleep:</strong> ${data.sleep.totalSleep || 'N/A'}</p>
          <p><strong>Deep Sleep:</strong> ${data.sleep.deepSleep || 'N/A'}</p>
          <p><strong>REM Sleep:</strong> ${data.sleep.remSleep || 'N/A'}</p>
          <p><strong>Sleep Score:</strong> ${data.sleep.sleepScore || 'N/A'}</p>
          ` : ''}
          ${data.workout ? `
          <h3>Workout</h3>
          <p><strong>Type:</strong> ${data.workout.type || 'N/A'}</p>
          <p><strong>Duration:</strong> ${data.workout.duration || 'N/A'}</p>
          <p><strong>Distance:</strong> ${data.workout.distance || 'N/A'}</p>
          <p><strong>Calories Burned:</strong> ${data.workout.caloriesBurned || 'N/A'}</p>
          ` : ''}
          ${data.health ? `
          <h3>Health</h3>
          <p><strong>BMI:</strong> ${data.health.bmi || 'N/A'}</p>
          <p><strong>Body Fat:</strong> ${data.health.bodyFat || 'N/A'}%</p>
          <p><strong>Hydration:</strong> ${data.health.hydration || 'N/A'}%</p>
          ` : ''}
        `;
        modal.style.display = "flex";
    } catch (error) {
        showError(error.message);
    } finally {
        toggleLoading(false);
    }
}

// Close modal when clicking outside
window.onclick = function (event) {
    const modal = document.getElementById("modal");
    if (event.target === modal) {
        closeModal();
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});
