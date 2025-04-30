
export type DomainType = {
  name: string;
  icon: string;
  keywords: string[];
  color: string;
};

export type AxisType = {
  name: string;
  icon: string;
  question: string;
};

export type LensType = {
  name: string;
  icon: string;
  practicalUse: string;
};

export type RingType = 'domain' | 'axis' | 'lens';
