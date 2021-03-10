<script lang="ts">
  import "@carbon/charts/styles.min.css";

  import type { AxisChart } from "@carbon/charts/axis-chart";

  import { interfaces } from "@carbon/charts";
  import { LineChart } from "@carbon/charts-svelte";

  import { listenPrices } from "../actions";
  import { PriceAction } from "src/interfaces/actions";

  let chart: AxisChart;

  let list = [];
  listenPrices((action, data) => {
    if (action === PriceAction.ADDED) {
      list.push({
        group: "Changes",
        date: new Date(data.timestamp),
        value: data.amount,
      });
    }

    chart.model.setData(list);
  });

  const options: interfaces.LineChartOptions = {
    title: "Portfolio",
    height: "400px",
    width: "100%",
    curve: "curveMonotoneX",
    axes: {
      left: {},
      bottom: {
        scaleType: interfaces.ScaleTypes.TIME,
      },
    },
    legend: {
      clickable: true,
    },
  };
</script>

<LineChart data={list} {options} bind:chart />
