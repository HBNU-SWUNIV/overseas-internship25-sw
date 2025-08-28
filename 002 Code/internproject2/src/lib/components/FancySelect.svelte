<script>
  import { createEventDispatcher, onMount } from 'svelte';

  // props (JS)
  export let options = [];              // ['사용 중', ...] or [{label, value}, ...]
  export let value = null;              // bind:value
  export let placeholder = '선택하세요';
  export let disabled = false;
  export let id = undefined;            // trigger id
  export let className = '';            // 외부에서 넘길 클래스

  const dispatch = createEventDispatcher();
  let open = false;
  let root, trigger, listEl;
  let activeIndex = -1;

  // 옵션 정규화
  $: items = options.map(o =>
    typeof o === 'object' ? { label: o.label ?? o.value, value: o.value ?? o.label } : { label: o, value: o }
  );
  $: selectedIndex = items.findIndex(i => i.value === value);
  $: selected = items[selectedIndex];
  $: listId = id ? `${id}-listbox` : undefined;

  function toggle() {
    if (disabled) return;
    open = !open;
    if (open) {
      activeIndex = selectedIndex >= 0 ? selectedIndex : 0;
      queueMicrotask(() => listEl?.focus());
    }
  }
  function close() {
    if (!open) return;
    open = false;
    activeIndex = -1;
    queueMicrotask(() => trigger?.focus());
  }
  function choose(i) {
    value = items[i].value;
    dispatch('change', { value });
    close();
  }
  function onListKey(e) {
    if (e.key === 'Escape' || e.key === 'Tab') return close();
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (activeIndex >= 0) choose(activeIndex); return; }
    if (e.key === 'ArrowDown') { e.preventDefault(); activeIndex = (activeIndex + 1) % items.length; return; }
    if (e.key === 'ArrowUp')   { e.preventDefault(); activeIndex = (activeIndex - 1 + items.length) % items.length; return; }
  }
  function onWindowClick(e) { if (!root?.contains(e.target)) close(); }
  onMount(() => { window.addEventListener('click', onWindowClick); return () => window.removeEventListener('click', onWindowClick); });
</script>

<div bind:this={root} class="fsel {className}">
  <button
    bind:this={trigger}
    id={id}
    class="trigger"
    type="button"
    disabled={disabled}
    aria-haspopup="listbox"
    aria-expanded={open}
    aria-controls={listId}
    on:click={toggle}
  >
    <span class={selected ? 'value' : 'placeholder'}>
      {selected ? selected.label : placeholder}
    </span>
    <svg class="caret" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
  </button>

  {#if open}
    <ul
      bind:this={listEl}
      class="panel"
      role="listbox"
      id={listId}
      tabindex="0"
      aria-activedescendant={activeIndex >= 0 && id ? `${id}-opt-${activeIndex}` : undefined}
      on:keydown={onListKey}
    >
      {#each items as it, i}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <li
          id={id ? `${id}-opt-${i}` : undefined}
          class="opt {i === selectedIndex ? 'selected' : ''} {i === activeIndex ? 'active' : ''}"
          role="option"
          aria-selected={i === selectedIndex}
          on:click={() => choose(i)}
          on:mousemove={() => activeIndex = i}
        >
          <span class="label">{it.label}</span>
          {#if i === selectedIndex}
            <svg class="check" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6L9 17l-5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
          {/if}
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  :global(:root){
    --fs-border:#e6eaf2; --fs-bg:#fff; --fs-ink:#0e1116; --fs-muted:#9aa6b2;
    --fs-brand:#0a66ff; --fs-shadow:0 14px 32px rgba(16,30,55,.16);
    --fs-radius:14px; --fs-height:44px;
  }
  .fsel{ position:relative; width:100%; }
  .trigger{
    width:100%; min-height:var(--fs-height);
    display:flex; align-items:center; justify-content:space-between; gap:8px;
    padding:0 14px; border-radius:var(--fs-radius);
    background:var(--fs-bg); color:var(--fs-ink);
    border:1px solid var(--fs-border);
    box-sizing:border-box; cursor:pointer; text-align:left;
    transition:border .15s ease, box-shadow .15s ease, background .15s ease;
  }
  .trigger:focus{ outline:none; border-color:#c9d8ff; box-shadow:0 0 0 3px rgba(10,102,255,.18); }
  .trigger:disabled{ opacity:.6; cursor:not-allowed; }
  .placeholder{ color:var(--fs-muted); }
  .caret{ width:20px; height:20px; opacity:.7; flex:0 0 auto; }

  .panel{
    position:absolute; top:calc(100% + 6px); left:0; right:0; z-index:30;
    background:#fff; border:1px solid var(--fs-border); border-radius:12px;
    box-shadow:var(--fs-shadow); padding:6px; max-height:280px; overflow:auto;
  }
  .opt{
    display:flex; align-items:center; justify-content:space-between; gap:10px;
    padding:10px 10px; border-radius:10px; cursor:pointer; user-select:none;
  }
  .opt:hover, .opt.active{ background:#f4f7ff; }
  .opt.selected{ background:#eef4ff; border:1px solid #dbe6ff; }
  .check{ width:18px; height:18px; color:var(--fs-brand); }
</style>
