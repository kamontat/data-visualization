<script lang="ts">
  import { login, logout } from "../actions";
  import { user, isLogin, isReady } from "../stores/user";

  import Loading from "./Loading.svelte";

  let email: string = "";
  let password: string = "";
  let error: Error = undefined;

  $: submitText = $isLogin ? "Signout" : "Signin";

  const reset = (passwordOnly: boolean = false) => {
    ! passwordOnly && (email = "")
    password = ""
  }

  const submit = (event: MouseEvent) => {
    event.preventDefault();

    const promise = $isLogin ? logout() : login(email, password);
    promise
      .then(() => {
        error = undefined;
        reset()
      })
      .catch(e => {
        console.error(e);
        error = e?.message ?? JSON.stringify(e);
        reset(true)
      });
  };
</script>

{#if $isReady}
  <form>
    {#if error !== undefined}
      <div class="message">
        <span>{error}</span>
      </div>
    {/if}

    {#if $isLogin}
      <div class="message">
        <span>{$user?.email}</span>
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
