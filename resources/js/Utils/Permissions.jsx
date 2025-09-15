// resources/js/Utils/Permissions.jsx
import { usePage } from "@inertiajs/react";

export default function hasAnyPermission(permissions = []) {
    const { auth } = usePage().props;

    let allPermissions = auth.permissions;

    let hasPermission = false;

    permissions.forEach(function (item) {
        if (allPermissions[item])
            //assign has permission to true
            hasPermission = true;
    });

    return permissions;
}
