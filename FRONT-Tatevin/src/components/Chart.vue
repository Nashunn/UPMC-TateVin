<template>
    <div>
        <canvas :ref="idChart" ></canvas>
        <p>{{tst}}</p>
        
    </div>
</template>
<script>
import Chart from "chart.js";
import 'chart.piecelabel.js';

export default {
  name: "chart",
  components: {},
  props: {
    idChart: String,
    iData: Object
  },
   watch: {
  	'iData.datas': function(newVal, oldVal) {
          this.myChart.update()
    }
    },
  data() {
    return {
        tst: this.iData.datas,
        myChart:{},
      planetChartData: {
        type: "pie",
        data: {
          labels: this.iData.labels,
          datasets: [
            {
              // one line graph
              label: "Number of Moons",
              data: this.iData.datas,// [1,2,1],
              backgroundColor: [
                "#0074D9",
                "#FF4136",
                "#2ECC40",
                "#FF851B",
                "#7FDBFF",
                "#B10DC9",
                "#FFDC00",
                "#001f3f",
                "#39CCCC",
                "#01FF70",
                "#85144b",
                "#F012BE",
                "#3D9970",
                "#111111",
                "#AAAAAA"
              ],
              borderWidth: 3
            }
          ]
        },
        options: {
            responsive: true,
            legend: {
            position: 'top',
            pieceLabel: {
      render: 'percentage',
                fontColor: ['green', 'white', 'red'],
                precision: 2
}
        },         
        }
      }
    };
  },
  mounted() {
      console.log(this.idChart)
      this.createChart(this.idChart,this.planetChartData)

  },
  methods: {
    createChart(idChart, chartData) {
        const ctx = this.$refs[idChart];
        this.myChart = new Chart(ctx, {
            type: chartData.type,
            data: chartData.data,
            options: chartData.options
        });

    }
  }
};
</script>
