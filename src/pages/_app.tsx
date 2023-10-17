import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "zstream/utils/api";
import { Toaster } from "zstream/ui/components";
import "zstream/styles/globals.css";
import { TRPCProvider } from "zstream/server/trpcReact";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Toaster position="top-right" richColors />
      <TRPCProvider>
        <Component {...pageProps} />
      </TRPCProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
