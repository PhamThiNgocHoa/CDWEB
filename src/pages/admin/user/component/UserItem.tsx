import React from "react";
import {CustomerResponse} from "../../../../models/response/CustomerResponse";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faPen, faTrash} from "@fortawesome/free-solid-svg-icons";

interface Props {
    user: CustomerResponse;
    onDelete: (id: string) => void;
    onEdit: (user: CustomerResponse) => void;
    onView: (user: CustomerResponse) => void;
}

function UserItem({user, onDelete, onEdit, onView}: Props) {
    return (
        <tr className="border-t">
            <td className="p-3">{user.fullname}</td>
            <td className="p-3">{user.email}</td>
            <td className="p-3 capitalize">{user.role}</td>
            <td className="p-3 space-x-2">
                <button
                    onClick={() => onView(user)}
                    className="bg-blue-500 px-3 py-1 rounded text-white hover:bg-blue-600"
                >
                    <FontAwesomeIcon icon={faEye} className="text-white cursor-pointer" />
                </button>
                <button onClick={() => onEdit(user)}
                        className="bg-green-600 px-3 py-1 rounded text-white hover:bg-green-700">
                    <FontAwesomeIcon icon={faPen} className="text-white cursor-pointer"/>
                </button>
                <button onClick={() => onDelete(user.id)}
                        className="bg-red-600 px-3 py-1 rounded text-white hover:bg-red-700">
                    <FontAwesomeIcon icon={faTrash} className="text-white cursor-pointer"/>
                </button>
            </td>
        </tr>
    );
}

export default UserItem;
