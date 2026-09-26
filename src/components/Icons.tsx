import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
  strokeWidth?: number;
}

// Minimalist WhatsApp Icon (Sophisticated vector outline/fill)
export const WhatsAppIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.888 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

// Minimalist Instagram Icon
export const InstagramIcon: React.FC<IconProps> = ({ className = "w-5 h-5", strokeWidth = 1.5 }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

// Minimalist Fashion Hanger icon
export const HangerIcon: React.FC<IconProps> = ({ className = "w-6 h-6", strokeWidth = 1.25 }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 3a2.5 2.5 0 0 1 2.5 2.5c0 1.2-.8 2-1.8 2.3L20 12.5a1.5 1.5 0 0 1-.8 2.5H4.8A1.5 1.5 0 0 1 4 12.5L11.3 7.8c-1-.3-1.8-1.1-1.8-2.3A2.5 2.5 0 0 1 12 3z" />
    <path d="M4 15h16" />
  </svg>
);

// Minimalist Dress icon
export const DressIcon: React.FC<IconProps> = ({ className = "w-6 h-6", strokeWidth = 1.25 }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 3v4M15 3v4" />
    <path d="M9 7h6" />
    <path d="M9 7 8 11h8l-1-4" />
    <path d="M8 11 5 21h14l-3-10" />
    <path d="M8 11h8" />
  </svg>
);

// Minimalist Tailored Blazer icon
export const TailoringIcon: React.FC<IconProps> = ({ className = "w-6 h-6", strokeWidth = 1.25 }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M7 4h10l2 4-2 12H7L5 8l2-4z" />
    <path d="M7 4l5 8 5-8" />
    <path d="M12 12v8" />
  </svg>
);
