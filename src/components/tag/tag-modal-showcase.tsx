import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, ViewProps, TouchableWithoutFeedback} from 'react-native';
import {
  Card,
  Modal,
  Text,
  Input,
  List,
  ListItemElement,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';

import {Tag} from '../../models/tag';
import {
  PlusIcon,
  CloseOutlineIcon,
  CheckmarkOutlineIcon,
} from '../../assets/icons';
import {TagModalInputListItem} from './tag-modal-input-list-item';
import {addTag as _addTag} from '../../store/actions/tag-actions';
import {AppState} from '../../store/configure-store';

export interface TagModalShowcaseProps extends ViewProps {
  visible: boolean;
  toggle: () => void;
}

const Header = (props: any) => (
  <View {...props}>
    <Text category="h6">Edit tags</Text>
  </View>
);

const renderTagModalInputListItem = (tag: Tag): ListItemElement => (
  <TagModalInputListItem key={tag.Id} tag={tag} />
);

export const TagModalShowcase = ({
  visible,
  toggle,
  ...props
}: TagModalShowcaseProps) => {
  const styles = useStyleSheet(themedStyles);
  const dispatch = useDispatch();

  const [value, setValue] = useState<string>('');
  const tags: Tag[] = useSelector((state: AppState) => state.TagReducer.tags);

  const renderLeftIcon = (props: any) => (
    <TouchableWithoutFeedback onPress={() => setValue('')}>
      {value.length > 0 ? (
        <CloseOutlineIcon {...props} />
      ) : (
        <PlusIcon {...props} />
      )}
    </TouchableWithoutFeedback>
  );

  const renderRightIcon = (props: any) => (
    <TouchableWithoutFeedback onPress={addTag}>
      <CheckmarkOutlineIcon {...props} />
    </TouchableWithoutFeedback>
  );

  const addTag = () => {
    if (!value || tags.findIndex((t) => t.Title == value) != -1) return;

    dispatch(_addTag(new Tag(0, value)));
    setValue('');
  };

  return (
    <Modal
      style={styles.modalContainer}
      visible={visible}
      backdropStyle={styles.backdrop}
      onBackdropPress={toggle}>
      <Card disabled={true} header={Header}>
        <Input
          placeholder="Create a new tag"
          value={value}
          onChangeText={setValue}
          accessoryLeft={renderLeftIcon}
          accessoryRight={renderRightIcon}
        />
        <List
          style={styles.listInputContainer}
          data={tags}
          renderItem={({item}) => renderTagModalInputListItem(item)}
        />
      </Card>
    </Modal>
  );
};

const themedStyles = StyleService.create({
  modalContainer: {
    width: '80%',
  },
  listInputContainer: {
    maxHeight: 200,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
