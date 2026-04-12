# 🌍 CarbonWise – AI-Powered Carbon Footprint Tracker

> A smart sustainability platform that helps users track, reduce, and gamify their carbon footprint using AI insights.

---

## 🚀 Live Demo
- 🌐 Live App: [ https://greenlytics.netlify.app/]  

---

## 📸 Screenshots
<!-- Add images after building -->
![Dashboard](./screenshots/dashboard.png)
![Analytics](./screenshots/analytics.png)
![AI](./screenshots/ai.png)
![Gamification](./screenshots/gamification.png)

---

## 💡 Problem Statement
Climate change is accelerating, but individuals lack simple, engaging tools to understand and reduce their carbon footprint.

---

## 🎯 Solution
CarbonWise provides:
- 📊 Real-time carbon footprint tracking  
- 🤖 AI-powered sustainability suggestions  
- 🧾 Waste classification (AI-based)  
- 🏆 Gamified eco-friendly actions  
- 🌍 Community impact dashboard  

---

## ✨ Features

### 🌍 Carbon Footprint Tracker
- Inputs:
  - 🚗 Transport habits (car, bike, public)
  - ⚡ Electricity usage
  - 🍽️ Food habits
- Outputs:
  - CO₂ emission estimate
  - Weekly/Monthly charts

### 🤖 AI Sustainability Coach
- Personalized tips:
  - “Switching to public transport can reduce your footprint by 18%”
  - “Reducing meat consumption saves CO₂”
- Built using rule-based logic + LLM API

### 🧾 Smart Waste Classifier (Optional)
- Upload image
- Output:
  - ♻️ Recyclable
  - 🌱 Organic
  - 🗑️ Landfill

### 🏆 Gamification
- Points for eco actions
- Leaderboard
- Badges:
  - 🌿 Green Starter
  - 🌎 Carbon Saver
  - 🔥 Eco Champion

### 📊 Community Dashboard
- Total CO₂ saved
- Weekly stats
- Leaderboard

---

## 🛠️ Tech Stack

Frontend:
- React.js
- Tailwind CSS / Material UI
- Chart.js / Recharts

Backend:
- Node.js
- Express.js

Database:
- MongoDB

AI:
- OpenAI API / Rule-based engine
- TensorFlow.js (optional)

---

## 📁 Project Structure

ecopluse/
├── ecopluse_backend/
│   ├── models/
│   ├──routes/
│   ├──server.js/
│   ├──package.json/
│   └── package-lock.json
│
├── ecopluse_frontend/
│   ├── src/
│          ├── Components/
│                        ├── files/
│   ├──public/
│            └── index.html
│
├──App.js/
├── package.json
└── README.md

---

## ⚙️ Installation

1. Clone repo
git clone https://github.com/Techy-BhaweshPandey/ecopluse.git
cd carbonwise

2. Backend setup
cd server
npm install
npm run dev

3. Frontend setup
cd client
npm install
npm start

---

## 🔐 Environment Variables

Create .env in server/

MONGO_URI=your_mongodb_uri  
OPENAI_API_KEY=your_api_key  
PORT=5000  

---

## 📊 Carbon Logic (Basic)

- Transport → emission factor based  
- Electricity → units × emission rate  
- Food → meat vs plant-based impact  

---

## 🎮 Gamification Logic

- +10 → Public transport  
- +15 → Reduce meat  
- +20 → Recycling  

Badges based on:
- Points
- Consistency
- CO₂ saved

---

## ⚡ Hackathon Plan (36 Hours)

Phase 1:
- Auth
- Input form
- Backend setup

Phase 2:
- Carbon logic
- Dashboard

Phase 3:
- AI suggestions
- Gamification

Phase 4:
- UI polish
- Demo prep

---

## 🚀 Deployment

Frontend:  Netlify  
Backend: Render   
Database: MongoDB Atlas  

Add links:
- Frontend: [link]
- Backend: [link]

---

## 🧠 Future Scope

- Mobile app  
- Location-based insights  
- Notifications  
- Social sharing  

---

## 👨‍💻 Team
Team name: SoloArchitect
- Bhawesh Pandey

---

## 📜 License
MIT License

---

## 💚 Quote
"Small actions, when multiplied by millions, can change the world."
