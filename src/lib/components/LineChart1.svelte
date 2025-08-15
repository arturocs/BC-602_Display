<!-- StackedLineChart.svelte -->
<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import * as echarts from "echarts";

    // Ajusta este import si usas otro path/definición
    type MeasurementData = {
        model: string;
        date: Date | string;
        [k: string]: number | string | Date | null | undefined;
    };

    const {
        data = [],
        xKey = "date",
        keys = null,
        title = "",
        area = false,
        formatX = (v: any) => {
            const d = v instanceof Date ? v : new Date(v);
            // Formato corto local; ajusta al gusto
            return new Intl.DateTimeFormat(undefined, {
                year: "2-digit",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
            }).format(d);
        }
    } = $props();
    $effect(() => {
        console.log("Data updated:", data);
    });
    let chartEl: HTMLDivElement;
    let chart: echarts.ECharts | null = null;
    let resizeObserver: ResizeObserver | null = null;

    function inferKeys(rows: MeasurementData[], xKey: string): string[] {
        if (!rows?.length) return [];
        const sample = rows[0];
        return Object.keys(sample)
            .filter((k) => k !== xKey && k !== "model")
            .filter((k) => typeof sample[k] === "number");
    }

    function buildOption() {
        const rows = data ?? [];
        const seriesKeys = (
            keys && keys.length ? keys : inferKeys(rows, xKey)
        ) as string[];

        const xValues = rows.map((r) => r?.[xKey]).map((v) => formatX(v));

        const series = seriesKeys.map((name) => {
            const sdata = rows.map((r) => {
                const val = r?.[name];
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
                name,
                type: "line",
                stack: "total",
                connectNulls: true,
                showSymbol: false,
                emphasis: { focus: "series" },
                data: sdata,
            };

            if (area) (serie as any).areaStyle = {};
            return serie;
        });

        const option: echarts.EChartsOption = {
            title: title ? { text: title, left: "center" } : undefined,
            tooltip: { trigger: "axis" },
            legend: { top: 10, type: "scroll" },
            grid: {
                left: 24,
                right: 24,
                bottom: 24,
                top: title ? 48 : 32,
                containLabel: true,
            },
            xAxis: { type: "category", boundaryGap: false, data: xValues },
            yAxis: { type: "value" },
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
