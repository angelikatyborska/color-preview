<script lang="ts">
  import type { HTMLSelectAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';

  type Props = HTMLSelectAttributes & {
    children?: Snippet;
  };

  let { children, ...rest }: Props = $props();
</script>

<select {...rest}>
  {@render children?.()}
</select>

<style>
  select {
    border: 0;
    background-color: var(--background-color-alt);
    cursor: pointer;
    transition: var(--transition-duration) background-color var(--transition-function);
    border-radius: 0;

    @media (prefers-reduced-motion: no-preference) {
      animation-name: var(--hue-rotate-animation-name);
      animation-duration: var(--hue-rotate-animation-duration);
      animation-timing-function: var(--hue-rotate-animation-timing-function);
      animation-iteration-count: var(--hue-rotate-animation-iteration-count);
    }

    &:hover {
      background-color: var(--select-hover-background-color);
    }
  }
</style>
