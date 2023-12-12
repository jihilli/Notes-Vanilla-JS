import NotesAPI from "./NotesAPI.js";
import NotesView from "./NotesView.js";

export default class App {
    constructor(root){
        this.notes = [];
        this.activeNote = null;
        this.view = new NotesView(root, this._handlers());

        this._refreshNotes();
    }

    // 노트 목록 새로고침
    _refreshNotes() { 
        const notes = NotesAPI.getAllNotes();

        this._setNotes(notes);
    
        if (notes.length > 0) {
            this._setActiveNote(notes[0]); // 가장 최근에 업데이트된 노트를 0번 인덱스-첫번째 위치로.
        }
    }

    _setNotes(notes) {
        this.notes = notes; 
        // _refreshNotes 내 this._setNotes()에 넘겨준 인자인 notes
        this.view.updateNoteList(notes);
        this.view.updateNotePreviewVisibility(notes.length > 0);
        // notes가 비어있지 않으면, 왼쪽의 미리보기 화면 보여주기
    }

    _setActiveNote(note) {
        this.activeNote = note; // activeNote를 넘겨준 인자인 note로.
        this.view.updateActiveNote(note);
        // -> view를 호출하고, 그 안의 updateActiveNote 호출
    }

    _handlers() {
        return {
            onNoteSelect: noteId => {
                const selectedNote = this.notes.find(note => note.id == noteId);
                this._setActiveNote(selectedNote)
            },
            onNoteAdd: () => {
                const newNote = {
                    title: "New Note",
                    body: "Take note..."
                }
                NotesAPI.saveNote(newNote);
                this._refreshNotes();
            },
            onNoteEdit: (title, body) => {
                NotesAPI.saveNote({
                    id : this.activeNote.id, // 맨 위에서 정해준 this.activeNote 활용하기
                    title,
                    body
                });
                
                this._refreshNotes();

            },
            onNoteDelete: noteId => {
                NotesAPI.deleteNote(noteId);
                this._refreshNotes();
            }
        };
    }
}