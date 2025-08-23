@echo off
echo ===== Starting Stock Dashboard Setup =====

:: Go to backend
cd /d C:\Users\Neuro Nexus\stock-dashboard\backend

echo --- Seeding Database ---
python -m app.seed

echo --- Starting Backend Server ---
start cmd /k "python -m uvicorn app.main:app --reload"

:: Go to frontend
cd /d C:\Users\Neuro Nexus\stock-dashboard\frontend

:: Install dependencies if not installed
if not exist "node_modules" (
    echo --- Installing Frontend Dependencies ---
    npm install
    npm install axios chart.js react-chartjs-2
)

echo --- Starting Frontend ---
start cmd /k "npm start"

echo ===== Stock Dashboard Running! =====
