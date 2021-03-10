<script lang="ts">
  import { login } from "../actions";

  let email: string = "";
  let password: string = "";
  let error: Error = undefined;

  const submit = (event: MouseEvent) => {
    event.preventDefault();
    login(email, password).catch(e => {
      error = e;
    });
  };
</script>

<div>
  <form>
    <label for="email">Email</label>
    <input name="email" type="email" autocomplete="email" bind:value={email} />

    <label for="password">Password</label>
    <input name="password" type="password" autocomplete="current-password" bind:value={password} />

    <button type="submit" on:click={submit}>Submit</button>

    {#if error}
      <p>{error.message}</p>
    {/if}
  </form>
</div>
