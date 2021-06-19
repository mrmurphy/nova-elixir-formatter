const { LANG_ELIXIR } = require("./constants");
const { runMixFormat } = require("./runMixFormat");
const { getUnformattedText } = require("./getUnformattedText");
const { notifyUserOfError } = require("./errors");

function formatElixirDocument(editor) {
  if (editor.document.syntax !== LANG_ELIXIR) return;

  const { unformattedText, range, oldCursor } = getUnformattedText(editor);

  return runMixFormat(unformattedText)
    .then((formattedDoc) => {
      return editor
        .edit((editSession) => {
          editSession.replace(range, formattedDoc);
        })
        .then((a) => {
          editor.selectedRange = new Range(oldCursor.start, oldCursor.end);
          editor.scrollToCursorPosition();
          return a;
        });
    })
    .catch((error) => {
      console.log("error", error);
      notifyUserOfError(error);
    });
}

exports.formatElixirDocument = formatElixirDocument;
