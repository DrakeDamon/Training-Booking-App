document.addEventListener("DOMContentLoaded", () => {

  fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(users => {
    const limitedUsers = users.slice(0,5);
    const cardContainer = document.getElementById('service-card-container')
    limitedUsers.forEach(user => {

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
`
      cardContainer.appendChild(card);

      card.addEventListener('click', (event) => {
        console.log('card was clicked')
        card.querySelector('.service-card').classList.toggle("flipped");
      })

      
    })


  })
})
