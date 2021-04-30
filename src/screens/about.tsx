import React from 'react';
import {StyleSheet} from 'react-native';
import {Layout, Text} from '@ui-kitten/components';

import {globalStyles} from '../styles/main';

export default function About() {
  return (
    <Layout style={globalStyles.container}>
      <Text>About Screen 😻</Text>
    </Layout>
  );
}
