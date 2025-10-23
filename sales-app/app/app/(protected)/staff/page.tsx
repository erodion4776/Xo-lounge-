import { createClient } from '@/lib/supabase/server';
import { Staff } from '@/types/db';

export default async function StaffPage() {
  const supabase = createClient();
  
  // Fetch all staff members
  const { data: staffList, error } = await supabase
    .from('staff')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching staff:', error);
    return <p className="text-red-500">Failed to load staff data.</p>;
  }

  return (
    <div className="space-y-8">
      <h2 className="text-4xl font-extrabold text-gold-accent">Staff Management</h2>

      <div className="flex justify-end">
        {/* In a real app, this would be a button to open a modal for Admin to invite/add new staff (Supabase Auth & Staff table entry) */}
        <button className="py-2 px-4 bg-gold-accent text-dark-bg rounded-md hover:bg-gold-dark transition-colors">
          + Add New Staff
        </button>
      </div>

      {/* Staff List Table */}
      <div className="bg-dark-card rounded-xl overflow-hidden">
        <table className="min-w-full divide-y divide-gold-dark/20">
          <thead className="bg-dark-bg/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gold-light uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gold-light uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gold-light uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gold-light uppercase tracking-wider">Phone</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gold-dark/20">
            {staffList?.map((staff: Staff) => (
              <tr key={staff.id} className="hover:bg-dark-bg/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gold-light">{staff.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gold-accent">{staff.role}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gold-light/80">{staff.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gold-light/80">{staff.phone || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
