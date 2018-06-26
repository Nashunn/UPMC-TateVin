<template>
    <svg  :class="color" x="0px" y="0px"
     viewBox="0 0 300 300" >
        <g>
        <path class="background" d="M151.1,300c82.8,0,150-67.2,150-150c0-82.8-67.2-150-150-150S1.1,67.2,1.1,150C1.1,232.8,68.2,300,151.1,300"
            />
        <path class="glass" d="M98.3,27C77.5,70.2,8.8,230.2,132.2,230.2V300h0.8h18.1h0.8v-69.8c123.4,0,54.6-160,33.9-203.2H98.3z"/>
        <path class="glass" d="M142,187.4"/>
        </g>

        <g>
        <path class="wineC" d="M89.4,83.5c0,0-58.7,135.4,52.6,135.4c111.3,0,61.4-115.5,54.3-135.4"/>
        </g>
    </svg>
</template>
<style>
     .rouge .background{
          fill: #837fad;
     }
     .rouge .wineC{
          fill: #d30021;
     }
     .blanc .background{
          fill: #83cc80;
     }
     .blanc .wineC{
          fill: #ffe876;
     }
     .rosee .background{
          fill: #fff35b;
     }
     .rosee .wineC{
          fill: #f1b2bc;
     }
     .glass{
          fill: #ffffff;
     }
     .st0{fill:#8480AD;}
     .st1{fill:#F3F2F2;}
     .st2{fill:#080002;}
     .st4{fill:#D30021;}
</style>
<script>
export default{
    name:"wineColor",
    props:{
        color:String
    }
}
</script>
