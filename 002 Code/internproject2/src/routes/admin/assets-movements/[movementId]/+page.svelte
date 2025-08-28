<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  let movement = null;
  let error = '';

  // movementId는 URL 파라미터에서 가져옴
  $: movementId = $page.params.movementId;

  async function loadMovement() {
    try {
      const res = await fetch(`/api/asset-movements/${movementId}`);
      if (!res.ok) throw new Error("데이터 불러오기 실패");
      movement = await res.json();
    } catch (err) {
      error = err.message;
    }
  }

  onMount(loadMovement);
</script>

<header class="page-header">
  <div class="breadcrumbs">
    <a href="/">홈</a>
    <span>›</span>
    <a href="/assets-movements">자산 이동</a>
    <span>›</span>
    <span>{movementId}</span>
  </div>
  <div class="header-actions">
    <h1>이동 상세 내역</h1>
  </div>
</header>

<section class="container">
  {#if error}
    <p style="color:red">{error}</p>
  {:else if !movement}
    <p>불러오는 중...</p>
  {:else}
    <div class="detail-card">
      <ul>
        <li><b>이동 ID:</b> {movement.movementId}</li>
        <li><b>자산 ID:</b> {movement.assetId}</li>
        <li><b>이동 유형:</b> {movement.movementType}</li>
        <li><b>대여/반출일:</b> {movement.dateTakenOut}</li>
        <li><b>예상 반납일:</b> {movement.expectedReturnDate}</li>
        <li><b>실제 반납일:</b> {movement.dateReturned}</li>
        <li><b>수령자:</b> {movement.personTakingAsset}</li>
        <li><b>소속:</b> {movement.department}</li>
        <li><b>목적:</b> {movement.purpose}</li>
        <li><b>비고:</b> {movement.remarks}</li>
        <li><b>대여시 상태:</b> {movement.conditionAtCheckout}</li>
        <li><b>반납시 상태:</b> {movement.conditionAtCheckin}</li>
      </ul>
    </div>
  {/if}
</section>

<style>
  .container {
    max-width: 800px;
    margin: 20px auto;
    padding: 0 16px;
  }

  .detail-card {
    background: white;
    border: 1px solid #e6eaf2;
    border-radius: 14px;
    padding: 20px;
    box-shadow: 0 10px 26px rgba(16,30,55,.06);
  }

  .detail-card ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 10px;
  }

  .detail-card li {
    font-size: .95rem;
    color: #334155;
  }

  b {
    display: inline-block;
    width: 120px;
    color: #0e1116;
  }

  .breadcrumbs {
    font-size: .9rem; color: #6c7485;
    display:flex; gap:6px; align-items:center;
  }
</style>
