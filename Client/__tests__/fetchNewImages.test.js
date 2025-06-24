jest.mock('../src/utils/fetchNewImages', () => ({
  __esModule: true,
  default: jest.fn(),
}));

import fetchNewImages from '../src/utils/fetchNewImages';

describe('fetchNewImages', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches new images using afterId param', async () => {
    fetchNewImages.mockResolvedValueOnce([{ id: 99 }, { id: 100 }]);

    const result = await fetchNewImages(98);

    expect(fetchNewImages).toHaveBeenCalledWith(98);
    expect(result).toEqual([{ id: 99 }, { id: 100 }]);
  });
});
