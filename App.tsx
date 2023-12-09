import { AuthProvider } from './app/context/AuthContext';
import * as React from 'react';
import { RootNavigator } from './app/navigation';
import { ApplicationProvider} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light} >
      <AuthProvider>
        <RootNavigator/>
      </AuthProvider>
    </ApplicationProvider>
  );
}

export default App;