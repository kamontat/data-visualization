<script lang="ts">
  import type Firebase from "firebase/app";
  export let firebase: typeof Firebase;

  let error: Error = undefined;

  let email: string = "";
  let password: string = "";
  const submit = (event: MouseEvent) => {
    event.preventDefault();

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(e => {
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
