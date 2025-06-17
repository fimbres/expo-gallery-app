import { useWindowDimensions } from 'react-native';

type Breakpoint = 'mobile' | 'tablet' | 'desktop';
const BP = { mobile: 0, tablet: 768, desktop: 1280 };

export function useBreakpoint(): Breakpoint {
  const { width } = useWindowDimensions();

  if (width >= BP.desktop) return 'desktop';
  if (width >= BP.tablet) return 'tablet';
  return 'mobile';
}
