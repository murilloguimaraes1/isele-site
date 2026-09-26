import React, { useRef, useState } from 'react';
import './SpecularButton.css';

export interface SpecularButtonProps {
  children?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'custom';
  radius?: number;
  tint?: string;
  tintOpacity?: number;
  blur?: number;
  textColor?: string;
  lineColor?: string;
  baseColor?: string;
  intensity?: number;
  shineSize?: number;
  shineFade?: number;
  thickness?: number;
  speed?: number;
  followMouse?: boolean;
  proximity?: number;
  autoAnimate?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  className?: string;
  style?: React.CSSProperties;
  type?: 'button' | 'submit' | 'reset';
  href?: string;
  target?: string;
  rel?: string;
  'aria-label'?: string;
  title?: string;
  id?: string;
}

export const SpecularButton: React.FC<SpecularButtonProps> = ({
  children,
  size = 'md',
  radius = 4,
  tint = '#ffffff',
  tintOpacity = 0,
  blur = 0,
  textColor = '#30231C',
  lineColor = '#ffffff',
  baseColor = '#75685D',
  intensity = 1.1,
  shineSize = 12,
  shineFade = 35,
  thickness = 1.2,
  speed = 0.35,
  followMouse = true,
  proximity = 240,
  autoAnimate = false,
  disabled = false,
  onClick,
  className = '',
  style,
  type = 'button',
  href,
  target,
  rel,
  'aria-label': ariaLabel,
  title,
  id,
}) => {
  const btnRef = useRef<HTMLElement | null>(null);
  const [sheenOpacity, setSheenOpacity] = useState(0);

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    btn.style.setProperty('--mouse-x', `${x}px`);
    btn.style.setProperty('--mouse-y', `${y}px`);
    setSheenOpacity(1);
  };

  const handlePointerLeave = () => {
    setSheenOpacity(0);
  };

  const sizeClass = size === 'custom' ? 'specular-button--custom' : `specular-button--${size}`;
  const combinedClassName = `specular-button ${sizeClass} ${className}`.trim();

  const customStyle: React.CSSProperties = {
    '--sb-radius': `${radius}px`,
    '--sb-tint': tint,
    '--sb-tint-opacity': tintOpacity,
    '--sb-blur': `${blur}px`,
    '--sb-text-color': textColor,
    '--sheen-opacity': sheenOpacity,
    color: textColor,
    ...style,
  } as React.CSSProperties;

  if (href) {
    return (
      <a
        ref={btnRef as React.RefObject<HTMLAnchorElement>}
        id={id}
        href={href}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        title={title}
        onClick={onClick}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className={combinedClassName}
        style={customStyle}
      >
        <span className="specular-button__sheen" aria-hidden="true" />
        <span className="specular-button__border-glow" aria-hidden="true" />
        <span className="specular-button__label">{children}</span>
      </a>
    );
  }

  return (
    <button
      ref={btnRef as React.RefObject<HTMLButtonElement>}
      id={id}
      type={type}
      disabled={disabled}
      aria-label={ariaLabel}
      title={title}
      onClick={onClick}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={combinedClassName}
      style={customStyle}
    >
      <span className="specular-button__sheen" aria-hidden="true" />
      <span className="specular-button__border-glow" aria-hidden="true" />
      <span className="specular-button__label">{children}</span>
    </button>
  );
};

export default SpecularButton;
