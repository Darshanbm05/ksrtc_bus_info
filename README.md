# KSRTC Bus Info

A full-stack web application built to simplify access to KSRTC unreserved bus schedules by transforming publicly available PDF timetable data into a searchable, user-friendly web interface.

This project aims to solve a real-world usability problem where bus schedule information is available only in static PDF formats on official portals.

---

## 🚀 Problem Statement

KSRTC unreserved bus schedules are published in PDF format, which makes:

- Searching by route difficult  
- Filtering time-consuming  
- Mobile usage inconvenient  
- Data updates non-interactive  

This project converts static schedule data into a dynamic and searchable web application.

---

## 🎯 Features

- 🔎 Search buses by route (From → To)
- 🚌 Search all buses from a specific bus stand
- ⏰ 24-hour time formatted schedule display
- 📍 Structured route details (via places, service number, bus type)
- 📝 Contribution system for requesting schedule updates
- 📱 Fully responsive (mobile + desktop optimized)
- ⚡ Fast client-side experience using Vite

---

## 🛠 Tech Stack

### Frontend
- React
- Vite
- React Router
- Custom Responsive CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Database
- MongoDB Atlas

### Deployment
- Backend hosted on Render
- Frontend hosted on Vercel

---

## 🏗 Architecture
Frontend (React)
↓
REST API (Express)
↓
MongoDB Atlas


- Frontend communicates with backend via REST APIs.
- Backend handles data querying, filtering, and validation.
- MongoDB stores structured schedule data.
- Contribution requests are stored in a separate collection for review.

---

## 📂 Project Structure


```bash
KSRTC-Bus-Info/
│
├── backend/
│ ├── models/
│ ├── controllers/
│ ├── routes/
│ ├── server.js
│ └── package.json
│
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ ├── components/
│ │ └── App.jsx
│ ├── index.css
│ └── package.json
│
└── README.md

```

---

## ⚙️ Installation & Setup

### Clone the repository:

```bash
git clone https://github.com/Darshanbm05/ksrtc_bus_info
cd KSRTC-Bus-Info
```

### Backend Setup:

```bash
cd backend
npm install
```

### Create a .env file inside backend and add:

```bash
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

### Run backend:

```bash
npm run dev
```

### Frontend Setup:

```bash
cd frontend
npm install
```

### Create a .env file inside frontend and add:

```bash
VITE_API_URL=http://localhost:5000
```

### Run frontend:

```bash
npm run dev
```


## 🗄 Data Handling

Schedule data is extracted from publicly available PDF timetables.

Data is cleaned and normalized before insertion.

Time values are converted to proper HH:MM 24-hour format.

Route names are standardized using uppercase normalization.

Bus stand-based search structure is implemented for accurate filtering.


## 📝 Contribution System

Users can:

- Request addition of missing schedules
- Suggest updates for incorrect data

Requests are stored in a separate collection and can be reviewed before approval.


## ⚠ Disclaimer

This is an independent project developed for educational and practical purposes.

It is not affiliated with or officially associated with KSRTC or the Government of Karnataka.

Schedule data is sourced from publicly available timetable PDFs. Users are advised to verify timings from official sources when necessary.