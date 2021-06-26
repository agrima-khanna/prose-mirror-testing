/* reference-https://prosemirror.net/examples/upload/ */

import { schema } from "./schema";

import { plugins } from "./plugins";
/*importing placeholderPlugin from the array of plugins rather than importing the placeholderPlugin directly*/
var placeholderPlugin = plugins[11];
function findPlaceholder(state, id) {
  //console.log(placeholderPlugin.getState(state));
  let decos = placeholderPlugin.props.decorations(state);

  let found = decos.find(null, null, (spec) => spec.id === id);
  return found.length ? found[0].from : null;
}
/* 
imageUpload function is imported and stored in  { imageUploadCommand} in "./commands.js" 
and then added as ["action"] for imageUpload button in "./toolbar.js"
*/
export var imageUpload = function () {
  /*
    passing state, dispatch, view as per other functions defined in @aeaton/prosemirror-commands/index.js
    */
  return function (state, dispatch, view) {
    /* 
      hidden button of input type="file" which is triggered when image upload button of tootlbar is clicked
      */
    console.log(view);
    var hiddenUploadButton = document.createElement("input");
    hiddenUploadButton.setAttribute("type", "file");
    console.log("imageUpload called");
    hiddenUploadButton.addEventListener("change", (e) => {
      if (state.selection.$from.parent.inlineContent && e.target.files.length)
        startImageUpload(view, e.target.files[0]);
      view.focus();
    });
    hiddenUploadButton.click();
    return true;
  };
};
function startImageUpload(view, file) {
  // A fresh object to act as the ID for this upload
  let id = {};

  // Replace the selection with a placeholder
  let tr = view.state.tr;
  if (!tr.selection.empty) tr.deleteSelection();
  tr.setMeta(placeholderPlugin, { add: { id, pos: tr.selection.from } });
  view.dispatch(tr);

  uploadFile(file).then(
    (url) => {
      let pos = findPlaceholder(view.state, id);
      // If the content around the placeholder has been deleted, drop
      // the image
      if (pos == null) return;
      // Otherwise, insert it at the placeholder's position, and remove
      // the placeholder
      view.dispatch(
        view.state.tr
          .replaceWith(pos, pos, schema.nodes.image.create({ src: url }))
          .setMeta(placeholderPlugin, { remove: { id } })
      );
    },
    () => {
      // On failure, just clean up the placeholder
      view.dispatch(tr.setMeta(placeholderPlugin, { remove: { id } }));
    }
  );
}

// This is just a dummy that loads the file and creates a data URL.
// You could swap it out with a function that does an actual upload
// and returns a regular URL for the uploaded file.
function uploadFile(file) {
  let reader = new FileReader();
  return new Promise((accept, fail) => {
    reader.onload = () => accept(reader.result);
    reader.onerror = () => fail(reader.error);
    // Some extra delay to make the asynchronicity visible
    setTimeout(() => reader.readAsDataURL(file), 1500);
  });
}
