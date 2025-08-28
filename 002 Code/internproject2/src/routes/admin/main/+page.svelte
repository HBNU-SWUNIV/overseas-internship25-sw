<script>
  import { user } from '$lib/stores/user';
  import { goto } from '$app/navigation';
  import { onDestroy } from 'svelte';

  let currentUser;
  const unsubscribe = user.subscribe(value => currentUser = value);
  onDestroy(unsubscribe);

  function logout() {
    user.set(null);
    goto('/login');
  }
</script>



<!-- ===== HERO ===== -->
<section class="hero">
  <div class="hero-media"></div>
  <div class="hero-overlay"></div>



  <div class="hero-inner">
    <p class="eyebrow">DS asset</p>
    <h1>관리자용 종합자산관리</h1>
    <p class="sub">
      재무관련 내용 확인 가능서비스 입니다.<br/>
      신뢰와 성과로 내일의 가치를 설계하세요.
    </p>

    <div class="hero-ctas">
      <a class="btn primary" href="/assets/new">자산 등록 바로가기</a>
      <a class="btn ghost" href="/admin/assets">자산 목록 보기</a>
    </div>

    
  </div>
</section>

<!-- ===== FEATURE ICONS ===== -->
<section class="section features">
  <div class="container grid4">
    <div class="feature">
      <div class="ico">
        <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true"><path fill="currentColor" d="M3 3h2v18H3V3Zm16 8h2v10h-2V11ZM11 8h2v13h-2V8Zm-4 5h2v8H7v-8Zm8-9h2v17h-2V4Z"/></svg>
      </div>
      <h4>분석</h4>
      <p>데이터 기반 위험/성과 분석으로 의사결정을 돕습니다.</p>
    </div>

    <div class="feature">
      <div class="ico">
        <svg viewBox="0 0 24 24" width="28" height="28"><path fill="currentColor" d="M12 2a5 5 0 0 1 5 5v2h1a3 3 0 0 1 3 3v6a4 4 0 0 1-4 4h-2v-2h2a2 2 0 0 0 2-2v-6a1 1 0 0 0-1-1h-1v2h-2V7a3 3 0 1 0-6 0v7H9V8H7v9H5a2 2 0 0 0-2 2v3H1v-3a4 4 0 0 1 4-4h2V7a5 5 0 0 1 5-5Z"/></svg>
      </div>
      <h4>업무 지원</h4>
      <p>대여·반납·이동 이력 관리로 현장 운영을 돕습니다.</p>
    </div>

    <div class="feature">
      <div class="ico">
        <svg viewBox="0 0 24 24" width="28" height="28"><path fill="currentColor" d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm-9 9a9 9 0 0 1 18 0Z"/></svg>
      </div>
      <h4>고객</h4>
      <p>사용자 중심 단계별 워크플로로 누구나 쉽게.</p>
    </div>

    <div class="feature">
      <div class="ico">
        <svg viewBox="0 0 24 24" width="28" height="28"><path fill="currentColor" d="M4 3h16v18H4Zm2 2v14h12V5ZM7 7h4v2H7Zm0 4h10v2H7Zm0 4h10v2H7Z"/></svg>
      </div>
      <h4>업적</h4>
      <p>정확한 리포트/대시보드로 성과를 투명하게 공유.</p>
    </div>
  </div>
</section>

<!-- ===== SPLIT ABOUT ===== -->
<section class="section split">
  <div class="container split-grid">
    <div class="text">
      <h3>최고의 종합금융 컨설팅 파트너</h3>
      <p class="desc">
        리스크 관리와 효율적 자산 운영을 위한 체계적 프로세스를 제공합니다.<br/>
        표준화된 절차와 유연한 정책으로 다양한 현장 상황에 빠르게 대응합니다.
      </p>
      <a class="btn link" href="/movements">이동/대여 관리 살펴보기 →</a>
    </div>
    <div class="media"><div class="photo about" /></div>
  </div>
