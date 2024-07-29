import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkAuth } from "./auth";
import axios from "axios";

axios.defaults.withCredentials = true;

function Loading() {
  return <div>Redirecting...</div>;
}

export default function withAuth(
  WrappedComponent: React.ComponentType<any>,
  LoadingComponent: React.ComponentType<any> = Loading
): (props: any) => React.ReactNode {
  return (props: any) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
      const verifyAuth = async () => {
        try {
          const auth = await checkAuth();
          setUser(auth.user);
        } catch (err) {
          router.push("/sign-in");
        }
        setLoading(false);
      };

      verifyAuth();
    }, [user]);

    if (loading) {
      return <LoadingComponent />;
    }

    return <WrappedComponent user={user} {...props} />;
  };
}
