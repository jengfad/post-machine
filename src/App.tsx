import React, { useContext } from 'react'
import { observer } from 'mobx-react';
import Layout from './components/layout/layout';
import RequestWorkspace from './components/workspaces/requestWorkspace';
import ResponseWorkspace from './components/workspaces/responseWorkspace';
import { AppContext } from './stores/appStore';

const App = observer(() => {
  const context = useContext(AppContext); 
  const { loading } = context

  return (
    <>
      <Layout>
        <RequestWorkspace />
        <hr className='my-3 mt-[30px] border-black-50 h-[3px]' />
        <ResponseWorkspace loading={loading} />
      </Layout>
    </>
  );
});

export default App