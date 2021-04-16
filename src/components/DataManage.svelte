<script lang="ts">
  import { dataGroup } from "src/stores/data-group";
  import { dataPoint } from "src/stores/data-point";

  import { convertGroup } from "src/firebase/models/group";
  import { isString } from "src/firebase/utils/checker";
  import { timestampFormat } from "src/firebase/utils/date";

  let dataGroupShown = false;
  let dataPointShown = false;

  let groupKey: string = "";
  let groupValue: string = "";

  const submitGroup = (event: MouseEvent) => {
    event.preventDefault();
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

  const deleteGroup = (id: string) => {
    return (event: MouseEvent) => {
      event.preventDefault();
      dataGroup.update(oldGroup => {
        delete oldGroup[id];
        return oldGroup;
      });
    };
  };

  const deletePoint = (id: string) => {
    return (event: MouseEvent) => {
      event.preventDefault();
      dataPoint.update(oldPoints => {
        delete oldPoints[id];
        return oldPoints;
      });
    };
  };
</script>

<div class="root-container">
  <div class="container">
    <form class="inner-container">
      <div class="centralize">
        <input type="checkbox" bind:checked={dataPointShown} />
        <label for="group-key"> Data point </label>
      </div>
      <span />
      <span />

      {#if dataPointShown}
        {#each Object.keys($dataPoint) as dataPointKey, i}
          <span>{i + 1})</span>

          <div class="data-point-table" id={dataPointKey}>
            <span>{$dataPoint[dataPointKey].value}</span>
            <span>{$dataPoint[dataPointKey].group}</span>
            <span>{timestampFormat($dataPoint[dataPointKey].timestamp)}</span>
          </div>

          <button type="button" on:click={deletePoint(dataPointKey)}>X</button>
        {/each}
      {/if}

      <div class="centralize">
        <input type="checkbox" bind:checked={dataGroupShown} />
        <label for="group-key"> Group </label>
      </div>
      {#if dataGroupShown}
        <input name="group-key" type="text" placeholder="group key" bind:value={groupKey} />
        <span />

        <span />
        <input name="group-value" type="text" placeholder="group value" bind:value={groupValue} />
        <button type="submit" on:click={submitGroup}>New</button>

        {#each Object.keys($dataGroup) as groupKey}
          <span />
          <span id={groupKey}>{$dataGroup[groupKey].name} ({groupKey})</span>
          {#if groupKey != "-"}
            <button type="button" on:click={deleteGroup(groupKey)}>X</button>
          {:else}
            <button type="button" disabled>-</button>
          {/if}
        {/each}
      {:else}
        <span />
        <span />
      {/if}
    </form>
  </div>
</div>

<style>
  .root-container {
    border-top: var(--border-md) solid;

    margin-top: var(--space-md);
    padding-top: var(--space-lg);
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .inner-container {
    width: 100%;
    max-width: var(--max-width);

    align-items: stretch;
  }

  .centralize {
    display: flex;
    align-items: center;

    padding-top: var(--space-sm);
    padding-bottom: var(--space-sm);
  }

  form {
    align-items: center;

    display: grid;
    grid-template-columns: 25% 60% 15%;
    grid-template-rows: auto;

    grid-column-gap: var(--space-sm);
    grid-row-gap: var(--space-sm);
  }

  .data-point-table {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media screen and (max-width: 650px) {
    .data-point-table {
      display: flex;
      flex-direction: column;
    }

    .data-point-table > span {
      margin-bottom: var(--space-sm);
    }
  }
</style>
