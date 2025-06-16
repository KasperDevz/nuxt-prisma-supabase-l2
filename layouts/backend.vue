<template>
    <div class="flex">
        <Sidebar />

        <div class="flex-1 flex flex-col min-h-screen">
            <Header />

            <main class="flex-1 p-4">
                <slot />
            </main>
        </div>
    </div>
</template>