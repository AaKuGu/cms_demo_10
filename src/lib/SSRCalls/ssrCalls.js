import { afterOnboardingActionGuard } from '@/lib/actions/action';
import { getStaffById, getStaffList } from '@/crud/Staff.crud';
import { serialize } from '@/lib/serialize';

export async function fetchAllStaffs() {
  return afterOnboardingActionGuard('view_staff', async ({ clinicId }) => {
    const staffs = await getStaffList({ clinicId });
    return serialize(staffs);
  });
}

export async function fetchStaff(staffId) {
  return afterOnboardingActionGuard('view_staff', async ({ clinicId }) => {
    if (!staffId) {
      throw new Error('Invalid staff ID.');
    }

    const staff = await getStaffById(staffId);
    if (!staff) {
      throw new Error('Staff member not found.');
    }

    if (String(staff.clinicId) !== String(clinicId)) {
      throw new Error('Staff member not found.');
    }

    return serialize(staff);
  });
}

