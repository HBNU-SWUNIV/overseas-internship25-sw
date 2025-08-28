<!-- /src/routes/login/+layout.svelte -->
<svelte:head>
    <title>로그인 - DS Asset</title>
</svelte:head>

<div class="auth-layout">
    <slot />
</div>

<style>
    .auth-layout {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        padding: 20px;
        background: linear-gradient(
                180deg,
                rgba(10, 28, 60, 0.88),
                rgba(10, 20, 40, 0.95)
            ),
            radial-gradient(1200px 800px at 20% 10%, #1b3f8c, #0e1f45);
        background-size: cover;
        animation: fadeIn 0.6s ease-out;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: scale(1.02);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
</style>
