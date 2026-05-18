<script lang="ts">
  import favicon from '$lib/assets/favicon.svg';

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<div class="page">
  <header>
    <h1><div>Bulk Color Preview</div></h1>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </header>

  <main>
    {@render children()}
  </main>

  <footer>
    <p>
      Created by <a href="https://angelika.me">Angelika Cathor</a>.
    </p>

    <p>
      <a href="https://github.com/angelikatyborska/color-preview/issues">Report a problem</a>
      /
      <a href="https://ko-fi.com/angelikatyborska">Buy me a coffee&nbsp;☕️</a>
    </p>
  </footer>
</div>

<style>
  @import '../fonts.css';
  @import '../global.css';

  .page {
    display: grid;
    grid-auto-rows: min-content;
    grid-template-columns:
      [aside-left-start main-start aside-right-start] 1fr
      [aside-left-end main-end aside-right-end];
    grid-template-rows: [header-start] auto [header-end main-start] auto [main-end footer-start] auto [footer-end];
    justify-content: center;
    row-gap: var(--spacing-lg);
    background: var(--background-color);

    @media (width >= 777px) {
      grid-auto-rows: min-content;
      grid-template-columns:
        [aside-left-start] minmax(min-content, 330px)
        [aside-left-end main-start] minmax(min-content, 600px)
        [main-end aside-right-start] 1fr [aside-right-end];
      grid-template-rows:
        [header-start main-start] min-content
        [header-end footer-start] 1fr [footer-end main-end];
      justify-content: center;
      row-gap: 0;
      column-gap: var(--spacing-lg);

      &:before {
        content: '';
        background-color: var(--grayscale-100);
        grid-column: aside-left-start / aside-left-end;
        grid-row: header-start / footer-end;
      }
    }
  }

  header {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: var(--spacing-sm);

    @media (width >= 777px) {
      grid-column: aside-left-start / aside-left-end;
      grid-row: header-start / header-end;
      display: grid;
      gap: var(--spacing-md);
      background-color: var(--grayscale-100);
      position: sticky;
      top: 0;
      grid-template-columns: 1fr;
      grid-template-rows: repeat(5, 1fr);
      align-self: start;
    }

    h1 {
      margin: 0;
      font-size: clamp(var(--font-size-h4), min(4dvh, 4dvw), var(--font-size-h1));
    }

    > * {
      color: var(--grayscale-100);

      @media (prefers-reduced-motion: no-preference) {
        animation-name: var(--hue-rotate-animation-name);
        animation-duration: var(--hue-rotate-animation-duration);
        animation-timing-function: var(--hue-rotate-animation-timing-function);
        animation-iteration-count: var(--hue-rotate-animation-iteration-count);
      }
    }

    > *:nth-child(1) {
      background-color: var(--purple-10);
    }
    > *:nth-child(2) {
      background-color: var(--purple-30);
    }
    > *:nth-child(3) {
      background-color: var(--purple-50);
    }
    > *:nth-child(4) {
      background-color: var(--purple-70);
    }
    > *:nth-child(5) {
      background-color: var(--purple-90);
    }
  }

  main {
    grid-column: main-start / main-end;
    grid-row: main-start / main-end;
  }

  footer {
    grid-column: aside-left-start / aside-left-end;
    grid-row: footer-start / footer-end;
    font-size: var(--font-size-small);
    text-align: center;

    @media (width >= 777px) {
      position: sticky;
      bottom: 0;
      text-align: left;
      align-self: end;
      background-color: var(--grayscale-100);
    }
  }

  header h1,
  main,
  footer {
    padding: var(--spacing-md);
  }

  @keyframes -global-hueRotate {
    to {
      filter: hue-rotate(720deg);
    }
  }
</style>
