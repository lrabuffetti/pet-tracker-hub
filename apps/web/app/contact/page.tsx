'use client'

import { type FormEvent, useState } from 'react'

import { Button } from '@repo/ui'
import PlatformInfo from '@/components/shared/PlatformInfo'
import TextInput from '@/components/ui/textInput'
import Textarea from '@/components/ui/textArea'

const ContactPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [maxMessageLength, setMaxMessageLength] = useState(255)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        alert('Message sent successfully!')
        setName('')
        setEmail('')
        setMessage('')
        setMaxMessageLength(255)
      } else {
        alert(`Failed to send message: ${data.error}`)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newMessage = e.target.value
    if (newMessage.length <= maxMessageLength) {
      setMessage(newMessage)
    }

    setMaxMessageLength(255 - newMessage.length)
  }

  const isFormValid = !!name && !!email && !!message

  return (
    <div className="flex flex-col items-center min-h-screen py-2">
      <h1 className="text-6xl font-bold">Contact Us</h1>
      <p className="mt-6 text-2xl">Feel free to reach out to us!</p>
      <PlatformInfo />
      <div className="w-full">
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <TextInput
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <TextInput
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
              htmlFor="message"
            >
              Message
            </label>
            <Textarea
              placeholder="Your message"
              rows={5}
              value={message}
              onChange={handleMessageChange}
              maxLength={maxMessageLength}
            />
            <small className="text-gray-500">
              {maxMessageLength} characters remaining
            </small>
          </div>
          <Button disabled={!isFormValid} type="submit">
            Send
          </Button>
        </form>
      </div>
    </div>
  )
}

export default ContactPage
