import { useLocalStorage } from '@/lib/hooks';

interface Prefs {
    stageSeconds: number[];
}

const DEFAULT_PREFS: Prefs = {
    stageSeconds: [25 * 60, 5 * 60, 15 * 60],
};

export default function Settings() {
    const [prefs, setPrefs] = useLocalStorage<Prefs>('prefs', DEFAULT_PREFS);

    return (
        <div>
            <h2>تنظیمات</h2>
            <div className="grid gap-4">
                {prefs.stageSeconds.map((val, idx) => (
                    <div>
                        <label htmlFor="">
                            {idx === 0 && 'پومودورو'}
                            {idx === 1 && 'استراحت کوتاه'}
                            {idx === 2 && 'استراحت بلند'}
                        </label>
                        <input
                            className="ring"
                            type="number"
                            value={val / 60}
                            onChange={e => {
                                setPrefs(prefs => {
                                    const newPrefs = { ...prefs };
                                    newPrefs.stageSeconds[idx] =
                                        Number(e.target.value) * 60;
                                    return newPrefs;
                                });
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
