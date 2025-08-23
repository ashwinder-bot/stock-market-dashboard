from app.models import SessionLocal, Base, engine, Company

Base.metadata.create_all(bind=engine)

db = SessionLocal()

companies = [
    {"name": "Apple", "symbol": "AAPL"},
    {"name": "Microsoft", "symbol": "MSFT"},
    {"name": "Tesla", "symbol": "TSLA"},
    {"name": "Amazon", "symbol": "AMZN"},
    {"name": "Google", "symbol": "GOOGL"}
]

for c in companies:
    exists = db.query(Company).filter(Company.name == c["name"]).first()
    if not exists:
        db.add(Company(name=c["name"], symbol=c["symbol"]))

db.commit()
db.close()
print("Seed data added successfully!")
