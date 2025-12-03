import { inject, Injectable } from '@angular/core';
import { Firestore, collectionData, collection, doc, onSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Note } from '../interfaces/note.interface';

@Injectable({
  providedIn: 'root'
})

export class NoteListService {
  trashNotes: Note[] = [];
  normalNotes: Note[] = [];

  // items$;
  // items;
  firestore: Firestore = inject(Firestore);

  unsubTrash;
  unsubNotes;

  // unsubSingle;

  constructor() {

    this.unsubNotes = this.subNotesList();
    this.unsubTrash = this.subTrashList();

    // this.items$ = collectionData(this.getNotesRef());

    // this.unsubSingle = onSnapshot(this.getSingleDocRef('notes', '2coC4UUQnkxypKVWCByY'), (element) => {
    //   console.log(element);
    // });

    // this.items$ = collectionData(this.getNotesRef());
    // this.items = this.items$.subscribe((list) => {
    //   list.forEach(element => {
    //     console.log(element);
    //   });
    // });

  }

  ngonDestroy() {
    this.unsubNotes();
    this.unsubTrash();

    // this.unsubSingle();
    // this.items.unsubscribe();
  };

  subNotesList() {
    return onSnapshot(this.getNotesRef(), (list) => {
      this.normalNotes = [];
      list.forEach(element => {
        this.normalNotes.push(this.setNoteObject(element.data(), element.id));
        console.log(element.id);
        console.log(element.data());
      });
    });
  }

  subTrashList() {
    return onSnapshot(this.getTrashRef(), (list) => {
      this.trashNotes = [];
      list.forEach(element => {
        this.trashNotes.push(this.setNoteObject(element.data(), element.id));
        console.log(element.id);
        console.log(element.data());
      });
    });
  }




  setNoteObject(obj: any, id: string): Note {
    return {
      id: id,
      type: obj.type || "note",
      title: obj.title || "",
      content: obj.content || "",
      marked: obj.marked || false,
    }
  }


  getNotesRef() {
    return collection(this.firestore, 'notes');
  };

  getTrashRef() {
    return collection(this.firestore, 'trash');
  };

  getSingleDocRef(colID: string, docID: string) {
    return doc(collection(this.firestore, colID), docID);
  }

}
