<script>
  import { user } from '$lib/stores/user';
  import { goto } from '$app/navigation';
  import { onDestroy } from 'svelte';

  let currentUser;
  const unsubscribe = user.subscribe(v => currentUser = v);
  onDestroy(unsubscribe);

  async function logout() {
    console.log("✅ 로그아웃 버튼 클릭됨");  // 디버깅용 로그
    user.set(null);                        // 사용자 상태 초기화
    await goto('/login');                  // 로그인 페이지로 이동
  }
</script>

<!-- 1. 맨 위 진회색 바 -->
<div class="topbar">
  <div class="topbar-inner">
    <span class="logo">DS Asset</span>
    {#if currentUser}
      <div class="user-box">
        <span>{currentUser?.id} 님</span>
        <button on:click={logout}>로그아웃</button>
      </div>
    {/if}
  </div>
</div>

<!-- 2. 그 아래 반투명 네비바 -->
<header class="site-header">
  <div class="nav">
    <div class="links">
      <a href="/admin/main">home</a>
      <a href="/admin/assets">asset list(자산목록)</a>
      <a href="/admin/assets/new">asset registration(자산등록)</a>
      <a href="/admin/asset-movements">asset transfer(자산이동)</a>
    </div>
  </div>
</header>

<slot />

<style>
  /* ===== 1. 진회색 고정 바 ===== */
  .topbar {
    position: fixed;
    top: 0; left: 0; right: 0;
    height: 52px;
    background: #333;
    color: white;
    z-index: 100;
  }
  .topbar-inner {
  width: 100%;     /* 화면 전체 너비 사용 */
  margin: 0;       /* 가운데 정렬 제거 */
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1px 16px; /* 여백은 원하면 줄이거나 0으로 */
}
  .logo {
    font-weight: bold;
     margin-left: 35px; 
  }
  .user-box {
    display: flex;
    gap: 20px;
    align-items: center;
     transform: translateX(-45px); /* ← 글자만 오른쪽으로 이동 */
  }
  .user-box button {
    background: #555;
    color: white;
    border: none;
    padding: 4px 8px;
    border-radius: 4px;
    cursor: pointer;
  }

  /* ===== 2. 반투명 네비바 ===== */
  .site-header {
    position: sticky;
    top: 52px;   /* ← 진회색 바 바로 아래 붙도록 */
    z-index: 90;
  }
  .nav {
    max-width: 1080px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    gap: 20px;
    padding: 12px 16px;
    border-radius: 12px;
    background: rgba(255,255,255,0.8);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }
  .links a {
    text-decoration: none;
    color: #222;
    padding: 8px 12px;
    border-radius: 8px;
    transition: background .2s;
  }
  .links a:hover {
    background: #f1f5ff;
    color: #0a3cff;
  }
</style>
