<script lang="ts">
  import type Firebase from "firebase/app";
  export let firebase: typeof Firebase;

  let error: Error = undefined;
  const logout = () => {
    firebase
      .auth()
      .signOut()
      .catch(e => {
        error = e;
      });
  };
</script>

<div>
  <button on:click={logout}>Logout</button>
  {#if error}
    <p>{error.message}</p>
  {/if}
</div>
