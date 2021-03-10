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
      <Login {firebase} />
    {:else}
      <Logout {firebase} />
    {/if}
  </nav>

  <main>
    {#if user}
      <Input {firebase} {user} />
      <Graph {firebase} {user} />
    {/if}
  </main>
</div>

<style>
</style>
