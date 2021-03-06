/*
same schema as used in the @aeaton/react-prosemirror-config-default repo except for the image node
*/
import {
  blockquote,
  bold,
  code,
  codeBlock,
  doc,
  heading,
  horizontalRule,
  italic,
  lineBreak,
  link,
  list,
  listItem,
  paragraph,
  strikethrough,
  subscript,
  superscript,
  table,
  tableDataCell,
  tableHeaderCell,
  tableRow,
  text,
  underline,
  image, //added
} from "@aeaton/prosemirror-schema";
import { Schema } from "prosemirror-model";
export var schema = new Schema({
  marks: {
    bold: bold,
    code: code,
    italic: italic,
    link: link,
    strikethrough: strikethrough,
    subscript: subscript,
    superscript: superscript,
    underline: underline,
  },
  nodes: {
    text: text,
    doc: doc,
    paragraph: paragraph,
    lineBreak: lineBreak,
    heading: heading,
    blockquote: blockquote,
    codeBlock: codeBlock,
    horizontalRule: horizontalRule,
    list: list,
    listItem: listItem,
    table: table,
    tableRow: tableRow,
    tableDataCell: tableDataCell,
    tableHeaderCell: tableHeaderCell,
    image: image, //added
  },
});
