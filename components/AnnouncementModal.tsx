'use client'

import React from 'react'
import { Modal } from './modal'
import { addAnnouncement } from '@/app/announcement/addAnnouncement'
import { XIcon } from './X'
import { cn } from '@/lib/utils'

interface AnnouncementModalProps extends React.HTMLProps<HTMLElement> {}

export const AnnouncementModalCreate: React.FC<AnnouncementModalProps> = ({
  className,
}) => {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          'bg-green-700 aspect-square sm:aspect-auto rounded px-4 py-2 text-white hover:bg-green-800 flex items-center gap-2 group justify-center',
          className
        )}
      >
        <span className="hidden sm:block">New Announcement</span>

        <div className="w-3 h-3 relative">
          <div className="absolute w-full bg-white h-px top-1/2"></div>
          <div className="absolute w-full bg-white h-px top-1/2 rotate-90 origin-center"></div>
        </div>
      </button>
      <Modal onClose={() => setIsOpen(false)} isOpen={isOpen}>
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-2 top-2 p-1 border-transparent border hover:border-foreground/10 rounded"
        >
          <XIcon className="w-5 h-5 text-foreground" />
        </button>

        <div className="flex-1 flex justify-center items-center p-4 lg:p-20 pt-16">
          <form action={addAnnouncement} className="flex flex-col gap-8 w-full">
            <span className="text-center font-bold text-3xl text-foreground">
              Create New Announcement
            </span>
            <div className="sm:col-span-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-foreground"
              >
                Title
              </label>
              <div className="mt-2">
                <div className="rounded-md p-1 bg-inherit border mb-6">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    autoComplete="title"
                    className="flex-1 border-0 bg-transparent w-full py-1.5 px-2.5 text-foreground focus:ring-0 sm:text-sm sm:leading-6 outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-foreground"
              >
                Description
              </label>
              <div className="mt-2">
                <div className="rounded-md p-1 bg-inherit border mb-6">
                  <input
                    type="text"
                    name="description"
                    id="description"
                    autoComplete="description"
                    className="flex-1 border-0 w-full bg-transparent py-1.5 px-2.5 text-foreground focus:ring-0 sm:text-sm sm:leading-6 outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="image_file"
                className="block text-sm font-medium leading-6 text-foreground"
              >
                Image Url
              </label>
              <div className="mt-2">
                <div className="rounded-md p-1 bg-inherit border mb-6">
                  <input
                    type="file"
                    name="image_file"
                    id="image_file"
                    autoComplete="image_file"
                    className="flex-1 border-0 w-full bg-transparent py-1.5 px-2.5 text-foreground focus:ring-0 sm:text-sm sm:leading-6 outline-none"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="bg-green-700 rounded px-4 py-2 text-white mb-2 hover:bg-green-800"
              type="submit"
            >
              Create Announcement
            </button>
          </form>
        </div>
      </Modal>
    </>
  )
}
