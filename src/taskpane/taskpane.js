/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

// images references in the manifest
import "../../assets/icon-16.png";
import "../../assets/icon-32.png";
import "../../assets/icon-80.png";

let dictionary = [];

/* global document, Office, Word */

Office.onReady(info => {
  if (info.host === Office.HostType.Word) {
    document.getElementById("sideload-msg").style.display = "none";
    document.getElementById("app-body").style.display = "flex";
    document.getElementById("add").onclick = () => tryCatch(run);
  }
});

export async function run() {
  return Word.run(async context => {
    console.log("Mi történik?");
    let dictionaryTable = $("#dictionary");
    const item = {
      en: $("#en").val(),
      hun: $("#hun").val(),
      note: $("#note").val()
    };
    dictionary.push(item);
    dictionaryTable.find("tr:last").after(`<tr>
<td>${item.en}</td>
<td>${item.hun}</td>
<td>${item.note}</td></tr>`);

    await context.sync();
  });
}

/** Default helper for invoking an action and handling errors. */
async function tryCatch(callback) {
  try {
    await callback();
  } catch (error) {
    // Note: In a production add-in, you'd want to notify the user through your add-in's UI.
    console.error(error);
  }
}
