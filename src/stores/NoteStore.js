import { defineStore } from 'pinia'

export const useNoteStore = defineStore('notes', {
  state: () => ({
    /** @type {{ title: string, text: string, id: number, isFinished: boolean}[]} */
    notes: [],
    /** @type {'all' | 'finished' | 'unfinished'} */
    filter: 'all',
    /** @type { null | string} */
    error: null,
    /** @type { boolean } */
    isLoading: false
  }),
  getters: {
    finishedNotes(state) {
      // autocompletion! ✨
      return state.notes.filter((n) => n.isFinished)
    },
    unfinishedNotes(state) {
      return state.notes.filter((n) => !n.isFinished)
    },
    /**
     * @returns {{ title: string, text: string, id: number, isFinished: boolean }[]}
     */
    filteredTodos(state) {
      if (this.filter === 'finished') {
        // call other getters with autocompletion ✨
        return this.finishedTodos
      } else if (this.filter === 'unfinished') {
        return this.unfinishedTodos
      }
      return this.todos
    },
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
          this.notes = data.toSorted((note1, note2) => note1.order - note2.order)
          console.log(this.notes)
          this.error = null
        }

      } catch (err) {
        this.error = err.message
      }

      this.isLoading = false
    },

    async addNote(note) {

      try {
        const res = await fetch('http://localhost:3000/notes', {
          method: 'POST',
          body: JSON.stringify({ ...note, order: this.notes.length }),
          headers: { 'Content-Type': 'application/json' }
        })
        if (!res.ok) {
          throw new Error("Something went wrong with addNote")
        } else {
          this.notes.push(note)
          this.error = null
        }
      } catch (err) {
        this.error = err.message
      }
    },

    async deleteNote(id) {
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
        this.error = err.message
      }
    },

    async toggleIsFinished(id) {
      const note = this.notes.find((n) => n.id == id)
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
        this.error = err.message
      }
    },
    updateNotesOrder(reorderedNotes) {
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
          this.error = err.message
        }

      })
    }
  },
})