import React from 'react';
import {View, ViewProps} from 'react-native';
import {Text, StyleService, useStyleSheet} from '@ui-kitten/components';

export interface ProgressBarProps extends ViewProps {
  progress: number;
  text?: string;
}

export const TodoProgressBar = ({
  progress,
  text,
  ...props
}: ProgressBarProps) => {
  const styles = useStyleSheet(themedStyle);
  const barColor =
    progress == 100 ? styles.progressFullColor : styles.progressFillColor;

  return (
    <View style={styles.container}>
      <View {...props} style={[styles.progressContainer, props.style]}>
        <View style={[styles.progress, barColor, {width: `${progress}%`}]} />
      </View>
      {text && (
        <Text style={styles.text} category="c2">
          {text}
        </Text>
      )}
    </View>
  );
};

const themedStyle = StyleService.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressContainer: {
    height: 6,
    borderRadius: 3,
    backgroundColor: 'background-basic-color-2',
    overflow: 'hidden',
  },
  progress: {
    flex: 1,
  },
  progressFullColor: {
    backgroundColor: 'color-success-default',
  },
  progressFillColor: {
    backgroundColor: 'color-primary-default',
  },
  text: {
    marginHorizontal: 16,
  },
});
