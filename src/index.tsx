import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";

const container = document.getElementById("root");
const root = createRoot(container!);
const queryClient = new QueryClient();

if (root) {
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
} else {
  throw new Error("Root element not found!");
}
