import { createActionGroup, props } from '@ngrx/store';
import { Tag } from '../../model';

export const TagsActions = createActionGroup({
  source: 'Tags',
  events: {
    'Add Tag': props<{ newTag: Tag }>(),
    'Add Tag Success': props<{ newTag: Tag }>(),
    'Delete Tag': props<{ tagId: string }>(),
    'Delete Tag Success': props<{ tagId: string }>(),
  },
});
