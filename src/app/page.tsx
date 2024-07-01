import CreateAccountForm from '@/components/custom/auth/CreateAccountForm';
import LoginAccountForm from '@/components/custom/auth/LoginAccountForm';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import useHome from '@/hooks/useHome';

export default function Home() {
  useHome();
  return (
    <div>
      <h1>Home</h1>
      <div className="flex h-screen flex-col items-center justify-center">
        <Tabs defaultValue="create-account" className="w-[400px] rounded-md border pb-4 shadow-2xl">
          <TabsList className="flex h-12 items-center justify-around rounded-b-none">
            <TabsTrigger value="create-account" className="h-full flex-1 transition-all">
              Create Account
            </TabsTrigger>
            <TabsTrigger value="login" className="h-full flex-1 transition-all">
              Login
            </TabsTrigger>
          </TabsList>
          <TabsContent value="create-account">
            <CreateAccountForm />
          </TabsContent>
          <TabsContent value="login" >
            <LoginAccountForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
