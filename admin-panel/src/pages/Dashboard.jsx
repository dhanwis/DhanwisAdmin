import { Card, Col, Row } from 'antd';
import { useContext } from 'react';
import { CareerContext } from '../context/CareerContext';
import { PortfolioContext } from '../context/PortfolioContext';

function Dashboard() {
  const { careers } = useContext(CareerContext);
  const { portfolios } = useContext(PortfolioContext);

  return (
    <div className="p-4">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={8}>
          <Card title="Portfolio" bordered={false}>
            {portfolios.length}
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card title="Career" bordered={false}>
            {careers.length}
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card title="Blogs" bordered={false}>
            0
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
