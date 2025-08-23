from fastapi import APIRouter, Query
from app.services.stock_service import fetch_and_store_stock_by_name

router = APIRouter()

@router.get("/company/{company_name}")
def get_stock_by_name(company_name: str, days: int = Query(30, description="Number of days of stock data")):
    """
    Fetch and store stock data for the given company name.
    Optional query parameter 'days' limits the number of days returned.
    """
    return fetch_and_store_stock_by_name(company_name, days)
