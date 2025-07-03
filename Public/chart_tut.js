var iteration = 1;

var xValues = [];
var yValues = [];

async function update_graph(){
    const btc_price = await fetch('/api/btc-price');
    const data = await btc_price.json();
    const btc_price_final = parseFloat(data.price);
    console.log(btc_price_final)

    yValues.push(btc_price_final);

    iteration += 1;
    xValues.push(iteration);

    if (xValues.length > 8) {
        xValues.splice(0,1);
        yValues.splice(0,1);
    }

    myChart.update();
};

var myChart = new Chart("myChart", {
type: "line",
data: {
    labels: xValues,
    datasets: [{
    backgroundColor:"rgba(0,0,255,1.0)",
    borderColor: "rgba(0,0,255,0.1)",
    data: yValues,
    fill: false,
    tension: 0,
    }]
},
options: {
    legend: {display: false}
}
});

setInterval(update_graph, 10000);
