// src/lib/stores/user.js
import { writable } from 'svelte/store';

let initialUser = null;

// 브라우저에서만 localStorage 접근
if (typeof localStorage !== 'undefined') {
  initialUser = JSON.parse(localStorage.getItem('user')) || null;
}

export const user = writable(initialUser);

// 브라우저에서만 저장 이벤트
if (typeof localStorage !== 'undefined') {
  user.subscribe(value => {
    localStorage.setItem('user', JSON.stringify(value));
  });
}
