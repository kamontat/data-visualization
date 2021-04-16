<script lang="ts">
  import type { ApplicationInfo } from "./interfaces/info";
  import type Firebase from "firebase/app";

  export let firebase: typeof Firebase;
  export let info: ApplicationInfo;

  import Container from "./layouts/Container.svelte";
  import Navbar from "./layouts/Navbar.svelte";
  import Main from "./layouts/Main.svelte";
  import Footer from "./layouts/Footer.svelte";

  import Seo from "./components/Seo.svelte";
  import Graph from "./components/Graph.svelte";
  import Input from "./components/Input.svelte";
  import Signin from "./components/Signin.svelte";
  import DataManage from "./components/DataManage.svelte";

  import { updateApplication } from "./stores/application";
  updateApplication(info);

  import { updateDataPoint, pushDataPoint } from "./stores/data-point";
  import { updateDataGroup, pushDataGroup } from "./stores/data-group";
  import { user, isReady, isLogin, updateUser } from "./stores/user";
  import { isExist } from "./firebase/utils/checker";

  updateUser(firebase);

  user.subscribe(user => {
    if (isExist(user)) {
      const unsubscription = [
        updateDataPoint(firebase),
        updateDataGroup(firebase),
        pushDataPoint(firebase),
        pushDataGroup(firebase),
      ];

      return () => {
        unsubscription.forEach(unsubscribe => {
          unsubscribe();
        });
      };
    }
  });
</script>

<Seo />
<Container>
  {#if $isReady}
    <Navbar>
      <div slot="left">
        {#if $isLogin}
          <Input />
        {/if}
      </div>

      <div slot="right">
        <Signin />
      </div>
    </Navbar>
  {/if}

  <Main>
    {#if $isLogin}
      <Graph />
      <DataManage />
    {/if}
  </Main>

  <Footer />
</Container>
