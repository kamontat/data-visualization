<script lang="ts">
  import { latestPrices, setPrice } from "../actions";

  let disabled: boolean = false;
  let price: number = undefined;

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
    setPrice(price).then(() => {
      console.log("saved");
      disabled = false;
    });
  };
</script>

<div>
  {#if price === undefined}
    <span>Loading...</span>
  {:else}
    <input type="number" bind:value={price} />
    <button type="button" on:click={submit} {disabled}>Submit</button>
  {/if}
</div>
