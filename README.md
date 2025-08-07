
# EventNexus - Hackathons & Internships Aggregator

🚀 A centralized platform that aggregates tech events like **hackathons**, **internships**, and **competitions** using real-time web scraping. Built for students and professionals to easily discover, filter, and manage events, complete with reminders and calendar sync.  

---

## 🎯 Scope

i. 🤖 Automate the aggregation of **hackathons** and **internships** from multiple platforms using Puppeteer.

ii. 🗃️ Store and manage data in a structured **MySQL database** for reliable access and querying.

iii. 🧑‍💻 Provide an interactive frontend for users to **browse, filter**, and view **event details**.

iv. 🔔 Allow users to **sync events to calendars** and set **reminders** for deadlines.

v. 📊 Ensure the platform stays updated with **real-time scraping** and **periodic refreshes**.

vi. 🧩 Support future expansion for additional event types like **competitions**, **conferences**, etc.

---

## 🛠️ Tech Stack

### Frontend
- **HTML, CSS, JavaScript** (Vanilla)

### Backend
- **Node.js**, **Express.js**

### Web Scraping
- **Puppeteer** (Headless browser automation)

### Database
- **MySQL**

---

## ✨ Features

### 👤 User-Side
- Browse live hackathon and internship listings
- Filter by:
  - Event type (hackathon/internship)
  - Tags / domains (AI, ML, Web Dev, etc.)
  - Location / Remote
- View:
  - Title, description, deadline, eligibility
  - Apply links and source
- Add events to personal calendar (Google Calendar sync)
- Set deadline reminders

### 🔐 Admin-Side (Planned / Optional)
- Trigger manual scraping
- View data logs
- Manage blacklisted URLs or sources
- Monitor event fetch history

---

## 📋 Requirements

Ensure the following are installed:

- [Node.js](https://nodejs.org/en/download/)
- [MySQL](https://www.mysql.com/downloads/)
- [Git](https://git-scm.com/downloads)
- Any browser (for testing the frontend)

---

## ⚙️ Setup & Installation

1. **Clone the repo**  
   ```
   git clone https://github.com/your-username/EventNexus.git
   cd EventNexus
   ```

2. **Install dependencies**
   ```
   npm install
   ```

3. **Configure MySQL Database**
   - Create a database named: `eventnexus`
   - Update `database.js` with your credentials:
     ```js
     const pool = mysql.createPool({
       host: 'localhost',
       user: 'root',
       password: 'yourpassword',
       database: 'eventnexus'
     });
     ```

4. **Run Scraper**
   ```
   node scraper/hackathons.js
   node scraper/internships.js
   ```

5. **Start the Server**
   ```
   node server.js
   ```

6. **Open Frontend**
   - Open `frontend/hackathons.html` or `frontend/internships.html` in your browser.

---

## Web pages


1. Main Page
   ![Dashboard Screenshot](./images/dashboard.png)

## ⚠️ Known Issues

- Puppeteer may fail if Chromium download fails during install – try:
  ```
  npm install puppeteer --force
  ```

- Some event websites may block scraping – retry with different headers or delays.

---

## 🧪 Usage

- Browse aggregated events from platforms like Devfolio, Unstop, NoticeBard, etc.
- Click on the event to view full details and apply.
- Use the calendar button to sync the event with your personal calendar.
