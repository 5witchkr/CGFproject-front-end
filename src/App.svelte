<script>
	import Signin from "./component/signin.svelte";
	import Signup from "./component/signup.svelte";
	import Main from "./component/main.svelte";
	import Create from "./component/createPost.svelte";
	import Detail from "./component/detailPost.svelte";
	import { elapsed } from "./store/readableStore";
	import { signin, signup, mainpage, createpage } from "./store/writableStore.js";
	

</script>

<main>
	
<div style="text-align: center; background-color:blanchedalmond; height: 100vh;">
	<div class="mockup-phone" style="margin-top:10vh">
		<div class="camera"></div> 
		<div class="display">
		  	<div class="artboard artboard-demo phone-1">
				
				{#if $elapsed > 0}
				{#if $signin}
				<Signin/>
				{/if}
				{/if}
				{#if $signup}
				<Signup/>
				{/if}
				{#if $mainpage}
				<Main/>
				{/if}
				{#if $createpage}
				<Create/>
				{/if}
				<!-- <Detail/> -->

				
			</div>
		</div>
	  </div>
</div>
</main>

<style>

</style>