import React from 'react';
import { Layout, Row, Input } from 'antd';

import styles from 'styles';

export default (props) => {
  const { Content, Header } = Layout;
  const { Search } = Input;

  return (
    <Layout style={styles.container}>
      <Header style={styles.header}>
        <Search
          style={styles.search}
          placeholder='Buscar pokémon'
          size='large'
          enterButton
        />
      </Header>
      <Content style={styles.content}>
        <Row gutter={[32, { xs: 8, sm: 16, md: 24, lg: 32 }]}>{props.children}</Row>
      </Content>
    </Layout>
  );
};
