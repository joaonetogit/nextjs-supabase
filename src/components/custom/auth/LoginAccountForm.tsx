'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/Button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  email: z
    .string({
      message: 'Email is required',
    })
    .email({
      message: 'Invalid email address',
    }),
  password: z
    .string({
      message: 'Password is required',
    })
    .min(7, {
      message: 'Password must be at least 7 characters',
    })
    .max(12, {
      message: 'Password must be at most 12 characters',
    }),
});

type FormValues = z.infer<typeof formSchema>;

export default function LoginAccountForm() {
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: FormValues) {
    try {
      const supabase = createClientComponentClient();
      const { email, password } = values;

      const {
        data: { session },
      } = await supabase.auth.signInWithPassword({ email, password });

      if (session) {
        console.log('Login Account on submit', session);
        form.reset();
        router.refresh();
      }
    } catch (error) {
      console.error('Login Account on submit', error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-2 p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>
                <FormDescription>Enter your email address</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="password" {...field} />
                </FormControl>
                <FormDescription>Enter your password</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Login Account</Button>
        </form>
      </Form>
    </div>
  );
}
