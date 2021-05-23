import {writable} from "svelte/store";

const kissastore = writable({
  nimi: "",
  ika: "",
  luonne: "",
  miau: "",
});

export default kissastore;