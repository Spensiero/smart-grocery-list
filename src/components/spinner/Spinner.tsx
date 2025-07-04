import { Loader } from 'lucide-react';

const Spinner = () => {
    return (
        <div className="mt-4 mb-4 h-[calc(100vh-18rem)]">
            <div className="h-full w-full flex items-center justify-center">
                <Loader className="animate-spin color-action-primary" />
            </div>
        </div>
    );
};
export default Spinner;