import React from 'react';
import { Button, Result } from 'antd';

const PageNotFound: React.FC = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Button  className='bg-primary' onClick={() => window.location.replace("/")}>Back Home</Button>}
  />
);

export default PageNotFound;