export const PERMISSION_GROUPS = [
  {
    resource: "Patients",
    permissions: [
      { key: "create_patient", label: "Create" },
      { key: "view_patient", label: "View" },
      { key: "update_patient", label: "Update" },
      { key: "delete_patient", label: "Delete" },
    ],
  },
  {
    resource: "Appointments",
    permissions: [
      { key: "create_appointment", label: "Create" },
      { key: "view_appointment", label: "View" },
      { key: "update_appointment", label: "Update" },
      { key: "delete_appointment", label: "Delete" },
    ],
  },
  {
    resource: "Billing",
    permissions: [
      { key: "create_billing", label: "Create" },
      { key: "view_billing", label: "View" },
      { key: "update_billing", label: "Update" },
      { key: "delete_billing", label: "Delete" },
    ],
  },
  {
    resource: "Prescriptions",
    permissions: [
      { key: "create_prescription", label: "Create" },
      { key: "view_prescription", label: "View" },
      { key: "update_prescription", label: "Update" },
      { key: "delete_prescription", label: "Delete" },
    ],
  },
  {
    resource: "Reports",
    permissions: [{ key: "view_reports", label: "View" }],
  },
];

export const PERMISSIONS = [
  ...new Set(PERMISSION_GROUPS.flatMap((group) => group.permissions.map((p) => p.key))),
];

export const STAFF_PERMISSIONS = {
  VIEW_STAFF: "view_staff",
  CREATE_STAFF: "create_staff",
  DELETE_STAFF: "delete_staff",
  REVOKE_STAFF: "revoke_staff",
};

export const PATIENT_PERMISSIONS = {
  VIEW_PATIENT: "view_patient",
  CREATE_PATIENT: "create_patient",
  UPDATE_PATIENT: "update_patient",
  DELETE_PATIENT: "delete_patient",
};

export const APPOINTMENT_PERMISSIONS = {
  VIEW_APPOINTMENT: "view_appointment",
  CREATE_APPOINTMENT: "create_appointment",
  UPDATE_APPOINTMENT: "update_appointment",
  DELETE_APPOINTMENT: "delete_appointment",
};