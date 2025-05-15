const data = {
    "banks": [
        {
            "id": 1,
            "name": "BPER",
            "balance": 1000.00,
            "currency": "USD"
        },
        {
            "id": 2,
            "name": "BCC Alba",
            "balance": 2000.00,
            "currency": "EUR"
        }
    ],
    "investments": [
        {
            "id": 1,
            "ticker": "US500",
            "amount": 500.00,
            "broker": "Trade Republic",
            "type": "Stocks",
            "date": "2021-06-01T00:00:00.000Z",
            "quantity": 9.4,
            "notes": "Stock market investments"
        },
        {
            "id": 2,
            "ticker": "BTCUSD",
            "amount": 500.00,
            "broker": "Bybit",
            "type": "Crypto",
            "date": "2021-05-01T00:00:00.000Z",
            "quantity": 104.5,
            "notes": "Crypto market investments"
        }
    ],
    "operations": [
        {
            "id": 1,
            "title": "Salary",
            "description": "Monthly salary",
            "amount": 1000.67,
            "bank": 1,
            "firstReason": "Salary",
            "secondReason": "",
            "date": "2024-03-01T00:00:00.000Z"
        },
        {
            "id": 2,
            "title": "Rent",
            "description": "Monthly rent",
            "amount": -480.00,
            "bank": 2,
            "firstReason": "Rent",
            "secondReason": "",
            "date": "2024-04-01T00:00:00.000Z"
        },
        {
            "id": 3,
            "title": "Groceries",
            "description": "Weekly groceries",
            "amount": -150.00,
            "bank": 1,
            "firstReason": "Groceries",
            "secondReason": "",
            "date": "2024-03-15T00:00:00.000Z"
        },
        {
            "id": 4,
            "title": "Computer",
            "description": "Computer purchase",
            "amount": -1200.00,
            "bank": 2,
            "firstReason": 3,
            "secondReason": "Necessary",
            "date": "2024-03-20T00:00:00.000Z"
        }
    ],
    "reasons": [
        {
            "id": 1,
            "name": "Svago",
        },
        {
            "id": 2,
            "name": "Viaggi",
        },
        {
            "id": 3,
            "name": "Cibo",
        },
        {
            "id": 4,
            "name": "Salute",
        },
        {
            "id": 5,
            "name": "Palestra",
        },
        {
            "id": 6,
            "name": "Abbigliamento",
        },
        {
            "id": 7,
            "name": "Trasporti",
        },
        {
            "id": 8,
            "name": "Serate",
        },
        {
            "id": 9,
            "name": "Regali",
        },
        {
            "id": 10,
            "name": "Tecnologia",
        },
        {
            "id": 11,
            "name": "Casa",
        },
        {
            "id": 12,
            "name": "Investimenti",
        },
        {
            "id": 13,
            "name": "Spese impreviste",
        },
        {
            "id": 14,
            "name": "Furto",
        },
        {
            "id": 15,
            "name": "Altro",
        },
        {
            "id": 16,
            "name": "Parrucchiere",
        },
        {
            "id": 17,
            "name": "Non necessario",
        },
        {
            "id": 18,
            "name": "Cervello",
        }
    ]
}

export default data;