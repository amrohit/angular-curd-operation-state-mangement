import { Component, OnInit, ElementRef, OnDestroy } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { tap, map } from "rxjs/operators";
import { Store, select } from "@ngrx/store";
import {
  addText,
  switchToInput,
  updateText,
  removeText
} from "./actions/curd.actions";
import { AppState, State } from "./reducer/curd.reducer";
import { ICurd } from "./curd.interface";
@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, OnDestroy { 
  name = "Angular";
  inputValue: string;
  editingValue: string;
  showText = true;
  showInput = false;
  subscriptionArr: Subscription[] = [];
  listArr: { showInput: boolean; showText: boolean; text: string }[];
  listArr$: Observable<
    { showInput: boolean; showText: boolean; text: string }[]
  >;
  curd$: Observable<AppState>;
  constructor(private store: Store<AppState>) {}
  ngOnInit() {
    this.listArr$ = this.store.pipe(select("curd")).pipe(
      tap(x => (this.listArr = x.itemArr)),
      map(x => x.itemArr)
    );
  }

  onAddtoList() {
    const item: ICurd = {
      showInput: false,
      showText: true,
      text: this.inputValue
    };
    this.store.dispatch(addText(item));
    this.inputValue = "";
  }

  trackByFunction(index, item) {
    //console.log(index, item);
    return index; //or item
  }

  onRemove(index) {
    this.store.dispatch(removeText({ index }));
  }
  onEdit(index) {
    console.log("on Editted!", index);
    // const listArrSubs = this.listArr$.subscribe(x => {
    //   console.log(x);
    //   this.editingValue = x[index].text;
    // });
    // this.subscriptionArr.push(listArrSubs);
    this.store.dispatch(
      switchToInput({ index, showInput: true, showText: false })
    );
  }
  updateText(index, text) {
    this.store.dispatch(
      updateText({
        index,
        showInput: false,
        showText: true,
        text: text
      })
    );
  }

  ngOnDestroy() {
    this.subscriptionArr.forEach(sub => sub.unsubscribe);
  }
}
