<!-- src/routes/assets/+layout.svelte -->
<script>
  import { page } from '$app/stores';

  // 현재 경로에 따라 탭 활성화
  $: path = $page.url.pathname;
  const isActive = (href) => path === href || path.startsWith(href + '/');
  const ariaCur = (href) => (isActive(href) ? 'page' : undefined);
</script>

<!-- 자산 섹션 상단 바 -->
<nav class="subnav" role="navigation" aria-label="자산 섹션">
  <div class="container bar">
    <div class="breadcrumbs">
      <a href="/">홈</a>
      <span class="sep" aria-hidden="true">›</span>
      <span>자산</span>
    </div>

    <div class="tabs" role="tablist" aria-label="자산 탭">
      <a
        href="/assets"
        class:active={isActive('/assets') && !isActive('/assets/new')}
        role="tab"
        aria-current={ariaCur('/assets')}
        >목록</a
      >
      <a
        href="/assets/new"
        class:active={isActive('/assets/new')}
        role="tab"
        aria-current={ariaCur('/assets/new')}
        >등록</a
      >
    </div>

    <a class="cta" href="/assets/new">+ 새 자산</a>
  </div>
</nav>

<!-- 자식 페이지가 이곳에 렌더링 -->
<slot />

<style>
  :root{
    --bg:#f5f7fb; --card:#fff; --border:#e6eaf2; --ink:#0e1116; --muted:#6c7485;
    --brand:#0a66ff; --brand2:#5aa9ff; --ring:rgba(10,102,255,.18);
    --max:1040px;
  }

  .container{ max-width:var(--max); margin:0 auto; padding:0 16px; box-sizing:border-box; }

  /* 상단 서브 내비 (글래스 느낌 살짝) */
  .subnav{
    background:transparent;
    padding:10px 0 6px;
  }
  .bar{
    display:grid;
    grid-template-columns: 1fr auto auto;
    gap:10px; align-items:center;

    background: linear-gradient(180deg, rgba(255,255,255,.9), rgba(255,255,255,.82));
    border:1px solid rgba(13,23,44,.10);
    border-radius: 14px;
    box-shadow: 0 10px 26px rgba(16,30,55,.10);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    padding:10px 12px;
  }

  .breadcrumbs{ color:var(--muted); font-size:.95rem; }
  .breadcrumbs a{ color:#445169; text-decoration:none; }
  .breadcrumbs a:hover{ text-decoration:underline; }
  .sep{ margin:0 6px; color:#9aa6b2; }

  .tabs{
    display:flex; gap:8px; align-items:center;
  }
  .tabs a{
    text-decoration:none; color:#334155; font-weight:500;
    padding:8px 12px; border-radius:12px; border:1px solid #e6eaf2;
    background:#fff; transition: all .15s ease;
  }
  .tabs a:hover{ background:#f6f9ff; border-color:#dfe7fb; color:#0a3cff; }
  .tabs a.active{
    background: linear-gradient(180deg, #eaf1ff, #dfeaff);
    border-color:#d6e4ff; color:#0a66ff; box-shadow: inset 0 1px 0 #fff, 0 0 0 3px var(--ring);
  }

  .cta{
    justify-self:end;
    text-decoration:none; color:#fff;
    padding:9px 12px; border-radius:12px; border:1px solid transparent;
    background: linear-gradient(180deg, var(--brand), var(--brand2));
  }

  @media (max-width: 720px){
    .bar{
      grid-template-columns: 1fr auto;
      grid-auto-rows: auto;
    }
    .cta{ grid-column: 2 / 3; }
    .tabs{ grid-column: 1 / -1; justify-self:start; }
  }
</style>
