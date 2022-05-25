<script>
  import { fly } from 'svelte/transition';
  import { signin, signup, mainpage } from "../store/writableStore.js";


  function signupClick(){
      signup.update(()=>{return true});
		  signin.update(()=>{return false});
	}

  let email = ''
  let password = ''
  let result = null
	
	async function doLogin () {
		const res = await fetch('http://127.0.0.1:8080/auth/login', {
            headers:{'Content-Type':'application/json'},
			method: 'POST',
			body: JSON.stringify({
				email,
        password
			})
		})
        const loginStatus = await res.status;
        const jwtToken = await res.body;
        console.log(jwtToken);
        if (loginStatus == 201) {
            signin.update(()=>{return false});
            mainpage.update(()=>{return true});
    }
	}

</script>

<div in:fly="{{ y: 150, duration: 1000 }}" class="hero min-h-screen bg-base-200" >
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
              <span class="label-text">Password</span>
            </div>
            <input type="text" placeholder="password" bind:value={password} class="input input-bordered">
            <div class="label">
              <button on:click={signupClick} class="label-text-alt link link-hover">아이디가 없으신가요? 회원가입</button>
            </div>
          </div>
          <div class="form-control mt-6">
            <button on:click={doLogin} class="btn btn-primary">로그인</button>
          </div>
        </div>
      </div>
    </div>
  </div>