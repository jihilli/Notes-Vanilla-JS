export default class NotesView {
    constructor(root, { onNoteSelect, onNoteAdd, onNoteEdit, onNoteDelete } = {}) {
    // 여기서 root는 index.html에서 body 안에 가장 큰 classnotes", id="app"인 가장 큰 div를 뜻함

        this.root = root ;
        this.onNoteSelect = onNoteSelect ;
        this.onNoteAdd = onNoteAdd ;
        this.onNoteEdit = onNoteEdit ;
        this.onNoteDelete = onNoteDelete ;

        // view 렌더하기
        this.root.innerHTML = `
            <div class="notes__sidebar">
                <button class="notes__add" type="button">Add Note</button>
                <div class="notes__list"></div>
            </div>
            <div class="notes__preview">
                <input class="notes__title" type="text" placeholder="New Note...">
                <textarea class="notes__body">Take note...</textarea>
            </div>
        `;

        const btnAddNote = this.root.querySelector(".notes__add"); 
        // querySelector("notes__add")가 아니라, 그 앞에 . 붙여줘야 함! 클래스네임에 접근하기
        const inpTitle = this.root.querySelector(".notes__title");
        const inpBody = this.root.querySelector(".notes__body");

        btnAddNote.addEventListener("click", ()=>{
            this.onNoteAdd(); // 클릭하면 onNoteAdd 함수 불러오기
        });

        [inpTitle, inpBody].forEach(inputField => {
            inputField.addEventListener("blur", () => {
                const updatedTitle = inpTitle.value.trim();
                const updatedBody = inpBody.value.trim();

                this.onNoteEdit(updatedTitle, updatedBody);
            })
        });

        // 맨 처음에 노트 미리보기 숨김
        this.updateNotePreviewVisibility(false);

    }

    // 노트들 미리보기
    _createListItemHTML(id, title, body, updated){
        const MAX_BODY_LENGTH = 60;
        // 60자 넘어가면 뒤는 자르기
        // 최대길이 정해주고, 넘어가면 ... 표시되게 하기

        return `
            <div class="notes__list-item" data-note-id="${id}">
                <div class="notes__small-title">${title}</div>
                <div class="notes__small-body"> 
                    ${body.substring(0, MAX_BODY_LENGTH)} 
                    ${body.length > MAX_BODY_LENGTH ? "..." : ""} 
                </div> 
                <div class="notes__small-updated">
                    ${updated.toLocaleString(undefined, { dateStyle: "full", timeStyle : "short"})}
                </div>
            </div>
        `;
    }

    updateNoteList(notes) { // 여기의 notes는 localStorage에 들어있는 것들을 지칭
        const notesListContainer = this.root.querySelector(".notes__list");

        // Empty List
        notesListContainer.innerHTML = "";


        // for-of 반복문
        for (const note of notes) {
            const html = this._createListItemHTML(note.id, note.title, note.body, new Date(note.updated));

            notesListContainer.insertAdjacentHTML("beforeend", html);
        }

       // console.log(notesListContainer.querySelectorAll(".notes__list-item").length);  // 노트 리스트 아이템의 개수 출력
       // console.log(notesListContainer.innerHTML);

        
        // 각 아이템별로 선택/삭제 이벤트 걸기
        notesListContainer.querySelectorAll(".notes__list-item").forEach(noteListItem => { 
            // -> .notes__list-item 클래스명으로 접근함 !! 오타 주의 !!!!!
            noteListItem.addEventListener("click", (event) => {
                // console.log("Note item clicked");  // 클릭될 때마다 콘솔에 메시지 출력
                // console.log(`noteId: ${noteListItem.dataset.noteId}`);
                this.onNoteSelect(event.currentTarget.dataset.noteId);
            });
        

            noteListItem.addEventListener("dblclick", () => {
                const doDelete = confirm("정말로 이 노트를 삭제하시겠습니까?");

                if(doDelete) {
                    this.onNoteDelete(noteListItem.dataset.noteId);
                }
            });
        });
    }

    
    updateActiveNote(note) {
        this.root.querySelector(".notes__title").value = note.title;
        this.root.querySelector(".notes__body").value = note.body;

        document.querySelectorAll(".notes__list-item").forEach(noteListItem => {
            noteListItem.classList.remove("notes__list-item--selected");
        });

        this.root.querySelector(`.notes__list-item[data-note-id="${note.id}"]`).classList.add("notes__list-item--selected");
    }

    // 화면 좌측 - 노트별 미리보기
    updateNotePreviewVisibility(visible) {
        this.root.querySelector(".notes__preview").style.visibility = visible ? "visible" : "hidden" ;
    }
}