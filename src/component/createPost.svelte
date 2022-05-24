<script>
      import { fly } from 'svelte/transition';
      import { mainpage,createpage } from "../store/writableStore.js";
	import {  onMount } from 'svelte'
	import Quill from "quill";
	let quill = null;



    function postCancel(){
      createpage.update(()=>{return false});
		  mainpage.update(()=>{return true});
	}
	 
	
  onMount( () => { 	
		let container = document.getElementById('editor');
		quill = new Quill(container, {
    modules: {
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold","underline", "strike","link", "code-block","image"]
      ]
    },
    placeholder: "",
    theme: "snow" // or 'bubble'
  });
	})




    let title = ''
    let content = ''
    let nickname = ''



    async function createPost () {
		const res = await fetch('http://127.0.0.1:3000/post', {
            headers:{'Content-Type':'application/json'},
			method: 'POST',
			body: JSON.stringify({
				nickname,
                title,
                content
			})
		})
        const loginStatus = await res.status;
        if (loginStatus == 201) {
            signin.update(()=>{return false});
            mainpage.update(()=>{return true});
    }
	}





</script>

<style>

  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  #editor {
    height: 300px;
    border-color: gray;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<svelte:head>
	<link href="//cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
</svelte:head>

<main in:fly="{{ x: 150, duration: 1000 }}" out:fly="{{ x: 150, duration: 500 }}" style="color:lightgray;">
    <div style="margin-top: 20px;"></div>
    <h1 style="text-align:left; margin-left:20px">제목</h1>
    <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
  <h1 style="text-align:left; margin-left:20px">내용</h1>
  <div id="editor"/>
  <div style="margin-top: 10px; display:flex; justify-content:space-between;">
  <button on:click={postCancel} class="btn btn-primary">취소하기</button>
  <button class="btn btn-primary">작성하기</button>
</div>
</main>