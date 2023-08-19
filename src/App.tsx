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
        <ResponseWorkspace loading={loading} />
      </Layout>
    </>
  );
});

export default App