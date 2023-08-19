import React, { useState } from 'react'
import { observer } from 'mobx-react';
import Layout from './components/layout/layout';
import RequestWorkspace from './components/workspaces/requestWorkspace';
import ResponseWorkspace from './components/workspaces/responseWorkspace';

const App = observer(() => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Layout>
        <RequestWorkspace setLoading={setLoading} />
        <hr className='my-3 mt-[30px] border-black-50 h-[3px]' />
        <ResponseWorkspace loading={loading} />
      </Layout>
    </>
  );
});

export default App