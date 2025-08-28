<script>
  // 로컬 저장 키
  const LS_KEY = 'assets';

  // 폼 모델 (DB 컬럼 1:1)
  let form = {
    asset_id: '',
    status: '사용 중',
    asset_type: '',
    asset_category: '',
    brand: '',
    model: '',
    serial_number: '',
    purchase_date: '',
    supplier: '',
    purchase_order: '',
    warranty_start_date: '',
    warranty_end_date: '',
    campus: '',
    location_room: '',
    department: '',
    custodian_person: ''
  };

  let errorMsg = '';
  let saved = false;
  let toast = false;

  const load = () => { try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]'); } catch { return []; } };
  const save = (list) => localStorage.setItem(LS_KEY, JSON.stringify(list));

  // 진행률(간단)
  $: progress = [
    form.asset_id, form.brand, form.model, form.department, form.status
  ].filter(Boolean).length / 5 * 100;

  function validate() {
    if (!form.asset_id?.trim()) return 'asset_id는 필수입니다.';
    if (form.warranty_start_date && form.warranty_end_date &&
        form.warranty_end_date < form.warranty_start_date) {
      return '보증 종료일이 시작일보다 빠릅니다.';
    }
    return '';
  }

  function genId() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth()+1).padStart(2,'0');
    const d = String(now.getDate()).padStart(2,'0');
    const n = Math.random().toString(36).slice(2,6).toUpperCase();
    form.asset_id = `AST-${y}${m}${d}-${n}`;
  }

  function resetForm() {
    form = { asset_id:'', status:'사용 중' };
    saved = false; errorMsg = '';
  }

  function submit() {
    errorMsg = validate();
    if (errorMsg) return;

    const list = load();
    if (list.some(a => a.asset_id === form.asset_id)) {
      errorMsg = '이미 존재하는 asset_id 입니다.'; return;
    }
    list.unshift(structuredClone(form));
    save(list);

    saved = true; toast = true;
    setTimeout(()=> toast = false, 1600);
  }

  // Ctrl+S 저장
  function onKey(e){
    if((e.ctrlKey || e.metaKey) && e.key.toLowerCase()==='s'){
      e.preventDefault(); submit();
    }
  }
</script>
<!-- 파일 맨 위 어딘가(템플릿 영역)에 한 줄 추가 -->
<svelte:window on:keydown={onKey} />

