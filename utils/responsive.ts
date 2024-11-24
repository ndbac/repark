import { DEFAULT_REFERENCE_SCREEN_WIDTH, DEFAULT_REFERENCE_SCREEN_HEIGHT } from '@/constants/Common';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';

export const responsiveByWidth = (value: number, referenceScreenWidth: number = DEFAULT_REFERENCE_SCREEN_WIDTH) => {
  return widthPercentageToDP((value / referenceScreenWidth) * 100);
};

export const responsiveByHeight = (value: number, referenceScreenHeight: number = DEFAULT_REFERENCE_SCREEN_HEIGHT) => {
  return heightPercentageToDP((value / referenceScreenHeight) * 100);
};
