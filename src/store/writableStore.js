import { writable } from "svelte/store";

export let signin = writable(true);
export let signup = writable(false);
export let mainpage = writable(false);
