/* 
same as used in @aeaton/react-prosemirror-config-default repo except for placeholderPlugin
*/

import "prosemirror-gapcursor/style/gapcursor.css";
import "prosemirror-tables/style/tables.css";
import { placeholder } from "@aeaton/prosemirror-placeholder";
import { dropCursor } from "prosemirror-dropcursor";
import { gapCursor } from "prosemirror-gapcursor";
import { history } from "prosemirror-history";
import { columnResizing, tableEditing } from "prosemirror-tables";
import { placeholderPlugin } from "./placeholderPlugin"; //added
import {
  baseKeys,
  editorKeys,
  listKeys,
  tableKeys,
} from "@aeaton/react-prosemirror-config-default/keys";
import { rules } from "@aeaton/react-prosemirror-config-default/rules";
export var plugins = [
  history(),
  tableKeys(),
  listKeys(),
  editorKeys(),
  baseKeys(),
  rules(),
  placeholder(),
  dropCursor(),
  gapCursor(),
  tableEditing(),
  columnResizing({}),
  placeholderPlugin(), //added
];
document.execCommand("enableObjectResizing", false, "false");
document.execCommand("enableInlineTableEditing", false, "false");
