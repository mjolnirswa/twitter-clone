<template>
    <div class="w-full">
        <div class="flex justify-center">
            <div class="w-10 h-10">
                <LogoTwitter />
            </div>
        </div>
        <div class="pt-5 space-y-6">

            <UIInput 
            label="Username" 
            placeholder="@username"
            type="text"
            v-model="data.username"/>

            <UIInput 
            label="Password" 
            placeholder="********" 
            type="password"
            v-model="data.password"/>


            <UIButton 
            liquid 
            :disabled="isButtonDisabled"
            @click="handleLogin">
                Login
            </UIButton>

            <div class="text-center">
                or you can
            </div>

            <UIButton 
                liquid 
                @click="handleFormChange">
                    Register
            </UIButton>
        </div>

        
    </div>
</template>

<script setup>
const emits = defineEmits(['changeForm'])

const data = reactive({
    password: '',
    username: '',
    loading: false
})

function handleFormChange() {
    emits('changeForm', false)
}

async function handleLogin() {
    const { login } = useAuth();
    data.loading = true;
    try {
        await login({
            username: data.username,
            password: data.password
        })
    } catch (error) {
        console.log(error)
    } finally {
        data.loading = false
    }
}

const isButtonDisabled = computed(() => {
    return (!data.username || !data.password) || (data.loading)
})
</script>