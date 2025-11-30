import React from 'react';
import Layout from './layout';
import { AuthProvider } from './contexts/auth-context';
import useAuth from './hooks/auth-hook';
import useVendorStatus from './hooks/vendor-hook';
import ServerIssue from './pages/404/serverIssue';

function App() {
  const { isLoggedIn, token, user_id, role, login, logout } = useAuth();
  const vendorInfo = useVendorStatus();

  if (role && role === "vendor" && vendorInfo && !vendorInfo.error && !vendorInfo?.vendor[0].status) {
    logout();
  }
  else if (vendorInfo && vendorInfo.error === "User credentials expire please login again") {
    logout();
  }
  return (
    <AuthProvider value={{
      isLoggedIn,
      user_id,
      token,
      login,
      logout,
      role,
      vendorInfo
    }}>
      {vendorInfo && vendorInfo.error && vendorInfo.code === "ERR_NETWORK" ? <ServerIssue /> : <Layout />}
    </AuthProvider>
  );
}

export default App;
