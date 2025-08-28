<script>
  import { onMount } from 'svelte';

  const API_BASE = "http://localhost:8080";
  let assets = [];
  let loading = false;
  let error = '';

  const PAGE_SIZE = 8;
  let currentPage = 1;

  let selectedAsset = null;
  let editAsset = null; // ✅ 수정 모달용 상태

  $: totalPages = Math.max(1, Math.ceil(assets.length / PAGE_SIZE));
  $: paginatedAssets = assets.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  onMount(async () => {
    await loadAssets();
  });

  async function loadAssets() {
    loading = true;
    try {
      const res = await fetch(`${API_BASE}/api/assets`);
      if (!res.ok) throw new Error("자산 목록 불러오기 실패");
      const data = await res.json();
      assets = Array.isArray(data) ? data : [];
    } catch (e) {
      error = e.message;
    } finally {
      loading = false;
    }
  }

  function viewDetails(asset) {
    selectedAsset = asset;
  }
  function closeModal() {
    selectedAsset = null;
    editAsset = null;
  }

  function startEdit(asset) {
    // 복사본으로 수정 (원본 바로 변경 방지)
    editAsset = { ...asset };
  }

  async function saveEdit() {
    try {
      const res = await fetch(`${API_BASE}/api/assets/${editAsset.assetId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editAsset)
      });
      if (!res.ok) throw new Error("수정 실패");

      await loadAssets(); // ✅ 목록 갱신
      editAsset = null;   // ✅ 모달 닫기
      alert("자산 정보가 수정되었습니다!");
    } catch (e) {
      alert(e.message);
    }
  }

  function getVisiblePages() {
    const maxVisible = 7;
    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    let start = Math.max(1, currentPage - 3);
    let end = Math.min(totalPages, currentPage + 3);
    if (end - start < maxVisible - 1) {
      if (start === 1) end = start + maxVisible - 1;
      else if (end === totalPages) start = end - maxVisible + 1;
    }
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }
</script>

<h1 class="title"> 전체 자산 목록</h1>

{#if loading}
  <p>불러오는 중...</p>
{:else if error}
  <p style="color:red;">{error}</p>
{:else}
  <div class="asset-list">
    {#each paginatedAssets as asset}
      <div class="asset-card">
        <div class="asset-info">
          <p><b>Type:</b> {asset.assetType}</p>
          <p><b>Model:</b> {asset.model}</p>
          <p><b>Location:</b> {asset.locationRoom}</p>
          <p><b>Department:</b> {asset.department}</p>
          <p><b>Custodian:</b> {asset.custodianPerson}</p>
          <p><b>Status:</b> {asset.status}</p>
        </div>
        <div class="asset-actions">
          <button class="btn ghost" on:click={() => viewDetails(asset)}>View</button>
          <button class="btn primary" on:click={() => startEdit(asset)}>Edit</button>
        </div>
      </div>
    {/each}
  </div>

  <!-- 페이지네이션 -->
  <div class="pagination">
    <button on:click={() => currentPage = Math.max(1, currentPage-1)} disabled={currentPage === 1}>◀</button>
    {#if getVisiblePages()[0] > 1}
      <button on:click={() => currentPage = 1}>1</button><span>…</span>
    {/if}
    {#each getVisiblePages() as p}
      <button class:selected={currentPage === p} on:click={() => currentPage = p}>{p}</button>
    {/each}
    {#if getVisiblePages().at(-1) < totalPages}
      <span>…</span><button on:click={() => currentPage = totalPages}>{totalPages}</button>
    {/if}
    <button on:click={() => currentPage = Math.min(totalPages, currentPage+1)} disabled={currentPage === totalPages}>▶</button>
  </div>
{/if}

<!-- ✅ 상세보기 모달 -->
{#if selectedAsset}
  <div class="modal-backdrop" on:click={closeModal}></div>
  <div class="modal">
    <h2>자산 상세 정보</h2>
    <ul>
      <li><b>ID:</b> {selectedAsset.assetId}</li>
      <li><b>Type:</b> {selectedAsset.assetType}</li>
      <li><b>Category:</b> {selectedAsset.assetCategory}</li>
      <li><b>Brand:</b> {selectedAsset.brand}</li>
      <li><b>Model:</b> {selectedAsset.model}</li>
      <li><b>Serial:</b> {selectedAsset.serialNumber}</li>
      <li><b>Department:</b> {selectedAsset.department}</li>
      <li><b>Custodian:</b> {selectedAsset.custodianPerson}</li>
      <li><b>Status:</b> {selectedAsset.status}</li>
      <li><b>Location:</b> {selectedAsset.locationRoom}</li>
    </ul>
    <button class="close-btn" on:click={closeModal}>닫기</button>
  </div>
{/if}

<!-- ✅ 수정 모달 -->
{#if editAsset}
  <div class="modal-backdrop" on:click={closeModal}></div>
  <div class="modal">
    <h2>자산 정보 수정</h2>
    <form class="edit-form" on:submit|preventDefault={saveEdit}>
      <label>Asset ID: <input bind:value={editAsset.assetId} readonly /></label>
      <label>Asset Type: <input bind:value={editAsset.assetType} /></label>
      <label>Asset Category: <input bind:value={editAsset.assetCategory} /></label>
      <label>Brand: <input bind:value={editAsset.brand} /></label>
      <label>Model: <input bind:value={editAsset.model} /></label>
      <label>Serial Number: <input bind:value={editAsset.serialNumber} /></label>
      <label>Purchase Date: <input type="date" bind:value={editAsset.purchaseDate} /></label>
      <label>Supplier / Vendor: <input bind:value={editAsset.supplier} /></label>
      <label>Purchase Order / Invoice No.: <input bind:value={editAsset.purchaseOrder} /></label>
      <label>Warranty Start Date: <input type="date" bind:value={editAsset.warrantyStartDate} /></label>
      <label>Warranty End Date: <input type="date" bind:value={editAsset.warrantyEndDate} /></label>
      <label>Location: <input bind:value={editAsset.locationRoom} /></label>
      <label>Department / Faculty: <input bind:value={editAsset.department} /></label>
      <label>Custodian / Responsible Person: <input bind:value={editAsset.custodianPerson} /></label>
      <label>Status: <input bind:value={editAsset.status} /></label>
      <label>Depreciation / Book Value: <input bind:value={editAsset.bookValue} /></label>
      <label>Asset Photo (URL): <input bind:value={editAsset.assetPhoto} /></label>

      <div class="form-actions">
        <button type="button" class="close-btn" on:click={closeModal}>취소</button>
        <button type="submit" class="btn primary">저장</button>
      </div>
    </form>
  </div>
{/if}

<style>
 body {
  background: linear-gradient(135deg, #0f172a, #1e293b);
  font-family: 'Segoe UI', sans-serif;
  color: #e2e8f0;
}

.title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #f1f5f9;
  position: relative;
}
.title::after {
  content: '';
  display: block;
  width: 80px;
  height: 3px;
  margin: 8px auto 0;
  background: linear-gradient(90deg, #3b82f6, #9333ea);
  border-radius: 3px;
}

.asset-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 1.5rem;
}

.asset-card {
  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 18px;
  padding: 20px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.4);
  transition: all 0.25s ease;
}
.asset-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 10px 28px rgba(0,0,0,0.6);
}

.asset-info p {
  margin: 6px 0;
  font-size: 0.95rem;
  color: #cbd5e1;
}
.asset-info b {
  color: #f9fafb;
}

.status-active {
  color: #22c55e;
  font-weight: 600;
}
.status-maintenance {
  color: #f43f5e;
  font-weight: 600;
}

.btn {
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.25s ease;
}
.btn.primary {
  background: linear-gradient(135deg, #3b82f6, #9333ea);
  color: white;
}
.btn.primary:hover {
  box-shadow: 0 0 10px rgba(147,51,234,0.7);
}
.btn.ghost {
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  color: #f1f5f9;
}
.btn.ghost:hover {
  background: rgba(255,255,255,0.2);
}


  .pagination {
    margin-top: 24px;
    display: flex;
    justify-content: center;
    gap: 6px;
  }
  .pagination button {
    padding: 6px 10px;
    border-radius: 6px;
    border: none;
    background: rgba(255,255,255,0.08);
    color: #e2e8f0;
    cursor: pointer;
    transition: 0.2s;
  }
  .pagination button.selected {
    background: #3b82f6;
    color: white;
  }
  .pagination button:hover:not(:disabled) {
    background: rgba(255,255,255,0.2);
  }
  .pagination button:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  /* ✅ 모달 */
  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.6);
  }
  .modal {
    position: fixed;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(30,41,59,0.95);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.15);
    padding: 24px;
    border-radius: 14px;
    width: 440px;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: 0 10px 32px rgba(0,0,0,0.6);
    color: #f1f5f9;
  }
  .modal h2 {
    margin-top: 0;
    font-size: 20px;
    margin-bottom: 16px;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    padding-bottom: 8px;
  }
  .modal ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    gap: 8px;
  }
  .modal li {
    font-size: 14px;
  }
  .close-btn {
    margin-top: 16px;
    display: block;
    margin-left: auto;
    padding: 8px 16px;
    border-radius: 8px;
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    color: white;
    border: none;
    cursor: pointer;
    transition: 0.2s;
  }
  .close-btn:hover {
    box-shadow: 0 0 8px rgba(59,130,246,0.7);
  }
   .edit-form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr; /* ✅ 두 칸 */
    gap: 14px 20px;
  }

  .form-grid label {
    display: flex;
    flex-direction: column;
    font-size: 0.9rem;
    color: #e2e8f0;
  }

  .form-grid span {
    margin-bottom: 4px;
    font-weight: 600;
    color: #f9fafb;
  }

  .form-grid input,
  .form-grid select {
    padding: 8px 10px;
    border-radius: 6px;
    border: 1px solid rgba(255,255,255,0.2);
    background: rgba(255,255,255,0.08);
    color: #f1f5f9;
    font-size: 0.9rem;
    outline: none;
  }

  .form-grid input:focus,
  .form-grid select:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 6px rgba(59,130,246,0.6);
  }

  .form-actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;   /* ✅ 버튼들을 세로 중앙 정렬 */
  gap: 10px;
  margin-top: 12px;
}
  .edit-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.edit-form label {
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
  color: #e2e8f0;
}

.edit-form input {
  padding: 8px 10px;
  border-radius: 6px;
  border: 1px solid rgba(255,255,255,0.2);
  background: rgba(255,255,255,0.08);
  color: #f1f5f9;
  font-size: 0.9rem;
  outline: none;
}

.edit-form input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 6px rgba(59,130,246,0.6);
}
.form-actions button {
  width: 120px;       /* ✅ 두 버튼 동일한 폭 */
  height: 42px;       /* ✅ 버튼 높이도 동일 */
  padding: 0;         /* ✅ 내부 여백 통일 */
  text-align: center; /* ✅ 텍스트 중앙 정렬 */
}

.form-actions .close-btn {
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.3);
  color: #f1f5f9;
}

.form-actions .close-btn:hover {
  background: rgba(255,255,255,0.2);
}

</style>
