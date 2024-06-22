document.addEventListener("DOMContentLoaded", () => {
  
  
  // Fetch user data and display user cards
  fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(users => {
      const limitedUsers = users.slice(0, 5); // Limit to first 5 users
      displayUserCards(limitedUsers);
      addEventListeners(limitedUsers); 
    })

    .catch(error => console.error("Error fetching user data:", error));

});

const trainerImages = {
  "Leanne Graham": "imgs/leanne.jpeg",
  "Ervin Howell": "imgs/ervin.jpeg",
  "Clementine Bauch": "imgs/clementine.jpeg",
  "Patricia Lebsack": "imgs/patricia.jpeg",
  "Chelsey Dietrich": "imgs/chelsey.jpeg"
};

function displayUserCards(users) {
  //grabbed container element and cleared it
  const container = document.getElementById("service-card-container");
  container.innerHTML = ""; 

  //used forEach() method to loop through each user 
  users.forEach(user => {
    //created div element and added a class of single-card
    const card = document.createElement("div");
    card.classList.add("single-card"); // add class of single-card for html and css

    //create a variable linking the img to the correct person
    const imageUrl = trainerImages[user.name] || "https://via.placeholder.com/150"; 

    //added elements inside of the card element to create the front and back of card
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
    card.querySelector('.service-card').addEventListener("click", function() {
      card.querySelector('.service-card').classList.toggle("flipped");
    });

    // Event listeners for highlighting the card-front
    card.querySelector('.card-front').addEventListener("mouseover", function() {
      card.querySelector('.card-front').classList.add("highlight");
    });

    card.querySelector('.card-front').addEventListener("mouseout", function() {
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
