import { Button } from "@/components/ui/button";

const App = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 text-slate-900 font-sans p-6 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">🚀 Rsbuild + React + Express Template</h1>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">A modern, high-performance full-stack template featuring React 19, Express 5, and build performance powered by Rsbuild.</p>
            <div className="flex gap-4">
                <Button className="font-semibold px-6 cursor-pointer">Explore Features</Button>
                <a href="https://github.com/ozan-fn/rsbuild-react-express-template" className="inline-flex items-center justify-center px-6 py-2 rounded-md font-medium bg-white border border-slate-200 shadow-xs hover:bg-slate-50 transition-colors">
                    GitHub Repo
                </a>
            </div>
        </div>
    );
};

export default App;
