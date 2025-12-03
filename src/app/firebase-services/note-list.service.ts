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

  items$;
  items;
  firestore: Firestore = inject(Firestore);

  unsubList;
  unsubSingle;

  constructor() {
    this.items$ = collectionData(this.getNotesRef());

    this.unsubList = onSnapshot(this.getNotesRef(), (list) => {
      list.forEach(element => {
        console.log(element.id);
        console.log(element.data());
      });
    });

    this.unsubSingle = onSnapshot(this.getSingleDocRef('notes', '2coC4UUQnkxypKVWCByY'), (element) => {
      console.log(element);
    });




    this.items$ = collectionData(this.getNotesRef());
    this.items = this.items$.subscribe((list) => {
      list.forEach(element => {
        console.log(element);
      });
    })
  }

  ngonDestroy() {
    this.unsubList();
    this.unsubSingle();
    this.items.unsubscribe();
  };

  setNoteObject(obj: any, id: string): Note {
    return {
      id: id || "",
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
