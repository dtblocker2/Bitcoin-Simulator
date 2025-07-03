class Transaction:
    def __init__(self):
        self.k = []

    def buy(self):
        new_tx = {}       # Use a new variable for the new transaction
        existing_ids = []

        for tx in self.k:  # Don't overwrite the new_tx dictionary
            existing_ids.append(tx["max_transaction_id"])

        print(existing_ids)

        new_tx["max_transaction_id"] = len(existing_ids) + 1
        self.k.append(new_tx)
        print(self.k)

lol = Transaction()
lol.buy()
lol.buy()
lol.buy()
lol.buy()
