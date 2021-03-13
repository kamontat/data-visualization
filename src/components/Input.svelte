<script lang="ts">
  import type { DataPoints } from "../firebase/interfaces/point";

  import { writable } from "svelte/store";

  import { dataPoint } from "../stores/data-point";
  import { dataGroup } from "../stores/data-group";

  import { convertDataPoints } from "../firebase/models/point";
  import { convertGroup, defaultGroup } from "../firebase/models/group";
  import { toDateString } from "../firebase/utils/date";
  import { genUID } from "../firebase/utils/uid";
  import { isString } from "../firebase/utils/checker";

  import Loading from "./Loading.svelte";

  let groupEditor: boolean = false; // enabled group editor mode

  let groupKey: string = "";
  let groupValue: string = "";

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

  const submitGroup = () => {
    if (isString(groupKey) && isString(groupValue)) {
      dataGroup.update(group => {
        const timestamp = +new Date();
        const obj = Object.assign(
          group,
          convertGroup(groupKey, {
            id: groupKey,
            name: groupValue,
            timestamp,
          })
        );

        groupKey = "";
        groupValue = "";

        return obj;
      });
    }
  };
</script>

{#if value !== undefined && Object.keys($dataGroup).length > 0}
  <div class="root">
    {#if $group.description != ""}
      <form>
        <span>{$group.description}</span>
      </form>
    {/if}

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

    <form>
      <input type="checkbox" bind:checked={groupEditor} />
      {#if groupEditor}
        <input type="text" placeholder="group key" bind:value={groupKey} />
        <input type="text" placeholder="group value" bind:value={groupValue} />
        <button type="button" on:click={submitGroup}>New group</button>
      {/if}
    </form>
  </div>
{:else}
  <Loading />
{/if}

<style>
  .root {
    display: flex;
    flex-direction: column;
  }

  .root > *:not(:nth-last-child(1)) {
    margin-bottom: var(--space-sm);
  }

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
