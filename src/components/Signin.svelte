<script lang="ts">
  import type Firebase from "firebase/app";
  export let user: Firebase.User;
  export let ready: boolean;

  import { login, logout } from "../actions";

  import Loading from "./components/Loading.svelte";

  let email: string = "";
  let password: string = "";
  let error: Error = undefined;

  $: isUserLogin = user !== null && user !== undefined;
  $: submitText = isUserLogin ? "Signout" : "Signin";

  const submit = (event: MouseEvent) => {
    event.preventDefault();

    const promise = isUserLogin ? logout() : login(email, password);
    promise
      .then(() => {
        error = undefined;
      })
      .catch(e => {
        console.error(e);
        error = e?.message ?? JSON.stringify(e);
      });
  };
</script>

{#if ready}
  <form>
    {#if error !== undefined}
      <div class="message">
        <span>{error}</span>
      </div>
    {/if}

    {#if isUserLogin}
      <div class="message">
        <span>{user?.email}</span>
      </div>
    {:else}
      <input name="email" type="email" autocomplete="email" placeholder="Email" bind:value={email} />
      <input
        name="password"
        type="password"
        autocomplete="current-password"
        placeholder="Password"
        bind:value={password}
      />
    {/if}

    <button type="submit" on:click={submit}>{submitText}</button>
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
    margin-right: var(--space-md);
  }

  .message {
    display: flex;
    align-items: center;
  }
</style>
