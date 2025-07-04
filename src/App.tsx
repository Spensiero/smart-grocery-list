import Header from "@/components/header/Header"
import Main from "@/components/main/Main"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col">
        <Header/>
        <Main/>
      </div>
    </QueryClientProvider>
  )
}
export default App