</section>

<!-- ===== CARDS (3) ===== -->
<section class="section cards">
  <div class="container">
    <h3 class="headline">FNsolution</h3>
    <div class="card-grid">
      <a class="card" href="/assets">
        <div class="thumb t1" /><div class="shade" />
        <div class="cap"><b>모건정보</b><span>안전한 자산 등록/조회</span></div>
      </a>
      <a class="card" href="/movements">
        <div class="thumb t2" /><div class="shade" />
        <div class="cap"><b>인계/반납</b><span>대여·반납·이동 워크플로</span></div>
      </a>
      <a class="card" href="/reports">
        <div class="thumb t3" /><div class="shade" />
        <div class="cap"><b>보고서</b><span>한 번에 PDF/CSV 출력</span></div>
      </a>
    </div>
  </div>
</section>

<style>
  :root{
    --ink:#0e1116; --muted:#6c7485; --bg:#f5f7fb; --white:#fff;
    --brand:#0a66ff; --brand-2:#5aa9ff; --max:1200px;
  }
:global(body) {
  margin: 0;
  background: linear-gradient(180deg, rgba(10,28,60,.55), rgba(10,20,40,.65)),
              radial-gradient(1200px 600px at 20% 10%, #1a3a7d, #0f214a);
}

  /* ===== NAVBAR ===== */
  .navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  /* 기존 회색 반투명 배경 제거 */
  background: transparent; 
  backdrop-filter: none;
  z-index: 10;
}
.nav-container {
  max-width: var(--max);
  margin: 0 auto;
  padding: 12px 20px;
  display: flex;
  justify-content: space-between; /* 좌: 로고, 우: 로그인 */
  align-items: center;
}

.nav-actions {
  display: flex;
  align-items: center;
}
  .logo {
    font-size: 1.4rem;
    font-weight: bold;
    color: white;
    text-decoration: none;
  }
  .nav-actions .login-btn {
    background: linear-gradient(180deg, var(--brand), var(--brand-2));
    padding: 8px 14px;
    border-radius: 8px;
    color: white;
    text-decoration: none;
    font-weight: 500;
    transition: opacity 0.2s;
  }
  .nav-actions .login-btn:hover {
    opacity: 0.9;
  }

  .container{ max-width:var(--max); margin:0 auto; padding:0 20px; }

  /* ===== HERO */
