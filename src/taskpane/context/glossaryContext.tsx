import React, { createContext, useContext, useReducer } from "react";
import { IGlossary, IGlossaryItem, INotification } from "../@types/glossary";
import { Glossary, Language } from "../models";
import { XMLNS } from "../utils/constants";
import GlossaryXmlSerializer from "../utils/GlossaryXmlSerializer";
import CustomXmlStorageService from "../services/CustomXmlStorageService";
import DocumentService from "../services/DocumentService";

type GlossaryAction =
  | { type: "clearNotification" }
  | { type: "create"; payload: { source: Language; target: Language } }
  | { type: "fetch" }
  | { type: "fetchStarted" }
  | { type: "fetchFinished"; glossary: IGlossary }
  | { type: "fetchFailed"; error: Error }
  | { type: "saveItem"; payload: { item: IGlossaryItem } }
  | { type: "deleteItem"; payload: { item: IGlossaryItem } };

type Dispatch = (action: GlossaryAction) => void;

export interface State {
  glossary?: IGlossary;
  notification?: INotification;
  isLoading: boolean;
}

const initialState: State = {
  glossary: undefined,
  isLoading: false,
  notification: undefined,
};

type GlossaryProviderProps = { children: React.ReactNode };

const GlossaryContext = createContext<{ state: State; dispatch: Dispatch } | undefined>(undefined);
const serializer = new GlossaryXmlSerializer(XMLNS);
const docStore = new CustomXmlStorageService(serializer);
const documenService = new DocumentService();

const glossaryReducer = (state: State, action: GlossaryAction): State => {
  switch (action.type) {
    case "clearNotification": {
      return { ...state, notification: undefined };
    }
    case "create": {
      const glossary = new Glossary(action.payload.source, action.payload.target);
      const notification: INotification = {
        message: "Glossary created",
        intent: "success",
      };
      return state.glossary ? { ...state } : { glossary, notification, isLoading: false };
    }
    case "fetchStarted": {
      const notification: INotification = {
        message: "Glossary is loading",
        intent: "info",
      };
      return { notification, isLoading: true };
    }
    case "fetchFinished": {
      const notification: INotification = {
        message: "Glossary created",
        intent: "success",
      };
      return {
        glossary: action.glossary,
        notification,
        isLoading: false,
      };
    }
    case "fetchFailed": {
      const notification: INotification = {
        message: `Something went wrong: ${action.error.message}`,
        intent: "error",
      };
      return { glossary: undefined, notification, isLoading: false };
    }
    case "saveItem": {
      const normalizedItem: IGlossaryItem = {
        original: action.payload.item.original.trim(),
        translation: action.payload.item.translation.trim(),
        note: action.payload.item.note?.trim(),
      };
      if (normalizedItem.original.length === 0) {
        return {
          ...state,
          notification: {
            message: "Original word should not be empty",
            intent: "error",
          },
        };
      }
      state.glossary?.addItem(normalizedItem);
      return { ...state, glossary: state.glossary };
    }
    case "deleteItem": {
      try {
        state.glossary?.deleteItem(action.payload.item.original);
      } catch (error) {
        console.log("error during delete", error);
      }
      return { ...state, glossary: state.glossary };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const tryFetchGlossary = async (dispatch: Dispatch) => {
  try {
    const glossary = await docStore.loadAsync();
    dispatch({ type: "fetchFinished", glossary });
  } catch (error: any) {
    dispatch({ type: "fetchFailed", error });
  }
};

const insertText = async (item: IGlossaryItem): Promise<boolean> => {
  return await documenService.insertText(item.translation);
};

// TODO: check proper TS usage with reducer: https://dev.to/elisealcala/react-context-with-usereducer-and-typescript-4obm#fromHistory
const GlossaryProvider = ({ children }: GlossaryProviderProps) => {
  const [state, dispatch] = useReducer(glossaryReducer, initialState);
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

export { GlossaryProvider, useGlossary, tryFetchGlossary, insertText };
