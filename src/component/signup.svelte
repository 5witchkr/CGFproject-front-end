
<script>
    import { fly } from 'svelte/transition';
    import { signin, signup, mainpage, emailsend } from "../store/writableStore.js";
  
    function signinClick(){
        signin.update(()=>{return true});
        signup.update(()=>{return false});
        emailsend.update(()=>{return 0});
      }
    function emailSendClick(){
      emailsend.update(joincunt => joincunt+1);
      }

    let email = ''
    let emailnumber = ''
    let nickname = ''
    let password = ''
    let company = false
    let result = null


	async function doJoin () {
		const res = await fetch('http://127.0.0.1:3000/auth/signup', {
            headers:{'Content-Type':'application/json'},
			method: 'POST',
			body: JSON.stringify({
				email,
        password,
        nickname,
        company
			})
		})
        const json = await res.json()
		result = JSON.stringify(json)
        alert(JSON.parse(result).resultMsg)
        if (JSON.parse(result).resultCode == 11) {
            loginClick();
        }
	}

  async function testmailer () {
    emailsend.update(joincunt => joincunt+1);
		const res = await fetch('https://ee4b-58-141-212-168.ngrok.io/mailauth/testmailer', {
        headers:{'Content-Type':'application/json'},
			  method: 'POST',
		    body: JSON.stringify({
				email
			})
		})
        const json = await res.json()
		result = JSON.stringify(json)
        alert(JSON.parse(result).resultMsg)
        if (JSON.parse(result).resultCode == 11) {
            console.log("err");
        }
	}
  

  </script>

<div in:fly="{{ y: -150, duration: 1000 }}" class="hero min-h-screen bg-base-200" >
    <div class="hero-content flex-col lg:flex-row-reverse">
      <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <div class="card-body">
          <div class="form-control">
            <span class="label-text">회원가입 페이지</span>
            <div class="label">
              <span class="label-text">Email</span>
            </div>
            {#if $emailsend == 0}
            <input type="text" placeholder="email" bind:value={email} class="input input-bordered">
            {/if}
            {#if $emailsend >= 1}
            <input type="text" placeholder="email" bind:value={email} class="input input-bordered" readonly>
            {/if}
          </div>
          {#if $emailsend == 0}
          <button on:click={testmailer} class="btn btn-primary">인증번호 보내기</button>
          {/if}
          {#if $emailsend == 1}
          <input type="text" placeholder="인증번호를 입력해주세요" bind:value={emailnumber} class="input input-bordered">
          <button on:click={emailSendClick} class="btn btn-primary">인증하기</button>
          {/if}
          {#if $emailsend == 2}
          <div class="form-control">
            <div class="label">
              <span class="label-text">Password(4자리 이상)</span>
            </div>
            <input type="text" placeholder="password" bind:value={password} class="input input-bordered">
          </div>
          <div class="form-control">
            <div class="label">
              <span class="label-text">Nickname</span>
            </div>
            <input type="text" placeholder="nickname" bind:value={nickname} class="input input-bordered">
          </div>
          <div class="form-control">
            <label class="label cursor-pointer">
              <span class="label-text">고용주 이신가요?</span> 
              <input type="checkbox" bind:checked={company} class="checkbox checkbox-primary">
            </label>
          </div>
          <button on:click={doJoin} class="btn btn-primary">가입하기</button>
          {/if}
          <div class="form-control mt-6">
            <button on:click={signinClick} class="label-text-alt link link-hover">가입을 이미 하셨나요? 로그인</button>
          </div>
        </div>
      </div>
    </div>
  </div>