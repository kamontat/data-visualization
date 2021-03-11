<script lang="ts">
  import { application } from "../stores/application";
</script>

<svelte:head>
  <meta name="mode" content={$application.mode} />
  <meta name="title" content={$application.name} />
  <meta name="description" content={$application.description} />

  <meta name="og:title" content={$application.name} />
  <meta name="og:description" content={$application.description} />
  <meta name="og:type" content="website" />

  <meta name="version" content={$application.version} />
  <meta name="deployment-date" content={$application.date.toString()} />
</svelte:head>
