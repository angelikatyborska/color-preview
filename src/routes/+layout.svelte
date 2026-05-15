<script lang="ts">
  import favicon from '$lib/assets/favicon.svg';

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<div class="page">
  <main>
    {@render children()}
  </main>

  <footer>
    <p>
      <a href="https://github.com/angelikatyborska/color-preview/issues">Report a problem</a>.
    </p>
    <p>
      Created by <a href="https://angelika.me">Angelika Cathor</a>.
      <a href="https://ko-fi.com/angelikatyborska">Buy me a coffee ☕️</a>.
    </p>
  </footer>
</div>

<style>
  :root {
    --paragraph-font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
    --code-font-family: Courier, monospace;

    --font-size-h1: 2.986rem;
    --font-size-h2: 2.488rem;
    --font-size-h3: 2.074rem;
    --font-size-h4: 1.728rem;
    --font-size-h5: 1.44rem;
    --font-size-h6: 1.2rem;
    --font-size-p: 1rem;
    --font-size-small: 0.833rem;

    --grayscale-0: hsl(0deg 0% 0%);
    --grayscale-10: hsl(0deg 0% 10%);
    --grayscale-20: hsl(0deg 0% 20%);
    --grayscale-30: hsl(0deg 0% 30%);
    --grayscale-40: hsl(0deg 0% 40%);
    --grayscale-50: hsl(0deg 0% 50%);
    --grayscale-60: hsl(0deg 0% 60%);
    --grayscale-70: hsl(0deg 0% 70%);
    --grayscale-80: hsl(0deg 0% 80%);
    --grayscale-90: hsl(0deg 0% 90%);
    --grayscale-95: hsl(0deg 0% 95%);
    --grayscale-100: hsl(0deg 0% 100%);

    --text-color: var(--grayscale-10);
    --background-color: var(--grayscale-95);

    --spacing-xs: 4px;
    --spacing-sm: 8px;
    --spacing-md: 16px;
    --spacing-lg: 32px;
    --spacing-xl: 64px;
  }

  :global(body) {
    font-family: var(--paragraph-font-family);
    font-size: var(--font-size-p);
    color: var(--text-color);
    margin: 0;
    padding: 0;
  }

  :global(code) {
    font-family: var(--code-font-family);
  }

  :global(h1) {
    font-size: var(--font-size-h1);
  }

  :global(h2) {
    font-size: var(--font-size-h2);
  }

  :global(h3) {
    font-size: var(--font-size-h3);
  }

  :global(h4) {
    font-size: var(--font-size-h4);
  }

  :global(h5) {
    font-size: var(--font-size-h5);
  }

  :global(h6) {
    font-size: var(--font-size-h6);
  }

  :global(p) {
    font-size: var(--font-size-p);
  }

  :global(a) {
    color: var(--text-color);
  }

  footer {
    text-align: center;
    font-size: var(--font-size-small);
  }

  .page {
    display: grid;
    grid-auto-rows: min-content;
    grid-template-columns: minmax(min-content, 600px);
    justify-content: center;
    gap: var(--spacing-xl);
    background: var(--background-color);
  }
</style>
