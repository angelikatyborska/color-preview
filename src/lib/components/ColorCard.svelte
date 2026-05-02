<script lang="ts">
  import {
    getAlpha,
    getBlue,
    getGreen,
    getHex,
    getOriginalString,
    getRed,
    type ParsedColor
  } from '$lib/color';

  interface Props {
    color: ParsedColor;
  }

  const { color }: Props = $props();
</script>

<div class="card">
  <div class="text">
    <h3 class="title">
      {#if color.status === 'ok'}
        {getHex(color)}
      {:else}
        Invalid color
      {/if}
    </h3>
    <div>
      {#if color.status === 'ok'}
        <div>R: {getRed(color)}</div>
        <div>G: {getGreen(color)}</div>
        <div>B: {getBlue(color)}</div>
        <div>A: {getAlpha(color)}</div>
      {/if}
    </div>
    <div class="original">Original input: {getOriginalString(color)}</div>
  </div>
  <div
    class="preview"
    style={color.status === 'ok' ? `background-color: ${color.originalString}` : ''}
  >
    {#if color.status === 'error'}
      ?
    {/if}
  </div>
</div>

<style>
  .card {
    font-family: var(--code-font-family);
    display: grid;
    grid-template-areas: 'text preview';
    padding: var(--spacing-md);
    border-radius: var(--spacing-sm);
    border: 1px solid var(--grayscale-70);
    grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
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
  }

  .preview {
    grid-area: preview;
    border-radius: var(--spacing-xs);
    position: relative;
    background: white;
    overflow: hidden;
    aspect-ratio: 1/1;
    font-size: 100px;
    text-align: center;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-top: var(--spacing-sm) solid white;
    border-left: var(--spacing-sm) solid white;
    border-right: var(--spacing-sm) solid black;
    border-bottom: var(--spacing-sm) solid black;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 200%;
      height: 200%;
      background-color: black;
      z-index: -1;
      transform-origin: top right;
      rotate: -45deg;
    }
  }
</style>
