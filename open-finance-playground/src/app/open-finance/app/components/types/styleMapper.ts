import { SimulatorState } from "@/app/open-finance/app/components/types/simulator";
import { color } from "framer-motion";

export const getPageBackground = (state?: SimulatorState) => {
  if (!state) return undefined;
  return {
    pageBackground : state.colors.backgroundColor
  }
}

export const getHeaderStyles = (state?: SimulatorState) => {
  if (!state) return undefined;
  return{
  container: {
    fontFamily: state.typography.fontFamily,
    padding : '16px'
  },
  title: {
    color: state.colors.primaryTextColor,
    lineHeight: state.typography.lineHeight,
    fontFamily: state.typography.fontFamily,
  },
  description: {
    color: state.colors.secondaryTextColor,
    fontSize: state.typography.baseFontSize,
    fontWeight: state.typography.baseFontWeight,
    lineHeight: state.typography.lineHeight,
    fontFamily: state.typography.fontFamily,
  }}
};


export const getStepStyle = () => {
  return {
    fontWeight: 500,
    fontSize: "10px",
    color: "#555555",
    backgroundColor: "#F8F9FA",
    width: "fit-content",
    padding: "2px 4px",
    borderRadius: "3px",
    fontFamily : 'DM Sans'
  };
};




export const getLocationStyles = (simulatorState?: SimulatorState) => {
  if (!simulatorState) return undefined;

  const { colors, typography } = simulatorState;

  return {
    container: {
      fontFamily: typography.fontFamily,
    },
    deliveryText: {
      color: colors.primaryTextColor,
      fontSize: typography.baseFontSize,
      fontWeight: typography.baseFontWeight,
      lineHeight: typography.lineHeight,
    },
    locationText: {
      color: colors.secondaryTextColor,
      fontSize: typography.baseFontSize,
      fontWeight: typography.baseFontWeight,
    },
    iconColor: colors.primaryColor,
  };
};


export const getTitleStyles = (simulatorState?: SimulatorState) => {
  if (!simulatorState) return undefined;
  const { colors, typography } = simulatorState;
   return {
    headerText : {
      backgroundColor :  "transparent",
      fontFamily: typography.fontFamily,
      color: colors.primaryTextColor ,
      lineHeight: typography.lineHeight,
    },
    container : {
      padding : `24px 20px 8px`
    }
   };
};

export const getButtonStyles = (simulatorState? : SimulatorState) => {
  if (!simulatorState) return undefined;
  const {colors, typography, formFields} = simulatorState;
  
  return {
    color: colors.backgroundColor,
    backgroundColor : colors.primaryColor,
    fontFamily : typography.fontFamily,
    fontSize: typography.baseFontSize,
    fontWeight: typography.baseFontWeight,
    borderRadius : formFields.borderRadius
  }
  
}

export const getListItemStyles = (simulatorState?: SimulatorState) => {
  if (!simulatorState) return undefined;
  const { colors, typography, formFields } = simulatorState;

  return {
    container: {
      fontFamily: typography.fontFamily,
      lineHeight: typography.lineHeight,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    },
    desc: {
      color: colors.primaryTextColor,
      fontFamily: typography.fontFamily
    },
    subdesc: {
      fontSize: typography.baseFontSize,
      color: colors.secondaryTextColor,
      marginTop: "2px",
      fontWeight: typography.baseFontWeight,
      
    },
    selectTick : {
      color : colors.primaryColor,
      backgroundColor : colors.primaryColor
    },
    arrow: {
      color : colors.primaryColor
    },
    paymentListContainer : {
      borderRadius: formFields.borderRadius
    }
  } as const;
};


export const getTermsAndConditionsStyle = (simulatorState?: SimulatorState) => {
  if (!simulatorState) return undefined;
  const { colors, typography } = simulatorState;
  return {
    text : {
      color: colors.primaryTextColor,
      lineHeight: typography.lineHeight,
      fontFamily: typography.fontFamily,
      
      
    },
    subText: {
      color: colors.secondaryTextColor,
      fontSize: typography.baseFontSize,
      fontWeight: typography.baseFontWeight,
      lineHeight: typography.lineHeight,
      fontFamily: typography.fontFamily,
      
    }
  }
}


export const getInputStyles = (simulatorState? : SimulatorState) => {
  if (!simulatorState) return undefined;
  const { formFields } = simulatorState;
  return {
    borderRadius : formFields.borderRadius
  }
  
}

export const getTitleTextStyle = (simulatorState? : SimulatorState) => {
  if (!simulatorState) return undefined;
  const { colors, typography} = simulatorState;
  return {

      color: colors.primaryTextColor,
      lineHeight: typography.lineHeight,
      fontFamily: typography.fontFamily,   

  }
  
}


export const getSubTextStyle = (simulatorState? : SimulatorState) => {
  if (!simulatorState) return undefined;
  const { colors, typography} = simulatorState;
  return {

      color: colors.secondaryTextColor,
      fontSize: typography.baseFontSize,
      fontWeight: typography.baseFontWeight,
      lineHeight: typography.lineHeight,
      fontFamily: typography.fontFamily,
      
  }
  
}