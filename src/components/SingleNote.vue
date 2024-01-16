<template>
    <div class="single-note" :class="{ greenBorder: props.note.isFinished }" draggable="true">
        <router-link :to="{ name: 'details', params: { id: props.note.id } }" draggable="false">
            <div class="single-note__content">
                <h3>{{ props.note.title }}</h3>
                <p v-if="props.note.text.length > 200">{{ props.note.text.substring(0, 200) }}......</p>
                <p v-else>{{ props.note.text }}</p>
            </div>
        </router-link>
        <div class="single-note__options">
            <button class="done" @click="noteStore.toggleIsFinished(note.id)">
                <span class="material-symbols-outlined">
                    done_outline
                </span>
            </button>
            <button @click="noteStore.deleteNote(note.id)">
                <span class="material-symbols-outlined">
                    delete
                </span>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import Note from "../interfaces/Note"
import { useNoteStore } from "../stores/NoteStore.ts"


//---pinia store
const noteStore = useNoteStore()


//props
const props = defineProps<{
    note: Note
}>()



</script>

<style lang="scss" scoped>
.single-note {
    animation: fade 1s;
    position: relative;
    background-color: $color-white;
    min-width: 30rem;
    max-width: 30rem;
    min-height: 10rem;
    font-size: 1.5rem;
    padding: 2rem 3rem;
    border-radius: .8rem;
    border: 1px solid $color-grey-light;
    overflow-wrap: anywhere;
    transition: all .2s;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;

    &:hover {
        box-shadow: rgba(0, 0, 0, 0.1) 1px 3px 7px 0px, rgba(0, 0, 0, 0.06) 1px 3px 6px 0px;

        .single-note__options {
            opacity: 1;
        }
    }

    & a {
        width: 100%;
    }


    &__content {
        width: 100%;
        padding-bottom: 1.5rem;

        @media only screen and (max-width: $bp-800) {
            padding-bottom: 3rem;
        }

        @media only screen and (max-width: $bp-600) {
            padding-bottom: 3rem;
        }

        & h3 {
            font-size: 1.8rem;
            font-weight: 400;
            margin-bottom: 1rem;
        }
    }

    &__options {
        opacity: 0;
        position: absolute;
        right: .5rem;
        bottom: .3rem;
        color: $color-grey-light;
        transition: all .2s;

        @media only screen and (max-width: $bp-800) {
            opacity: 1;
        }

        @media only screen and (max-width: $bp-600) {
            opacity: 1;
        }

        & button {
            transition: all .2s;

            @media only screen and (max-width: $bp-600) {}

            &:hover {
                color: rgb($color-grey-dark, .5);
            }
        }
    }
}

.greenBorder {
    border: 1px solid rgb(103, 199, 103);

    & .done {
        color: rgb(103, 199, 103);
    }
}
</style>