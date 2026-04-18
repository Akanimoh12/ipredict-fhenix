import { RiShieldKeyholeLine } from "react-icons/ri";

export function PrivacyBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-lg border border-fhenix-700/20 bg-fhenix-900/15 px-2.5 py-1 text-xs font-medium text-fhenix-300">
      <RiShieldKeyholeLine className="h-3 w-3" />
      FHE Encrypted
    </span>
  );
}
