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
var poinstStylingArr = Array(299).fill(0).concat([5]);
var btc_price_final = 9000000;

async function update_graph() {
  if (requestIteration == 0) {
    const btc_price = await fetch("/api/btc-price");
    const data = await btc_price.json();
    btc_price_final = parseFloat(data.price);
    console.log(btc_price_final);
    // btc_price_final = 9000000+Math.random()*100;
    // console.log('ji');
  }else if(requestIteration==3) {
    btc_price_final += Math.random()*100 - 1;
    requestIteration = -1;
  }else {
    btc_price_final += Math.random()*100 - 1;
  };

  // console.log(btc_price_final);
  yValues.push(btc_price_final);
  yValues.shift();

  // myChart.data.datasets[0].pointStyle = false;
  // ctx.chart.data.datasets[0].pointStyle = 'circle';
  if (poinstStylingArr.length<300){
    poinstStylingArr.unshift(0);
    poinstStylingArr.pop()
  };
  // myChart.data.options.elements.point.pointRadius = poinstStylingArr,
  myChart.data.datasets[0].pointRadius = poinstStylingArr;


  // console.log(yValues);
  myChart.update();
  requestIteration += 1;
}

for (let i = 0; i < 300; i++) {
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
        // pointStyle: false,
    },
],
labels: xValues,
},
  options: {
    elements: {
      point: {
        pointRadius:[10],
        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
      },
    },
    scales: {
        x: {
            display: false
        },
      y: {
        beginAtZero: false,
        title: {
          color: 'rgba(255,255,0,1)',
            display: true, // this line is needed to show the y-axis title
            text: 'BTC Price'
        },

        ticks: {
          color: 'rgba(255,255,0,1)',
        }
      },
    },
    animations: false,
    plugins: {
      legend: {
          display: false
      }
    },
    // responsive: true,
    maintainAspectRatio: false,
  },
});
myChart.resize(1200, 400); // Set explicit width and height
setInterval(update_graph, 2000);
// setInterval(update_graph, 50);
