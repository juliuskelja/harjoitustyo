<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import kissastore from './kissastore';
  const dispatch = createEventDispatcher();

  const luo = () => {
    dispatch('luodaan');
  };

  let nayta = false;
  const lisaaTiedot = () => {
    kissastore.set({
      nimi: kissaNimi,
      ika: kissaIka,
      luonne: kissaLuonne.toLowerCase(),
      miau: kissaMiau,
    });
    setTimeout(() => {
      nayta = true;
    }, 2500);
  };
  const luoUusi = () => {
    nayta = false;
    location.reload();
  };

  let kissaNimi = '';
  let kissaIka = '';
  let kissaLuonne = '';
  let kissaMiau = '';
  let cats;
  let tyhja = '';

  function tulostaTiedot() {
    console.log(kissaNimi);
    console.log(kissaIka);
    console.log(kissaLuonne);
    console.log(kissaMiau);
  }

  //RestAPI
  onMount(async () => {
    const response = await fetch(`https://api.thecatapi.com/v1/images/search`);
    cats = await response.json();
  });

  //Validointi
  const onkoValidi = (teksti) => teksti.trim().length > 0;
  $: validiNimi = onkoValidi(kissaNimi);

  let virheviesti = 'Tähdellä merkityt kentät ovat pakollisia';
</script>

<div id="lomake">
  {#if !nayta}
    <form id="luokisu" on:submit|preventDefault={tulostaTiedot}>
      <p>Nimi: *</p>
      <p>
        <input type="text" class:tyhja={!validiNimi} bind:value={kissaNimi} />
      </p>

      <p>Ikä:</p>
      <p>
        <label for="valkoinen"
          ><input
            type="radio"
            id="pentu"
            name="ika"
            value="pentu"
            bind:group={kissaIka}
          /> Pentu</label
        >
        <label for="raidallinen"
          ><input
            type="radio"
            id="aikuinen"
            name="ika"
            value="aikuinen"
            bind:group={kissaIka}
          /> Aikuinen</label
        >
        <label for="oranssi"
          ><input
            type="radio"
            id="seniori"
            name="ika"
            value="seniori"
            bind:group={kissaIka}
          /> Seniori</label
        >
      </p>

      <p>Luonne:</p>
      <p>
        <textarea cols="40" rows="5" bind:value={kissaLuonne} />
      </p>

      <p>Miau:</p>
      <p>
        <label for="miau"
          ><input
            type="checkbox"
            id="miau"
            value="miau"
            bind:group={kissaMiau}
          />
          Miau!</label
        >
        <label for="roar"
          ><input
            type="checkbox"
            id="roar"
            value="roar"
            bind:group={kissaMiau}
          />
          Roar!</label
        >
        <label for="miu"
          ><input type="checkbox" id="miu" value="miu" bind:group={kissaMiau} />
          Miu!</label
        >
        <label for="mayh"
          ><input
            type="checkbox"
            id="mayh"
            value="mäyh"
            bind:group={kissaMiau}
          />
          Mäyh!</label
        >
      </p>
    </form>

    {#if !validiNimi}
      <div id="virhe">{virheviesti}</div>
    {/if}

    <footer>
      <button
        class="nappula"
        on:click={luo}
        on:click={lisaaTiedot}
        disabled={!validiNimi}>Luo kissa</button
      >
    </footer>
  {:else}
    <h1>Kissasi {$kissastore.nimi}</h1>
    {#each cats as kissa}
      <div id="kissakuva"><img src={kissa.url} alt="Kissa" /></div>
    {/each}

    {#if $kissastore.ika === tyhja}
      <p>{$kissastore.nimi}n ikä ei ole tiedossa.</p>
    {:else}
      <p>{$kissastore.nimi} on iältään {$kissastore.ika}.</p>
    {/if}

    {#if $kissastore.luonne === tyhja}
      <p>{$kissastore.nimi} on kissa, joka ei tee mitään.</p>
    {:else}
      <p>Se on {$kissastore.luonne}.</p>
    {/if}

    {#if $kissastore.miau === tyhja}
      <p>{$kissastore.nimi} ei sano mitään.</p>
    {:else}
      <p>Kun {$kissastore.nimi} puhuu, se sanoo aina "{$kissastore.miau}"!</p>
    {/if}

    <footer>
      <button class="nappula" on:click={luoUusi}>Luo uusi kissa</button>
    </footer>
  {/if}
</div>

<style>
  .nappula {
    cursor: pointer;
  }

  #virhe {
    font-style: italic;
    padding: 1em;
    text-align: center;
  }
  img {
    max-width: 30em;
  }
  #kissakuva {
    text-align: center;
    margin-bottom: 3em;
  }
  footer {
    text-align: center;
  }
  #lomake {
    text-align: left;
    margin: 0 auto;
    width: 30%;
    border: 3px double #ccc;
    padding: 2em;
  }
  h1 {
    text-align: center;
    color: grey;
    font-family: georgia;
    letter-spacing: 5px;
    padding: 5px;
    font-size: 1.5em;
    font-weight: 100;
    border-bottom: 1px dotted black;
    margin-bottom: 1.5em;
  }
</style>
