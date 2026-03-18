export type SimulatorState = {
  layout: "boxed" | "full width" ;
  colors: {
    backgroundColor: string;
    primaryColor: string;
    primaryTextColor: string;
    secondaryTextColor : string;
  };
  typography: {
    fontFamily: "Figtree" | "DmSans";
    baseFontSize: string;
    baseFontWeight: "light" | "regular" | "medium" | "bold";
    lineHeight: string;
  };
  formFields: {
    // labels: "above" | "inline";
    borderRadius: string;
  };
  language: string;
};