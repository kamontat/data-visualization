<script lang="ts">
  import "@carbon/charts/styles.min.css";

  import type { AxisChart } from "@carbon/charts/axis-chart";
  import type { D3Datasource } from "src/interfaces/datasource";

  import { interfaces } from "@carbon/charts";
  import { LineChart } from "@carbon/charts-svelte";

  import { listenPrices } from "../actions";
  import { PriceAction } from "../interfaces/actions";
  import { priceCategoryMap } from "../stores/price-category";

  let chart: AxisChart;

  let list: D3Datasource[] = [];
  priceCategoryMap.subscribe(category => {
    const exist =
      category && // 👈 null and undefined check
      Object.keys(category).length > 0; // 👈 keys must has more than 0

    if (exist) {
      listenPrices((action, data) => {
        if (action === PriceAction.ADDED) {
          const groupName = category[data.category];
          list.push({
            group: groupName,
            date: new Date(data.timestamp),
            value: data.amount,
          });

          list.sort((a, b) => a.date.valueOf() - b.date.valueOf());
        }

        chart.model.setData(list);
      });
    }
  });

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
