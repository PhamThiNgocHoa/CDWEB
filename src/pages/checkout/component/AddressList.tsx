import React from "react";
import {Address} from "../../../models/Address";

interface AddressListProps {
    addresses: Address[];
    selectedId: string | null;
    onSelect: (address: Address) => void;
    onDelete: (id: string) => void;
    onEdit: (address: Address) => void;
}

const AddressList: React.FC<AddressListProps> = ({ addresses, selectedId, onSelect, onDelete, onEdit }) => (
    <ul>
        {addresses.map(address => (
            <li
                key={address.id}
                className={`border p-3 rounded-md mb-2 cursor-pointer ${selectedId === address.id ? 'bg-blue-100' : ''}`}
                onClick={() => onSelect(address)}
            >
                <span>{address.address}</span>
                <p>{address.receiver} - {address.numberPhone}</p>
                <div className="flex justify-end space-x-2">
                    <button onClick={(e) => { e.stopPropagation(); onEdit(address); }} className="text-blue-600 text-sm">
                        Chỉnh sửa
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); onDelete(address.id); }} className="text-red-600 text-sm">
                        Xóa
                    </button>
                </div>
            </li>
        ))}
    </ul>
);

export default AddressList;
