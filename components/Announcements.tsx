'use client'

import Image from 'next/image'
import React from 'react'

import { easeInOut, motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'

interface AnnouncementsProps extends React.HTMLProps<HTMLUListElement> {
  announcements: Record<string, string>[] | null
}

export const Announcements: React.FC<AnnouncementsProps> = ({
  announcements,
  className,
}) => {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const [currentTime, setCurrentTime] = React.useState(
    parseInt(format(new Date(), 's'))
  )

  React.useEffect(() => {
    if (currentTime % 10 === 0) {
      incrementIndex()
    }
    return () => {}
  }, [currentTime])

  React.useEffect(() => {
    // Update currentTime every second
    const intervalId = setInterval(() => {
      setCurrentTime(parseInt(format(new Date(), 's')))
    }, 1000)

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId)
    }
  }, [])

  function incrementIndex() {
    setActiveIndex(
      activeIndex === Announcements.length + 1 ? 0 : activeIndex + 1
    )
  }

  const motionVariants = {
    isActive: {
      translateX: 0,
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.75,
        ease: easeInOut,
      },
    },
    isInActive: {
      translateX: '80vh',
      scale: 0.8,
      opacity: 0,
      transition: {
        duration: 0.75,
        ease: easeInOut,
      },
    },
    isComplete: {
      translateX: '-80vh',
      scale: 0.8,
      opacity: 0,
      transition: {
        duration: 0.75,
        ease: easeInOut,
      },
    },
  }

  return (
    <ul className={cn('relative overflow-hidden', className)}>
      {announcements?.map((announcement, index) => {
        let status =
          activeIndex === index
            ? 'isActive'
            : activeIndex > index
            ? 'isComplete'
            : 'isInActive'

        return (
          <motion.li
            animate={status}
            initial={false}
            variants={motionVariants}
            key={announcement.id}
            className="text-white absolute h-full w-full"
          >
            <div className="absolute w-full h-full z-30 p-4 lg:p-28 flex flex-col gap-4">
              <div className="text-4xl lg:text-7xl font-semibold mt-auto">
                {announcement.title}
              </div>

              <div className="text-xl lg:text-4xl font-normal">
                {announcement.description}
              </div>
            </div>

            <div className="absolute w-full h-full bg-gradient-to-t from-background to-background/0 z-20" />

            {announcement.image_source_url ? (
              <Image
                fill
                alt={announcement.title}
                src={announcement.image_source_url}
                className="w-full h-full absolute object-cover z-10"
              />
            ) : (
              ''
            )}
          </motion.li>
        )
      })}
    </ul>
  )
}
