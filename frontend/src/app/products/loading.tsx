export default function Loading() {
    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-800"> Menu Đồ Uống BrewLite </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" aria-busy="true" aria-label="Loading menu">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col justify-between h-full">
                        <div className="h-6 w-2/3 animate-pulse rounded bg-gray-200" />
                        <div className="mt-4 flex items-center justify-between">
                            <div className="h-6 w-1/3 animate-pulse rounded bg-gray-200" />
                            <div className="h-4 w-12 animate-pulse rounded bg-gray-200" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
