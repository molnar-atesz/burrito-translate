import { useEffect, useState, FC } from "react";
import { IGlossary } from "../@types/glossary";
import GlossaryXmlSerializer from "../utils/GlossaryXmlSerializer";
import CustomXmlStorageService from "../services/CustomXmlStorageService";
import { ID_SETTINGS_KEY, XMLNS } from "../utils/constants";

export interface AppProps {
  title: string;
  isOfficeInitialized: boolean;
}

/* global console, Office  */

export const App: FC<AppProps> = ({ title, isOfficeInitialized }) => {
  const [glossary, setGlossary] = useState<IGlossary>();

  useEffect(() => {
    if (isOfficeInitialized) {
      Office.context.document.settings.get(ID_SETTINGS_KEY);

      const serializer = new GlossaryXmlSerializer(XMLNS);
      const docStore = new CustomXmlStorageService(serializer);
      docStore
        .loadAsync()
        .then((loadedGlossary) => {
          setGlossary(loadedGlossary);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [isOfficeInitialized]);

  if (!isOfficeInitialized) {
    return <>Please sideload your addin to see app body.</>;
  }

  return (
    <>
      <h1>{title}</h1>
      <div className="ms-welcome">{glossary && glossary.items.map((item) => <div key={item.key}>{item.key}</div>)}</div>
    </>
  );
};

export default App;
