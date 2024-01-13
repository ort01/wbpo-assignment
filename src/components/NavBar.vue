<template>
    <div class="navbar">
        <nav>
            <div class="navbar__title">
                <img src="../../public/note.svg" alt="">
                <router-link :to="{ name: 'home' }"> WBPO notes app</router-link>
            </div>
            <div class="navbar__auth">
                <router-link :to="{ name: 'login' }">Login</router-link>
                <router-link :to="{ name: 'signup' }">Signup</router-link>
            </div>
        </nav>
    </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.navbar {
    display: block;
    min-width: 100%;

    & nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem 3rem;
        font-size: 2rem;
    }

    &__title {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: .5em;

        & img {
            width: 2em;
        }

        & a {
            font-weight: 200;
            margin-top: .3em;
        }
    }

    &__auth {
        display: flex;
        gap: 1em;
        color: $color-primary;
    }
}
</style>