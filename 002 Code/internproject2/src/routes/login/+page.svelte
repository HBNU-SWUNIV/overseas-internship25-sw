<script>
  import { user } from '$lib/stores/user';
  import { goto } from '$app/navigation';

  let formData = {
    userType: "",
    username: "",
    password: ""
  };

  // ✅ 서버 포트 확인 후 맞춰주세요
  const API_BASE = "http://localhost:8080";

  async function login() {
    if (!formData.userType) {
      alert("⚠ 사용자 유형을 선택해주세요.");
      return;
    }
    if (!formData.username || !formData.password) {
      alert("⚠ 아이디와 비밀번호를 입력하세요.");
      return;
    }

    try {
      // ✅ 백엔드에서 전체 회원 목록 불러오기
      const res = await fetch(`${API_BASE}/api/members`);
      if (!res.ok) throw new Error("회원 목록 조회 실패");

      const members = await res.json();

      // ✅ 아이디(customer_name), 비밀번호(customer_id), 유형(customer_type) 모두 검증
      const found = members.find(
        (m) =>
          m.customerName === formData.username && // 아이디
          m.customerId === formData.password &&   // 비밀번호
          m.customerType === formData.userType    // 유형
      );

      if (!found) {
        alert("❌ 아이디 / 비밀번호 / 유형이 올바르지 않습니다.");
        return;
      }

      // ✅ 로그인 성공 → 스토어 저장
      user.set({
        id: found.customerName,
        type: found.customerType
      });

      // ✅ 라우팅
      if (found.customerType === "manager_buyer" || found.customerType === "manager_rental" || found.customerType === "manager") {
        goto("/admin/main");
      } else {
        goto("/User/main");
      }
    } catch (err) {
      console.error(err);
      alert("서버 오류: " + err.message);
    }
  }
</script>

<div class="container">
  <form class="form-box" on:submit|preventDefault={login}>
    <h2 class="form-title">Login</h2>

    <select bind:value={formData.userType} class="input">
      <option value="">Select user type</option>
      <option value="manager">Manager</option>
      <option value="user">User</option>
    </select>

    <input
      type="text"
      placeholder="ID"
      bind:value={formData.username}
      class="input"
      required
    />

    <input
      type="password"
      placeholder="Password"
      bind:value={formData.password}
      class="input"
      required
    />

    <button type="submit" class="submit-btn">Login</button>
  </form>

  <p class="login-link">
    Join us? <a href="/signup">Sign up</a>
  </p>
</div>

<style>
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    background: #0a1a2f !important;
    overflow: hidden;
    font-family: Arial, sans-serif;
  }

  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .form-box {
    background: #132544;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
    width: 350px;
    text-align: center;
  }

  .form-title {
    margin-bottom: 1.5rem;
    color: #fff;
    font-size: 1.5rem;
  }

  .input,
  .submit-btn {
    width: 100%;
    box-sizing: border-box;
    display: block;
  }

  .input {
    padding: 0.8rem;
    margin: 0.5rem 0;
    border: none;
    border-radius: 8px;
    background: #1e335a;
    color: #fff;
    font-size: 0.95rem;
  }

  .input::placeholder {
    color: #bbb;
  }

  .submit-btn {
    padding: 0.8rem;
    margin-top: 1rem;
    background: #3b82f6;
    border: none;
    border-radius: 8px;
    color: white;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.2s;
  }

  .submit-btn:hover {
    background: #2563eb;
  }

  .login-link {
    margin-top: 1rem;
    font-size: 0.9rem;
    color: #bbb;
  }

  .login-link a {
    color: #3b82f6;
    text-decoration: none;
  }

  .login-link a:hover {
    text-decoration: underline;
  }
</style>
