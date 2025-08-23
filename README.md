# Stock Dashboard

A full-stack stock dashboard application with a React frontend and FastAPI backend, fully containerized using Docker, and using SQLite3 for data storage. The application fetches real-time stock data using the **Yahoo Finance API (`yfinance`)** through the backend.

---

## Features
- Real-time stock data visualization
- Fetches stock prices, historical data, and trends from Yahoo Finance
- Frontend built with React
- Backend APIs using FastAPI
- SQLite3 database for persistent storage
- Dockerized setup for easy deployment
- Easy integration and customization

---



## Project Structure
stock-dashboard/
├── backend/ # FastAPI backend code
│ ├── main.py
│ ├── database.py
│ ├── requirements.txt
│ └── Dockerfile
│
├── frontend/ # React frontend code
│ ├── package.json
│ ├── src/
│ └── Dockerfile
│
└── docker-compose.yml # Docker Compose setup for both frontend & backend


---

## Backend API Endpoints

The backend exposes endpoints that the frontend uses to fetch stock data:

| Endpoint            | Method | Description |
|--------------------|--------|-------------|
| `/`                 | GET    | Test endpoint, returns a welcome message |
| `/stocks/{symbol}`  | GET    | Fetch current stock data for a given symbol (e.g., `AAPL`) |
| `/history/{symbol}` | GET    | Fetch historical stock prices for the given symbol |

The backend uses the **`yfinance` Python library** to retrieve data from Yahoo Finance and return it in JSON format.

---

## Frontend

The React frontend consumes the backend API:

- Requests are made to `/stocks/{symbol}` to display current stock prices.
- Requests to `/history/{symbol}` fetch historical data for charts.
- Built with a responsive UI to visualize stocks in real-time.

**API base URL** is set in the frontend environment variables (e.g., `REACT_APP_API_URL=http://localhost:8000`).

---

## Database Setup

The backend uses **SQLite3**. The database file `database.db` is automatically created when the backend runs.

- Docker Compose mounts the database to persist data:

```yaml
volumes:
  - ./backend/database.db:/app/database.db

Running the Project

Clone the repository

git clone https://github.com/ashwinder-bot/stock-market-dashboard.git
cd stock-market-dashboard


Start Docker containers

docker compose up --build


Access the applications

Frontend: http://localhost:3000

Backend API: http://localhost:8000

⚠️ If using WSL2, replace localhost with your WSL2 IP if needed."# stock-market-dashboard" 
