<script>
  import { page } from '$app/stores';  
  import { user } from '$lib/stores/user';
  import { goto } from '$app/navigation';
  import { onDestroy } from 'svelte';

  let formData = {
    userType: "",
    username: "",
    password: ""
  };

  // ✅ currentUser 구독
  let currentUser;
  const unsubscribe = user.subscribe(v => (currentUser = v));
  onDestroy(unsubscribe);

  function handleSubmit(e) {
    e.preventDefault();

    // 스토어에 저장
    user.set({ username: formData.username, role: formData.userType });

    // ✅ userType 에 따라 분기
    if (formData.userType === 'user') {
      goto('/user/main');     // 사용자 메인
    } else {
      goto('/admin/main');    // 관리자 메인
    }
  }

  // ✅ 로그아웃 함수
  function logout() {
    user.set(null);
    goto('/login', { replaceState: true }); // 뒤로가기 방지
  }
</script>

{#if $page.url.pathname !== '/login' && $page.url.pathname !== '/signup'}
<header style="display:flex; justify-content:space-between; padding:10px; background:#333; color:white;">
  <h1 style="margin:0;">DS Asset</h1>
  {#if currentUser}
    <div>
      <span>{currentUser.username}님</span>
      <button on:click={logout} style="margin-left:10px;">로그아웃</button>
    </div>
  {/if}
</header>
{/if}

<main style="padding:20px;">
  <slot /> <!-- 페이지 콘텐츠 들어감 -->
</main>

<style>
  /* ✅ 전역 배경색 흰색 */
  html, body {
    margin: 0;
    padding: 0;
    min-height: 100%;
    background: #ffffff; /* 흰색 배경 */
    font-family: Arial, sans-serif;
  }
</style>

