import {ProductResponse} from "../models/response/ProductResponse";

const CardProduct: React.FC<ProductResponse> = (props) => {
    return (
        <div className="w-64 bg-white rounded-lg border border-gray-300 shadow-lg p-4">
            {/* Hình ảnh sản phẩm */}
            <img src={props.img} alt={props.name} className="w-full h-48 object-cover rounded-md" />

            {/* Tiêu đề sản phẩm */}
            <h2 className="text-lg font-semibold text-center mt-4">{props.name}</h2>

            {/* Giá sản phẩm */}
            <div className="flex justify-center items-center gap-2 mt-2">
                <span className="text-gray-500 line-through">{props.price}</span>
                <span className="text-red-600 font-bold text-xl">{props.price}</span>

            </div>

            {/* Thông tin thêm */}
            <div className="text-center text-sm text-gray-600 mt-2">
                <p>Nhà xuất bản: {props.publisher}</p>
                <p>Tác giả: {props.author}</p>
                <p>Năm xuất bản: {props.publishYear}</p>
            </div>

            {/* Số lượng đã bán */}
            <div className="text-center text-sm text-gray-600 mt-2">
                Số trang: <span className="font-bold text-green-600">{props.pageNumber}</span>
            </div>

            {/* Nút Mua ngay */}
            <button className="w-full mt-4 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition duration-300">
                Mua ngay
            </button>
        </div>
    );
};
export default CardProduct;