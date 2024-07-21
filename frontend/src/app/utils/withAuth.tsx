import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { checkAuth } from './auth';

const withAuth = (WrappedComponent: React.ComponentType<any>, LoadingComponent: React.ComponentType<any>) => {
  return (props: any) => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
      const verifyAuth = async () => {
        const auth = await checkAuth();
        if (!auth.isAuthenticated) {
          router.replace('/sign-in');
        } else {
          setIsAuthenticated(true);
          setUser(auth.user);
        }
        setLoading(false);
      };

      verifyAuth();
    }, [router]);

    if (loading) {
      return LoadingComponent;
    }

    if (!isAuthenticated) {
      return null;
    }

    return <WrappedComponent user={user} {...props} />;
  };
};

export default withAuth;
