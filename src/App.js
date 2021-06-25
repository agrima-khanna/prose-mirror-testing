import { useState } from "react";
import {
  HtmlEditor,
  Toolbar,
  Editor,
  Floater,
} from "@aeaton/react-prosemirror";
// import {
//   plugins,
//   schema,
//   toolbar,
// } from "@aeaton/react-prosemirror-config-default";
import "./index.css";
/*custom schema,toolbar,plugins*/
import { schema } from "./schema";
import { toolbar } from "./toolbar";
import { plugins } from "./plugins";
const initialValue = "<p></p>";
/*added floater*/
const floatingTools = toolbar.slice(0, 2);
function App() {
  const [value, setValue] = useState(initialValue);

  console.log({ value });
  console.log(schema);
  return (
    <HtmlEditor
      schema={schema}
      plugins={plugins}
      value={initialValue}
      handleChange={setValue}
      debounce={250}
    >
      <Toolbar toolbar={toolbar} />
      <Floater>
        <Toolbar toolbar={floatingTools} />
      </Floater>
      <Editor autoFocus />
    </HtmlEditor>
  );
}
export default App;
