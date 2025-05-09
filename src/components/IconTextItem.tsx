import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

type ItemIconText = {
    icon?: any;
    text?: string;
};

function IconTextItem({icon, text}: ItemIconText) {
    return (
        <div className="flex items-center px-4 py-2 hover:bg-gray-200 cursor-pointer border-b hover:text-red-500">
            <FontAwesomeIcon className="mr-4 text-lg" icon={icon}/>
            <p>{text}</p>
        </div>
    );
}

export default IconTextItem;

