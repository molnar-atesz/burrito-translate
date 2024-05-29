import { FC } from "react";
import { IGlossaryItem } from "../../@types/glossary";
import { Button, tokens } from "@fluentui/react-components";
import { Delete16Filled, Edit16Regular } from "@fluentui/react-icons";
import useGlossaryTableStyle from "./GlossaryTable.style";
import { useGlossary } from "../../context/glossaryContext";

export interface IActionCellProps {
  item: IGlossaryItem;
}

const ActionCell: FC<IActionCellProps> = ({ item }) => {
  const style = useGlossaryTableStyle();
  const { dispatch } = useGlossary();

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({
      type: "deleteItem",
      payload: {
        item,
      },
    });
  };

  return (
    <div className={style.actionCell}>
      <Button icon={<Edit16Regular color={tokens.colorBrandForeground1} />} />
      <Button icon={<Delete16Filled color={tokens.colorStatusWarningForeground1} />} onClick={handleDeleteClick} />
    </div>
  );
};

export default ActionCell;
