/*
actions to be performed on button clicks on toolbar
same as used in @aeaton/react-prosemirror-config-default except for the imageUpload command
*/

import {
  insertNodeOfType,
  isMarkActive,
  promptForURL,
  setListTypeOrWrapInList,
  toggleWrap,
} from "@aeaton/prosemirror-commands";
import { setBlockType, toggleMark, wrapIn } from "prosemirror-commands";
import {
  liftListItem,
  sinkListItem,
  splitListItem,
} from "prosemirror-schema-list";
import { imageUpload } from "./imageUploadCommand";
import { schema } from "./schema";
// marks
export var toggleMarkBold = toggleMark(schema.marks.bold);
export var toggleMarkItalic = toggleMark(schema.marks.italic);
export var toggleMarkCode = toggleMark(schema.marks.code);
export var toggleMarkSubscript = toggleMark(schema.marks.subscript);
export var toggleMarkSuperscript = toggleMark(schema.marks.superscript);
export var toggleMarkUnderline = toggleMark(schema.marks.underline);
export var toggleMarkStrikethrough = toggleMark(schema.marks.strikethrough);
export var toggleLink = function (state, dispatch) {
  if (isMarkActive(schema.marks.link)(state)) {
    toggleMark(schema.marks.link)(state, dispatch);
    return true;
  }
  var href = promptForURL();
  if (!href) {
    return false;
  }
  toggleMark(schema.marks.link, { href: href })(state, dispatch);
  // view.focus()
  return true;
};
// nodes
export var setBlockTypeParagraph = setBlockType(schema.nodes.paragraph);
export var setBlockTypeCodeBlock = setBlockType(schema.nodes.codeBlock);
export var setBlockTypeHeading = function (level) {
  return setBlockType(schema.nodes.heading, { level: level });
};
export var toggleWrapBlockquote = toggleWrap(schema.nodes.blockquote);
export var wrapInBlockquote = wrapIn(schema.nodes.blockquote);
export var setListTypeBullet = setListTypeOrWrapInList(schema.nodes.list, {
  type: "bullet",
});
export var setListTypeOrdered = setListTypeOrWrapInList(schema.nodes.list, {
  type: "ordered",
});
export var liftListItemCommand = liftListItem(schema.nodes.listItem);
export var sinkListItemCommand = sinkListItem(schema.nodes.listItem); // TODO: same list type
export var splitListItemCommand = splitListItem(schema.nodes.listItem);
export var insertNodeLineBreak = insertNodeOfType(schema.nodes.lineBreak);
export var insertNodeHorizontalRule = insertNodeOfType(
  schema.nodes.horizontalRule
);
/*function to upload image*/
export var imageUploadCommand = imageUpload();
