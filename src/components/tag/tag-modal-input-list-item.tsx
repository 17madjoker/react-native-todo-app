import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {ViewProps, TouchableWithoutFeedback} from 'react-native';
import {Input} from '@ui-kitten/components';

import {Tag} from '../../models/tag';
import {CheckmarkOutlineIcon, TrashOutlineIcon} from '../../assets/icons';
import {deleteTag, updateTag} from '../../store/actions/tag-actions';

export interface TagModalInputListItemProps extends ViewProps {
  tag: Tag;
}

export const TagModalInputListItem = ({
  tag,
  ...props
}: TagModalInputListItemProps) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState<string>(tag.Title);

  const renderLeftIcon = (props: any) => (
    <TouchableWithoutFeedback onPress={() => dispatch(deleteTag(tag))}>
      <TrashOutlineIcon {...props} />
    </TouchableWithoutFeedback>
  );

  const renderRightIcon = (props: any) => (
    <TouchableWithoutFeedback
      onPress={() => dispatch(updateTag(new Tag(tag.Id, value)))}>
      <CheckmarkOutlineIcon {...props} />
    </TouchableWithoutFeedback>
  );

  return (
    <Input
      value={value}
      accessoryLeft={renderLeftIcon}
      accessoryRight={renderRightIcon}
      onChangeText={setValue}
    />
  );
};
