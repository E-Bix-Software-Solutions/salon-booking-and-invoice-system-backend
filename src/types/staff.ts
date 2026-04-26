interface Status {
  Active: 'active';
  Inactive: 'inactive';
  Onleave: 'onleave';
  
}
export type StaffFormData = {
  id?: string;
  fullName: string;
  role: string;
  email: string;
  phone: string;
  shift: string;
  salary: string;
  address: string;
  joinDate: string;
  status: Status[keyof Status];
  specialization: string;
  imageUrl: string;
  notes: string;
};
