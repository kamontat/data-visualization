<script lang="ts">
  import type Firebase from "firebase/app";
  export let firebase: typeof Firebase;

  import Login from "./components/Login.svelte";
  import Logout from "./components/Logout.svelte";
  import Graph from "./components/Graph.svelte";
  import Input from "./components/Input.svelte";

  let user: Firebase.User = undefined;
  firebase.auth().onAuthStateChanged(function (login) {
    user = login;
  });
</script>

<div>
  <nav>
    {#if user === null}
      <Login />
    {:else}
      <Logout {user} />
    {/if}
  </nav>

  <main>
    {#if user}
      <Input />
      <Graph />
    {/if}
  </main>
</div>

<style>
</style>
