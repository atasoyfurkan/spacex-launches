import React, { useState, useEffect } from 'react';
import { Col, Row, Card, Button, Skeleton, Empty } from 'antd';
import { Launches } from "../utils/types"
import { useNavigate } from 'react-router-dom';

interface Props {
  loading: boolean;
  data: Launches | undefined;
  limit: number;
}

function SearchCard(props: Props) {
  const navigate = useNavigate()

  const [launchImages, setLaunchImages] = useState<Array<string | null>>(Array(props.limit))
  useEffect(() => {
    // parse image urls from wikipedia
    const async_fetch = async () => {
      if (props.data) {
        let launchImages = Array<string | null>(props.data.launches.length)

        for (let i = 0; i < props.data.launches.length; i++) {
          const launch = props.data.launches[i]
          const splitted = launch.links.wikipedia.split("/")
          const url = `https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&titles=${splitted[splitted.length - 1]}&prop=pageimages&pithumbsize=512`

          const response = await fetch(url)
          const response_data = await response.json()
          const img_path: { source: string } | undefined = response_data.query.pages[Object.keys(response_data.query.pages)[0]].thumbnail

          if (img_path)
            launchImages[i] = img_path.source
          else
            launchImages[i] = null

        }

        setLaunchImages(launchImages)
      }
    }

    async_fetch()
  }, [props.data])

  return (
    <Card title="Results" style={{ minHeight: "75vh" }}>
      <Row gutter={[50, 30]}>
        {props.loading && Array.from(Array<number>(props.limit).keys()).map(key => (<Col key={key} span={8}><Skeleton /><Skeleton title={false} /></Col>))}
        {props.data && props.data.launches.map((launch, index) => (
          <Col key={launch.mission_name} xs={{ span: 24 }} lg={{ span: 8 }}>
            <Card title={
              <>
                <div>{launch.mission_name}</div>
                <div style={{ fontSize: "14px", color: "gray" }}>{(new Date(launch.launch_date_local)).toLocaleDateString()}</div>
              </>
            }
              cover={
                launchImages[index] ?
                  <div style={{ background: `url(${launchImages[index]}) no-repeat center center`, width: "100%", height: 150 }} />
                  :
                  <Empty style={{ height: 85 }} image={Empty.PRESENTED_IMAGE_SIMPLE} description="No Image" />
              }
            >
              <Row gutter={[0, 5]} justify="end">
                <Col span={24}>{launch.launch_success ? <span style={{ color: "green" }}>Success</span> : <span style={{ color: "red" }}>Failure</span>}</Col>
                <Col span={24}>{launch.launch_site.site_name}</Col>
                <Col xs={{ span: 24 }} lg={{ span: 10 }}>
                  <Button onClick={() => navigate(`launch-details/${launch.id}`)} type="primary" block>More</Button>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
    </Card >

  );
}

export default SearchCard;