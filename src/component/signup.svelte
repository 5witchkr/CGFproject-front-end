
<script>
    import { fly } from 'svelte/transition';
    import { signin, signup, mainpage } from "../store/writableStore.js";
  

    function signinClick(){
        signin.update(()=>{return true});
        signup.update(()=>{return false});
      }

    let email = ''
	let nickname = ''
    let password = ''
    let result = null
	
	async function doJoin () {
		const res = await fetch('http://127.0.0.1:3000/auth/signup', {
            headers:{'Content-Type':'application/json'},
			method: 'POST',
			body: JSON.stringify({
				email,
				nickname,
                password
			})
		})
        const json = await res.json()
		result = JSON.stringify(json)
        alert(JSON.parse(result).resultMsg)
        if (JSON.parse(result).resultCode == 11) {
            loginClick();
        }
	}
  
  </script>

<div in:fly="{{ y: -150, duration: 1000 }}" class="hero min-h-screen bg-base-200" >
    <div class="hero-content flex-col lg:flex-row-reverse">
      <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <div class="card-body">
          <div class="form-control">
            <div class="label">
              <span class="label-text">Email</span>
            </div>
            <input type="text" placeholder="email" bind:value={email} class="input input-bordered">
          </div>
          <div class="form-control">
            <div class="label">
              <span class="label-text">Nickname</span>
            </div>
            <input type="text" placeholder="nickname" bind:value={nickname} class="input input-bordered">
          </div>
          <div class="form-control">
            <div class="label">
              <span class="label-text">Password (4자리 이상)</span>
            </div>
            <input type="text" placeholder="password" bind:value={password} class="input input-bordered">
            <div class="label">
              <button on:click={signinClick} class="label-text-alt link link-hover">로그인 하러가기</button>
            </div>
          </div>
          <div class="form-control mt-6">
            <button class="btn btn-primary">회원가입</button>
          </div>
        </div>
      </div>
    </div>
  </div>