import React from 'react';
import {ListRenderItemInfo, StyleSheet, View} from 'react-native';
import {ListItem, Text, Card, Layout, Button} from '@ui-kitten/components';

import {Todo} from '../../models/todo';
import {AppRoutes} from '../../navigation/app-routes';
import {TodoListScreenProps} from '../../navigation/todo-navigator';
import {TodoProgressBar} from '../../components/todo/todo-progress-bar';
import {Tag} from '../../models/tag';
import {HashOutlineIcon} from '../../assets/icons';

export const TodoListItem = (
  {item, index}: ListRenderItemInfo<Todo>,
  props: TodoListScreenProps,
) => {
  const renderTag = (tag: Tag) => (
    <View style={styles.controlContainer}>
      <Text>{tag.Title}</Text>
    </View>
  );

  const TodoListHeader = (props: any, title: string) => (
    <View {...props}>
      <Text category="h6">{title}</Text>
    </View>
  );

  return (
    <ListItem style={styles.item}>
      <Card
        status={item.IsComplete ? 'success' : 'primary'}
        style={styles.card}
        header={(props) => TodoListHeader(props, item.Title)}
        onPress={() => {
          props.navigation.navigate(AppRoutes.TODO_EDIT, {
            todo: JSON.stringify(item),
          });
        }}>
        <Text appearance="hint" category="c1">
          {item.Description}
        </Text>
        <TodoProgressBar
          style={styles.itemProgressBar}
          progress={item.Progress}
          text={`${item.Progress.toString().substring(0, 4)}%`}
        />
        <Layout style={styles.tagContainer}>
          <Button
            appearance="ghost"
            size="small"
            accessoryLeft={HashOutlineIcon}
          />
          {item.Tags.map((tag: Tag) => renderTag(tag))}
        </Layout>
      </Card>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
  },
  itemProgressBar: {
    width: '50%',
    marginVertical: 20,
  },
  card: {
    width: '100%',
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  controlContainer: {
    borderRadius: 4,
    margin: 4,
    padding: 4,
  },
});
