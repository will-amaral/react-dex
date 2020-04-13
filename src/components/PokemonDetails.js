import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { Spin, Layout, Typography, Row, Col, Tag, Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import styles from 'styles';
import bg from 'styles/bg-large.png';

const PokemonDetails = () => {
  const params = useParams();
  const history = useHistory();
  const [result, setResult] = useState();
  const { Content, Header } = Layout;
  const { Title, Text } = Typography;

  useEffect(() => {
    const fetchPoke = async () => {
      const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${params.id}`);
      setResult(data);
    };
    fetchPoke();
  }, [params]);

  if (!result) return <Spin />;

  const { types } = result;
  const primaryColor = styles.color(types[types.length - 1].type.name);
  const name = result.name.charAt(0).toUpperCase() + result.name.slice(1);
  const id = String(result.id).padStart(3, '0');

  return (
    <Layout
      style={{
        background: `${primaryColor} url(${bg})`,
        backgroundSize: 'cover',
        minHeight: '100vh',
      }}
    >
      <Header
        style={{
          background: 'transparent',
          height: '20vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Button
          onClick={() => history.push(`/${result.id - 1}`)}
          type='link'
          style={{ color: 'white' }}
          disabled={id <= 1}
        >
          <LeftOutlined />
        </Button>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          <Title style={{ color: 'white' }}>{name} </Title>
          <Title
            level={4}
            style={{ marginTop: 0, marginLeft: 10, color: 'white' }}
          >{`#${id}`}</Title>
        </div>
        <Button
          onClick={() => history.push(`/${result.id + 1}`)}
          type='link'
          style={{ color: 'white' }}
          disabled={id >= 806}
        >
          <RightOutlined />
        </Button>
      </Header>
      <Content>
        <Row>
          <Col span={8}></Col>
          <Col span={8}>
            <img
              style={{ width: '100%' }}
              src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`}
              alt={name}
            />
          </Col>
          <Col span={8}></Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default PokemonDetails;
