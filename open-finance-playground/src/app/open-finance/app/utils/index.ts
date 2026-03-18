// Utility functions for the Open Finance playground

export const clsx = (...classes: (string | undefined | null | boolean)[]) => {
  return classes.filter(Boolean).join(' ');
};

// Theme utilities
export const getThemeStyles = (simulatorState: any) => {
  return {
    backgroundColor: simulatorState.colors.background,
    color: simulatorState.colors.text,
    fontFamily: simulatorState.typography.fontFamily,
    fontSize: simulatorState.typography.baseFontSize,
    lineHeight: simulatorState.typography.lineHeight,
  };
};

// Layout utilities
export const getLayoutClasses = (layout: string) => {
  const baseClasses = 'transition-all duration-300';
  
  switch (layout) {
    case 'boxed':
      return `${baseClasses} max-w-md mx-auto`;
    case 'fluid':
      return `${baseClasses} w-full`;
    case 'centered':
      return `${baseClasses} max-w-lg mx-auto`;
    default:
      return baseClasses;
  }
};

// Form field utilities
export const getFormFieldClasses = (formFields: any) => {
  const borderRadius = formFields.borderRadius;
  const labelsPosition = formFields.labels;
  
  return {
    input: `w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200`,
    label: `block text-sm font-medium text-gray-700 ${labelsPosition === 'above' ? 'mb-1' : 'mb-2'}`,
    container: `space-y-1`,
  };
};
