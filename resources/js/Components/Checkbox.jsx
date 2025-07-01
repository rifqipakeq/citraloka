export default function Checkbox({ label, ...props }) {
    return (
        <>
            <div>
                <input
                    {...props}
                    type="checkbox"
                    className={
                        'rounded-md bg-white border-gray-200 checked:bg-teal-500'
                    }
                />
                <label className="text-sm text-gray-700">{label}</label>
            </div>
        </>
    );
}
