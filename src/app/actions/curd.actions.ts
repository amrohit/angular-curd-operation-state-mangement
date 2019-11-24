import { createAction, props } from "@ngrx/store";
import { ICurd } from "../curd.interface";
export const addText = createAction(
  "[Crud Component] Add",
  props<{
    item: ICurd;
  }>()
);

export const switchToInput = createAction(
  "[App Component] Switch Input",
  props<{
    index: number;
    showInput: boolean;
    showText: boolean;
  }>()
);
export const updateText = createAction(
  "[Crud Component] Update",
  props<{
    index: number;
    showInput: boolean;
    showText: boolean;
    text: string;
  }>()
);
export const removeText = createAction(
  "[Crud Component] Delete",
  props<{
    index: number;
  }>()
);
