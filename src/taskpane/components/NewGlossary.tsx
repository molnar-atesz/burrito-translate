import React, { useState, useMemo } from "react";
import { Button, Dropdown, DropdownProps, makeStyles, Option, shorthands, useId } from "@fluentui/react-components";

import useStackStyles from "../common/Layout";
import { LANGUAGES } from "../utils/constants";
import { Language } from "../models";
import { useGlossary } from "../context/glossaryContext";

const useStyles = makeStyles({
  root: {
    // Stack the label above the field with a gap
    display: "grid",
    gridTemplateRows: "repeat(1fr)",
    justifyItems: "start",
    ...shorthands.gap("2px"),
    maxWidth: "400px",
  },
});

const NewGlossary = (props: Partial<DropdownProps>) => {
  const { dispatch } = useGlossary();
  const [source, setSource] = useState<Language>(LANGUAGES[0]);
  const [target, setTarget] = useState<Language>(LANGUAGES[1]);
  const sourceId = useId("source-selector");
  const targetId = useId("target-selector");

  const stackStyles = useStackStyles();
  const styles = useStyles();

  const onSourceSelect: (typeof props)["onOptionSelect"] = (ev, data) => {
    const lang = LANGUAGES.find((l) => l.name == data.optionValue);
    if (lang) setSource(lang);
  };

  const onTargetSelect: (typeof props)["onOptionSelect"] = (ev, data) => {
    const lang = LANGUAGES.find((l) => l.name == data.optionValue);
    if (lang) setTarget(lang);
  };

  return (
    <div className={stackStyles.stack}>
      <div className={stackStyles.item}>
        <label id={sourceId}>Source language</label>
        <Dropdown
          aria-labelledby={sourceId}
          placeholder="Select source language"
          value={source.name}
          onOptionSelect={onSourceSelect}
        >
          {LANGUAGES.map((lang) => (
            <Option key={lang.abbreviation} disabled={lang.name === target.name}>
              {lang.name}
            </Option>
          ))}
        </Dropdown>
      </div>
      <div className={stackStyles.item}>
        <label id={targetId}>Target language</label>
        <Dropdown
          aria-labelledby={targetId}
          placeholder="Select target language"
          value={target.name}
          onOptionSelect={onTargetSelect}
        >
          {LANGUAGES.map((lang) => (
            <Option key={lang.abbreviation} disabled={lang.name === source.name}>
              {lang.name}
            </Option>
          ))}
        </Dropdown>
      </div>
      <div className={stackStyles.item}>
        <Button
          appearance="primary"
          onClick={() => {
            dispatch({ type: "create", payload: { source, target } });
          }}
        >
          Create
        </Button>
      </div>
    </div>
  );
};

export default NewGlossary;
