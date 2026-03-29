const InputField = ({ label, type = "text", name, placeholder, value, onChange }) => {
    return (
        <div>
            <label className="block text-zinc-400 text-sm mb-1.5">{label}</label>
            <div className="relative">
                <input
                name={name}
                value={value}
                placeholder={placeholder}
                type={type}
                onChange={onChange}
                className="w-full bg-zinc-900 text-white text-sm placeholder-zinc-600 border border-zinc-800 rounded-lg px-3.5 py-2.5 pr-10 outline-none focus:border-zinc-600 transition-colors"
                />
            </div>
        </div>
    )
}

export default InputField;