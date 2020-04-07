import React, { useEffect, useState } from 'react';
import { Col, Card } from 'antd';
import axios from 'axios';

import CardContent from 'components/CardContent';

export default ({ poke }) => {
  const [result, setResult] = useState();

  useEffect(() => {
    const fetchPoke = async () => {
      const { data } = await axios.get(poke.url);
      setResult(data);
    };
    fetchPoke();
  }, [poke.url]);

  return (
    <Col xs={20} sm={16} md={12} lg={8} xl={6}>
      <Card hoverable loading={!result ? true : false} style={{ borderRadius: 10 }}>
        {result && <CardContent details={result} />}
      </Card>
    </Col>
  );
};
