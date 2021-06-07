import { PageHeader} from 'antd';

function Home(props) {
  return (
    <>
      <div className="site-layout-content">
        <div style={{ padding: '2% 20%' }}>
          <PageHeader className="site-page-header"
            title="License trading company"
            subTitle="We approve your licenses."/>
           <h1>Login or Register to gain access to features.</h1>
        </div>  
      </div>
    </>  
  );
}

export default Home;