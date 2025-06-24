jest.mock('../src/utils/fetchImages', () => ({
  __esModule: true,
  default: jest.fn(),
}));

import fetchImagesFromAPI from '../src/utils/fetchImages';

describe('fetchImagesFromAPI', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches images and total count correctly', async () => {
    fetchImagesFromAPI.mockResolvedValueOnce({
      images: [{ id: 1 }, { id: 2 }],
      total: 100,
    });

    const result = await fetchImagesFromAPI(2, 12);

    expect(fetchImagesFromAPI).toHaveBeenCalledWith(2, 12);
    expect(result).toEqual({
      images: [{ id: 1 }, { id: 2 }],
      total: 100,
    });
  });
});
