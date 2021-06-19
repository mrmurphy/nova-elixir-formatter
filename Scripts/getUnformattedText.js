function getUnformattedText(editor) {
  const oldCursor = editor.selectedRange;
  const path = editor.document.path;
  const length = editor.document.length;
  const range = new Range(0, length);
  const unformattedText = editor.document.getTextInRange(range);
  return { unformattedText, range, oldCursor };
}

exports.getUnformattedText = getUnformattedText;
