<script lang="ts">
  import "@carbon/charts/styles.min.css";

  import type { AxisChart } from "@carbon/charts/axis-chart";
  import type { D3Datasource } from "src/interfaces/datasource";

  import { interfaces } from "@carbon/charts";
  import { LineChart } from "@carbon/charts-svelte";

  import { dataGroup } from "../stores/data-group";
  import { dataPoint } from "../stores/data-point";

  let chart: AxisChart;

  let list: D3Datasource[] = [];

  $: {
    const pointKeys = Object.keys($dataPoint);
    const groupKeys = Object.keys($dataGroup);

    if (pointKeys.length > 0 && groupKeys.length > 0) {
      list = pointKeys
        .map(key => {
          return {
            group: $dataGroup[$dataPoint[key].group].name,
            value: $dataPoint[key].value,
            date: new Date($dataPoint[key].timestamp),
          };
        })
        .sort((a, b) => a.date.valueOf() - b.date.valueOf());
    }
  }

  const options: interfaces.LineChartOptions = {
    title: "Visualization",
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
