<nav>
  <div class="left">
    <slot name="left" />
  </div>

  <div class="right">
    <slot name="right" />
  </div>
</nav>

<style>
  div,
  nav {
    display: flex;
    flex-direction: row;

    align-items: flex-start;

    padding-top: var(--space-sm);
    padding-bottom: var(--space-sm);
  }

  .right {
    flex-grow: 1;
    justify-content: flex-end;
  }

  @media screen and (max-width: 1000px) {
    nav {
      flex-direction: column-reverse;
    }

    .right,
    .left {
      width: 100%;
    }
  }
</style>
