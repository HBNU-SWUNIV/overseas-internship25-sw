<script>
  import { goto } from '$app/navigation';

  let id = '';
  let password = '';
  let userType = '';

  const API_BASE = "http://localhost:8080"; // ⚠️ 실제 백엔드 포트로 수정하세요

  async function signup() {
    if (!id || !password || !userType) {
      alert('⚠ 모든 필드를 입력해주세요.');
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/members`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerId: password,   // DB 비밀번호
          customerName: id,       // DB 아이디
          customerType: userType  // DB 유형
        })
      });

      if (!res.ok) {
        const errMsg = await res.text();
        alert("회원가입 실패: " + errMsg);
        return;
      }

      alert("회원가입 성공!");
      goto('/login');
    } catch (err) {
      alert("서버 오류: " + err.message);
    }
  }
</script>

<div class="register-container">
  <h1>회원가입</h1>

  <div class="form-group">
    <input type="text" placeholder="아이디" bind:value={id} />
  </div>

  <div class="form-group">
    <input type="password" placeholder="비밀번호" bind:value={password} />
  </div>

  <div class="form-group">
    <select bind:value={userType}>
      <option value="">유형 선택</option>
      <option value="manager">관리자</option>
      <option value="user">사용자</option>
    </select>
  </div>

  <button on:click={signup}>가입하기</button>

  <p class="back-login">
    이미 계정이 있으신가요?
    <a href="/login">로그인</a>
  </p>
</div>

<style>
  .register-container {
    width: 100%;
    max-width: 420px;
    background-color: rgba(27, 38, 59, 0.95);
    padding: 40px 35px;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.25);
    text-align: center;
    animation: fadeIn 0.4s ease-in-out;
  }

  h1 {
    margin-bottom: 25px;
    color: #e0e1dd;
    font-size: 26px;
    font-weight: 700;
  }

  .form-group {
    margin-bottom: 15px;
  }

  input, select {
    width: 100%;
    padding: 14px;
    border: none;
    border-radius: 8px;
    font-size: 15px;
    background-color: #fff;
    color: #333;
    outline: none;
    transition: all 0.2s;
  }

  input:focus, select:focus {
    box-shadow: 0 0 0 3px rgba(69, 123, 157, 0.4);
  }

  button {
    width: 100%;
    padding: 14px;
    margin-top: 10px;
    background-color: #415a77;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s, transform 0.1s;
  }

  button:hover {
    background-color: #1b263b;
    transform: scale(1.02);
  }

  .back-login {
    margin-top: 20px;
    font-size: 14px;
    color: #adb5bd;
  }

  .back-login a {
    color: #e0e1dd;
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s;
  }

  .back-login a:hover {
    color: #f8f9fa;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
</style>
