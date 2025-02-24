<script lang="ts">
  import { onMount } from 'svelte';
  import { Application } from '@splinetool/runtime';
  
  let canvas: HTMLCanvasElement;
  
  onMount(() => {
    const app = new Application(canvas);
    // Replace this URL with your own Spline scene URL
    app.load('https://prod.spline.design/your-scene-id')
      .then(() => {
        console.log('Spline scene loaded');
      })
      .catch(console.error);
  });
</script>

<canvas 
  bind:this={canvas}
  class="w-full h-full absolute top-0 left-0 pointer-events-none"
></canvas>

<style>
  canvas {
    opacity: 0.8;
  }
</style>
