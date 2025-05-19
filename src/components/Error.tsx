
const Error = ({ message, onClose }: { message: string; onClose: () => void }) => {
    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h3 className="text-xl font-semibold text-red-600">Lỗi</h3>
                <p className="mt-2 text-gray-800">{message}</p>
                <button
                    onClick={onClose}
                    className="mt-4 w-full py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    Đóng
                </button>
            </div>
        </div>
    );
};


export default Error;
