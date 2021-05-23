<script>
  import Lomake from './Lomake.svelte';
  import Loading from './Loading.svelte';

  let ladataan = true;
  const luoKissa = () => {
    ladataan = false;
    setTimeout(() => {
      ladataan = true;
    }, 2000);
  };
</script>

<main>
  <h1>Luo itsellesi oma kissa</h1>

  <Lomake on:luodaan={luoKissa} />

  {#if !ladataan}
    <Loading />
  {/if}
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: grey;
    font-family: georgia;
    letter-spacing: 3px;
    padding: 5px;
    font-size: 2.5em;
    font-weight: 100;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    background-color: #ccc;
    margin-bottom: 1.5em;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
