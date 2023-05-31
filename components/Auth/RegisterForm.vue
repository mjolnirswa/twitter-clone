<template>
    <div class="w-full">
        <div class="flex justify-center">
            <div class="w-10 h-10">
                <LogoTwitter />
            </div>
        </div>
        <div class="pt-5 space-y-6">

            <UIInput 
            label="Email" 
            placeholder="email"
            type="email"
            v-model="data.email"/>

            <UIInput 
            label="Name" 
            placeholder="name"
            type="text"
            v-model="data.name"/>

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

            <UIInput 
            label="Repeat Password" 
            placeholder="********" 
            type="password"
            v-model="data.repeatPassword"/>

            <UIButton 
            liquid 
            :disabled="isButtonDisabled"
            @click="handleRegister">
                Register
            </UIButton>

            <div class="text-center">
                or you can
            </div>

            <UIButton 
                liquid 
                @click="handleFormChange">
                    Login
            </UIButton>

        </div>
    </div>
</template>

<script setup>
const emits = defineEmits(['changeForm'])

const data = reactive({
    email: '',
    password: '',
    repeatPassword: '',
    username: '',
    name: '',
    loading: false
})

function handleFormChange() {
    emits('changeForm', false)
}



async function handleRegister() {
    const { register } = useAuth();
    data.loading = true;
    try {
        await register({
            username: data.username,
            name: data.name,
            email: data.email,
            password: data.password,
            repeatPassword: data.repeatPassword
        })
    } catch (error) {
        console.log(error)
    } finally {
        data.loading = false
    }
}

const isButtonDisabled = computed(() => {
    return (!data.username || !data.password || !data.name || !data.repeatPassword || !data.email) || (data.loading) || (data.password !== data.repeatPassword)
})
</script>