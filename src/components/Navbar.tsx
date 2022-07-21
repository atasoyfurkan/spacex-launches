import React from 'react';
import { Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Header } = Layout;

function Navbar() {
  const navigate = useNavigate()

  return (
    <Header onClick={() => navigate("/")} style={{ backgroundColor: "white", cursor: "pointer" }}>
      <h1 style={{ fontWeight: "bold" }}>SpaceX Rocket Launches</h1>
    </Header>
  );
}

export default Navbar;