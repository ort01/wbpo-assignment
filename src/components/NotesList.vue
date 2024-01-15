<template>
    <div class="mx-auto">
        <draggable v-model="notes" tag="ol" item-key="id" @change="noteStore.updateNotesOrder(notes)" v-if="notes.length"
            class="flex flex-wrap gap-14 max-w-screen-2xl mx-auto mt-14 px-14 justify-center items-center">
            <template #item="{ element: note }">
                <SingleNote :note="note" />
            </template>
        </draggable>
        <div v-if="isLoading">
            Loading...
        </div>
        <div v-if="error">
            {{ error }}
        </div>
    </div>
</template>

<script setup lang="ts">
//imports
import SingleNote from "./SingleNote.vue"
import { useNoteStore } from "../stores/NoteStore.ts"
import { storeToRefs } from "pinia";
import draggable from "vuedraggable"

//---pinia store
const noteStore = useNoteStore()
//fetch tasks with action; getting data from server
noteStore.getNotes()
//storeToRefs;
const { notes, error, isLoading } = storeToRefs(noteStore)


</script>

<style scoped></style>