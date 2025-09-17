import React from "react";

const Card = ({ title, className = "", children }) => {
    return (
        <div
            className={`bg-white border rounded-lg overflow-hidden ${className}`}
        >
            <div className="p-4 border-b">
                <h3 className="flex items-center gap-2 font-semibold text-sm text-gray-700 uppercase">
                    {title}
                </h3>
            </div>
            <div className="w-full overflow-x-auto">{children}</div>
        </div>
    );
};

const Table = ({ children }) => {
    return <table className="w-full text-sm border-collapse">{children}</table>;
};

const Thead = ({ className = "", children }) => {
    return (
        <thead className={`border-b bg-gray-50 ${className}`}>{children}</thead>
    );
};

const Tbody = ({ className = "", children }) => {
    return (
        <tbody className={`divide-y bg-white ${className}`}>{children}</tbody>
    );
};

const Th = ({ className = "", children }) => {
    return (
        <th
            scope="col"
            className={`h-12 px-4 text-left align-middle font-medium text-gray-700 ${className}`}
        >
            {children}
        </th>
    );
};

const Td = ({ className = "", children }) => {
    return (
        <td
            className={`whitespace-nowrap p-4 align-middle text-gray-700 ${className}`}
        >
            {children}
        </td>
    );
};

const Empty = ({ colSpan, message, children }) => {
    return (
        <tr>
            <td colSpan={colSpan}>
                <div className="flex flex-col items-center justify-center h-96 text-gray-500">
                    {children}
                    <p className="mt-3">{message}</p>
                </div>
            </td>
        </tr>
    );
};

// export modular
Table.Card = Card;
Table.Thead = Thead;
Table.Tbody = Tbody;
Table.Th = Th;
Table.Td = Td;
Table.Empty = Empty;

export default Table;
