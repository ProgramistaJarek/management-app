import {DateTime} from "../model";

export const sortDateTime = <T extends DateTime>(a: T, b: T): number => {
  if (a.updatedAt && b.updatedAt) {
    return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
  }

  if (a.updatedAt || b.updatedAt) {
    return a.updatedAt ? 1 : -1;
  }

  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
}
