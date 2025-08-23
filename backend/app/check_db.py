import sqlite3

# Connect to database
conn = sqlite3.connect("stocks.db")
cursor = conn.cursor()

# List tables
cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
tables = cursor.fetchall()
print("Tables:", tables)

# View companies
cursor.execute("SELECT * FROM companies;")
companies = cursor.fetchall()
print("Companies:", companies)

# View stock data
cursor.execute("SELECT * FROM stock_prices LIMIT 10;")
stocks = cursor.fetchall()
for s in stocks:
    print(s)

conn.close()
