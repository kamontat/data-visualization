<script lang="ts">
  import { application } from "../stores/application";
</script>

<footer>
  <div class="items">
    <a class="item" href="https://github.com/kamontat/data-visualization" target="_blank"> {$application.name} </a>
    <a class="item" href="https://github.com/kamontat/data-visualization/releases/latest" target="_blank">
      v{$application.version}
    </a>

    <img class="item" src="/favicon.png" alt="application icon" width="35px" />

    <a class="item" href="https://github.com/kamontat/data-visualization/blob/main/LICENSE" target="_blank">
      {$application.license}
    </a>
    <a class="item" href={$application.author.url} target="_blank"> {$application.author.name} </a>
  </div>
</footer>

<style>
  footer {
    height: 80px;

    margin-top: var(--space-xl);
    padding-top: var(--space-md);
    padding-bottom: var(--space-md);

    border-top-style: outset;
    border-top-width: 1.2px;
    border-top-color: rgba(211, 211, 211, 0.75);
  }

  .items {
    display: flex;
    justify-content: space-around;
  }

  @media screen and (max-width: 600px) {
    .items {
      flex-direction: column;
      align-items: center;
    }

    .items > *:not(:nth-last-child(1)) {
      margin-bottom: var(--space-sm);
    }
  }
</style>
