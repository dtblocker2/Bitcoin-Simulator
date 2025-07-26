// constants
let transactionLog = [];

/* let transactionObject = {
    crypto: 'BTC',
    amount: '69',
    time: 'Jul 26, 00:00',
    rateOfBTC: '117,349',
    type: 'buy'
}; */

function buyCrypto(crypto, amount, time, rateOfBTC) {
    let transactionObject = {
        crypto: crypto,
        amount: amount,
        time: 'Jul 26, 00:00' ``,
        rateOfBTC: '117,349',
        type: 'buy'
    };

    transactionLog.push(transactionObject)
};

function main() {
    console.log('hi');
};

