import { Timer } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { SettingsDialog } from '@/components/settings-dialog';

export function Navbar() {
    return (
        <nav className="container flex items-center justify-between px-4 mx-auto">
            <h1 className="font-black text-lg">
                <Timer strokeWidth={3} className="inline me-2 size-5" />
                <span>پومودورو</span>
            </h1>
            <div>
                <ThemeToggle />
                <SettingsDialog />
            </div>
        </nav>
    );
}
