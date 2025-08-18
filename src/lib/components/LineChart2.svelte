<script lang="ts">
    import { onMount } from "svelte";
    import type { EChartsOption } from "echarts";
    import * as echarts from "echarts";
    import type { MeasurementData } from "$lib/interfaces";

    export let measurements: MeasurementData[] = [];

    let chartDiv: HTMLElement;
    let chart: echarts.ECharts;

    function prepareChartData() {
        // Ordenar mediciones por fecha
        const sortedData = [...measurements].sort(
            (a, b) => a.date.getTime() - b.date.getTime(),
        );

        // Preparar datos para el gráfico
        const dates = sortedData.map((m) => m.date.toLocaleDateString());

        // Datos corporales principales
        const series: echarts.SeriesOption[] = [
            {
                name: "Weight",
                type: "line",
                stack: "Total",
                data: sortedData.map((m) => m.weight),
            },
            {
                name: "Body Fat",
                type: "line",
                stack: "Fat",
                data: sortedData.map((m) => m.fat_body),
            },
            {
                name: "Body Muscle",
                type: "line",
                stack: "Muscle",
                data: sortedData.map((m) => m.muscle_body),
            },
            {
                name: "Water",
                type: "line",
                stack: "Other",
                data: sortedData.map((m) => m.water),
            },
        ];

        const option: EChartsOption = {
            title: {
                text: "Body Composition Over Time",
            },
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "cross",
                    label: {
                        backgroundColor: "#6a7985",
                    },
                },
            },
            legend: {
                data: ["Weight", "Body Fat", "Body Muscle", "Water"],
            },
            grid: {
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true,
            },
            xAxis: [
                {
                    type: "category",
                    boundaryGap: false,
                    data: dates,
                },
            ],
            yAxis: [
                {
                    type: "value",
                },
            ],
            series: series,
        };

        return option;
    }

    onMount(() => {
        // Inicializar el gráfico
        chart = echarts.init(chartDiv);

        // Configurar el gráfico
        const option = prepareChartData();
        chart.setOption(option);

        // Manejar el redimensionamiento
        const resizeObserver = new ResizeObserver(() => {
            chart.resize();
        });
        resizeObserver.observe(chartDiv);

        return () => {
            resizeObserver.disconnect();
            chart.dispose();
        };
    });

    // Actualizar el gráfico cuando cambien las mediciones
    $: if (chart && measurements) {
        const option = prepareChartData();
        chart.setOption(option);
    }
</script>

<div bind:this={chartDiv} class="chart-container"></div>

<style>
    .chart-container {
        width: 100%;
        height: 400px;
    }
</style>
