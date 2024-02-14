import React from 'react'
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
function PageNotFound() {
    const navigate = useNavigate();

    const handleHome = () =>{
        navigate('/')
    }
  return (
    <div>
    <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button type="primary" onClick={handleHome}>Back Home</Button>}
    />
  </div>
  )
}

export default PageNotFound