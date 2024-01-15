<template>
    <div>
        <form @submit.prevent="handleSubmit"
            class="relative w-[48rem] h-auto m-16 mx-auto bg-white rounded-lg p-4 shadow-md border"
            :class="{ expand: createNoteState }">
            <input placeholder="Title" v-model="title" v-if="createNoteState"
                class="w-full border-none p-1 outline-none text-3xl font-inherit font-light resize-none" />
            <textarea placeholder="Add a note..." v-model="text" @click="createNoteState = true"
                class="w-full border-none p-1 outline-none text-3xl font-inherit font-light resize-none h-11">
            </textarea>
            <button class="text-4xl text-white absolute bottom-[-2.2rem] right-4 bg-amber-300 py-4 px-6 rounded-full"
                v-if="createNoteState" @click="handleSubmit">+</button>
            <button class="text-white absolute bottom-[-1.5rem] left-4 bg-gray-300 py-1 px-2 rounded-full"
                v-if="createNoteState" @click="createNoteState = false">
                <span class="material-symbols-outlined">
                    keyboard_arrow_up
                </span>
            </button>
        </form>
    </div>
</template>




<script setup lang="ts">
import { ref } from 'vue';
import { useNoteStore } from "../stores/NoteStore.ts"


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
        createNoteState.value = false
    }
}
</script>




<style lang="scss" scoped>
form {
    @media only screen and (max-width: $bp-600) {
        width: 35rem;
    }
}

.expand {
    padding-bottom: 2.5rem;

    & textarea {
        display: block;
        font-size: 1.5rem;
        min-height: 20rem;
        max-height: 50rem;
        height: auto;
    }
}
</style>