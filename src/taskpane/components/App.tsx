import { useEffect, FC, useState } from "react";

import {
  Field,
  MessageBar,
  MessageBarBody,
  MessageBarTitle,
  mergeClasses,
  ProgressBar,
  MessageBarActions,
  Button,
  Toolbar,
  ToolbarButton,
  Divider,
} from "@fluentui/react-components";

import useStackStyles from "../common/Layout";
import NewGlossary from "./NewGlossary";
import { useGlossary, tryFetchGlossary } from "../context/glossaryContext";
import useAppStyles from "./App.style";
import GlossaryTable from "./GlossaryTable/GlossaryTable";
import GlossaryItemForm from "./GlossaryItemForm";
import { AddRegular, ArrowExportRegular, ArrowImportRegular, DismissRegular } from "@fluentui/react-icons";

export interface AppProps {
  isOfficeInitialized: boolean;
}

/* global console, Office  */

export const App: FC<AppProps> = ({ isOfficeInitialized }) => {
  const {
    state: { isLoading, glossary, notification },
    dispatch,
  } = useGlossary();
  const stackClasses = useStackStyles();
  const appStyles = useAppStyles();
  const [formIsOpen, setFormIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isOfficeInitialized && !isLoading) {
      tryFetchGlossary(dispatch);
    }
  }, [isOfficeInitialized, isLoading, dispatch]);

  const toggleFormVisibility = () => {
    setFormIsOpen(!formIsOpen);
  };

  const clearNotification = () => {
    dispatch({
      type: "clearNotification",
    });
  };

  if (!isOfficeInitialized) {
    return <>Please sideload your addin to see app body.</>;
  }

  if (isLoading) {
    return (
      <Field validationMessage="Loading glossary" validationState="none">
        <ProgressBar />
      </Field>
    );
  }

  if (!glossary) {
    return <NewGlossary />;
  }

  return (
    <div className={stackClasses.stack}>
      <Toolbar>
        <ToolbarButton
          aria-label="Add new word"
          appearance="subtle"
          icon={<AddRegular />}
          onClick={toggleFormVisibility}
        >
          Word
        </ToolbarButton>
        <ToolbarButton aria-label="Import from CSV" appearance="subtle" icon={<ArrowImportRegular />}>
          Import
        </ToolbarButton>
        <ToolbarButton aria-label="Export to CSV" appearance="subtle" icon={<ArrowExportRegular />}>
          Export
        </ToolbarButton>
      </Toolbar>
      <Divider />
      {formIsOpen && (
        <div className={mergeClasses(stackClasses.item, stackClasses.strech)}>
          <GlossaryItemForm onFinish={() => setFormIsOpen(false)} />
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
      {glossary && (
        <div className={mergeClasses(stackClasses.stack, stackClasses.strech, appStyles.main)}>
          <div className={mergeClasses(stackClasses.item, stackClasses.strech)}>
            <GlossaryTable items={glossary.items} source={glossary.source.name} target={glossary.target.name} />
          </div>
        </div>
      )}

      <div className={mergeClasses(stackClasses.stack, appStyles.messageBar)}>
        {notification && (
          <div className={stackClasses.item}>
            <MessageBar intent={notification.intent}>
              <MessageBarBody>
                <MessageBarTitle>{notification.message}</MessageBarTitle>
              </MessageBarBody>
              <MessageBarActions
                containerAction={
                  <Button
                    aria-label="dismiss"
                    appearance="transparent"
                    icon={<DismissRegular />}
                    onClick={clearNotification}
                  />
                }
              ></MessageBarActions>
            </MessageBar>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
