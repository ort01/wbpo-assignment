<template>
    <div class="details-bg">
        <div class="details-content" @backdrop-click="">
            Content
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.details-bg {
    position: relative;
    opacity: .4;
    background-color: $color-grey-dark;
    height: 100vh;
    width: 100vw;
}

.details-content {
    position: absolute;
    background-color: white;
    padding: 20rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>