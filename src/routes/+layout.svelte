<script lang="ts">
  import favicon from '$lib/assets/favicon.svg';

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

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
    --grayscale-100: hsl(0deg 0% 100%);

    --spacing-xs: 4px;
    --spacing-sm: 8px;
    --spacing-md: 16px;
    --spacing-lg: 32px;
    --spacing-xl: 64px;
  }

  :global(body) {
    font-family: var(--paragraph-font-family);
    font-size: var(--font-size-p);
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
    /* TODO: choose a palette */
    color: #225a9e;
  }
</style>
