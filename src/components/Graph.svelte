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

  const beforeNow = 14 * 24 * 60 * 60 * 1000; // 14 days
  const afterNow = 1 * 24 * 60 * 60 * 1000; // 1 day
  const now = +new Date();
  const options: interfaces.LineChartOptions = {
    title: "Visualization",
    height: "400px",
    width: "100%",
    curve: "curveBasis",
    resizable: true,
    axes: {
      left: {},
      bottom: {
        scaleType: interfaces.ScaleTypes.TIME,
      },
    },
    legend: {
      clickable: true,
      alignment: interfaces.Alignments.CENTER,
    },
    data: {
      loading: true,
      selectedGroups: [],
    },
    timeScale: {
      showDayName: false,
      addSpaceOnEdges: 1,
    },
    color: {
      scale: {},
    },
    tooltip: {
      enabled: true,
      showTotal: true,
    },
    zoomBar: {
      top: {
        enabled: true,
        type: interfaces.ZoomBarTypes.SLIDER_VIEW,
        initialZoomDomain: [new Date(now - beforeNow), new Date(now + afterNow)],
      },
    },
  };

  $: {
    const pointKeys = Object.keys($dataPoint);
    const groupKeys = Object.keys($dataGroup);

    if (pointKeys.length > 0 && groupKeys.length > 0) {
      list = pointKeys
        .map(key => {
          const groupData = $dataGroup[$dataPoint[key].group];
          if (groupData) {
            return {
              group: groupData.name,
              value: $dataPoint[key].value,
              date: new Date($dataPoint[key].timestamp),
            };
          } else {
            console.error(`group '${$dataPoint[key].group}' is missing`);
            return undefined;
          }
        })
        .filter(v => v !== undefined)
        .sort((a, b) => a.date.valueOf() - b.date.valueOf());

      if (list.length > 0) {
        // update data loading to false
        if (options.data.loading) options.data.loading = false;

        options.color.scale = Object.keys($dataGroup).reduce((p, key) => {
          const group = $dataGroup[key];
          if (group.color !== "") {
            return Object.assign(p, {
              [group.name]: group.color,
            });
          }

          return p;
        }, {});
      }
    }
  }
</script>

<LineChart data={list} {options} bind:chart />
