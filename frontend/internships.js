async function fetchInternships() {
  try {
    const res = await fetch('http://localhost:3001/api/internships');
    const data = await res.json();

    const container = document.getElementById('internships-container');
    container.innerHTML = '';

    data.forEach(internship => {
      const card = document.createElement('div');
      card.className = 'card';

      card.innerHTML = `
        <h2>${internship.title}</h2>
        <p><strong>Author:</strong> ${internship.author}</p>
        <p><strong>Published:</strong> ${internship.datePublished}</p>
        <a href="${internship.url}" target="_blank">View Details</a>
      `;

      container.appendChild(card);
    });
  } catch (err) {
    console.error('Failed to load internships:', err);
  }
}

fetchInternships();
