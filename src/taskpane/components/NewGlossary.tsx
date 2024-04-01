import { useState } from "react";
import { Button, Dropdown, DropdownProps, Option, useId } from "@fluentui/react-components";

import useStackStyles from "../common/Layout";
import { LANGUAGES } from "../utils/constants";
import { Language } from "../models";
import { useGlossary } from "../context/glossaryContext";

const NewGlossary = (props: Partial<DropdownProps>) => {
  const { dispatch } = useGlossary();
  const [source, setSource] = useState<Language>(LANGUAGES[0]);
  const [target, setTarget] = useState<Language>(LANGUAGES[1]);
  const sourceId = useId("source-selector");
  const targetId = useId("target-selector");

  const stackStyles = useStackStyles();

  const onSourceSelect: (typeof props)["onOptionSelect"] = (_, data) => {
    const lang = LANGUAGES.find((l) => l.name == data.optionValue);
    if (lang) setSource(lang);
  };

  const onTargetSelect: (typeof props)["onOptionSelect"] = (_, data) => {
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
