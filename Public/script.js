/* //Declaration of element of document
const USDT_deposited_btn = document.getElementById('usdt_deposited_btn');
const USDT_deposited = document.getElementById('usdt_deposited');
const BTC_purchased_display = document.getElementById('BTC_purchased_display');
const BTC_curr_price_display = document.getElementById('BTC_curr_price');

const BTC_withdrawn_btn = document.getElementById('btc_withdrawn_btn');
const BTC_withdrawn = document.getElementById('btc_withdrawn');
const BTC_sold_display = document.getElementById('BTC_sold_display');

//declaration of important variables
let BTC_curr_price = parseFloat(BTC_curr_price_display.textContent);
let transaction_history = cookieToJSON();

//function area
function BTC_purchased_display_func() {
    const USDT_value = parseFloat(USDT_deposited.value);
    if (!isNaN(USDT_value) && BTC_curr_price > 0) {
        BTC_purchased_display.innerHTML = (USDT_value / BTC_curr_price);
        //USDT_deposited.value = "";
    } else {
        BTC_purchased_display.innerHTML = "Invalid input";
    };
}

function BTC_sold_display_func() {
    const BTC_value = parseFloat(BTC_withdrawn.value);
    if (!isNaN(BTC_value) && BTC_curr_price > 0) {
        BTC_sold_display.innerHTML = (BTC_value * BTC_curr_price);
    } else {
        BTC_sold_display.innerHTML = "Invalid input";
    };

    //BTC_withdrawn.value = "";
}

async function fetch_btc_price() {
    try {
        const updated_price = await fetch('/api/btc-price');
        const data = await updated_price.json();
        BTC_curr_price = parseFloat(data.price);

        !isNaN(BTC_curr_price) ? BTC_curr_price_display.textContent = BTC_curr_price : BTC_curr_price_display.textContent = "fetching...";
    } catch (err) {
        console.error("Failed to fetch BTC price from /api/btc-price route", err);
    };

    update_balance_display(transaction_history)
}

function get_time_of_transaction() {
    const now = new Date();
    return (
        [now.getHours(), now.getMinutes(), now.getSeconds()].join(":") +
        "  " +
        [now.getDate(), now.getMonth() + 1, now.getFullYear()].join("-")
    );
}

function cookieToJSON() {
    const cookieStr = localStorage.getItem('coin_data');
    // const match = cookieStr.match(
    //     new RegExp("(^|;)\\s*" + cookieName + "\\s*=\\s*([^;]+)")
    // );
    if (!cookieStr) return [];
    try {
        p = JSON.parse(cookieStr)
        return p;
    } catch (e) {
        return [];
    }
}

function JsontoCookie(arr,) {
    const jsonStr = JSON.stringify(arr);
    localStorage.setItem('coin_data',jsonStr);
}

function buy_BTC(arr, amount) {
    amount = parseFloat(amount);
    if (isNaN(amount) || amount <= 0) {
        alert('enter valid input');
        return
    };

    const transaction_id = arr.length + 1;
    const transaction_type = "deposit";
    const transaction_time = get_time_of_transaction();
    const price = BTC_curr_price;

    const total = arr.length === 0 ? amount : arr[arr.length - 1].total + amount;
    const previous_BTC = arr.length === 0 ? 0 : arr[arr.length - 1].BTC_purchased;
    const BTC_purchased = previous_BTC + amount / price;

    arr.push({
        transaction_id,
        transaction_type,
        transaction_amount: amount,
        transaction_time,
        price_of_BTC_at_time_of_purchase: price,
        total,
        BTC_purchased,
    });

    JsontoCookie(arr);
    displayTransactions(arr);
    update_balance_display(arr);
}

function sell_BTC(arr, amount) {
    amount = parseFloat(amount);
    const last = transaction_history[transaction_history.length-1];
    if (!last) {
        alert('insufficient funds');
        return
    }
    const balance = last.BTC_purchased;
    console.log(balance);
    if (isNaN(amount) || amount <= 0 || (balance-amount) < 0) {
        alert('enter valid input')
        return
    };

    const transaction_id = arr.length + 1;
    const transaction_type = "sell";
    const transaction_time = get_time_of_transaction();
    const price = BTC_curr_price;

    const total = arr.length === 0 ? -amount : arr[arr.length - 1].total - amount*BTC_curr_price;
    const previous_BTC = arr.length === 0 ? 0 : arr[arr.length - 1].BTC_purchased;
    const BTC_purchased = previous_BTC - amount;

    arr.push({
        transaction_id,
        transaction_type,
        transaction_amount: amount*BTC_curr_price,
        transaction_time,
        price_of_BTC_at_time_of_purchase: price,
        total,
        BTC_purchased,
    });

    JsontoCookie(arr);
    displayTransactions(arr);
    update_balance_display(arr);
}

function displayTransactions(arr) {
    const tbody = document.getElementById('transaction_body');
    tbody.innerHTML = '';

    arr.forEach(tx => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${tx.transaction_id}</td>
            <td>${tx.transaction_type}</td>
            <td>${tx.transaction_amount}</td>
            <td>${parseFloat(tx.price_of_BTC_at_time_of_purchase)}</td>
            <td>${tx.total}</td>
            <td>${parseFloat(tx.BTC_purchased)}</td>
            <td>${tx.transaction_time}</td>
        `;

        tbody.appendChild(row);
    });
};

function update_balance_display(arr) {
    const balance_elem = document.getElementById("current_balance");
    const profit_loss = document.getElementById('profit_loss');
    if (!balance_elem) return;

    const last = arr[arr.length - 1];
    if (!last) {
        balance_elem.textContent = "0 BTC / 0 INR";
        return;
    }

    const BTC_balance = parseFloat(last.BTC_purchased);
    const USDT_equivalent = BTC_balance * BTC_curr_price;

    balance_elem.textContent = `${BTC_balance} BTC / ${USDT_equivalent} INR`;

    const profit = USDT_equivalent - transaction_history[transaction_history.length -1].total;
    profit >= 0 ? profit_loss.innerHTML = `<span style = "color:green">${profit}  INR </span>`: profit_loss.innerHTML = `<span style = "color:red">${profit}  INR </span>`
};

function clear_transaction_history() {
    localStorage.removeItem('coin_data');
    transaction_history = cookieToJSON()
    displayTransactions(transaction_history)
    alert('successfully deleted data')
}

//main function of the document
async function main() {
    await fetch_btc_price();

    displayTransactions(transaction_history);

    USDT_deposited_btn.addEventListener('click', () => {
        const amount = USDT_deposited.value;
        buy_BTC(transaction_history, amount);
        BTC_purchased_display_func();
    });

    BTC_withdrawn_btn.addEventListener('click', () => {
        const amount = BTC_withdrawn.value;
        sell_BTC(transaction_history, amount);
        BTC_sold_display_func();
    });

    // updates every 30 seconds
    setInterval(fetch_btc_price, 30000);
}

main();
 */

const leverage = document.getElementById('leverage')