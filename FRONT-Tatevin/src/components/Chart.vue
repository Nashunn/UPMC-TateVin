<template>
      <canvas id="planet-chart"></canvas>

</template>
<script>

import Chart from 'chart.js';


export default {
  name: "chart",
  components: { },
  data() {
     return {
        planetChartData: {
        type: 'pie',
        data: {
            labels: ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'],
            datasets: [
            { // one line graph
                label: 'Number of Moons',
                data: [0, 0, 1, 2, 67, 62, 27, 14],
                backgroundColor: ["#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#3D9970", "#111111", "#AAAAAA"],                
                borderWidth: 3
            },
            ]
            },
            options: {
                responsive: true,
                lineTension: 1,
                scales: {
                    yAxes: [{
                        ticks: {
                        beginAtZero: true,
                        padding: 25,
                        }
                    }]
                }
            }
        }
    }
  },
  created() {},
  mounted() {
        this.createChart('planet-chart', this.planetChartData);
  },
  methods: {
      createChart(chartId, chartData) {
    const ctx = document.getElementById(chartId);
    const myChart = new Chart(ctx, {
      type: chartData.type,
      data: chartData.data,
      options: chartData.options,
        });
    }
  }
}
</script>
