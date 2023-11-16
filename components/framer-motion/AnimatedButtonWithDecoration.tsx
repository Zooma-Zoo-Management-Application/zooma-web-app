
import React from 'react'
import { Button } from '../ui/button'
import { twMerge } from 'tailwind-merge'

function AnimatedButtonWithDecoration({active = false
  , text = "Button", onClick = () => {},
  className = ""
} : any) {
  return (
    <div className={twMerge("flex flex-nowrap items-center gap-1", className)}>
      <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="-rotate-90">
        <path d="M11.0007 3C11.0007 3 9.86264 7.5 11.9313 12C14 16.5 13.5 21 13.5 21M18.9313 21C18.9313 21 19.6008 16.5 17.5007 13C15.4007 9.5 16.0007 6 16.0007 6M7.92989 21C7.92989 21 8.5993 16.5 6.49927 13C4.39924 9.5 4.99927 6 4.99927 6" 
        stroke={active ? "#1f1f1f" : "#16A34A"} stroke-width="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <Button
        variant="default"
        size="lg"
        className={`
        text-base tracking-[1px]
        ${active ? "bg-dark text-[#fafafa] hover:bg-slate-800" : "bg-primary text-[#fafafa]"
      } `}
        onClick={() => onClick()}
      >
        {text}
      </Button>
      <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="rotate-90">
        <path d="M11.0007 3C11.0007 3 9.86264 7.5 11.9313 12C14 16.5 13.5 21 13.5 21M18.9313 21C18.9313 21 19.6008 16.5 17.5007 13C15.4007 9.5 16.0007 6 16.0007 6M7.92989 21C7.92989 21 8.5993 16.5 6.49927 13C4.39924 9.5 4.99927 6 4.99927 6" stroke={active ? "#1f1f1f" : "#16A34A"} stroke-width="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  )
}

export default AnimatedButtonWithDecoration