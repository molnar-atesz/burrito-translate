import * as React from "react";
import Progress from "./Progress";
import { IGlossary } from "../@types/glossary";
import GlossaryXmlSerializer from "../utils/GlossaryXmlSerializer";
import CustomXmlStorageService from "../services/CustomXmlStorageService";
import { ID_SETTINGS_KEY, XMLNS } from "../utils/constants";

export interface AppProps {
  title: string;
  isOfficeInitialized: boolean;
}

/* global Office */

export const App: React.FC<AppProps> = ({ title, isOfficeInitialized }) => {
  const [glossary, setGlossary] = React.useState<IGlossary>();

  React.useEffect(() => {
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
    return (
      <Progress
        title={title}
        logo={require("./../../../assets/logo-filled.png")}
        message="Please sideload your addin to see app body."
      />
    );
  }

  return (
    <>
      <h1>Hello World</h1>
      <div className="ms-welcome">{glossary && glossary.items.map((item) => <div key={item.key}>{item.key}</div>)}</div>
    </>
  );
};

export default App;
