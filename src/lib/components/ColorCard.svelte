<script lang="ts">
  import { type ColorFormat, getOriginalString, type ParsedColor, formatColor } from '$lib/color';

  interface Props {
    color: ParsedColor;
    format: ColorFormat;
  }

  const { color, format }: Props = $props();

  const formatted = $derived.by(() => {
    return formatColor(color, format);
  });
</script>

<div class="card">
  <div class="text">
    <h3 class="title">
      {#if color.status === 'ok'}
        <code>{formatted}</code>

        {#if typeof color.duplicateOf === 'number'}
          <span class="duplicate">duplicate of #{color.duplicateOf + 1}</span>
        {/if}
      {:else}
        Invalid color
      {/if}
    </h3>
    <dl class="original">
      <dt>Original input #{color.originalIndex + 1}</dt>
      <dd>
        {#if getOriginalString(color).trim()}
          <code>{getOriginalString(color)}</code>
        {:else}
          <em>empty</em>
        {/if}
      </dd>
    </dl>
  </div>
  <div
    class="preview"
    style={color.status === 'ok' ? `--color-card-preview-background-color: ${formatted}` : ''}
  >
    {#if color.status === 'error'}
      <span class="content">?</span>
    {/if}
  </div>
</div>

<style>
  .card {
    display: grid;
    grid-template-areas: 'text preview';
    padding: var(--spacing-md);
    grid-template-columns: minmax(0, 10fr) minmax(0, 3fr);
    background-color: var(--background-color-alt);
  }

  .text {
    grid-area: text;
    display: grid;
    grid-template-rows: auto 1fr auto;
  }

  .card,
  .text {
    grid-gap: var(--spacing-md);
  }

  .title {
    margin: 0;
    font-weight: 700;
    font-size: var(--font-size-h5);

    .duplicate {
      white-space: nowrap;
      font-weight: 400;
      font-size: var(--font-size-p);
      font-family: var(--paragraph-font-family);
      color: var(--text-color-alt);
    }
  }

  .original {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);

    dt {
      font-weight: 700;
      font-size: var(--font-size-small);
    }

    dd {
      margin: 0;
    }
  }

  .preview {
    container-type: inline-size;
    grid-area: preview;
    position: relative;
    background: white;
    overflow: hidden;
    aspect-ratio: 1/1;
    text-align: center;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-top: 6px solid white;
    border-left: 6px solid white;
    border-right: 6px solid black;
    border-bottom: 6px solid black;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 200%;
      height: 200%;
      background-color: black;
      transform-origin: top right;
      rotate: -45deg;
      z-index: 1;
    }

    &:after {
      content: '';
      position: absolute;
      inset: 0;
      background-color: var(--color-card-preview-background-color, var(--background-color-alt));
      z-index: 1;
    }

    .content {
      font-size: 50cqi;
      position: relative;
      z-index: 2;
      font-family: var(--heading-font-family);
      color: rgb(from var(--text-color-alt) r g b / 0.5);
      user-select: none;
    }
  }
</style>
