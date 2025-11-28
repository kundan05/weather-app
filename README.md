# 🌦️ Premium Weather App
<img width="1200" height="838" alt="image" src="https://github.com/user-attachments/assets/895fb686-7687-47e3-bbfb-ea533522362f" />


A modern, responsive, and feature-rich weather application built with **Next.js 14**, **Tailwind CSS**, and **Shadcn UI**. 



## ✨ Features

- **📍 Geolocation Support**: Automatically detects your location to show local weather on startup.
- **🔍 Global Search**: Search for any city worldwide with real-time data fetching.
- **⚙️ Dynamic Settings**:
  - Toggle between **Metric (°C, m/s)** and **Imperial (°F, mph)** units.
  - Updates are reflected instantly across the entire dashboard.
- **🎨 Premium UI/UX**:
  - **Glassmorphism** design with dynamic shader backgrounds.
  - **Skeleton Loaders** for a smooth data fetching experience.
  - **Responsive Layout** optimized for mobile, tablet, and desktop.
  - **Dark/Light Mode** support (System default).
- **📊 Detailed Metrics**:
  - Current weather conditions (Temp, Feels like, Humidity, Wind).
  - **Hourly Forecast** scrollable strip.
  - **7-Day Daily Forecast**.
  - Advanced details: Visibility, Pressure, Sunrise/Sunset.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [Shadcn UI](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data**: [OpenWeatherMap API](https://openweathermap.org/api)
- **Language**: TypeScript

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites

- Node.js 18+ installed.
- An API key from [OpenWeatherMap](https://openweathermap.org/).

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/weather-app.git
    cd weather-app
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**:
    The project uses a configuration file for the API key.
    *Note: In a production environment, use `.env.local`.*
    
    Open `lib/api-config.ts` and ensure your API key is set (or use the provided default for testing).

4.  **Run the development server**:
    ```bash
    npm run dev
    ```

5.  **Open the app**:
    Visit [http://localhost:3000](http://localhost:3000) in your browser.


