<template>
    <div class="flex h-screen">
        
        <div class="relative flex-1 hidden w-0 lg:block">
            <img src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80" 
            alt="auth" 
            class="absolute inset-0 object-cover w-full h-full">
        </div>

        <div class="flex flex-col justify-center flex-1 px-4 py-12 sm:px-6
        lg:flex-none lg:px-20 xl:px-24">
            <div>
                For test use username - dev4
                <td></td>
                and password - password
            </div>
            <div class="flex items-center w-full h-full max-w-sm mx-auto
            lg:w-96">
                <AuthLoginForm v-if="loginForm" @change-form="handleChangeForm"></AuthLoginForm>
                <AuthRegisterForm v-else @change-form="handleChangeForm"></AuthRegisterForm>
            </div>

        </div>

    </div>
</template>

<script setup>
const loginForm = ref(true)

function handleChangeForm() {
    loginForm.value = !loginForm.value
}
</script>