from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware   # 👈 add this
from app.database import Base, engine
from app.routes import stocks, companies


# Create tables if not exist
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Stock Market Dashboard")

# ✅ Enable CORS
origins = [
    "http://localhost:3000",   # frontend react
    "http://127.0.0.1:3000",
    "https://stock-market-dashboard-tan.vercel.app", #optional
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,          # frontend allowed
    allow_credentials=True,
    allow_methods=["*"],            # allow all methods (GET, POST etc.)
    allow_headers=["*"],            # allow all headers
)

# Attach routers
app.include_router(stocks.router, prefix="/stocks", tags=["stocks"])
app.include_router(companies.router, prefix="/companies", tags=["companies"])
