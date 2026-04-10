'use client';
import { useState, useCallback } from 'react';

const Spinner = ({ size }) => {
  const spinnerSize = { sm: 'w-3 h-3', md: 'w-4 h-4', lg: 'w-5 h-5' };
  return (
    <svg
      className={`animate-spin ${spinnerSize[size]}`}
      viewBox="0 0 24 24"
      fill="none"
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
        d="M4 12a8 8 0 018-8v8z"
      />
    </svg>
  );
};

const Button = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  leftIcon: LeftIcon,
  children,
  onClick,
  ...rest
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = useCallback(
    (e) => {
      if (disabled || isLoading) return;
      setIsPressed(true);
      setTimeout(() => setIsPressed(false), 150);
      onClick?.(e);
    },
    [disabled, isLoading, onClick],
  );

  const base = [
    'inline-flex items-center justify-center gap-2',
    'font-medium rounded-lg transition-all duration-150 select-none',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    isPressed ? 'scale-95' : 'scale-100',
  ].join(' ');

  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary:
      'bg-white text-gray-800 border border-gray-300 hover:bg-gray-50 focus:ring-gray-300',
    ghost: 'bg-transparent text-blue-600 hover:bg-blue-50 focus:ring-blue-300',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };

  const sizeStyles = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3',
  };

  const isDisabled = disabled || isLoading;

  return (
    <button
      className={`${base} ${variantStyles[variant]} ${sizeStyles[size]}`}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={isLoading}
      data-pressed={isPressed}
      onClick={handleClick}
      {...rest}
    >
      {isLoading ? (
        <Spinner size={size} />
      ) : (
        LeftIcon && <LeftIcon className="h-4 w-4" aria-hidden="true" />
      )}
      {children}
    </button>
  );
};

export default Button;
