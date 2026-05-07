export const SectionCard = ({ children, className = "" }) => (
    <div
        className={`bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden ${className}`}
    >
        {children}
    </div>
);

export const SectionHeader = ({ icon, title, color = "text-rose-500" }) => (
    <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 bg-gray-100">
        <span className={`text-base ${color}`}>{icon}</span>
        <h2 className="text-sm font-semibold text-gray-700 tracking-wide uppercase text-primary">
            {title}
        </h2>
    </div>
);