<div class="page">
  <!-- 헤더 -->
  <header class="header container">
    <div class="breadcrumbs"><a href="/">홈</a><span>›</span>자산 등록</div>
    <h1>자산 등록</h1>
    <p class="lead">태그·모델·위치·책임자 정보를 입력하세요.</p>
  </header>

  <!-- 카드 -->
  <section class="container">
    <div class="card">
      <div
        class="progress"
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={Math.round(progress)}
      >
        <div class="bar" style={`width:${progress}%`}></div>
      </div>

      {#if errorMsg}<div class="alert" role="alert">{errorMsg}</div>{/if}

      <!-- 식별 -->
      <h3 class="section" id="sec-ident">식별</h3>
      <div class="grid" aria-labelledby="sec-ident">
        <div class="col-6 required {form.asset_id ? '' : 'invalid'}">
          <label for="asset_id">태그 번호 (asset_id)</label>
          <div class="row">
            <input id="asset_id" placeholder="ASSET-001" bind:value={form.asset_id} />
            <button
              type="button"
              class="chip"
              on:click={genId}
              aria-describedby="asset_id_hint"
            >자동</button>
          </div>
          <small id="asset_id_hint" class="hint">예: AST-20250814-ABCD</small>
        </div>

        <div class="col-6">
          <label for="status">상태 (status)</label>
          <select id="status" bind:value={form.status}>
            <option>사용 중</option>
            <option>보관 중</option>
            <option>유지보수</option>
            <option>폐기</option>
          </select>
        </div>

        <div class="col-6">
          <label for="asset_type">자산 유형 (asset_type)</label>
          <input id="asset_type" placeholder="노트북 / 프린터 ..." bind:value={form.asset_type} />
        </div>
        <div class="col-6">
          <label for="asset_category">자산 카테고리 (asset_category)</label>
          <input id="asset_category" placeholder="IT 하드웨어 / 비품 ..." bind:value={form.asset_category} />
        </div>

        <div class="col-6">
          <label for="brand">브랜드 (brand)</label>
          <input id="brand" placeholder="Lenovo / Apple ..." bind:value={form.brand} />
        </div>
        <div class="col-6">
          <label for="model">모델명 (model)</label>
          <input id="model" placeholder="ThinkPad X1 / MacBook Air ..." bind:value={form.model} />
        </div>

        <div class="col-6">
          <label for="serial_number">일련번호 (serial_number)</label>
          <input id="serial_number" bind:value={form.serial_number} />
        </div>
      </div>

      <!-- 구매/보증 -->
      <h3 class="section" id="sec-purchase">구매 · 보증</h3>
      <div class="grid" aria-labelledby="sec-purchase">
        <div class="col-4">
          <label for="purchase_date">구매일자</label>
          <input id="purchase_date" type="date" bind:value={form.purchase_date} />
        </div>
        <div class="col-4">
          <label for="warranty_start_date">보증 시작일</label>
          <input id="warranty_start_date" type="date" bind:value={form.warranty_start_date} />
        </div>
        <div class="col-4">
          <label for="warranty_end_date">보증 종료일</label>
          <input
            id="warranty_end_date"
            type="date"
            bind:value={form.warranty_end_date}
            min={form.warranty_start_date}
          />
        </div>

        <div class="col-6">
          <label for="supplier">공급업체 (supplier)</label>
          <input id="supplier" bind:value={form.supplier} />
        </div>
        <div class="col-6">
          <label for="purchase_order">송장 번호 (purchase_order)</label>
          <input id="purchase_order" bind:value={form.purchase_order} />
        </div>
      </div>

      <!-- 위치/책임 -->
      <h3 class="section" id="sec-loc">위치 · 책임</h3>
      <div class="grid" aria-labelledby="sec-loc">
        <div class="col-4">
          <label for="campus">캠퍼스 (campus)</label>
          <input id="campus" bind:value={form.campus} />
        </div>
        <div class="col-4">
          <label for="location_room">위치 (location_room)</label>
          <input id="location_room" placeholder="B동 3층 301호" bind:value={form.location_room} />
        </div>
        <div class="col-4">
          <label for="department">학부 (department)</label>
          <input id="department" bind:value={form.department} />
        </div>
        <div class="col-12">
          <label for="custodian_person">책임자 (custodian_person)</label>
          <input id="custodian_person" bind:value={form.custodian_person} />
        </div>
      </div>

      <!-- 액션 -->
      <div class="actions">
        <a class="btn ghost" href="/assets">목록으로</a>
        <div class="spacer" />
        <button class="btn ghost" type="button" on:click={resetForm}>초기화</button>
        <button class="btn primary" on:click={submit}>저장</button>
        {#if saved}<span class="saved">저장됨</span>{/if}
      </div>
    </div>
  </section>

  {#if toast}
    <div class="toast" role="status" aria-live="polite">저장되었습니다</div>
  {/if}
</div>


<style>
  :root{
    --bg:#f5f7fb; --card:#fff; --border:#e6eaf2; --ink:#0e1116; --muted:#6c7485;
    --brand:#0a66ff; --brand2:#5aa9ff; --ring:rgba(10,102,255,.18);
    --max: 1040px; --radius:14px; --field-h:44px;
  }

  :global(body){ background:var(--bg); color:var(--ink); }

  .page{ padding:22px 16px 56px; }
  .container{ max-width:var(--max); margin:0 auto; }

  .header .breadcrumbs{
    color:var(--muted); display:flex; align-items:center; gap:8px; font-size:.92rem;
  }
  .header h1{ margin:6px 0 4px; font-size:clamp(20px,2.4vw,26px); }
  .lead{ color:#4b5364; margin:0; }

  .card{
    margin-top:14px; background:var(--card); border:1px solid var(--border);
    border-radius:18px; padding:16px clamp(14px,2vw,20px);
    box-shadow:0 14px 36px rgba(16,30,55,.06);
  }

  /* 진행바 */
  .progress{ height:8px; background:#eef2fb; border:1px solid #e2e9fb; border-radius:999px; overflow:hidden; margin-bottom:12px; }
  .progress .bar{ height:100%; background:linear-gradient(90deg,var(--brand),var(--brand2)); }

  .section{ margin:14px 0 10px; font-size:14px; color:#3c4a66; }

  /* 12-컬럼 그리드 */
  .grid{ display:grid; grid-template-columns:repeat(12,1fr); gap:12px; }
  .col-12{ grid-column:span 12; }
  .col-6{ grid-column:span 6; }
  .col-4{ grid-column:span 4; }
  @media (max-width: 980px){
    .col-6,.col-4{ grid-column:span 12; }
  }

  label{ display:block; margin:2px 0 6px; color:#445169; font-size:.9rem; }
  .row{ display:flex; gap:8px; align-items:center; }

  /* ✅ 필드 규격 통일(높이/라운드/색) + 드롭다운 가독성 보장 */
  input, select{
    width:100%; height:var(--field-h);
    padding:0 12px;
    border:1px solid var(--border); border-radius:var(--radius);
    background:#fff; color:var(--ink);
    outline:none; transition:border .15s ease, box-shadow .15s ease;
  }
  textarea{
    width:100%; padding:10px 12px; min-height:96px;
    border:1px solid var(--border); border-radius:var(--radius);
    background:#fff; color:var(--ink);
    outline:none; transition:border .15s ease, box-shadow .15s ease;
  }
  input::placeholder{ color:#9aa6b2; }
  select:focus, input:focus, textarea:focus{
    border-color:#c9d8ff; box-shadow:0 0 0 3px var(--ring);
  }

  .chip{
    height:var(--field-h); padding:0 12px;
    border-radius:var(--radius); border:1px solid #dbe6ff;
    background:linear-gradient(180deg,#f7faff,#eef4ff); color:#0a3cff;
    cursor:pointer; white-space:nowrap;
  }

  .required.invalid input{ border-color:#f2b7c0; box-shadow:0 0 0 3px rgba(255,120,145,.18); }
  .hint{ color:#6f8cff; font-size:12px; margin-top:6px; display:block; }

  .actions{ display:flex; align-items:center; gap:10px; margin-top:14px; padding-top:12px; border-top:1px dashed #e6eaf2; }
  .spacer{ flex:1; }
  .btn{
    height:40px; padding:0 14px; border-radius:12px; border:1px solid #d8e1f0;
    background:#fff; color:#1f2937; cursor:pointer; text-decoration:none; display:inline-flex; align-items:center;
  }
  .btn:hover{ background:#f6f9ff; border-color:#ccd8f2; }
  .btn.primary{ background:linear-gradient(180deg,var(--brand),var(--brand2)); border-color:transparent; color:#fff; }
  .btn.ghost{ background:#fff; }

  .saved{ color:#16a34a; font-size:.92rem; }

  .alert{
    margin:8px 0 10px; padding:12px 14px; border-radius:12px;
    background:#fff4f6; color:#8a2138; border:1px solid #ffd9e0;
  }

  .toast{
    position:fixed; right:18px; bottom:18px; padding:12px 14px; border-radius:12px;
    background:#0f1e12; color:#9effc0; border:1px solid #20442b; box-shadow:0 12px 32px rgba(0,0,0,.2);
  }
  .grid > * { min-width: 0; }

/* ← 새로 추가: 입력류는 테두리/패딩 포함해서 폭 계산(넘침 방지) */
input, select, textarea { box-sizing: border-box; }

/* ← 선택: 카드 모서리 밖으로 보이는 걸 안전하게 클립(원하면 생략 가능) */
.card { overflow: hidden; }

/* ← 선택: 컨테이너 좌우 여백 조금 더 줘서 가장자리 여유 */
.container { padding: 0 16px; }
</style>
