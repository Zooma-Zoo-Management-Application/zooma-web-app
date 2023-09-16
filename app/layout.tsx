'use client'

import { Sidebar } from '@/components/Sidebar'
import { Button } from '@/components/ui/button'
import useUIState from '@/stores/ui-store'
import '@/styles/globals.scss'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isOpenSidebar, setIsOpenSidebar } = useUIState();

  return (
    <html lang="en">
      <body>
        <div className="border-b">
          <div className="flex h-20 items-center px-4 justify-between">
                <Button variant="ghost" className="justify-start"
                  onClick={() => setIsOpenSidebar()}
                >
                  {
                    isOpenSidebar ? (
                      <>
                        <svg className="mr-2 h-4 w-4" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z" fill="currentColor" fill-rule="evenodd" 
                          clip-rule="evenodd"
                          ></path>
                        </svg>
                      </>
                    ) : (
                        <svg className="mr-2 h-4 w-4" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z" fill="currentColor" fill-rule="evenodd" 
                          className="mr-2 h-4 w-O4"
                          clip-rule="evenodd"></path>
                        </svg>
                    )
                  }
                  Menu
                </Button>
            
            <div className="relative z-20 flex items-center text-lg font-medium ml-3 flex-1 justify-end">
              <Image 
                src={"/Zooma_Mug.png"}
                width={70}
                height={70}
                alt="Zooma"
                className='mr-2 cursor-pointer'
              />
            </div>
            <div className="ml-auto flex items-center space-x-4">
              {/* <Search /> */}
              {/* <UserNav /> */}
            </div>
          </div>
        </div>
        <section 
          className='flex'
        >
          <AnimatePresence>
              <>
                <motion.div
                initial={{ x: "-100%", zIndex: 100 }}
                animate={{
                  x: 0, zIndex: 100 
                }}
                exit={{
                  x: "-100%", zIndex: 100 
                }}
                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              >
                <Sidebar className="hidden lg:block"/>
              </motion.div>
              </>
            <motion.section
              initial={{ x: "-10%" }}
              animate={{
                x: isOpenSidebar ? '0%' : '0%',
              }}
              exit={{
                x: "10%"
              }}
              className='flex-1 lg:border-l z-[1]'
              >
              {children}
            </motion.section>
          </AnimatePresence>
          
        </section>
      </body>
    </html>
  )
}
