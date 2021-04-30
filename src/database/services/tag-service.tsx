import Realm from 'realm';

import {Tag} from '../../models/tag';
import {TAG_SCHEME} from '../../schemes/schemes';
import {DatabaseOptions} from '../database';

export const addTag = (tag: Tag) =>
  new Promise((resolve, reject) => {
    Realm.open(DatabaseOptions)
      .then((realm) => {
        const tags = realm.objects<Tag>(TAG_SCHEME).sorted('Id');
        const id = tags.length > 0 ? tags[tags.length - 1].Id + 1 : 1;
        tag.Id = id;

        realm.write(() => {
          realm.create(TAG_SCHEME, tag);

          resolve(tag);
        });
      })
      .catch((error) => reject(error));
  });

export const loadTags = () =>
  new Promise((resolve, reject) => {
    Realm.open(DatabaseOptions)
      .then((realm) => {
        let tags = realm.objects(TAG_SCHEME);

        resolve(tags);
      })
      .catch((error) => reject(error));
  });

export const updateTag = (tag: Tag) =>
  new Promise((resolve, reject) => {
    Realm.open(DatabaseOptions)
      .then((realm) => {
        realm.write(() => {
          realm.create(TAG_SCHEME, tag, true);

          resolve(tag);
        });
      })
      .catch((error) => reject(error));
  });

export const deleteTag = (tag: Tag) =>
  new Promise((resolve, reject) => {
    Realm.open(DatabaseOptions)
      .then((realm) => {
        realm.write(() => {
          let deleteTag = realm
            .objects<Tag>(TAG_SCHEME)
            .find((item) => item.Id == tag.Id);

          realm.delete(deleteTag);
          resolve(tag);
        });
      })
      .catch((error) => reject(error));
  });
