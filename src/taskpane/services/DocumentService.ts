/* global console, Word */
/* global OfficeExtension */

export default class DocumentService {
  public async insertText(text: string): Promise<boolean> {
    await Word.run(async (context: Word.RequestContext) => {
      const doc = context.document;
      const selectedRange = doc.getSelection();
      selectedRange.insertText(text, Word.InsertLocation.replace);

      await context.sync();
      return true;
    }).catch((error) => {
      console.log(error);
      if (error instanceof OfficeExtension.Error) {
        console.log("Debug info: " + JSON.stringify(error.debugInfo));
      }
      return false;
    });
    return true;
  }
}
