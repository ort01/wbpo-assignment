import { defineStore } from 'pinia'
import Note from '../interfaces/Note'

interface NoteStoreState {
  notes: Note[],
  error: null | string,
  isLoading: boolean
}

export const useNoteStore = defineStore('notes', {
  state: (): NoteStoreState => ({
    notes: [],
    error: null,
    isLoading: false
  }),
  getters: {

  },
  actions: {
    async getNotes() {
      this.isLoading = true

      try {
        const res = await fetch('http://localhost:3000/notes')
        const data = await res.json()

        if (!res.ok) {
          throw new Error("Something went wrong with getNotes")
        } else {
          this.notes = data.toSorted((note1: Note, note2: Note) => {
            if (note1.order != undefined && note2.order != undefined) {
              return note1.order - note2.order
            }
          })
          this.error = null
        }

      } catch (err) {
        this.error = (err as Error).message
      }

      this.isLoading = false
    },

    async addNote(note: Note) {
      note.order = this.notes.length
      try {
        const res = await fetch('http://localhost:3000/notes', {
          method: 'POST',
          body: JSON.stringify(note),
          headers: { 'Content-Type': 'application/json' }
        })
        if (!res.ok) {
          throw new Error("Something went wrong with addNote")
        } else {
          this.notes.push(note)
          this.error = null
        }
      } catch (err) {
        this.error = (err as Error).message
      }
    },


    async deleteNote(id: number) {
      try {
        const res = await fetch(`http://localhost:3000/notes/${id}`, {
          method: 'DELETE'
        })

        if (!res.ok) {
          throw new Error("Something went wrong with deleteNote")
        } else {
          this.notes = this.notes.filter((n) => {
            return n.id !== id
          })
          this.updateNotesOrder(this.notes)
          this.error = null
        }

      } catch (err) {
        this.error = (err as Error).message
      }
    },

    async updateNote(id: number, updatedNote: { title: string, text: string }) {
      const noteIndex = this.notes.findIndex((n) => n.id == id)
      this.notes[noteIndex].title = updatedNote.title
      this.notes[noteIndex].text = updatedNote.text

      try {
        const res = await fetch(`http://localhost:3000/notes/${id}`, {
          method: 'PATCH',
          body: JSON.stringify(updatedNote),
          headers: { 'Content-Type': 'application/json' }
        })

        if (!res.ok) {
          throw new Error("Something went wrong with updateNote")
        } else {
          this.error = null
        }

      } catch (err) {
        this.error = (err as Error).message
      }
    },

    async toggleIsFinished(id: number) {
      const note = this.notes.find((n) => n.id == id)
      if (note) {
        note.isFinished = !note.isFinished

        try {
          const res = await fetch(`http://localhost:3000/notes/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({ isFinished: note.isFinished }),
            headers: { 'Content-Type': 'application/json' }
          })

          if (!res.ok) {
            throw new Error("Something went wrong with toggleIsFinished")
          } else {
            this.error = null
          }

        } catch (err) {
          this.error = (err as Error).message
        }
      } else {
        console.log("Note not found")
      }

    },
    updateNotesOrder(reorderedNotes: Note[]) {
      reorderedNotes.forEach(async (note, index) => {

        try {
          const res = await fetch(`http://localhost:3000/notes/${note.id}`, {
            method: 'PATCH',
            body: JSON.stringify({ order: index }),
            headers: { 'Content-Type': 'application/json' }
          })

          if (!res.ok) {
            throw new Error("Something went wrong with updateNotesOrder")
          } else {
            this.error = null
          }

        } catch (err) {
          this.error = (err as Error).message
        }

      })
    }
  },
})