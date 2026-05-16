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
    border: var(--box-border);
    border-radius: var(--box-border-radius-small);
    background-color: var(--grayscale-100);
    cursor: pointer;
    transition: var(--transition-duration) background-color var(--transition-function);

    &:hover {
      background-color: var(--grayscale-95);
    }
  }
</style>
