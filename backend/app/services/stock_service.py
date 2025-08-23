from app.models import SessionLocal, Company, StockPrice
import yfinance as yf

def fetch_and_store_stock_by_name(company_name: str, days: int = 30):
    db = SessionLocal()
    company = db.query(Company).filter(Company.name.ilike(company_name)).first()
    if not company:
        db.close()
        return {"error": "Company not found"}

    symbol = company.symbol
    # Fetch only last 'days' from yfinance
    data = yf.download(symbol, period=f"{days}d", interval="1d")

    for date, row in data.iterrows():
        exists = db.query(StockPrice).filter(
            StockPrice.company_id == company.id,
            StockPrice.date == date.date()
        ).first()
        if exists:
            continue

        stock = StockPrice(
            company_id=company.id,
            date=date.date(),
            open=row["Open"],
            close=row["Close"],
            high=row["High"],
            low=row["Low"],
            volume=row["Volume"]
        )
        db.add(stock)

    db.commit()

    # Fetch last 'days' from SQLite
    stocks = db.query(StockPrice).filter(StockPrice.company_id == company.id)\
        .order_by(StockPrice.date.desc()).limit(days).all()
    db.close()

    response = []
    for s in reversed(stocks):  # reverse to show oldest first
        response.append({
            "date": str(s.date),
            "open": s.open,
            "close": s.close,
            "high": s.high,
            "low": s.low,
            "volume": s.volume
        })
    return response
