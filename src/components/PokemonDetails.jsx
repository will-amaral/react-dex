import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spin, Layout, Typography, Row, Col, Tag, Button, Progress } from 'antd';
import { LeftOutlined, RightOutlined, HomeOutlined } from '@ant-design/icons';

import styles from 'styles';
import bg from 'styles/bg-large.png';

const PokemonDetails = (props) => {
  const { id, closeDetails, next, prev } = props;
  const [result, setResult] = useState();
  const { Content, Header } = Layout;
  const { Title } = Typography;

  useEffect(() => {
    const fetchPoke = async () => {
      const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      setResult(data);
    };
    fetchPoke();
  }, [id]);

  if (!result) return <Spin />;

  const { types, stats, height, weight } = result;
  const primaryColor = styles.color(types[types.length - 1].type.name);
  const name = result.name.charAt(0).toUpperCase() + result.name.slice(1);
  const formatedId = String(result.id).padStart(3, '0');

  return (
    <Layout
      style={{
        backgroundColor: primaryColor,
        backgroundImage: `url(${bg})`,
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
          justifyContent: 'space-around',
        }}
      >
        <Button size='large' onClick={closeDetails} shape='circle'>
          <HomeOutlined />
        </Button>
        <Button onClick={prev} type='link' style={{ color: 'white' }} disabled={id <= 1}>
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
          >{`#${formatedId}`}</Title>
        </div>
        <Button
          onClick={next}
          type='link'
          style={{ color: 'white' }}
          disabled={id >= 806}
        >
          <RightOutlined />
        </Button>
      </Header>
      <Content style={{ padding: 40 }}>
        <Row>
          <Col
            md={1}
            lg={8}
            style={{
              color: 'white',
              fontSize: '1.5rem',
              alignItems: 'center',
              display: 'flex',
            }}
          >
            <div>
              <Title level={2} style={{ color: 'white' }}>
                Características
              </Title>
              <p>Altura: {height / 10}m</p>
              <p>Peso: {weight / 10}kg</p>
              {types.map((item) => (
                <Tag
                  style={{
                    padding: '0 1.3em',
                    fontSize: '1.3rem',
                    lineHeight: '1.5em',
                    borderRadius: '2em',
                    textAlign: 'center',
                    filter: 'brightness(115%)',
                  }}
                  color={styles.color(item.type.name)}
                  key={item.type.name}
                >
                  {item.type.name}
                </Tag>
              ))}
            </div>
          </Col>
          <Col sm={1} lg={8}>
            <img
              style={{ width: '100%' }}
              src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${formatedId}.png`}
              alt={name}
            />
          </Col>

          <Col sm={1} lg={8} style={{ color: 'white', paddingLeft: 100 }}>
            <Title level={2} style={{ color: 'white' }}>
              Dados
            </Title>
            {stats.map((item) => (
              <>
                <p>{item.stat.name}</p>
                <Progress
                  key={item.stat.name}
                  percent={(item.base_stat * 100) / 255}
                  showInfo={false}
                />
              </>
            ))}
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default PokemonDetails;
