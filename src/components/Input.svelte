<script lang="ts">
  import type { DataPoints } from "../firebase/interfaces/point";

  import { writable } from "svelte/store";

  import { dataPoint } from "../stores/data-point";
  import { dataGroup } from "../stores/data-group";

  import { convertDataPoints } from "../firebase/models/point";
  import { defaultGroup } from "../firebase/models/group";
  import { toDateString } from "../firebase/utils/date";

  import Loading from "./Loading.svelte";
  import { genUID } from "src/firebase/utils/uid";

  let group = writable(defaultGroup["-"]);

  let value: number = undefined;
  let date: string = toDateString();

  // call this method when data group changes
  const updateValue = (points: DataPoints) => {
    return () => {
      const keys = Object.keys(points).filter(key => points[key].group === $group.id);
      const latest = keys.sort((a, b) => points[a].timestamp - points[b].timestamp).pop();

      if (latest) value = points[latest].value;
      else value = 0; // point is not exist
    };
  };

  dataPoint.subscribe(points => {
    updateValue(points)();
  });

  const submit = () => {
    dataPoint.update(points => {
      const timestamp = +new Date(date);
      const id = genUID(timestamp);
      return Object.assign(
        points,
        convertDataPoints(Object.keys(points).length.toString(), {
          id,
          value,
          group: $group.id,
          timestamp,
        })
      );
    });
  };
</script>

{#if value !== undefined && Object.keys($dataGroup).length > 0}
  <form>
    <!-- svelte-ignore a11y-no-onchange -->
    <select bind:value={$group} on:change={updateValue($dataPoint)}>
      {#each Object.keys($dataGroup) as groupKey}
        <option id={groupKey} value={$dataGroup[groupKey]}>
          {$dataGroup[groupKey].name}
        </option>
      {/each}
    </select>
    <input type="number" bind:value />
    <input type="datetime-local" bind:value={date} />

    <button type="button" on:click={submit}>Submit</button>
  </form>
{:else}
  <Loading />
{/if}

<style>
  form {
    display: flex;
    align-items: stretch;
  }

  form > *:not(:nth-last-child(1)) {
    margin-right: var(--space-sm);
  }

  @media screen and (max-width: 650px) {
    form {
      flex-wrap: wrap;
      align-items: baseline;
    }

    form > *:not(:nth-last-child(1)) {
      margin-bottom: var(--space-sm);
    }
  }
</style>
