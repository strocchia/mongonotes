"use client";

import { useSession, SessionProvider } from "next-auth/react";

const ClientComponent = () => {
  const session = useSession();

  return (
    <SessionProvider>
      <p>Welcome {session?.data?.user?.name}</p>
    </SessionProvider>
  );
};

export default ClientComponent;