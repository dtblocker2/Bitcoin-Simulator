// import { CategoryScale, Chart, LinearScale, LineController, LineElement, PointElement } from 'chart.js';

// Chart.register([
//   CategoryScale,
//   LineController,
//   LineElement,
//   LinearScale,
//   PointElement
// ]);

var iteration = 1;

var xValues = [];
var yValues = [];

async function update_graph() {
  const btc_price = await fetch("/api/btc-price");
  const data = await btc_price.json();
  const btc_price_final = parseFloat(data.price);

  yValues.push(btc_price_final);

  xValues.push(iteration++);

  if (xValues.length > 8) {
    xValues.shift();
    yValues.shift();
  }

  //update after every time
  const minY = Math.min(...yValues);
  const maxY = Math.max(...yValues);
  myChart.options.scales.y.min = minY - 200;
  myChart.options.scales.y.max = maxY + 200;

  myChart.update();
}

var myChart = new Chart("myChart", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [
      {
        backgroundColor: "rgba(0,0,255,1.0)",
        borderColor: "rgba(0,0,255,0.1)",
        data: yValues,
        fill: false,
        tension: 0,
      },
    ],
  },
  options: {
    legend: { display: false },
    animation: false,
    scales: {
      y: {
        min: 9000000-200,
        max: 10000000+200,
      },
    },
  },
});

setInterval(update_graph, 10000);
