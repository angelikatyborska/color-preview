<script lang="ts">
  let { children } = $props();
  import { page } from '$app/state';
  const domain = 'https://bulk-color-preview.angelika.me';
  const canonicalURL = new URL(page.url.pathname, domain).toString();
  const title = 'Bulk Color Preview';
  const description = "Preview many CSS colors in different formats at once. Unify their formats to RGB, HSL, or HWB, then sort them by hue, lightness, saturation, or alpha, and export a cleaned up, uniform list.";
  const image = 'og.png'
</script>

<svelte:head>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="icon" type="image/png" sizes="180x180" href="/favicon-180.png" />
  <link rel="icon" type="image/png" sizes="300x300" href="/favicon-300.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

  <!-- Canonical URL -->
  <link rel="canonical" href={canonicalURL} />

  <!-- Primary Meta Tags -->
  <title>{title}</title>
  <meta name="title" content={title} />
  <meta name="description" content={description} />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content={domain} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={new URL(image, domain).toString()} />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content={domain} />
  <meta property="twitter:title" content={title} />
  <meta property="twitter:description" content={description} />
  <meta property="twitter:image" content={new URL(image, domain).toString()} />

  <script
    defer
    data-domain="bulk-color-preview.angelika.me"
    src="https://plausible.io/js/script.js"
  ></script>
</svelte:head>

<div class="page">
  <header>
    <h1><span>Bulk Color Preview</span></h1>
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
    min-height: 100dvh;
    display: grid;
    grid-auto-rows: min-content;
    grid-template-columns:
      [aside-left-start main-start] 1fr
      [aside-left-end main-end];
    grid-template-rows: [header-start] auto [header-end main-start] auto [main-end footer-start] auto [footer-end];
    justify-content: center;
    row-gap: var(--spacing-lg);
    background: var(--background-color);

    @media (width >= 777px) {
      grid-auto-rows: min-content;
      grid-template-columns:
        [aside-left-start] minmax(min-content, 330px)
        [aside-left-end main-start] minmax(min-content, 1000px)
        [main-end] 1fr;
      grid-template-rows:
        [header-start main-start] min-content
        [header-end footer-start] 1fr [footer-end main-end];
      justify-content: center;
      row-gap: 0;
      column-gap: var(--spacing-lg);

      &:before {
        content: '';
        background-color: var(--background-color-nav);
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
      background-color: var(--background-color-nav);
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
      color: var(--background-color-nav);

      @media (prefers-reduced-motion: no-preference) {
        animation-name: var(--hue-rotate-animation-name);
        animation-duration: var(--hue-rotate-animation-duration);
        animation-timing-function: var(--hue-rotate-animation-timing-function);
        animation-iteration-count: var(--hue-rotate-animation-iteration-count);
      }
    }

    > *:nth-child(1) {
      background-color: var(--header-background-step-1);
    }
    > *:nth-child(2) {
      background-color: var(--header-background-step-2);
    }
    > *:nth-child(3) {
      background-color: var(--header-background-step-3);
    }
    > *:nth-child(4) {
      background-color: var(--header-background-step-4);
    }
    > *:nth-child(5) {
      background-color: var(--header-background-step-5);
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
      background-color: var(--background-color-nav);
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
