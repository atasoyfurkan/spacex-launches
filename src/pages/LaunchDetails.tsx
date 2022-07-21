import { useQuery } from '@apollo/client';
import { Card, Descriptions, Skeleton, Image } from 'antd';
import React from 'react';
import { useParams } from 'react-router-dom';
import { GET_LAUNCH_DETAILS } from '../utils/queries';
import { LaunchDetailed } from "../utils/types"


const LaunchDetail: React.FC = () => {
  const { id } = useParams()

  const { loading, error, data } = useQuery<LaunchDetailed>(GET_LAUNCH_DETAILS,
    { variables: { id: id } });

  console.log(data);



  return (
    <Card>
      {loading && <><Skeleton /><Skeleton title={false} /></>}
      {error && `${error}`}
      {data &&
        <Descriptions
          title="Launch Details"
          bordered
          column={{ xxl: 3, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
        >
          <Descriptions.Item label="Mission Name">{data.launch.mission_name}</Descriptions.Item>
          <Descriptions.Item label="Date">{(new Date(data.launch.launch_date_local)).toLocaleDateString()}</Descriptions.Item>
          <Descriptions.Item label="Time">{(new Date(data.launch.launch_date_local)).toLocaleTimeString()}</Descriptions.Item>
          <Descriptions.Item label="Site">{data.launch.launch_site.site_name}</Descriptions.Item>
          <Descriptions.Item label="State">{data.launch.launch_success ? <span style={{ color: "green" }}>Success</span> : <span style={{ color: "red" }}>Failure</span>}</Descriptions.Item>
          <Descriptions.Item label="Rocket Name">{data.launch.rocket.rocket_name}</Descriptions.Item>
          <Descriptions.Item label="Rocket Type">{data.launch.rocket.rocket_type}</Descriptions.Item>
          <Descriptions.Item label="Wikipedia"><a target="_blank" href={data.launch.links.wikipedia}>Link</a></Descriptions.Item>
          <Descriptions.Item label="Article"><a target="_blank" href={data.launch.links.article_link}>Link</a></Descriptions.Item>
          <Descriptions.Item span={3} label="Details">
            {data.launch.details}
          </Descriptions.Item>
        </Descriptions>
      }
    </Card>
  )
};

// export interface LaunchDetailed {
//   launch: {
//     mission_name: string;
//     launch_date_local: string;
//     launch_site: {
//       site_name: string;
//     };
//     links: {
//       wikipedia: string;
//       article_link: string;
//     };
//     launch_success: boolean;
//     details: string;
//     rocket: {
//       rocket_name: string;
//       rocket_type: string;
//     };
//   };
// }

export default LaunchDetail;