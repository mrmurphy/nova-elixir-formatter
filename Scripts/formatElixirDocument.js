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
          // It's strange that I need to repeat this here _and_ in the `then` below, but if I don't, I either get a bad cursor move, or I get a flash of changed content. It seems that if I do this in both places, all I get is a weird scroll effect.
          editor.selectedRange = new Range(oldCursor.start, oldCursor.end);
          editor.scrollToCursorPosition();
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
