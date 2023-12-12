// localStorage 로컬스토리지 저장하는 곳
// 노트에 엑세스 할 각종 메서드 작성
export default class NotesAPI {

    static getAllNotes(){
        const notes = JSON.parse( localStorage.getItem( "notesapp-notes" ) || "[]" ) ; // 노트가 없으면 빈 값으로

        // 최근 날짜 순으로 보여주기
        return notes.sort((a, b) => {
            return new Date(a.updated) > new Date(b.updated) ? -1 : 1 ;
        })
    }

    static saveNote( noteToSave ) {
        const notes = NotesAPI.getAllNotes();

        const existing = notes.find( note => note.id == noteToSave.id);

        // edit / update
        if( existing ) {
            existing.title = noteToSave.title;
            existing.body = noteToSave.body;
            existing.updated = new Date().toISOString();
        } else {
            noteToSave.id = Math.floor( Math.random() * 1000000 );
            noteToSave.updated = new Date().toISOString();
            notes.push( noteToSave );
        }

        localStorage.setItem("notesapp-notes", JSON.stringify( notes ));
    }

    // 노트 삭제
    static deleteNote( id ){
        const notes = NotesAPI.getAllNotes();
        const newNotes = notes.filter( note => note.id != id); 
        // filter 메서드를 사용해서 삭제할 id를 가진 노트를 제외한, 나머지 애들만 저장해줌

        localStorage.setItem("notesapp-notes", JSON.stringify( newNotes ));
   }
}