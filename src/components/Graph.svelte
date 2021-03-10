<script lang="ts">
  import type Firebase from "firebase/app";
  export let firebase: typeof Firebase;
  export let user: Firebase.User;

  import FusionCharts from "fusioncharts";
  import Timeseries from "fusioncharts/fusioncharts.timeseries";
  import FusionTheme from "fusioncharts/themes/fusioncharts.theme.gammel";
  import SvelteFC, { fcRoot } from "svelte-fusioncharts";
  let chart: FusionCharts.FusionCharts;

  fcRoot(FusionCharts, Timeseries, FusionTheme);

  const getPrices = () => {
    return firebase.database().ref(`users/${user.uid}/prices`);
  };

  getPrices().on("value", data => {
    if (chart) {
      console.log(chart.feedData);
      console.log(chart);
      console.log(data);

      const obj = data.val();

      const key = Object.keys(obj)[0];
      chart.feedData([[key, obj[key].timestamp, obj[key].amount]] as any);
    } else {
      console.error("chart not found");
    }
  });

  const getData = async () => {
    const data = await getPrices().get();
    const obj: Record<string, { amount: number; timestamp: number }> = data.val();

    return Object.keys(obj).reduce((row, key) => {
      const data = obj[key];
      row.push([key, data.timestamp, data.amount]);
      return row;
    }, []);
  };

  const getSchema = async () => {
    return [
      {
        name: "ID",
        type: "text",
      },
      {
        name: "Time",
        type: "date",
        format: "%Q",
      },
      {
        name: "Money changes",
        type: "number",
      },
    ];
  };

  const promise = Promise.all([getData(), getSchema()]);

  const getChartConfig = ([data, schema]) => {
    const dataStore = new FusionCharts.DataStore();

    return {
      type: "timeseries",
      width: "100%",
      height: 450,
      renderAt: "chart-container",
      dataSource: {
        chart: {
          theme: "gammel",
        },
        data: dataStore.createDataTable(data, schema),
        caption: {
          text: "Portfolio",
        },
        yAxis: [
          {
            plot: {
              value: "Amount",
              type: "line",
              connectnulldata: true,
              style: {
                "plot.null": {
                  stroke: "#FF0000",
                },
              },
            },
            format: {
              prefix: "฿",
            },
            title: "Amount",
          },
        ],
        xaxis: {
          binning: {
            day: [1, 5],
          },
        },
      },
    };
  };
</script>

<div id="chart-container">
  {#await promise}
    <p>Fetching data and schema...</p>
  {:then value}
    <SvelteFC {...getChartConfig(value)} bind:chart />
  {:catch error}
    <p>Something went wrong: {error.message}</p>
  {/await}
</div>
