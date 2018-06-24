<template>
    <div class="wine">
        <svg viewbox="0 0 161 301">
            <clipPath id="wine-clippath">
                <path d="M80.125,138.75c-5.973,0 -12.822,-1.152 -19.834,-3.387l-0.166,-0.053c-6.667,-2.123 -13.482,-5.221 -19.849,-9.235l-0.151,-0.095c-16.52,-10.43 -30,-26.96 -30,-48.48c0,-12.61 7.5,-38.75 16.47,-56.25l106.64,0c9.01,17.75 16.89,43.64 16.89,56.25c0,38.585 -44.017,61.162 -69.848,61.25l-0.152,0Z"/>
            </clipPath>
            <path d="M40.028,138.838c-25.454,-13.774 -40.028,-35.22 -40.028,-58.838c0,-21.606 9.568,-52.977 24.355,-79.998l0.041,-0.002l15.729,0l0,138.918l-0.097,-0.08Z" style="fill:#dde1d6;fill-rule:nonzero;"/><path d="M40.125,0l0,138.75c-21.38,-11.57 -40,-31.72 -40,-58.75c0,-21.67 9.74,-53.34 24.33,-80l15.67,0Z" style="fill:#dde1d6;fill-rule:nonzero;"/><path d="M20.125,300c0,-5.569 4.431,-10 10,-10l10,0l0,10l-20,0Z" style="fill:#dde1d6;fill-rule:nonzero;"/><path d="M40.125,290l0,10l-20,0c0,-5.52 4.48,-10 10,-10l10,0Z" style="fill:#dde1d6;fill-rule:nonzero;"/><path d="M60.048,147.027c-6.827,-1.939 -13.487,-4.694 -19.945,-8.188l0.022,-0.029l0,-138.81l20,0.001l0,147.062l-0.077,-0.036Z" style="fill:#fdfae8;fill-rule:nonzero;"/><path d="M60.125,0l0,146.93c-6.62,-1.88 -13.44,-4.63 -20,-8.18l0,-138.75l20,0Z" style="fill:#fdfae8;fill-rule:nonzero;"/><rect x="40.125" y="290" width="20" height="10" style="fill:#fdfae8;fill-rule:nonzero;"/><rect x="40.125" y="290" width="20" height="10" style="fill:#fdfae8;fill-rule:nonzero;"/><path d="M60.125,300l0,-10l5.01,0c2.696,0 4.99,-2.294 4.99,-4.99l0,-127.64c0,-4.563 -3.181,-8.557 -7.665,-9.713c-0.771,-0.2 -1.517,-0.411 -2.287,-0.631l-0.048,-0.02l0,-147.006l20,0l0,300l-20,0Z" style="fill:#dde1d6;fill-rule:nonzero;"/><path d="M80.125,0l0,300l-20,0l0,-10l5.01,0c2.76,0 4.99,-2.23 4.99,-4.99l0,-127.64c0,-4.65 -3.19,-8.65 -7.69,-9.81c-0.77,-0.2 -1.54,-0.41 -2.31,-0.63l0,-146.93l20,0Z" style="fill:#dde1d6;fill-rule:nonzero;"/><path d="M80.125,300l0,-300l55.059,0l0.028,0.002c15.195,27.333 25.013,58.729 25.013,80.023c0,35.244 -32.435,59.744 -62.525,67.604c-4.43,1.155 -7.575,5.104 -7.575,9.621l0,127.75c0,2.702 2.298,5 5,5l35,0c2.696,0 5.182,1.001 7.091,2.909c1.908,1.909 2.909,4.395 2.909,7.091l-60,0Z" style="fill:#c0c7bb;fill-rule:nonzero;"/><path d="M90.125,157.25l0,127.75c0,2.76 2.24,5 5,5l35,0c2.76,0 5.26,1.12 7.07,2.93c1.81,1.81 2.93,4.31 2.93,7.07l-60,0l0,-300l55,0c14.82,26.66 25,58.33 25,80c0,36.21 -33.92,60.08 -62.4,67.52c-4.45,1.16 -7.6,5.12 -7.6,9.73" style="fill:#c0c7bb;fill-rule:nonzero;"/>
           <g clip-path="url(#wine-clippath)">
                <rect x="10" y="20" width="31" height="120"/>
                <rect x="40" y="20" width="21" height="120"/>
                <rect x="60" y="20" width="21" height="120"/>
                <rect x="80" y="20" width="70" height="120"/>
            </g>
        </svg>
    </div>
</template>
<style scoped>
    .wine {
        position:fixed;
        width: 100%;
        height: 100vh;
        background-color: rgba(0,0,0,0.2);
        z-index: 1000;
    }
    svg {position: absolute; left: 0; right: 0; margin: auto; bottom: 35%; }
    .wine svg {height: 300px; width: 300px; z-index:2;}
    .wine svg rect:nth-of-type(1) {fill: #874640;

    }
    .wine svg rect:nth-of-type(2) {fill: #AA6F65;

    }
    .wine svg rect:nth-of-type(3) {fill: #874640;
    }
    .wine svg rect:nth-of-type(4) {fill: #751D19;
    }

    .wine svg rect{
        animation: anim 3s infinite;
        animation-direction: alternate;
    }

    @keyframes anim {
        0%   {  transform: scaleY(20); }
    }
</style>
<script>

    export default {
        name: 'hello',
    }

</script>
