import React from 'react';
import { Col, Row, Card, Input, Button, Space, InputNumber } from 'antd';

interface Props {
  missionName: string;
  limit: number;
  handleChangeMissionName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeLimit: (currentLimit: number) => void;
  handleSubmit: () => void;
}

function SearchCard(props: Props) {
  return (
    <Card title="Search" >
      <Row gutter={10} style={{ marginBottom: 40 }}>
        <Col span={18}>
          <Input value={props.missionName} onChange={props.handleChangeMissionName} placeholder="Search..." />
        </Col>
        <Col style={{ display: "flex" }} span={6}>
          <InputNumber value={props.limit} min={0} onChange={props.handleChangeLimit} />
        </Col>
      </Row>
      <Row justify='end'>
        <Col span={10}>
          <Button onClick={props.handleSubmit} type="primary" block>Submit</Button>
        </Col>
      </Row>
    </Card>
  );
}

export default SearchCard;