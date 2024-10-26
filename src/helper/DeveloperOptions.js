import {NativeModules} from 'react-native';

const {DeveloperOptions} = NativeModules;

export const openDeveloperOptions = () => {
  DeveloperOptions.openDeveloperOptions();
};

export const openLocationSettings = () => {
  DeveloperOptions.openLocationSettings();
};

// Function to check if auto date and time are enabled
export const checkAutoDateTime = async () => {
  return await DeveloperOptions.isAutoDateTimeEnabled();
};

// Function to check if auto timezone is enabled
export const checkAutoTimeZone = async () => {
  try {
    const isAutoTimeZone = await DeveloperOptions.isAutoTimeZoneEnabled();
    return isAutoTimeZone;
  } catch (error) {
    console.error('Error checking auto timezone:', error);
  }
  return false;
};

export const openDateTime = () => {
  DeveloperOptions.openDateTimeSettings();
};
