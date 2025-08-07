fetch('http://localhost:5000/server')
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById('hackathon-list');
    data.forEach(item => {
      const card = document.createElement('div');
      card.className = 'card';

      const title = encodeURIComponent(item.title);
      const details = encodeURIComponent(`Hosted by: ${item.host}\nThemes: ${item.themes}`);
      const location = encodeURIComponent(item.location);

      const [startDate, endDate] = calculateDatesFromTimeLeft(item.time_left);

      const calendarLink = `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}&sf=true&output=xml`;

      card.innerHTML = `
        <h2>${item.title}</h2>
        <p><strong>Host:</strong> ${item.host}</p>
        <p><strong>Location:</strong> ${item.location}</p>
        <p><strong>Time Left:</strong> ${item.time_left}</p>
        <p><strong>Themes:</strong> ${item.themes}</p>
        <a href="${item.url}" target="_blank">View Details</a><br/>
        <a href="${calendarLink}" target="_blank" class="calendar-btn">📅 Add to Google Calendar</a>
      `;
      list.appendChild(card);
    });
  });

// 🔁 Calculate start and end date based on time_left string
function calculateDatesFromTimeLeft(timeLeftStr) {
  const now = new Date();
  let daysToAdd = 1; // Default to 1 day

  if (timeLeftStr) {
    const lower = timeLeftStr.toLowerCase();
    const match = lower.match(/(\d+)\s*(day|week|month)/);

    if (match) {
      const number = parseInt(match[1]);
      const unit = match[2];

      if (unit === 'day') daysToAdd = number;
      if (unit === 'week') daysToAdd = number * 7;
      if (unit === 'month') daysToAdd = number * 30;
    }
  }

  const end = new Date(now);
  end.setDate(now.getDate() + daysToAdd);

  return [formatDate(now), formatDate(end)];
}

// 🔁 Format date as YYYYMMDDT090000Z
function formatDate(dateObj) {
  const year = dateObj.getUTCFullYear();
  const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getUTCDate()).padStart(2, '0');
  return `${year}${month}${day}T090000Z`;
}
