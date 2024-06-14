document.addEventListener("DOMContentLoaded", () => {
  // Fetch user data and display user cards
  fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network response was not ok ${response.statusText}`);
      }
      return response.json();
    })
    .then(users => {
      const limitedUsers = users.slice(0, 5); // Limit to first 5 users
      displayUserCards(limitedUsers);
      addEventListeners(limitedUsers); // Pass users to add event listeners
    })
    .catch(error => console.error("Error fetching user data:", error));

  // Dark/Light Mode Toggle
  const modeToggle = document.getElementById('mode-toggle');
  modeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
    document.querySelector('header').classList.toggle('dark-mode');
    document.querySelector('.services-nav').classList.toggle('dark-mode');
    document.querySelector('.recommended').classList.toggle('dark-mode');
    document.querySelector('.search-text input').classList.toggle('dark-mode');
  });
});

const trainerImages = {
  "Leanne Graham": "imgs/leanne.jpeg",
  "Ervin Howell": "imgs/ervin.jpeg",
  "Clementine Bauch": "imgs/clementine.jpeg",
  "Patricia Lebsack": "imgs/patricia.jpeg",
  "Chelsey Dietrich": "imgs/chelsey.jpeg"
};

function displayUserCards(users) {
  const container = document.getElementById("service-card-container");
  container.innerHTML = ""; // Clear previous content

  users.forEach(user => {
    const card = document.createElement("div");
    card.classList.add("single-card");

    // Use the trainer's image if available, otherwise use a placeholder
    const imageUrl = trainerImages[user.name] || "https://via.placeholder.com/150";

    card.innerHTML = `
      <div class="service-card">
        <div class="card-front">
          <img src="${imageUrl}" alt="${user.name}">
          <h3>${user.name}</h3>
          <p>5.0 - 504 reviews</p>
        </div>
        <div class="card-back">
          <h3>${user.name}</h3>
          <p>Username: ${user.username}</p>
          <p>Email: ${user.email}</p>
          <p>Phone: ${user.phone}</p>
          <p>Company: ${user.company.name}</p>
        </div>
      </div>
    `;

    // Event listener for flipping the card
    card.querySelector('.service-card').addEventListener("click", () => {
      card.querySelector('.service-card').classList.toggle("flipped");
    });

    // Event listeners for highlighting the card-front
    card.querySelector('.card-front').addEventListener("mouseover", () => {
      card.querySelector('.card-front').classList.add("highlight");
    });

    card.querySelector('.card-front').addEventListener("mouseout", () => {
      card.querySelector('.card-front').classList.remove("highlight");
    });

    container.appendChild(card);
  });
}

function addEventListeners(users) {
  const searchInput = document.querySelector(".search-section input");
  searchInput.addEventListener("input", (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredUsers = users.filter(user => 
      user.name.toLowerCase().includes(searchTerm)
    );
    displayUserCards(filteredUsers);
  });

  
}
