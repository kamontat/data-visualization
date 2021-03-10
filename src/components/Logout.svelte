<script lang="ts">
  import type Firebase from "firebase/app";
  import { logout } from "../actions";

  export let user: Firebase.User;
</script>

<div>
  <button on:click={logout}>Logout</button>
  <span>{user?.email}</span>
</div>
