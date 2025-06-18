export const mockDownload = jest.fn();
jest.mock('../hooks/use-download-image', () => ({
  useDownloadImage: () => ({
    download: mockDownload,
    downloading: false,
  }),
}));

export const mockUseBreakpoint = jest.fn();
jest.mock('../hooks/use-breakpoint', () => ({
  useBreakpoint: () => mockUseBreakpoint(),
}));
