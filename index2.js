document.addEventListener("DOMContentLoaded", () => {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => {
      const limitedUsers = users.slice(0, 5);
      const cardContainer = document.getElementById('service-card-container');

      const createCard = function(user) {
        const card = document.createElement("div");
        card.classList.add("single-card"); // add class of single-card for html and css

        card.innerHTML = `
          <div class="service-card">
            <div class="card-front">
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

        card.addEventListener('click', () => {
          console.log('card was clicked');
          card.querySelector('.service-card').classList.toggle("flipped");
        });

        card.addEventListener('mouseover', () => {
          card.querySelector('.card-front').classList.add("highlight");
        })

        card.addEventListener('mouseout', () => {
          card.querySelector('.card-front').classList.remove("highlight");
        })

        return card;

      };

      const renderCards = (userList) => {
        cardContainer.innerHTML = ''; // Clear existing cards
        userList.forEach(user => {
          const card = createCard(user);
          cardContainer.appendChild(card);
        });
      };

      // Initially display limited users
      renderCards(limitedUsers);

      const searchInput = document.querySelector("input");
      searchInput.addEventListener("input", (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const filteredUsers = users.filter(user => 
          user.name.toLowerCase().includes(searchTerm)
        );
        // Display the filtered users
        renderCards(filteredUsers);
      });
    })
    .catch(error => console.error('Error fetching data:', error));

   
});
