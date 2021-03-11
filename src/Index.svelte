<script lang="ts">
  import type { ApplicationInfo } from "./interfaces/info";
  import type Firebase from "firebase/app";

  export let firebase: typeof Firebase;
  export let info: ApplicationInfo;

  import Container from "./layouts/Container.svelte";
  import Navbar from "./layouts/Navbar.svelte";
  import Footer from "./layouts/Footer.svelte";

  import Seo from "./components/Seo.svelte";
  import Graph from "./components/Graph.svelte";
  import Input from "./components/Input.svelte";
  import Signin from "./components/Signin.svelte";

  import { updateApplication } from "./stores/application";

  updateApplication(info);

  let ready: boolean = false;
  let user: Firebase.User = undefined;
  firebase.auth().onAuthStateChanged(function (login) {
    user = login;
    ready = true;
  });
</script>

<Seo />
<Container>
  <Navbar>
    <div slot="left">
      {#if user}
        <Input />
      {/if}
    </div>

    <div slot="right">
      <Signin {user} {ready} />
    </div>
  </Navbar>

  <main>
    {#if user}
      <Graph />
    {/if}
  </main>

  <Footer />
</Container>
