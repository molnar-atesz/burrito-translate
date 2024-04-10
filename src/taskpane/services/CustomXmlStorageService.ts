/* eslint-disable @typescript-eslint/no-unused-vars */
import { IGlossary, IGlossaryStore, IGlossaryXmlSerializer } from "../@types/glossary";
import { ID_SETTINGS_KEY, XMLNS } from "../utils/constants";

/* global Office */

export default class CustomXmlStorageService implements IGlossaryStore {
  private serializer: IGlossaryXmlSerializer;

  constructor(xmlSerializer: IGlossaryXmlSerializer) {
    this.serializer = xmlSerializer;
  }

  public saveAsync(glossary: IGlossary): Promise<string> {
    const glossaryXML = this.serializer.serialize(glossary);

    return new Promise<string>((resolve, _) => {
      this.clearAsync().then(() => {
        Office.context.document.customXmlParts.addAsync(glossaryXML, (xmlPart) => {
          Office.context.document.settings.set(ID_SETTINGS_KEY, xmlPart.value.id);
          Office.context.document.settings.saveAsync(() => {
            resolve("Success");
          });
        });
      });
    });
  }

  public loadAsync(): Promise<IGlossary> {
    return new Promise<IGlossary>((resolve, reject) => {
      Office.context.document.customXmlParts.getByNamespaceAsync(
        XMLNS,
        (asyncResult: Office.AsyncResult<Office.CustomXmlPart[]>) => {
          if (asyncResult.error) {
            console.error(asyncResult.error);
            return reject("Previously saved glossary not found");
          }
          const xmlParts = asyncResult.value;
          // TODO: how to handle multiple previously saved glossary
          xmlParts[0].getXmlAsync((xml) => {
            const glossary = this.serializer.deserialize(xml.value);
            return resolve(glossary);
          });
        }
      );
    });
  }

  public clearAsync(): Promise<void> {
    return new Promise<void>((resolve, __) => {
      const id = Office.context.document.settings.get(ID_SETTINGS_KEY);
      if (id) {
        Office.context.document.customXmlParts.getByIdAsync(id, (prevPart: any) => {
          if (!prevPart.error) {
            prevPart.value.deleteAsync(() => {
              resolve();
            });
          } else {
            Office.context.document.settings.remove(ID_SETTINGS_KEY);
            resolve();
          }
        });
      } else {
        resolve();
      }
    });
  }
}
