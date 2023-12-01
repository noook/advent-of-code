import { describe, it, expect } from 'vitest'
import { chunk } from '.';

describe('utils', () => {
  describe('chunk', () => {
    it('should create array with chunks of length 2', () => {
      const arr = [1, 2, 3, 4, 5, 6];
      expect(chunk(arr, 2)).toEqual([[1, 2], [3, 4], [5, 6]]);
    });

    it('should create array with chunks of length 3', () => {
      const arr = [1, 2, 3, 4, 5, 6];
      expect(chunk(arr, 3)).toEqual([[1, 2, 3], [4, 5, 6]]);
    });

    it('should have a last chunk with less items', () => {
      const arr = [1, 2, 3, 4, 5, 6, 7];
      expect(chunk(arr, 3)).toEqual([[1, 2, 3], [4, 5, 6], [7]]);
    });
  });
});
