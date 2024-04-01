import React, { createContext, useContext, useReducer } from "react";
import { IGlossary, INotification } from "../@types/glossary";
import { Glossary, Language } from "../models";
import { XMLNS } from "../utils/constants";
import GlossaryXmlSerializer from "../utils/GlossaryXmlSerializer";
import CustomXmlStorageService from "../services/CustomXmlStorageService";

type Action =
  | { type: "create"; payload: { source: Language; target: Language } }
  | { type: "fetch" }
  | { type: "fetchStarted" }
  | { type: "fetchFinished"; glossary: IGlossary }
  | { type: "fetchFailed"; error: Error }
  | { type: "addItem" };
type Dispatch = (action: Action) => void;
type State = {
  glossary?: IGlossary;
  notification?: INotification;
};
type GlossaryProviderProps = { children: React.ReactNode };

const GlossaryContext = createContext<{ state: State; dispatch: Dispatch } | undefined>(undefined);
const serializer = new GlossaryXmlSerializer(XMLNS);
const docStore = new CustomXmlStorageService(serializer);

const glossaryReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "create": {
      const glossary = new Glossary(action.payload.source, action.payload.target);
      const notification: INotification = {
        message: "Glossary created",
        intent: "success",
      };
      return state.glossary ? { ...state } : { glossary, notification };
    }
    case "fetchStarted": {
      const notification: INotification = {
        message: "Glossary is loading",
        intent: "info",
      };
      return { ...state, notification };
    }
    case "fetchFinished": {
      const notification: INotification = {
        message: "Glossary created",
        intent: "success",
      };
      return { glossary: action.glossary, notification };
    }
    case "fetchFailed": {
      const notification: INotification = {
        message: `Something went wrong: ${action.error.message}`,
        intent: "error",
      };
      return { ...state, notification };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const tryFetchGlossary = async (dispatch: Dispatch) => {
  dispatch({ type: "fetchStarted" });
  try {
    const glossary = await docStore.loadAsync();
    dispatch({ type: "fetchFinished", glossary });
  } catch (error: any) {
    dispatch({ type: "fetchFailed", error });
  }
};

const GlossaryProvider = ({ children }: GlossaryProviderProps) => {
  const [state, dispatch] = useReducer(glossaryReducer, { glossary: undefined });
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { state, dispatch };

  return <GlossaryContext.Provider value={value}>{children}</GlossaryContext.Provider>;
};

const useGlossary = () => {
  const context = useContext(GlossaryContext);
  if (context === undefined) {
    throw new Error("useGlossary must be used within a GlossaryProvider");
  }
  return context;
};

export { GlossaryProvider, useGlossary, tryFetchGlossary };
