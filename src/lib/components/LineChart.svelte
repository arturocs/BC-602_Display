<!-- StackedLineChart.svelte -->
<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import * as echarts from "echarts";
    import { formatDate, formatKey } from "$lib/utils";

    const { data = [], xKey = "date", keys = [], title = "", log=false } = $props();

    $effect(() => {
        console.log("Data updated:", data);
    });
    let chartEl: HTMLDivElement;
    let chart: echarts.ECharts | null = null;
    let resizeObserver: ResizeObserver | null = null;

    function buildOption() {
        const rows = data ?? [];
        const xValues = rows.map((r) => r?.[xKey]).map((v) => formatDate(v));

        const series = keys.map((key) => {
            const sdata = rows.map((r) => {
                const val = r?.[key];
                // Convertir a número seguro; mantener nulls para gaps
                const num =
                    typeof val === "number"
                        ? val
                        : val == null
                          ? null
                          : Number(val);
                return Number.isFinite(num as number) ? (num as number) : null;
            });

            const serie: echarts.SeriesOption = {
                name: formatKey(key),
                type: "line",
                connectNulls: true,
                emphasis: { focus: "series" },
                data: sdata,
            };

            return serie;
        });

        const option: echarts.EChartsOption = {
            title: title ? { text: title, left: "center" } : undefined,
            tooltip: { trigger: "axis" },
            legend: { bottom: -0, type: "scroll" },
            grid: {
                left: 24,
                right: 24,
                bottom: 24,
                top: title ? 48 : 32,
                containLabel: true,
            },
            xAxis: { type: "category", boundaryGap: false, data: xValues },
            yAxis: { type: log ? "log":"value" },
            series,
        };

        return option;
    }

    function render() {
        if (!chart && chartEl) {
            chart = echarts.init(chartEl, undefined, { renderer: "canvas" });
        }
        if (chart) {
            chart.setOption(buildOption(), true);
        }
    }

    onMount(() => {
        render();

        // Responsive
        const handleResize = () => chart?.resize();
        resizeObserver = new ResizeObserver(handleResize);
        if (chartEl) resizeObserver.observe(chartEl);

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    });

    $effect(render); // re-render ante cambios de props

    onDestroy(() => {
        resizeObserver?.disconnect();
        resizeObserver = null;
        chart?.dispose();
        chart = null;
    });
</script>

<!-- Contenedor -->
<div bind:this={chartEl} class="chart-root"></div>

<style>
    .chart-root {
        width: 100%;
        height: 420px; /* ajusta según tu layout */
    }
</style>
