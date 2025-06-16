<script setup lang="ts">

definePageMeta({
    layout: 'auth',
})

useHead({
    title: 'Verify',
    meta: [
        {
            name: 'keywords',
            content: 'Verify, Nuxt 3, Backend'
        },
        {
            name: 'Description',
            content: 'Verify Nuxt 3,  IT Genius Engineering'
        }
    ]
})

</script>

<template>
    <div class="bg-base-200 h-[calc(100vh-50px)] flex items-center justify-center">
        <div class="card bg-base-100 shadow-xl max-w-md w-full p-6">
            <h2 class="card-title text-2xl font-bold mb-6">Verify OTP</h2>

            <p v-if="message" :class="status ? 'bg-success' : 'bg-error'" class="p-3 rounded-lg text-white mb-4">
                {{ message }}
            </p>

            <form @submit.prevent="handleVerifyOTP">
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Enter OTP</span>
                    </label>
                    <input v-model="otp" type="text" class="input input-bordered w-full mt-2" placeholder="Enter OTP" />
                </div>
                <div class="form-control mt-6">
                    <button type="submit" class="btn btn-primary w-full">Verify OTP</button>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped></style>