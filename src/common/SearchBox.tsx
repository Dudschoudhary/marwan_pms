import { IoSearchOutline } from "react-icons/io5"

interface searchTypes {
    value: string,
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    placeholder: string,
    type: string,
    className: string
}
const SearchBox = ({ value, onChange, placeholder, type, className }: searchTypes) => {
    return (
        <div className=" flex justify-end my-10 items-center space-x-5">
            <label>Search:</label>
            <div className={className}>

                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    className="py-2 px-3 outline-none absolute left-10 top-0 "
                    placeholder={placeholder}
                />
                <div className="absolute top-3 left-0">
                    <IoSearchOutline />
                </div>
            </div>
        </div>
    )
}

export default SearchBox