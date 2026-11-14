export type AdPlacementKey =
  | 'belowHeader'
  | 'aboveCalculator'
  | 'belowCalculatorResult'
  | 'inArticle'
  | 'aboveFooter';

export interface AdSlotDefinition {
  slotId: string;
  format: 'auto' | 'horizontal' | 'rectangle';
  label: string;
  minHeightClass: string;
}

export interface AdsConfiguration {
  /**
   * Set `enabled: true` after Google AdSense approval and after adding your real Publisher ID & Slot IDs.
   * While `enabled` is false, zero advertisements or fake placeholders are shown.
   */
  enabled: boolean;
  /** Replace with your Google AdSense Publisher ID (e.g. "ca-pub-1234567890123456") */
  publisherId: string;
  slots: Record<AdPlacementKey, AdSlotDefinition>;
}

export const ADS_CONFIG: AdsConfiguration = {
  enabled: false,
  publisherId: '',
  slots: {
    belowHeader: {
      slotId: '',
      format: 'horizontal',
      label: 'Below Header Responsive Banner',
      minHeightClass: 'min-h-[90px]',
    },
    aboveCalculator: {
      slotId: '',
      format: 'horizontal',
      label: 'Above Calculator Tool',
      minHeightClass: 'min-h-[90px]',
    },
    belowCalculatorResult: {
      slotId: '',
      format: 'rectangle',
      label: 'Below Calculator Result',
      minHeightClass: 'min-h-[250px]',
    },
    inArticle: {
      slotId: '',
      format: 'auto',
      label: 'In-Article Mid Content',
      minHeightClass: 'min-h-[250px]',
    },
    aboveFooter: {
      slotId: '',
      format: 'horizontal',
      label: 'Above Footer Responsive Banner',
      minHeightClass: 'min-h-[90px]',
    },
  },
};
