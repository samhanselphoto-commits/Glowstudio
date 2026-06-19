import {
  Sparkles,
  Download,
  Heart,
  RefreshCw,
  ChevronDown,
  Check,
  CheckCircle2,
  AlertTriangle,
  Image as ImageIcon,
  Palette,
  Ban,
  Folder,
  Plus,
  Facebook,
  Instagram,
  type LucideIcon,
} from "lucide-react";

/**
 * Project icon naming — re-export lucide-react icons.
 * Adding a Google "G" inline because lucide doesn't ship a Google brand mark.
 */
export const SparkleIcon: LucideIcon = Sparkles;
export const DownloadIcon: LucideIcon = Download;
export const HeartIcon: LucideIcon = Heart;
export const RefreshIcon: LucideIcon = RefreshCw;
export const ChevronDownIcon: LucideIcon = ChevronDown;
export const CheckIcon: LucideIcon = Check;
export const CheckCircleIcon: LucideIcon = CheckCircle2;
export const AlertIcon: LucideIcon = AlertTriangle;
export const ImageLucideIcon: LucideIcon = ImageIcon;
export const PaletteIcon: LucideIcon = Palette;
export const BanIcon: LucideIcon = Ban;
export const FolderIcon: LucideIcon = Folder;
export const PlusIcon: LucideIcon = Plus;
export const FacebookIcon: LucideIcon = Facebook;
export const InstagramIcon: LucideIcon = Instagram;

/** Inline Google "G" — used in OAuth login button. */
export function GoogleIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        fill="#FFFFFF"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09Z"
      />
      <path
        fill="#FFFFFF"
        fillOpacity="0.8"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A10.99 10.99 0 0 0 12 23Z"
      />
      <path
        fill="#FFFFFF"
        fillOpacity="0.6"
        d="M5.84 14.1A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.43.34-2.1V7.07H2.18A10.99 10.99 0 0 0 1 12c0 1.77.43 3.45 1.18 4.93l3.66-2.84Z"
      />
      <path
        fill="#FFFFFF"
        fillOpacity="0.4"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.83C6.71 7.31 9.14 5.38 12 5.38Z"
      />
    </svg>
  );
}
