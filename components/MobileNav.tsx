'use client'

import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import { Fragment, useState, useEffect, useRef } from 'react'
import Link from './Link'
import headerNavLinks from '@/data/headerNavLinks'

const MobileNav = () => {
  const [navShow, setNavShow] = useState(false)
  const [mounted, setMounted] = useState(false)
  const navRef = useRef(null)

  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        enableBodyScroll(navRef.current)
      } else {
        disableBodyScroll(navRef.current)
      }
      return !status
    })
  }

  useEffect(() => {
    setMounted(true)
    return clearAllBodyScrollLocks
  }, [])

  return (
    <>
      <button
        aria-label={navShow ? 'Close menu' : 'Open menu'}
        aria-expanded={navShow}
        aria-controls="mobile-nav-panel"
        onClick={onToggleNav}
        className="brand-copper-bar fixed top-3 right-3 z-50 flex h-10 w-10 items-center justify-center rounded-sm border border-[#5a3920]/70 shadow-lg sm:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-6 w-6 text-[#f5e6d3]"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {mounted && (
        <Transition appear show={navShow} as={Fragment} unmount={false}>
          <Dialog as="div" onClose={onToggleNav} unmount={false}>
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              unmount={false}
            >
              <div className="fixed inset-0 z-60 bg-black/25" />
            </TransitionChild>

            <TransitionChild
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full opacity-0"
              enterTo="translate-x-0 opacity-95"
              leave="transition ease-in duration-200 transform"
              leaveFrom="translate-x-0 opacity-95"
              leaveTo="translate-x-full opacity-0"
              unmount={false}
            >
              <DialogPanel
                id="mobile-nav-panel"
                className="brand-header-bg fixed inset-0 z-70 h-full w-full text-white duration-300"
              >
                <nav
                  ref={navRef}
                  className="mt-20 flex h-full basis-0 flex-col items-center gap-2 overflow-y-auto px-6 pt-2 text-center"
                >
                  {headerNavLinks.map((link) => (
                    <Link
                      key={link.title}
                      href={link.href}
                      className="brand-menu-link my-2 py-3 text-2xl outline outline-0"
                      onClick={onToggleNav}
                    >
                      {link.title}
                    </Link>
                  ))}
                </nav>

                <button
                  className="brand-copper-bar fixed top-3 right-3 z-80 flex h-10 w-10 items-center justify-center rounded-sm border border-[#5a3920]/70 text-[#f5e6d3]"
                  aria-label="Close menu"
                  onClick={onToggleNav}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </DialogPanel>
            </TransitionChild>
          </Dialog>
        </Transition>
      )}
    </>
  )
}

export default MobileNav
