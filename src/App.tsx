import React from 'react';
import { Layout } from 'antd';
import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home'
import LaunchDetails from './pages/LaunchDetails'

const { Content } = Layout;

function App() {
  return (
    <Layout style={{ backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
      <Navbar />
      <Content style={{ padding: '50px 50px' }}>
        <Routes>
          <Route path="launch-details/:id" element={<LaunchDetails />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Content>
    </Layout >
  );
}

export default App;