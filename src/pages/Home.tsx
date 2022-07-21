import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Col, Row } from 'antd';
import SearchCard from '../components/SearchCard';
import ResultCard from '../components/ResultCard';
import { Launches } from "../utils/types"
import { GET_LAUNCHES } from '../utils/queries';

function Home() {
  const [missionName, setMissionName] = useState<string>("")
  const [limit, setLimit] = useState<number>(3)

  const [getLaunches, { loading, error, data }] = useLazyQuery<Launches>(GET_LAUNCHES);

  const handleChangeMissionName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMissionName(event.target.value)
  }

  const handleChangeLimit = (currentLimit: number) => {
    setLimit(currentLimit)
  }

  const handleSubmit = () => {
    getLaunches({ variables: { mission_name: missionName, limit: limit } })
  }

  if (error) {
    return (
      <div>{`${error}`}</div>
    )
  }

  return (
    <Row gutter={[40, 40]}>
      <Col xs={{ span: 24 }} lg={{ span: 7 }}>
        <SearchCard
          missionName={missionName}
          limit={limit}
          handleChangeMissionName={handleChangeMissionName}
          handleChangeLimit={handleChangeLimit}
          handleSubmit={handleSubmit}
        />
      </Col>
      <Col xs={{ span: 24 }} lg={{ span: 17 }}>
        {(data || loading) && (
          <ResultCard
            loading={loading}
            data={data}
            limit={limit}
          />
        )}
      </Col>
    </Row>
  );
}

export default Home;