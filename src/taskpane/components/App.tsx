import * as React from "react";
import { DefaultButton } from "@fluentui/react";
import Header from "./Header";
import HeroList, { HeroListItem } from "./HeroList";
import Progress from "./Progress";

export interface AppProps {
  title: string;
  isOfficeInitialized: boolean;
}

export const App: React.FC<AppProps> = ({ title, isOfficeInitialized }) => {
  const [listItems, setListItems] = React.useState<Array<any>>([]);

  React.useEffect(() => {
    if (isOfficeInitialized) {
      const heroes: HeroListItem[] = [
        {
          icon: "Airplane",
          primaryText: "Help me baby",
        },
      ];
      setListItems(heroes);
    }
  }, [isOfficeInitialized]);

  const click = () => {
    console.log("Something happened");
  };

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
    <div className="ms-welcome">
      <Header logo={require("./../../../assets/logo-filled.png")} title={title} message="Welcome" />
      <HeroList message="Discover what Office Add-ins can do for you today!" items={listItems}>
        <p className="ms-font-l">
          Modify the source files, then click <b>Run</b>.
        </p>
        <DefaultButton className="ms-welcome__action" iconProps={{ iconName: "ChevronRight" }} onClick={click}>
          Run something
        </DefaultButton>
      </HeroList>
    </div>
  );
};

export default App;
