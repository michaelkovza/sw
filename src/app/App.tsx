import React from 'react';
import { Routing } from "../pages";
import { withProviders } from "./providers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import 'antd/dist/antd.css'

const queryClient = new QueryClient();

const App = () => {
  return (
      <QueryClientProvider client={queryClient}>
        <Routing />
      </QueryClientProvider>
  )
}

export default withProviders(App);