.hero {
  position: relative;
  height: 58vh;
  min-height: 520px;
  padding-top: 0; /* 여백 제거 */
  background: linear-gradient(180deg, rgba(10,28,60,.55), rgba(10,20,40,.65)),
              radial-gradient(1200px 600px at 20% 10%, #1a3a7d, #0f214a);
}
  .hero-media{
    position:absolute; inset:0;
    background: linear-gradient(180deg, rgba(10,28,60,.55), rgba(10,20,40,.65)),
                radial-gradient(1200px 600px at 20% 10%, #1a3a7d, #0f214a);
  }
  .hero-overlay{
    position:absolute; inset:auto 0 0 0; height:140px;
    background:linear-gradient(180deg, transparent, var(--bg));
    pointer-events: none;
  }
  .hero-inner{
    position:relative; z-index:2; height:100%;
    display:flex; flex-direction:column; justify-content:center;
    max-width:var(--max); margin:0 auto; padding:0 24px;
    color:var(--white);
  }
  .eyebrow{ letter-spacing:.12em; text-transform:uppercase; opacity:.9; margin-bottom:10px; }
  .hero h1{ font-weight:800; line-height:1.12; font-size:clamp(28px, 4.8vw, 52px); margin:0 0 10px 0; }
  .sub{ opacity:.95; font-size:clamp(14px, 1.3vw, 18px); }
  .hero-ctas{ margin-top:18px; display:flex; gap:10px; flex-wrap:wrap; }

  /* Buttons */
  .btn{ display:inline-flex; align-items:center; gap:8px;
    padding:12px 16px; border-radius:12px; text-decoration:none; cursor:pointer;
    border:1px solid rgba(255,255,255,.22); color:var(--white); }
  .btn.primary{ background:linear-gradient(180deg, var(--brand), var(--brand-2)); border-color:transparent; }
  .btn.ghost{ background:rgba(255,255,255,.05); }
  .btn.link{ padding:0; border:0; color:var(--brand); background:transparent; }

  /* ===== FEATURES */
  .section{ padding:44px 0; }
  .features{ background:var(--bg); }
  .grid4{ display:grid; grid-template-columns:repeat(4,1fr); gap:18px; }
  @media (max-width: 1024px){ .grid4{ grid-template-columns:repeat(2,1fr);} }
  @media (max-width: 560px){ .grid4{ grid-template-columns:1fr; } }
  .feature{
    background:var(--white); border:1px solid #e6e9f2; border-radius:16px; padding:18px;
    box-shadow:0 10px 24px rgba(16,30,55,.05);
  }
  .feature .ico{
    width:48px; height:48px; display:grid; place-items:center; color:var(--brand);
    background:rgba(10,102,255,.08); border-radius:12px; margin-bottom:10px;
  }
  .feature h4{ margin:4px 0; }

  /* ===== SPLIT ABOUT */
  .split{ background:var(--white); }
  .split-grid{ display:grid; grid-template-columns:1.1fr .9fr; gap:22px; align-items:center; }
  @media (max-width: 900px){ .split-grid{ grid-template-columns:1fr; } }
  .text .desc{ color:#4b5364; margin:8px 0 14px; line-height:1.7; }
  .media{ width:100%; }
  .photo{
    width:100%; height:360px; border-radius:16px;
    background: linear-gradient(180deg, rgba(20,40,80,.08), rgba(20,40,80,.2)),
                radial-gradient(900px 500px at 60% 0%, #b7c8f7, #8fb0ff);
    box-shadow:0 14px 36px rgba(12,24,48,.15);
  }

  /* ===== 3 CARDS */
  .cards{ background:var(--bg); padding-bottom:68px; }
  .headline{ text-align:center; margin:0 0 14px; font-size:clamp(18px,2.4vw,24px); }
  .card-grid{ display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
  @media (max-width: 900px){ .card-grid{ grid-template-columns:1fr; } }
  .card{
    position:relative; overflow:hidden; border-radius:16px;
    display:block; min-height:210px; color:var(--white); text-decoration:none;
    border:1px solid #e6e9f2; background:#0c1220;
  }
  .thumb{ position:absolute; inset:0; background-size:cover; background-position:center; filter:saturate(1.05) contrast(1.02); }
  .thumb.t1{ background-image: radial-gradient(1200px 600px at 30% 10%, #2a3f7a, #0f1a34); }
  .thumb.t2{ background-image: radial-gradient(1200px 600px at 60% 0%, #2b5b6e, #0d2330); }
  .thumb.t3{ background-image: radial-gradient(1200px 600px at 40% 0%, #5a3d6e, #1b1030); }
  .shade{ position:absolute; inset:0; background:linear-gradient(180deg, rgba(0,0,0,.0), rgba(0,0,0,.55)); }
  .cap{
    position:absolute; left:16px; right:16px; bottom:14px;
    display:flex; flex-direction:column; gap:4px;
  }
  .cap span{ opacity:.9; font-size:.95rem; }
  .login-btn {
  position: absolute;
  top: 40px;
  right: 60px;
  background: linear-gradient(180deg, var(--brand), var(--brand-2));
  padding: 8px 14px;
  border-radius: 8px;
  color: white;
  text-decoration: none;
  font-weight: 500;
  z-index: 5;
  transition: opacity 0.2s;
}

.login-btn:hover {
  opacity: 0.9;
}
</style>
