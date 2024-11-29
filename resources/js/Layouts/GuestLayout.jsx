import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6">
            <div>
                <img src="/thread.png" className='h-16 w-16' alt="" />
            </div>

            <div className="w-full sm:max-w-md px-6 py-4">
                {children}
            </div>
        </div>
    );
}
