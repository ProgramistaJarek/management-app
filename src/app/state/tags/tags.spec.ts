import { Tag } from '../../model';
import {
  selectExcludedTagsByIds,
  selectTagByName,
  selectTags,
  selectTagsByIds,
} from './tags.selectors';

const initialStateTag: Tag[] = [
  {
    id: '1',
    name: 'web',
  },
  {
    id: '2',
    name: 'front end',
  },
  {
    id: '3',
    name: 'back end',
  },
  {
    id: '4',
    name: 'angular',
  },
  {
    id: '5',
    name: 'test',
  },
];

describe('Tags test', () => {
  describe('Tags selectors', () => {
    it('should select the tag list', () => {
      const result = selectTags.projector(initialStateTag);
      expect(result.length).toEqual(5);
    });

    it('should select tags with provided IDs', () => {
      // given
      const tagsId = ['2', '4'];

      // when
      const result: Tag[] = selectTagsByIds(tagsId).projector(initialStateTag);

      // then
      expect(result.length).toEqual(2);
      expect(result.map((tag) => tag.id)).toEqual(['2', '4']);
    });

    it('should return empty array if no tags provided', () => {
      // given
      // when
      const result: Tag[] = selectTagsByIds([]).projector(initialStateTag);

      // then
      expect(result.length).toEqual(0);
    });

    it('should return empty array if no matching tags found', () => {
      // given
      const tagsId = ['6', '7'];

      // when
      const result: Tag[] = selectTagsByIds(tagsId).projector(initialStateTag);

      // then
      expect(result.length).toEqual(0);
    });

    it('should exclude tags with provided IDs', () => {
      // given
      const tagsId = ['1', '3', '5'];

      // when
      const result: Tag[] =
        selectExcludedTagsByIds(tagsId).projector(initialStateTag);

      // then
      expect(result.length).toEqual(2);
      expect(result.map((tag) => tag.id)).toEqual(['2', '4']);
    });

    it('should return all tags if no IDs provided', () => {
      // given
      const tagsId: string[] = [];

      // when
      const result: Tag[] =
        selectExcludedTagsByIds(tagsId).projector(initialStateTag);

      // then
      expect(result.length).toEqual(5);
    });

    it('should select the tag with the provided name', () => {
      // given
      const tagName = 'test';

      // when
      const result = selectTagByName(tagName).projector(initialStateTag);

      // then
      expect(result).toEqual({
        id: '5',
        name: 'test',
      });
    });

    it('should return undefined if tag with the provided name does not exist', () => {
      // given
      const tagName = 'tagNonExisted';

      // when
      const result = selectTagByName(tagName).projector(initialStateTag);

      // then
      expect(result).toBeUndefined();
    });

    it('should ignore case sensitivity when matching tag names', () => {
      // given
      const tagName = 'baCk END';

      // when
      const result = selectTagByName(tagName).projector(initialStateTag);

      // then
      expect(result).toEqual({
        id: '3',
        name: 'back end',
      });
    });
  });
});
