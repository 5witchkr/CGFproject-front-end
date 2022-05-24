<script>
  import { fade } from 'svelte/transition';
  import { mainpage,createpage } from "../store/writableStore.js";

  function postClick(){
      createpage.update(()=>{return true});
		  mainpage.update(()=>{return false});
	}


</script>



<div in:fade="{{ duration: 500 }}" class="drawer h-screen w-full rounded">
    <input id="my-drawer" type="checkbox" class="drawer-toggle">
    <div class="drawer-content">
      <!-- Page content here -->
      <label for="my-drawer" class="btn btn-primary drawer-button" style="margin-top:5vh; margin-left:1vh; float:left;">내 정보</label>
      <button on:click={postClick} class="btn btn-primary drawer-button" style="margin-top:5vh; margin-left:1vh; float:left;">글 작성</button>
      <div style="margin-top: 10vh;"></div>
      <div>my-project</div>


      <div class="card w-96 bg-primary text-primary-content" style="width: auto; margin-top: 2vh;">
        <div class="card-body">
          <h2 class="card-title">🚀홍길동's 포트폴리오</h2>
          <p>🙂성실한 신입 개발자🙂</p>
          <div class="card-actions justify-end">
            <button class="btn">구경하기</button>
          </div>
        </div>
    </div>
    <div class="card w-96 bg-primary text-primary-content" style="width: auto; margin-top: 2vh;">
        <div class="card-body">
          <h2 class="card-title">🚀고양이's 포트폴리오</h2>
          <p>😸😸프론트엔드 지망생😸😸</p>
          <div class="card-actions justify-end">
            <button class="btn">구경하기</button>
          </div>
        </div>
    </div>


    </div> 
    <div class="drawer-side">
      <label for="my-drawer" class="drawer-overlay"></label>
      <ul class="menu p-4 overflow-y-auto w-40 bg-base-100 text-base-content">
        <!-- Sidebar content here -->
        <div class="flex flex-col w-full">
            <button class="grid h-10 card bg-base-300 rounded-box place-items-center" style="margin-top: 5vh;">가입정보</button> 
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