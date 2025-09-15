export default function Checkbox({ label, className = "", ...props }) {
    return (
        <>
            <div className="flex flex-row items-center gap-2">
                <input
                    {...props}
                    type="checkbox"
                    className={
                        "rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 " +
                        className
                    }
                />
                <label className="text-sm text-gray-700">{label}</label>
            </div>
        </>
    );
}
