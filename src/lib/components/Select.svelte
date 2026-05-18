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
    background-color: var(--grayscale-100);
    border-left: 2px solid var(--purple-70);
    cursor: pointer;
    transition: var(--transition-duration) background-color var(--transition-function);

    @media (prefers-reduced-motion: no-preference) {
      animation-name: var(--hue-rotate-animation-name);
      animation-duration: var(--hue-rotate-animation-duration);
      animation-timing-function: var(--hue-rotate-animation-timing-function);
      animation-iteration-count: var(--hue-rotate-animation-iteration-count);
    }

    &:hover {
      background-color: var(--purple-95);
    }
  }
</style>
