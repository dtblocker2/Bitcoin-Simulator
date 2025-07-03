function get_time_of_transaction(){
    const now = new Date();
    return ([now.getHours(), now.getMinutes(),now.getSeconds()].join(":") + "  " + [now.getDate(),now.getMonth()+1,now.getFullYear()].join("-"))
}

function cookieToJSON(cookieStr, cookieName = "data") {
    const match = cookieStr.match(new RegExp('(^|;)\\s*' + cookieName + '\\s*=\\s*([^;]+)'));
    if (!match) return null;
    try {
        return JSON.parse(decodeURIComponent(match[2]));
    } catch (e) {
        return null;
    }
};


function JsontoCookie(arr, cookieName = "data") {
    const jsonStr = JSON.stringify(arr);
    return `${cookieName}=${encodeURIComponent(jsonStr)}`;
}

// transaction_history = [
// {transaction_id: 1, transaction_type: "deposit", transaction_amount: 69000, transaction_time: date.getHours(), price_of_BTC_at_time_of_purchase: 104228}]
function buy_BTC(arr,amount){
    transaction_id = arr.length+1;
    transaction_type = "deposit";
    transaction_amount = amount;
    transaction_time = get_time_of_transaction();
    price_of_BTC_at_time_of_purchase= 13245;
    if (arr.length==0){
        total = amount;
    }else {
        total = arr[arr.length-1]['total'] + amount;
    };
    if (arr.length==0){
        BTC_purchased = amount/price_of_BTC_at_time_of_purchase;
    }else {
        BTC_purchased = arr[arr.length-1]['total'] + amount/price_of_BTC_at_time_of_purchase;
    };

    arr.push({transaction_id: transaction_id, transaction_type: transaction_type , transaction_amount: transaction_amount, transaction_time: transaction_time, price_of_BTC_at_time_of_purchase: price_of_BTC_at_time_of_purchase, total: total, BTC_purchased: BTC_purchased})
}

function sell_BTC(arr,amount){
    transaction_id = arr.length+1;
    transaction_type = "sell";
    transaction_amount = amount;
    transaction_time = get_time_of_transaction();
    price_of_BTC_at_time_of_purchase= 13245;

    if (arr.length==0){
        total = -amount;
    }else {
        total = arr[arr.length-1]['total'] - amount;
    };

    if (arr.length==0){
        BTC_purchased = amount/price_of_BTC_at_time_of_purchase;
    }else {
        BTC_purchased = arr[arr.length-1]['total'] - amount/price_of_BTC_at_time_of_purchase;
    };
    
    arr.push({transaction_id: transaction_id, transaction_type: transaction_type , transaction_amount: transaction_amount, transaction_time: transaction_time, price_of_BTC_at_time_of_purchase: price_of_BTC_at_time_of_purchase, total: total, BTC_purchased: BTC_purchased})
}

async function main(){
    const transaction_history = [];
    buy_BTC(transaction_history,8000);
    // Correct syntax for delayed execution
    setTimeout(() => {
        buy_BTC(transaction_history,800);
        console.log(transaction_history);
    }, 5000); // 100 seconds = 100,000 ms
};

main();
