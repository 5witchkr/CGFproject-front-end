<script>
// import { onMount } from 'svelte';

  import { fade } from 'svelte/transition';
  import { mainpage,createpage, detailpage, detailId, userprofile, usernickname } from "../store/writableStore.js";

  function postClick(){
      createpage.update(()=>{return true});
		  mainpage.update(()=>{return false});
	}

  function userprofileClick(){
    usernickname.update(()=> {return "이제될껄"} )
      userprofile.update(()=>{return true});
		  mainpage.update(()=>{return false});
	}

  //todo page num setting
let page = 0;

  $: posts = fetch(`http://127.0.0.1:3000/post/page/${page}`).then(response => response.json())
// onMount(async () => {
// 		const response = await fetch('http://127.0.0.1:3000/post', {
//             mode: 'cors',
//             //cookie
//             credentials: 'include',
//             headers:{'Content-Type':'application/json'}
// 		});
//     const data = await response.json();
//     console.log(data);
//   })

//   posts = post;


function postDetailClick(id){
      detailId.update(()=>{return id});
      detailpage.update(()=>{return true});
		  mainpage.update(()=>{return false});
	}
</script>



<div in:fade="{{ duration: 500 }}" class="drawer h-screen w-full rounded">
    <input id="my-drawer" type="checkbox" class="drawer-toggle">
    <div class="drawer-content">

      <label for="my-drawer" class="btn btn-primary drawer-button" style="margin-top:5vh; margin-left:1vh; float:left;">내 정보</label>
      <button on:click={postClick} class="btn btn-primary drawer-button" style="margin-top:5vh; margin-left:1vh; float:left;">글 작성</button>
      <div style="margin-top: 10vh;"></div>
      <div>my-project</div>

      <!-- Page content here -->
    {#await posts}
    <p>...Loading</p>
    {:then posts }
    {#each posts as article}
    <div class="card w-96 bg-primary text-primary-content" style="width: auto; margin-top: 2vh;">
        <div class="card-body">
          <h2 class="card-title">{article.title}</h2>
          <p>{article.nickname}</p>
          <p>{article.date}</p>
          <div class="card-actions justify-end">
            <button on:click={postDetailClick(article._id)} class="btn">구경하기</button>
          </div>
        </div>
    </div>
    {/each}
    {/await}


    </div> 
    <div class="drawer-side">
      <label for="my-drawer" class="drawer-overlay"></label>
      <ul class="menu p-4 overflow-y-auto w-40 bg-base-100 text-base-content">
        <!-- Sidebar content here -->
        <div class="flex flex-col w-full">
            <button on:click={userprofileClick} class="grid h-10 card bg-base-300 rounded-box place-items-center" style="margin-top: 5vh;">가입정보</button> 
            <div class="divider"></div> 
            <div class="grid h-10 card bg-base-300 rounded-box place-items-center">내 게시글</div>
            <div class="divider"></div> 
            <div class="grid h-10 card bg-base-300 rounded-box place-items-center">이벤트</div>
            <div class="divider"></div> 
            <div class="grid h-10 card bg-base-300 rounded-box place-items-center">설정</div>
          </div>
      </ul>
    </div>
</div>