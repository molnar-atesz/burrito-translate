import React, { useState } from "react";

import { useId, Label, Input, Button, Field } from "@fluentui/react-components";

import { IGlossaryItem } from "../@types/glossary";
import { useGlossary } from "../context/glossaryContext";
import useStackStyles from "../common/Layout";
import useGlossaryItemFormStyles from "./GlossaryItemForm.style";

export type GlossaryItemFormProps = {
  item?: IGlossaryItem;
  onSubmit?: () => void;
};

const GlossaryItemForm = ({ item }: GlossaryItemFormProps) => {
  const { dispatch } = useGlossary();

  const [originalValue, setOriginalValue] = useState<string>(item?.original ?? "");
  const [translationValue, setTranslationValue] = useState<string>(item?.translation ?? "");
  const [noteValue, setNoteValue] = useState(item?.note);
  const stackClasses = useStackStyles();
  const styles = useGlossaryItemFormStyles();

  const originalInputId = useId("original");
  const translationInputId = useId("translation");
  const noteInputId = useId("note");

  const handleSubmit = () => {
    dispatch({
      type: "saveItem",
      payload: {
        item: {
          original: originalValue,
          translation: translationValue,
          note: noteValue,
        },
      },
    });
  };

  return (
    <div className={styles.base}>
      <Field className={styles.field} label="Word or phrase" required>
        <Input id={originalInputId} defaultValue={originalValue} onChange={(_, data) => setOriginalValue(data.value)} />
      </Field>
      <Field className={styles.field} label="Translation" required>
        <Input
          id={translationInputId}
          defaultValue={translationValue}
          onChange={(_, data) => setTranslationValue(data.value)}
        />
      </Field>
      <Field className={styles.field} label="Note">
        <Input id={noteInputId} defaultValue={noteValue ?? ""} onChange={(_, data) => setNoteValue(data.value)} />
      </Field>
      <div className={styles.field}>
        <Button appearance="primary" onClick={handleSubmit}>
          Submit
        </Button>
        <Button>Cancel</Button>
      </div>
    </div>
  );
};

export default GlossaryItemForm;
