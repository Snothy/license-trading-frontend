import { Card, Row, Col } from 'antd';
import { Link } from "react-router-dom";
const { Meta } = Card;


const list = (
  <>
  <Row type="flex" justify="space-around">
    <Col span={6}>
      <Link to="/applications/1">
        <Card >
            <Meta title="Application1" description="info" />
        </Card>
      </Link>
    </Col>
    <Col span={6}>
      <Card >
        <Meta title="Application2" description="info" />
      </Card>
    </Col>
    <Col span={6}>
      <Card >
        <Meta title="Application2" description="info" />
      </Card>
    </Col>
  </Row>  
  <Row type="flex" justify="space-around">
    <Col span={6}>
      <Card >
        <Meta title="Application2" description="info" />
      </Card>
    </Col>
    <Col span={6}>
      <Card >
       <Meta title="Application2" description="info" />  
      </Card>
    </Col>
    <Col span={6}>
      <Card >
         <Meta title="Application2" description="info" />
      </Card>
    </Col>
  </Row>  
  </>
);

function Applications(props) {
  return list;
}

export default Applications;