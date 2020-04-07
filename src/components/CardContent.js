import React from 'react';
import { Layout, PageHeader } from 'antd';
import tinycolor from 'tinycolor2';

import styles from 'styles';

export default ({ details }) => {
  const { types } = details;
  const primaryColor = styles.color(types[types.length - 1].type.name);
  const name = details.name.charAt(0).toUpperCase() + details.name.slice(1);
  const id = String(details.id).padStart(3, '0');

  return (
    <Layout style={{ background: primaryColor }}>
      <PageHeader
        style={{ color: '#ffffff' }}
        title={name}
        extra={[<div>{`#${id}`}</div>]}
      ></PageHeader>

      <img
        style={{ width: '60%' }}
        src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`}
        alt={name}
      />
    </Layout>
  );
};
