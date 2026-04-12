# 🌍 CarbonWise – AI-Powered Carbon Footprint Tracker

> A smart sustainability platform that helps users track, reduce, and gamify their carbon footprint using AI insights.

---

## 🚀 Live Demo
- 🌐 Live App: [https://greenlytics.netlify.app/]  

---

## 📸 Screenshots

### 🏠 Landing Page
<p align="center">
  <img src="https://github.com/user-attachments/assets/b7048ada-a3a2-4754-93d2-789defbf9654" width="600"/>
</p>

---

### 📊 Dashboard
<p align="center">
  <img src="https://github.com/user-attachments/assets/5fd8a70f-be2a-4583-9973-07fa15a1347e" width="600"/>
</p>

---

### 🤖 AI Sustainability Coach
<p align="center">
  <img src="https://github.com/user-attachments/assets/6a018aa3-e8be-4b43-9bdd-9baa5caf70e8" width="600"/>
</p>

---

### 🧾 Waste Classification / AI Feature
<p align="center">
  <img src="https://github.com/user-attachments/assets/bd468d96-cd69-4e91-b5ac-4f7a69fa1659" width="600"/>
</p>

---

### 🏆 Gamification & Leaderboard
<p align="center">
  <img src="https://github.com/user-attachments/assets/637d8b6d-c259-478d-95ab-5e9f85a6d1b7" width="600"/>
</p>
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
cd eco-pluse

2. Backend setup
cd ecopluse_backend
npm install
npm run dev

3. Frontend setup
cd ecopluse_frontend
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
AI: Use of Gemini for predicting waste classifier and generating carbon footprint
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
