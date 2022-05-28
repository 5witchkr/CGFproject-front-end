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
    let contents = ''
    let nickname = '이제될껄'



  async function createPost() {
    console.log(quill.root.innerHTML);
		const res = await fetch('http://127.0.0.1:3000/post', {
            headers:{'Content-Type':'application/json'},
            //cookie
            credentials: 'include',
			method: 'POST',
			body: JSON.stringify({
        nickname,
        title,
        contents: quill.root.innerHTML
			})
		})
        const loginStatus = await res.status;
        if (loginStatus == 201) {
          createpage.update(()=>{return false});
		      mainpage.update(()=>{return true});
    }
	}





</script>

<style>

  main {
    text-align: center;
    padding: 1em;
    max-width: 500px;
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

<main in:fly="{{ x: 150, duration: 1000 }}" out:fly="{{ x: 150, duration: 500 }}" style="color:black;">
    <div style="margin-top: 20px;"></div>
    <div style='background-color:#a3a3a3; border-radius:4%'>
    <h1 style="text-align:left; margin-left:20px">제목</h1>
    <input type="text" placeholder="Type here" bind:value={title} class="input input-bordered w-full max-w-xs" style='background-color:lightgrey' />
  <h1 style="text-align:left; margin-left:20px">내용</h1>
  <div id="editor" style='background-color:lightgrey'/>
  <div style="margin-top: 10px; display:flex; justify-content:space-between;">
  <button on:click={postCancel} class="btn btn-primary">취소하기</button>
  <button on:click={createPost} class="btn btn-primary">작성하기</button>
</div>
</div>
</main>