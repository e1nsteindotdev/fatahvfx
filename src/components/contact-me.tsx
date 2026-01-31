"use client"
import { Loader2 } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

import toast, { Toaster } from 'react-hot-toast';
import { z } from "zod"


import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
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
    <div id="contact-me-form" className="p-6 md:p-8 rounded-[24px] bg-gradient-to-b from-[#1a2332] via-[#0d1117] to-[#0d1117] flex flex-col gap-6 w-full max-w-2xl mx-auto border border-[#2a3441]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormControl>
                  <Input 
                    placeholder="Name" 
                    {...field} 
                    className="bg-[#151b23] border-0 rounded-[16px] h-14 px-6 text-white placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-[#008CFF]"
                  />
                </FormControl>
                <FormMessage className="text-red-400 mt-2" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormControl>
                  <Input 
                    placeholder="Email" 
                    {...field} 
                    className="bg-[#151b23] border-0 rounded-[16px] h-14 px-6 text-white placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-[#008CFF]"
                  />
                </FormControl>
                <FormMessage className="text-red-400 mt-2" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormControl>
                  <Textarea
                    placeholder="Message"
                    className="bg-[#151b23] border-0 rounded-[16px] min-h-[200px] px-6 py-4 text-white placeholder:text-gray-400 resize-none focus-visible:ring-1 focus-visible:ring-[#008CFF]"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-400 mt-2" />
              </FormItem>
            )}
          />

          <Button 
            disabled={loading} 
            type="submit" 
            className="bg-white text-black hover:bg-gray-100 rounded-[16px] h-14 text-lg font-semibold mt-2"
          >
            {loading ? <><Loader2 className="animate-spin mr-2" />Please Wait</> : "Submit"}
          </Button>
        </form>
      </Form>
      <Toaster />
    </div>)
}
