import { createReducer, on } from "@ngrx/store";

import * as curdActions from "../actions/curd.actions";

export interface State {
  showInput: boolean;
  showText: boolean;
  text: string;
}

export interface AppState {
  itemArr: State[];
}

export const initalState: AppState = {
  itemArr: []
};

export const _curdReducer = createReducer(
  initalState,
  on(curdActions.addText, (state: AppState, item) => {
    console.log(item, { item });
    console.log(state);
    const newItems = {
      itemArr: [...state.itemArr, item]
    };
    return { ...state, itemArr: [...state.itemArr, item] };
  }),
  on(
    curdActions.switchToInput,
    (state: AppState, { index, showInput, showText }) => {
      console.log(index, showInput, showText);
      const listItem = state.itemArr[index];
      const updatedListItem = {
        ...listItem,
        showInput,
        showText
      };
      const listItems = [...state.itemArr];
      listItems[index] = updatedListItem;
      console.log(listItems, updatedListItem, listItem, index);
      return {
        ...state,
        itemArr: listItems
      };
    }
  ),
  on(
    curdActions.updateText,
    (state: AppState, { index, showInput, showText, text }) => {
      const listItem = state.itemArr[index];
      const updatedListItem = {
        ...listItem,
        showInput,
        showText,
        text
      };
      const listItems = [...state.itemArr];
      listItems[index] = updatedListItem;
      return { ...state, itemArr: listItems };
    }
  ),
  on(curdActions.removeText, (state: AppState, { index }) => {
    const listItems = [...state.itemArr];
    listItems.splice(index, 1);
    return {
      ...state,
      itemArr: listItems
    };
  })
);

export function createReducer(state, action) {
  return _curdReducer(state, action);
}
