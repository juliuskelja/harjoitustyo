<script>
  import { fly, blur } from 'svelte/transition';
  import { Shadow } from 'svelte-loading-spinners';
</script>

<div class="backdrop" on:click />

<div class="modal" in:fly={{ y: 200, duration: 2000 }} out:blur>
  <h2>Kissaasi luodaan!</h2>
  <div id="spinneri"><Shadow size="40" unit="px" /></div>
</div>

<style>
  .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.75);
    z-index: 10;
  }
  .modal {
    padding: 1rem;
    position: fixed;
    top: 30%;
    left: 34.2%;
    width: 30%;
    background: white;
    z-index: 100;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  }

  #spinneri {
    display: flex;
    justify-content: center;
    padding: 2em;
  }
</style>
