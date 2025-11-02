import React from 'react';

const iconProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
  focusable: "false",
} as const;

// Fix: Define a common props interface for all icons that includes the 'style' property to allow passing inline styles.
interface IconComponentProps {
    className?: string;
    style?: React.CSSProperties;
}

export const ScanIcon: React.FC<IconComponentProps> = ({ className, style }) => (
  <svg {...iconProps} className={className} style={style} strokeWidth="2.5">
    <path d="M3 7V5a2 2 0 0 1 2-2h2" />
    <path d="M17 3h2a2 2 0 0 1 2 2v2" />
    <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
    <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
  </svg>
);

export const HistoryIcon: React.FC<IconComponentProps> = ({ className, style }) => (
  <svg {...iconProps} className={className} style={style}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>
);

export const MapIcon: React.FC<IconComponentProps> = ({ className, style }) => (
  <svg {...iconProps} className={className} style={style}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
);

export const ProfileIcon: React.FC<IconComponentProps> = ({ className, style }) => (
    <svg {...iconProps} className={className} style={style}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
);

export const CameraIcon: React.FC<IconComponentProps> = ({ className, style }) => (
    <svg {...iconProps} className={className} style={style}><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" /></svg>
);

export const RecycleIcon: React.FC<IconComponentProps> = ({ className, style }) => (
    <svg {...iconProps} className={className} style={style}><path d="M7 19H4.9a2 2 0 0 1-1.7-1L2 15h11l-1.4 2.8a2 2 0 0 1-1.7 1Z" /><path d="m10.1 5 1.9-4-1.9 4" /><path d="M8.8 11.3 6.4 5H4l2.4 6.3" /><path d="m13.7 11.3 2.4-6.3H18l-2.4 6.3" /><path d="M16.5 15H22l-1.2-3.1a2 2 0 0 0-1.7-1l-1.9 4" /><path d="m12 19 1.9 4 1.9-4" /></svg>
);

export const LeafIcon: React.FC<IconComponentProps> = ({ className, style }) => (
    <svg {...iconProps} className={className} style={style}><path d="M11 20A7 7 0 0 1 4 13q0-4.5 6-6.5A4.5 4.5 0 0 1 20 8a8 8 0 0 1-8 12Z" /><path d="M12 12v8" /></svg>
);

export const HazardIcon: React.FC<IconComponentProps> = ({ className, style }) => (
    <svg {...iconProps} className={className} style={style}><path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>
);

export const LocationPinIcon: React.FC<IconComponentProps> = ({ className, style }) => (
    <svg {...iconProps} className={className} style={style}><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8Z" /><circle cx="12" cy="10" r="3" /></svg>
);

export const SendIcon: React.FC<IconComponentProps> = ({ className, style }) => (
    <svg {...iconProps} className={className} style={style}><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>
);

export const ChevronRightIcon: React.FC<IconComponentProps> = ({ className, style }) => (
    <svg {...iconProps} className={className} style={style}><path d="m9 18 6-6-6-6" /></svg>
);

export const TargetIcon: React.FC<IconComponentProps> = ({ className, style }) => (
    <svg {...iconProps} className={className} style={style}><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>
);

export const SparkleIcon: React.FC<IconComponentProps> = ({ className, style }) => (
    <svg {...iconProps} className={className} style={style}><path d="M9.9 2.1 12 7l2.1-4.9" /><path d="M2.1 9.9 7 12l-4.9 2.1" /><path d="M14 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" /><path d="m21.9 9.9-4.9-2.1 4.9-2.1" /><path d="m9.9 21.9 2.1-4.9 2.1 4.9" /><path d="M17 12l4.9 2.1-4.9 2.1" /></svg>
);

export const GlobeIcon: React.FC<IconComponentProps> = ({ className, style }) => (
    <svg {...iconProps} className={className} style={style}><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>
);

export const HundredIcon: React.FC<IconComponentProps> = ({ className, style }) => (
    <svg {...iconProps} className={className} style={style}><path d="M13 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h6" /><path d="M10 8V2" /><path d="m15 14-2.5-4" /><path d="m15 10 2.5 4" /><path d="M18 22a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" /><path d="M21 16a2 2 0 1 0-4 0v4" /></svg>
);

export const TreeIcon: React.FC<IconComponentProps> = ({ className, style }) => (
    <svg {...iconProps} className={className} style={style}><path d="M10 10v.2A3 3 0 0 1 7 13v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1a3 3 0 0 1-3-2.8V10a3 3 0 0 1-3-3a3 3 0 0 1-3 3Z" /><path d="M7 14v6" /><path d="M17 14v6" /></svg>
);

export const WaterDropIcon: React.FC<IconComponentProps> = ({ className, style }) => (
    <svg {...iconProps} className={className} style={style}><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7Z" /></svg>
);

export const CheckCircleIcon: React.FC<IconComponentProps> = ({ className, style }) => (
  <svg {...iconProps} className={className} style={style}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

export const XCircleIcon: React.FC<IconComponentProps> = ({ className, style }) => (
  <svg {...iconProps} className={className} style={style}>
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="15" y1="9" x2="9" y2="15"></line>
    <line x1="9" y1="9" x2="15" y2="15"></line>
  </svg>
);

export const RefreshCwIcon: React.FC<IconComponentProps> = ({ className, style }) => (
  <svg {...iconProps} className={className} style={style}>
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M3 21v-5h5" />
  </svg>
);

export const SunIcon: React.FC<IconComponentProps> = ({ className, style }) => (
    <svg {...iconProps} className={className} style={style}>
        <circle cx="12" cy="12" r="4"></circle>
        <path d="M12 2v2"></path>
        <path d="M12 20v2"></path>
        <path d="m4.93 4.93 1.41 1.41"></path>
        <path d="m17.66 17.66 1.41 1.41"></path>
        <path d="M2 12h2"></path>
        <path d="M20 12h2"></path>
        <path d="m6.34 17.66-1.41 1.41"></path>
        <path d="m19.07 4.93-1.41 1.41"></path>
    </svg>
);

export const MoonIcon: React.FC<IconComponentProps> = ({ className, style }) => (
    <svg {...iconProps} className={className} style={style}>
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
    </svg>
);