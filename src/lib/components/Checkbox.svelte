<script lang="ts">
  interface Props {
    getter: () => boolean;
    setter: (value: boolean) => void;
    label: string;
  }

  const { label, getter, setter }: Props = $props();
</script>

<label>
  <input type="checkbox" bind:checked={() => getter(), (value) => setter(value)} />
  {label}
</label>

<style>
  label {
    cursor: pointer;

    input {
      cursor: pointer;
      accent-color: var(--purple-40);

      @media (prefers-reduced-motion: no-preference) {
        animation-name: var(--hue-rotate-animation-name);
        animation-duration: var(--hue-rotate-animation-duration);
        animation-timing-function: var(--hue-rotate-animation-timing-function);
        animation-iteration-count: var(--hue-rotate-animation-iteration-count);
      }
    }
  }
</style>
