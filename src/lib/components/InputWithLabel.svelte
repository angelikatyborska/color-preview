<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    label: string;
    labelFor: string;
    children: Snippet;
  }

  const { label, labelFor, children }: Props = $props();
</script>

<div class="wrapper">
  <label for={labelFor}>
    {label}
  </label>
  {@render children()}
</div>

<style>
  .wrapper {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);

    label {
      font-weight: 700;
    }
  }
</style>
