// import { CategoryScale, Chart, LinearScale, LineController, LineElement, PointElement } from 'chart.js';

// Chart.register([
//   CategoryScale,
//   LineController,
//   LineElement,
//   LinearScale,
//   PointElement
// ]);
const ctx = document.getElementById("myChart");

var iteration = 1;

var xValues = [];
var yValues = [];
var requestIteration = 0;
var btc_price_final = 0;

async function update_graph() {
  if (requestIteration == 0) {
    // const btc_price = await fetch("/api/btc-price");
    // const data = await btc_price.json();
    // var btc_price_final = parseFloat(data.price);

    btc_price_final = 9000000+Math.random()*100;
    console.log('ji');
  }else if(requestIteration==3) {
    btc_price_final += Math.random()*2 - 1;
    requestIteration=-1;
  }else {
    btc_price_final += Math.random()*2 - 1;
  }

  // console.log(btc_price_final);
  yValues.push(btc_price_final);
  yValues.shift();



  myChart.update();
  requestIteration += 1;
}

for (let i = 0; i < 200; i++) {
  yValues.push(null);
  xValues.push(i);
}

// Create chart
const myChart = new Chart(ctx, {
  data: {
    datasets: [
      {
        type: "line",
        label: "Bar Dataset",
        borderColor: 'rgba(255, 99, 132, 1)',
        data: yValues,
        pointStyle: false,
    },
],
labels: xValues,
},
  options: {
    scales: {
        x: {
            display: false
        },
      y: {
        beginAtZero: false,
        title: {
            display: true, // this line is needed to show the y-axis title
            text: 'BTC Price'
        }
      },
    },
    animations: false,
    plugins: {
      legend: {
          display: false
      }
    }
  },
});

setInterval(update_graph, 2000);
