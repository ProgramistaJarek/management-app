import { createFeatureSelector } from '@ngrx/store';
import { User } from '../../model';

export const selectUser = createFeatureSelector<User>('user');
