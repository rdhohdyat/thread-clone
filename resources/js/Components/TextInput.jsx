import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
            {...props}
            type={type}
            className={
                "bg-gray-100 border-none text-sm focus:outline-none focus:ring-0 active:outline-none py-3 rounded-xl border-0 shadow-none" +
                className
            }
            ref={input}
        />
    );
});
