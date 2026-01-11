'use client'

import React from 'react'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost'
  href?: string
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl'
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  ariaLabel?: string
}

export default function Button({
  children,
  variant = 'primary',
  href,
  onClick,
  className = '',
  type = 'button',
  disabled = false,
  loading = false,
  fullWidth = false,
  size = 'md',
  icon,
  iconPosition = 'left',
  ariaLabel
}: ButtonProps) {
  // Note: isPressed state reserved for future interaction tracking
  // const [isPressed, setIsPressed] = useState(false)

  // Base styles with premium transitions
  const baseStyles = `
    relative
    inline-flex items-center justify-center gap-2
    font-semibold text-center
    transition-all duration-300 ease-out
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 focus-visible:ring-offset-2
    active:scale-[0.98]
    select-none
  `

  // Premium variant styles with enhanced interactions
  const variants = {
    primary: `
      bg-gradient-to-r from-primary to-primary-dark
      text-white
      shadow-lg shadow-primary/20
      hover:shadow-xl hover:shadow-primary/30
      hover:scale-[1.02]
      hover:-translate-y-0.5
    `,
    secondary: `
      border-2 border-black
      text-black bg-white
      hover:bg-black hover:text-white
      hover:scale-[1.02]
      hover:-translate-y-0.5
      shadow-md hover:shadow-lg
    `,
    accent: `
      bg-black
      text-white
      shadow-lg shadow-black/20
      hover:shadow-xl hover:shadow-black/30
      hover:scale-[1.02]
      hover:-translate-y-0.5
    `,
    ghost: `
      text-black
      hover:bg-gray-100
      hover:text-primary
    `,
  }

  // Size variants with optimal touch targets
  const sizes = {
    sm: 'px-4 py-2 text-sm min-h-[36px]',
    md: 'px-6 py-3 text-base min-h-[44px]',
    lg: 'px-8 py-4 text-lg min-h-[52px]',
    xl: 'px-10 py-5 text-xl min-h-[60px]',
  }

  // Width variant
  const widthClass = fullWidth ? 'w-full' : ''

  // Loading spinner component
  const LoadingSpinner = () => (
    <svg
      className="animate-spin h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )

  const buttonClasses = `
    ${baseStyles}
    ${variants[variant]}
    ${sizes[size]}
    ${widthClass}
    ${className}
  `.trim().replace(/\s+/g, ' ')

  const content = (
    <>
      {loading && <LoadingSpinner />}
      {!loading && icon && iconPosition === 'left' && (
        <span className="transition-transform group-hover:scale-110" aria-hidden="true">
          {icon}
        </span>
      )}
      <span className={loading ? 'opacity-0' : ''}>
        {children}
      </span>
      {!loading && icon && iconPosition === 'right' && (
        <span className="transition-transform group-hover:scale-110" aria-hidden="true">
          {icon}
        </span>
      )}
    </>
  )

  // Note: Interaction tracking reserved for future use
  // const handleInteractionStart = () => setIsPressed(true)
  // const handleInteractionEnd = () => setIsPressed(false)
  //
  // const interactionProps = {
  //   onMouseDown: handleInteractionStart,
  //   onMouseUp: handleInteractionEnd,
  //   onMouseLeave: handleInteractionEnd,
  //   onTouchStart: handleInteractionStart,
  //   onTouchEnd: handleInteractionEnd,
  // }

  if (href && !disabled) {
    return (
      <a
        href={href}
        className={`${buttonClasses} group`}
        aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
        onClick={onClick}
        aria-busy={loading}
        aria-disabled={disabled}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${buttonClasses} group`}
      aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
      aria-busy={loading}
      aria-disabled={disabled}
    >
      {content}
    </button>
  )
}
