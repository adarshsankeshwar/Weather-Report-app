# 🌤 Weather Report Application

## 📌 Overview
The Weather Report Application is a Java-based application that fetches real-time weather data for any city using a public Weather API.  
It demonstrates API integration, JSON parsing, exception handling, and clean object-oriented design in Java.

This project was built to strengthen backend development skills and understand how external APIs are integrated into Java applications.

---

## ✨ Key Features

- 🌍 Search weather by city name
- 🌡 Real-time temperature display (Celsius/Fahrenheit)
- 💧 Humidity information
- 🌬 Wind speed details
- ☁ Weather condition description
- 📅 Displays date and time of report
- ❗ Graceful handling of invalid city names
- 🔄 Proper error handling for network failures
- 🔐 Secure API key usage
- 🧪 Modular and maintainable code structure

---

## 🛠 Technologies Used

- Java (Core Java)
- Object-Oriented Programming (OOP)
- REST API Integration
- HttpURLConnection
- JSON Parsing (org.json / Gson / Jackson)
- Exception Handling
- Git & GitHub
- Maven (if applicable)

---

## 🏗 Architecture / Design

The application follows a modular design:

- `Main.java` → Handles user interaction
- `WeatherService.java` → Handles API calls
- `WeatherResponse.java` → Data model for weather details
- `Utils.java` → Helper methods (optional)

The project follows:
- Separation of Concerns
- Clean Code principles
- Reusable method design

---

## 🔑 API Used

- OpenWeatherMap API  
  https://openweathermap.org/api

The API returns JSON responses that are parsed into Java objects.

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository
