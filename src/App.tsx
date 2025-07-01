import Timer from '@/components/timer';
function App() {
    return (
        <div className="min-h-screen container mx-auto px-4 flex items-center justify-center">
            <div>
                <h1 className="text-2xl font-bold mb-4">تایمر پومودورو</h1>
                <Timer initialSeconds={15} />
            </div>
        </div>
    );
}

export default App;
