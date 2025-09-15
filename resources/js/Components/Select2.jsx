// import { Select } from "@headlessui/react";
import React from "react";
import Select from "react-select";

export default function Select2({
    options,
    onChange,
    placeholder,
    defaultOptions,
}) {
    //custom style
    const customStyles = {
        Control: (provided, state) => ({
            ...provided,
            borderColor: state.isFocused ? "#4CAF50" : "#CCC",
            boxShadow: state.isFocused
                ? "0 0 5px rgba(26, 175, 80, 0.5)"
                : "none",
            outline: "none", //hilangkan garis biru
            "&:hover": {
                borderColor: "4CAF50",
            },
        }),
    };
    return (
        <div>
            <Select
                options={options}
                onChange={onChange}
                className="basic-multi-select"
                defaultValue={defaultOptions || null} //set nilai default
                classNamePrefix="select"
                placeholder={placeholder || "pilih opsi..."}
                isMulti //aktifkan fitur multiple select
                styles={customStyles}
            />
        </div>
    );
}
