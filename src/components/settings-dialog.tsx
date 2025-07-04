import { type Stages } from '@/lib/types';
import { SettingsIcon } from 'lucide-react';
import { usePrefs } from '@/components/prefs-provider';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function SettingsDialog() {
    const { prefs, setPrefs } = usePrefs();
    const STAGE_DETAILS: Record<Stages, { label: string }> = {
        BRAKE: { label: 'استراحت کوتاه' },
        L_BRAKE: { label: 'استراحت طولانی' },
        POMO: { label: 'پومودورو' },
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    size="icon"
                    variant="ghost"
                    className="data-[state=open]:*:rotate-45"
                >
                    <SettingsIcon className="transition-transform" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>تنظیمات</DialogTitle>
                    <DialogDescription>
                        از اینجا میتونی تغییرات دلخواهت رو روی تایمر ایجاد کنی
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-2 pt-6">
                    <p className="text-muted-foreground text-xs font-bold">
                        تایمر ها
                    </p>
                    {Object.keys(prefs.stageSeconds).map(stage => {
                        const stagePrefs = prefs.stageSeconds[stage as Stages];
                        const stageDetails = STAGE_DETAILS[stage as Stages];
                        return (
                            <div key={stage} className="grid grid-cols-2">
                                <Label htmlFor={stage}>
                                    {stageDetails.label}
                                </Label>
                                <div className="flex items-center gap-2">
                                    <Input
                                        dir="ltr"
                                        className="max-w-16"
                                        name={stage}
                                        id={stage}
                                        type="number"
                                        min="1"
                                        value={stagePrefs.minutes / 60}
                                        onChange={e => {
                                            if (Number(e.target.value) < 1)
                                                return;
                                            setPrefs(prefs => {
                                                const newPrefs = { ...prefs };
                                                newPrefs.stageSeconds[
                                                    stage as Stages
                                                ].minutes =
                                                    Number(e.target.value) * 60;
                                                return newPrefs;
                                            });
                                        }}
                                    />
                                    <span className="text-sm text-muted-foreground">
                                        دقیقه
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </DialogContent>
        </Dialog>
    );
}
