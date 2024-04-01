import React, { createContext, useContext, useReducer } from "react";
import { IGlossary } from "../@types/glossary";
import { Glossary, Language } from "../models";

type Action =
  | { type: "create"; payload: { source: Language; target: Language } }
  | { type: "load" }
  | { type: "addItem" };
type Dispatch = (action: Action) => void;
type State = { glossary?: IGlossary };
type GlossaryProviderProps = { children: React.ReactNode };

const GlossaryContext = createContext<{ state: State; dispatch: Dispatch } | undefined>(undefined);

const glossaryReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "create": {
      console.log("Creating with: ", action.payload.source, action.payload.target);

      return state.glossary ? { ...state } : { glossary: new Glossary(action.payload.source, action.payload.target) };
    }
    case "load": {
      console.log("Loading");
      return { glossary: state.glossary };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
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

export { GlossaryProvider, useGlossary };
