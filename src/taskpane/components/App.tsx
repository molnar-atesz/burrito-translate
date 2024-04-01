import React, { useEffect, FC } from "react";

import { mergeClasses } from "@fluentui/react-components";

import useStackStyles from "../common/Layout";
import NewGlossary from "./NewGlossary";
import { useGlossary, tryFetchGlossary } from "../context/glossaryContext";

export interface AppProps {
  title: string;
  isOfficeInitialized: boolean;
}

/* global console, Office  */

export const App: FC<AppProps> = ({ title, isOfficeInitialized }) => {
  const {
    state: { glossary },
    dispatch,
  } = useGlossary();
  const stackClasses = useStackStyles();

  useEffect(() => {
    if (isOfficeInitialized) {
      tryFetchGlossary(dispatch);
    }
  }, [isOfficeInitialized]);

  if (!isOfficeInitialized) {
    return <>Please sideload your addin to see app body.</>;
  }

  if (!glossary) {
    return <NewGlossary />;
  }

  return (
    <div>
      <div className={stackClasses.stack}>
        <div className={mergeClasses(stackClasses.item, stackClasses.strech)}>ControlPanel comes here</div>
        <div className={mergeClasses(stackClasses.item, stackClasses.strech)}>Add edit form</div>
        <div className={mergeClasses(stackClasses.item, stackClasses.center)}>Import CSV form</div>

        {!glossary && (
          <div className={mergeClasses(stackClasses.item, stackClasses.center)}>
            <NewGlossary />
          </div>
        )}
        {glossary && (
          <>
            <div className={mergeClasses(stackClasses.item, stackClasses.center, stackClasses.verticalFill)}>
              <h2 className="ms-font-xl ms-fontWeight-semilight ms-fontColor-neutralPrimary ms-u-slideUpIn20">
                Glossary
              </h2>
            </div>
            <div className={mergeClasses(stackClasses.item, stackClasses.strech)}>Search field comes here</div>
          </>
        )}
      </div>
      {glossary && (
        <div className={stackClasses.stack}>
          <div className={mergeClasses(stackClasses.item, stackClasses.strech)}>{JSON.stringify(glossary)}</div>
        </div>
      )}

      <div className={stackClasses.stack}>Notification area</div>
    </div>
  );
};

export default App;
