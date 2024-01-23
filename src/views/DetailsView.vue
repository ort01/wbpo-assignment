<template>
    <div class="details relative max-w-7xl mx-auto my-40 p-6 text-xl border rounded-md shadow-lg">
        <div v-if="note" class="p-8">
            <div v-if="!edit">
                <h3 class="mb-8 text-4xl font-normal border-b-2 border-gray-200">
                    {{ note.title }}
                </h3>
                <p class="mb-4 text-2xl">{{ note.text }}</p>
            </div>
            <div v-if="edit">
                <form @submit.prevent="handleSave">
                    <input v-model="editTitle"
                        class="block w-full mb-8 text-4xl font-normal border-b-2 border-gray-200 outline-none" />
                    <textarea v-model="editText"
                        class="mb-6 w-full text-2xl min-h-[30rem] resize-none outline-none"></textarea>
                </form>
            </div>

            <button v-if="edit" @click="handleSave" class="absolute right-4 bottom-2 text-gray-300 hover:text-gray-400">
                <span class="material-symbols-outlined">
                    save
                </span>
            </button>
            <button v-else @click="handleEdit" class="absolute right-4 bottom-2 text-gray-300 hover:text-gray-400">
                <span class="material-symbols-outlined">
                    edit
                </span>
            </button>

        </div>
        <div v-if="isLoading" class="loading">
            Loading...
        </div>
        <div v-if="error" class="error">
            {{ error }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import Note from "../interfaces/Note";
import { useNoteStore } from "../stores/NoteStore.js"
import { useRoute } from 'vue-router'
import { computed } from "vue";
import { ref } from "vue";


//---pinia store
const noteStore = useNoteStore()
const { notes, error, isLoading } = storeToRefs(noteStore)

noteStore.getNotes()


//route to get the id from url
const route = useRoute()

//state
const edit = ref<boolean>(false)
const editTitle = ref<string>("")
const editText = ref<string>("")

//getting the specific note
const note = computed(() => {
    if (notes) {
        return notes.value.find((n: Note) => n.id == Number.parseInt(route.params.id as string))
    } else {
        return undefined
    }
})

//functions
const handleSave = () => {

    if (note.value) {
        noteStore.updateNote(note.value.id, { title: editTitle.value, text: editText.value })
    }

    edit.value = false
}

const handleEdit = () => {

    edit.value = true

    if (note.value) {
        editTitle.value = note.value.title
        editText.value = note.value.text
    }
}

</script>




<style lang="scss" scoped>
.details {
    animation: fade 1s;

    @media only screen and (max-width: $bp-800) {
        width: 50rem;
    }
}
</style>