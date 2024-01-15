<template>
    <div class="block min-w-full">
        <nav class="flex items-center justify-between p-4 text-4xl">
            <div class="flex items-center justify-center gap-4">
                <img src="../../public/note.svg" alt="logo" class="w-14 ">
                <router-link :to="{ name: 'home' }" class="font-extralight mt-2"> WBPO notes app</router-link>
            </div>
        </nav>
    </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped></style>