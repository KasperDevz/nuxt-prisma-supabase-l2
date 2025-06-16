<script setup lang="ts">

const router = useRouter()

const email = ref('')
const password = ref('')
const phone = ref('+66')

const message = ref('')
const status = ref(false)
const supabase = useSupabaseClient()

const handleLogin = async () => {

    console.log(email.value)
    console.log(password.value)

    if (!email.value || !password.value) {
        message.value = 'Please fill in all fields'
        status.value = false
        return
    }

    try {

        const { data,error } = await supabase.auth.signInWithPassword({
            email: email.value,
            password: password.value
        })

        if (error) { throw error }

        const token = data.session?.access_token
        if (!token) {
            throw new Error('Login failed. Please check your credentials.')
        }

        if( token ) {
            const authToken = useCookie('auth-token')
            authToken.value = token
            console.log('Auth Token Set:', authToken.value) 
        }

        message.value =  'Login successful! Redirecting...'
        status.value = true

        await new Promise(resolve => setTimeout(resolve, 2000))
        router.push('/backend/dashboard')

    } catch (error) {
        console.error('', error)
        message.value = error
        status.value = false
        return {
            message: message.value,
            status: status.value,
            error: error
        }
    }
}

const handleLoginWithPhone = async () => {

    console.log(phone.value)

    if (!phone.value) {
        message.value = 'Please enter your phone number'
        status.value = false
        return
    }

    try {

        const { data, error } = await supabase.auth.signInWithOtp({
            phone: phone.value
        })

        if (error) { throw error }

        localStorage.setItem('phone', phone.value)

        message.value = 'OTP sent to your phone. Please check your messages.'
        status.value = true

        await new Promise(resolve => setTimeout(resolve, 2000))
        router.push('/verify')

    } catch (error) {
        console.error('Error during phone login:', error)
        message.value = 'Login failed. ' + error
        status.value = false
        return {
            message: message.value,
            status: status.value,
            error: error
        }
    }
}

definePageMeta({
    layout: 'auth',
})

useHead({
    title: 'Login',
    meta: [
        {
            name: 'keywords',
            content: 'Login, Nuxt 3, Backend'
        },
        {
            name: 'Description',
            content: 'Login Nuxt 3,  IT Genius Engineering'
        }
    ]
})


</script>

<template>
    <div class="bg-base-200 h-[calc(100vh-50px)] flex items-center justify-center">
        <div class="card lg:card-side bg-base-100 shadow-xl max-w-4xl w-full">
            <figure class="lg:w-1/2">
                <img src="https://media.tenor.com/p0G_bmA2vSYAAAAd/login.gif" alt="Random image"
                    class="object-cover w-full h-full" />
            </figure>
            <div class="card-body lg:w-1/2">
                <h2 class="card-title text-2xl font-bold mb-6">Login</h2>

                <!-- ฟอร์มเข้าสู่ระบบด้วยอีเมล -->
                <form @submit.prevent="handleLogin">

                    <p v-if="message" :class="status ? 'bg-success' : 'bg-error'" class="p-3 rounded-lg text-white">
                        {{ message }}
                    </p>

                    <div class="form-control w-full">
                        <label class="label">
                            <span class="label-text">Email</span>
                        </label>
                        <input v-model="email" type="email" placeholder="email@example.com"
                            class="input input-bordered w-full" />
                    </div>
                    <div class="form-control mt-4">
                        <label class="label">
                            <span class="label-text">Password</span>
                        </label>
                        <input v-model="password" type="password" class="input input-bordered w-full"
                            placeholder="Enter password" />
                    </div>
                    <div class="form-control mt-6">
                        <button type="submit" class="btn btn-primary w-full">Login with Email</button>
                    </div>
                </form>

                <!-- Divider สำหรับแบ่งส่วน -->
                <div class="divider">OR</div>

                <!-- ฟอร์มเข้าสู่ระบบด้วยเบอร์โทรศัพท์ -->
                <form @submit.prevent="handleLoginWithPhone">
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Phone Number</span>
                        </label>
                        <input v-model="phone" type="tel" class="input input-bordered w-full grow" placeholder="+66" />
                    </div>
                    <div class="form-control mt-6">
                        <button type="submit" class="btn btn-primary w-full">Login with Phone</button>
                    </div>
                </form>

                <div class="text-center mt-4">
                    <p>Don't have an account?</p>
                    <NuxtLink to="/register" class="link link-primary">Sign up now</NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>