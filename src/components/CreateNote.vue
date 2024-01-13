<template>
    <div>
        <form class="create-note-form" :class="{ expand: createNoteState }" @submit.prevent="handleSubmit"
            @backdrop-click="createNoteState = false">
            <input placeholder="Title" v-model="title" v-if="createNoteState" />
            <textarea placeholder="Add a note..." v-model="text" @click="createNoteState = true">
            </textarea>
            <button v-if="createNoteState" @click="handleSubmit">+</button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useNoteStore } from "../stores/NoteStore.js"


//---pinia store
const noteStore = useNoteStore()


//refs
const title = ref<string>('')
const text = ref<string>('')
const createNoteState = ref<boolean>(false)


//functions
const handleSubmit = () => {
    if (title.value.length || text.value.length) {
        noteStore.addNote({
            title: title.value,
            text: text.value,
            isFinished: false,
            id: Math.floor(Math.random() * 100000),
        })
        title.value = ""
        text.value = ""
    }
}
</script>



<style lang="scss" scoped>
form {
    position: relative;
    width: 48rem;
    height: auto;
    margin: 4rem auto;
    background: $color-white;
    border-radius: .5rem;
    padding: 1rem 1.5rem .5rem;
    box-shadow: 0 1px 4px rgb(138, 137, 137);

    & input,
    & textarea {
        width: 100%;
        border: none;
        padding: .4rem;
        outline: none;
        font-size: 2rem;
        font-family: inherit;
        font-weight: 300;
        resize: none;
    }

    & input {
        font-weight: 400;
    }

    & textarea {
        height: 4rem;
    }

    & button {
        font-size: 3rem;
        color: $color-white;
        position: absolute;
        bottom: -2.2rem;
        right: 1rem;
        background-color: rgb($color-primary, 1);
        padding: 0 1.4rem;
        border-radius: 50%;

    }

    &.expand {
        padding-bottom: 2.5rem;

        & textarea {
            display: block;
            font-size: 1.5rem;
            min-height: 20rem;
            max-height: 50rem;
            height: auto;
        }
    }
}
</style>