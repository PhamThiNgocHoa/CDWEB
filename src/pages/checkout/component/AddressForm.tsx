import React from "react";

interface AddressFormProps {
    provinces: any[];
    districts: any[];
    selectedProvince: string | null;
    selectedDistrict: string | null;
    houseNumber: string;
    receiverName: string;
    phoneNumber: string;
    loading: boolean;
    onProvinceChange: (value: string) => void;
    onDistrictChange: (value: string) => void;
    onReceiverChange: (value: string) => void;
    onPhoneChange: (value: string) => void;
    onHouseChange: (value: string) => void;
    onCreateAddress: () => void;
}

const AddressForm: React.FC<AddressFormProps> = ({
                                                     provinces,
                                                     districts,
                                                     selectedProvince,
                                                     selectedDistrict,
                                                     houseNumber,
                                                     receiverName,
                                                     phoneNumber,
                                                     loading,
                                                     onProvinceChange,
                                                     onDistrictChange,
                                                     onReceiverChange,
                                                     onPhoneChange,
                                                     onHouseChange,
                                                     onCreateAddress,
                                                 }) => {
    return (
        <div>
            <h3 className="font-medium text-lg mb-2">Tạo địa chỉ giao hàng</h3>
            <div className="mb-2">
                <select className="w-full p-2 border rounded-md" value={selectedProvince || ''} onChange={e => onProvinceChange(e.target.value)}>
                    <option value="">Chọn tỉnh thành</option>
                    {provinces.map(p => <option key={p.code} value={p.code}>{p.name}</option>)}
                </select>
            </div>

            {selectedProvince && (
                <>
                    <div className="mb-2">
                        <select className="w-full p-2 border rounded-md" value={selectedDistrict || ''} onChange={e => onDistrictChange(e.target.value)}>
                            <option value="">Chọn quận huyện</option>
                            {districts.map(d => <option key={d.code} value={d.code}>{d.name}</option>)}
                        </select>
                    </div>

                    <input type="text" placeholder="Số nhà (nếu có)" value={houseNumber} onChange={e => onHouseChange(e.target.value)} className="w-full p-2 border rounded-md mb-2" />
                </>
            )}

            <input type="text" placeholder="Tên người nhận" value={receiverName} onChange={e => onReceiverChange(e.target.value)} className="w-full p-2 border rounded-md mb-2" />
            <input type="text" placeholder="Số điện thoại" value={phoneNumber} onChange={e => onPhoneChange(e.target.value)} className="w-full p-2 border rounded-md mb-2" />

            <button onClick={onCreateAddress} className="w-full bg-red-600 text-white p-2 rounded-md" disabled={loading}>
                Tạo địa chỉ mới
            </button>
        </div>
    );
};

export default AddressForm;
