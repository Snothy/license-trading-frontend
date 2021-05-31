import { Card, Row, Col } from 'antd';
import { Link } from "react-router-dom";
const { Meta } = Card;


const list = (
  <>
  <Row type="flex" justify="space-around">
    <Col span={6}>
        <Link to="/users/1">
            <Card >
                <Meta title="User One" description="Admin" />
            </Card>
        </Link>
    </Col>
    <Col span={6}>
      <Card >
        <Meta title="User Two" description="Superuser" />
      </Card>
    </Col>
    <Col span={6}>
      <Card >
        <Meta title="User 3" description="user" />
      </Card>
    </Col>
  </Row>  
  <Row type="flex" justify="space-around">
    <Col span={6}>
      <Card >
        <Meta title="User 4" description="user" />
      </Card>
    </Col>
    <Col span={6}>
      <Card >
        <Meta title="User 5" description="user" />
      </Card>
    </Col>
    <Col span={6}>
      <Card >
        <Meta title="User 6" description="user" />    
      </Card>
    </Col>
  </Row>  
  </>
);

function Users(props) {
  return list;
}

export default Users;