<script lang="ts">
  import type { PriceCategory } from "../stores/price-category";

  import { latestPrices, setPrice } from "../actions";
  import { priceCategories } from "../stores/price-category";

  import Loading from "./Loading.svelte";

  const _now = new Date();
  const p = (n: number) => n.toString().padStart(2, "0");
  const now = `${_now.getFullYear()}-${p(_now.getMonth() + 1)}-${p(_now.getDate())}`;

  let disabled: boolean = false;

  let category: PriceCategory = undefined;
  let price: number = undefined;
  let date: string = now;

  latestPrices()
    .then(p => {
      price = p.amount;
    })
    .catch(e => {
      console.error(e);
      price = 0;
    });

  const submit = () => {
    disabled = true;
    setPrice({ category: category.id, amount: price, timestamp: +new Date(date) })
      .then(() => {
        disabled = false;
      })
      .catch(e => {
        console.error(e);
        price = 0;
        disabled = false;
      });
  };
</script>

{#if price === undefined}
  <Loading />
{:else}
  <form>
    <select bind:value={category}>
      {#each $priceCategories as category}
        <option id={category.id} value={category}>
          {category.text}
        </option>
      {/each}
    </select>
    <input type="number" bind:value={price} />
    <input type="date" bind:value={date} />

    <button type="button" on:click={submit} {disabled}>Submit</button>
  </form>
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
