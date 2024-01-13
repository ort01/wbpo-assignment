<template>
    <div>
        <CreateNote />
        <NotesList />
    </div>
</template>

<script setup lang="ts">
//---imports
import CreateNote from "../components/CreateNote.vue"
import NotesList from "../components/NotesList.vue"

import { useNoteStore } from "../stores/NoteStore.js"

</script>



<style scoped></style>