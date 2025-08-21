document.addEventListener("DOMContentLoaded", () => {
  // Fetch activities and render cards with participants
  fetch("/activities")
    .then((res) => res.json())
    .then((data) => {
      const activitiesList = document.getElementById("activities-list");
      activitiesList.innerHTML = "";
      Object.entries(data).forEach(([name, info]) => {
        const card = document.createElement("div");
        card.className = "activity-card";
        card.innerHTML = `
          <h4>${name}</h4>
          <p>${info.description}</p>
          <p><strong>Schedule:</strong> ${info.schedule}</p>
          <p><strong>Max Participants:</strong> ${info.max_participants}</p>
          <div class="participants-section">
            <strong>Participants:</strong>
            <ul class="participants-list">
              ${info.participants.length > 0
                ? info.participants.map((email) => `<li>${email}</li>`).join("")
                : "<li class='no-participants'>No participants yet.</li>"}
            </ul>
          </div>
        `;
        activitiesList.appendChild(card);
      });

      // Populate activity select options
      const activitySelect = document.getElementById("activity");
      activitySelect.innerHTML = '<option value="">-- Select an activity --</option>';
      Object.keys(data).forEach((name) => {
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        activitySelect.appendChild(option);
      });
    });
});
      activitiesList.innerHTML = "<p>Failed to load activities. Please try again later.</p>";
      console.error("Error fetching activities:", error);
    }
  }

  // Handle form submission
  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const activity = document.getElementById("activity").value;

    try {
      const response = await fetch(
        `/activities/${encodeURIComponent(activity)}/signup?email=${encodeURIComponent(email)}`,
        {
          method: "POST",
        }
      );

      const result = await response.json();

      if (response.ok) {
        messageDiv.textContent = result.message;
        messageDiv.className = "success";
        signupForm.reset();
      } else {
        messageDiv.textContent = result.detail || "An error occurred";
        messageDiv.className = "error";
      }

      messageDiv.classList.remove("hidden");

      // Hide message after 5 seconds
      setTimeout(() => {
        messageDiv.classList.add("hidden");
      }, 5000);
    } catch (error) {
      messageDiv.textContent = "Failed to sign up. Please try again.";
      messageDiv.className = "error";
      messageDiv.classList.remove("hidden");
      console.error("Error signing up:", error);
    }
  });

  // Initialize app
  fetchActivities();
});
