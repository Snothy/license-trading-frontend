import { PageHeader, Input } from 'antd';

const { Search } = Input;

function Home(props) {
  return (
    <>
      <div className="site-layout-content">
        <div style={{ padding: '2% 20%' }}>
          <Search placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={null}/>
          <PageHeader className="site-page-header"
            title="License trading company"
            subTitle="We approve your licenses ;)."/>
        </div>  
      </div>
    </>  
  );
}

export default Home;