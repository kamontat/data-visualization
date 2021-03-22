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

  const beforeNow = 7 * 24 * 60 * 60 * 1000;
  const afterNow = 1 * 24 * 60 * 60 * 1000;
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
        // thresholds: [
        //   {
        //     value: new Date(),
        //     label: "Today",
        //     fillColor: "orange",
        //   },
        // ],
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
        type: "slider_view",
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
          return {
            group: $dataGroup[$dataPoint[key].group].name,
            value: $dataPoint[key].value,
            date: new Date($dataPoint[key].timestamp),
          };
        })
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
