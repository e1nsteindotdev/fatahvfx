"use client"
import { Loader2 } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

import toast, { Toaster } from 'react-hot-toast';
import { z } from "zod"


import { useToast } from "@/hooks/use-toast"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  firstName: z.string().min(2).max(50),
  familyName: z.string().min(2).max(50),
  email: z.string().email(),
  message: z.string().min(2).max(300)
})


export function ContactMeForm() {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      familyName: "",
      email: "",
      message: ""
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    setLoading(true)
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    if (response.ok) {
      form.reset();
      toast.success('Message Sent!')
    }
    setLoading(false)
  }

  return (
    <div id="contact-me-form" className="p-8 rounded-[24px] flex flex-col gap-6 w-full lg:w-1/4 ">
      <p className="font-bold text-[25px] lg:text-[38px]">Contact Me</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="first name" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="familyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input className="" placeholder="last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Messaage</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Your Message"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={loading} type="submit" className="bg-[#008CFF] text-white hover:bg-[#025294]" >
            {loading ? <> <Loader2 className="animate-spin" />  Please Wait  </> : <>Send</>}
          </Button> </form>
      </Form>
      <Toaster />
    </div>)
}
