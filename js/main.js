import App from "./App.js";
//import NotesAPI from './NotesAPI.js'
//import NotesView from './NotesView.js'

const root = document.getElementById("app");
const app = new App(root);



/*

const view = new NotesView( app , {
    // 해당 노트를 클릭했을 때
    onNoteAdd() {
        console.log("Let's add a new note!");
    },
    onNoteSelect(id) {
      console.log("Note Selected:" + id);
    },
    onNoteDelete(id) {
        console.log("Note DELETED:" + id);
      },
    onNoteEdit(newTitle, newBody) {
        console.log(newTitle);
        console.log(newBody);
    }
});

const notes = NotesAPI.getAllNotes();

view.updateNoteList(notes);
// 첫번째 노트 보여주기
view.updateActiveNote(notes[0]);

*/

// ------------------------------------------------

/*
- 노트 저장하기 : 객체로 저장
NotesAPI.saveNotes({
    id : 503012,
    title : "New Note!",
    body : "Water Bottle."
})

- 해당 아이디 가진 노트 삭제하기
NotesAPI.deleteNote(503012);

*/