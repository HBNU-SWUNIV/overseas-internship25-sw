<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  const LS_KEY = 'asset_movements';
  let movements = [];

  onMount(() => {
    try {
      movements = JSON.parse(localStorage.getItem(LS_KEY) || '[]');
    } catch {
      movements = [];
    }
  });

  function fmt(d) {
    return d ? new Date(d).toLocaleDateString() : '-';
  }

  function viewMovement(id) {
    goto(`/movements/${id}`);
  }
</script>

<!-- 상단 헤더 -->
<header class="page-header">
  <div class="breadcrumbs">
    <a href="/">홈</a>
    <span>›</span>
    <span>자산 이동</span>
  </div>
  <div class="header-actions">
    <h1>자산 이동 내역</h1>
    <a class="btn primary" href="/movements/new">+ 새 이동 등록</a>
  </div>
</header>

<!-- 리스트 -->
<section class="container">
  {#if movements.length === 0}
    <div class="empty">
      <p>등록된 이동 내역이 없습니다.</p>
    </div>
  {:else}
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>이동 ID</th>
            <th>자산 ID</th>
            <th>이동 유형</th>
            <th>대여/반출일</th>
            <th>예상 반납일</th>
            <th>실제 반납일</th>
            <th>수령자</th>
            <th>소속</th>
            <th>목적</th>
          </tr>
        </thead>
        <tbody>
          {#each movements as m}
            <tr on:click={() => viewMovement(m.movement_id)}>
              <td>{m.movement_id}</td>
              <td>{m.asset_id}</td>
              <td>{m.movement_type}</td>
              <td>{fmt(m.date_taken_out)}</td>
              <td>{fmt(m.expected_return_date)}</td>
              <td>{fmt(m.date_returned)}</td>
              <td>{m.person_taking_asset}</td>
              <td>{m.department}</td>
              <td>{m.purpose}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</section>

<style>
  :root {
    --bg:#f5f7fb; --card:#fff; --border:#e6eaf2; --ink:#0e1116;
    --brand:#0a66ff; --brand2:#5aa9ff; --radius:14px; --ring:rgba(10,102,255,.18);
  }
  :global(body) { background: var(--bg); }

  .page-header {
    max-width:1040px; margin:0 auto; padding:20px 16px 0;
  }
  .breadcrumbs {
    font-size: .9rem; color: #6c7485;
    display:flex; gap:6px; align-items:center;
  }
  .header-actions {
    display:flex; justify-content:space-between; align-items:center;
    margin-top:6px;
  }
  h1 { font-size: 1.6rem; margin:0; color:var(--ink); }

  .btn.primary {
    background: linear-gradient(180deg,var(--brand),var(--brand2));
    color: #fff; padding: 8px 14px; border-radius: var(--radius);
    text-decoration:none; border:none; cursor:pointer;
  }

  .container { max-width:1040px; margin:20px auto; padding:0 16px; }

  .table-wrap {
    background: var(--card);
    border:1px solid var(--border);
    border-radius: var(--radius);
    overflow:hidden;
    box-shadow: 0 10px 26px rgba(16,30,55,.06);
  }

  table { width:100%; border-collapse:collapse; }
  th, td {
    padding:12px 14px; text-align:left; border-bottom:1px solid var(--border);
    font-size:.92rem;
  }
  th { background:#f9fbff; color:#334155; }
  tr:hover { background:#f6f9ff; cursor:pointer; }

  .empty {
    background: var(--card);
    border:1px solid var(--border);
    border-radius: var(--radius);
    padding:40px; text-align:center;
    color:#6c7485;
    box-shadow: 0 10px 26px rgba(16,30,55,.06);
  }
</style>
