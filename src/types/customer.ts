export type CustomerFormData = {
  fullName: string;
  email: string;
  phone: string;
  gender: string;
  dateOfBirth: string;
  address: string;
  joinDate: string;
  loyaltyLevel: string;
  status: string;
  preferredService: string;
  imageUrl: string;
  notes: string;
};

export type CustomerType = {
  fullName: string;
  email?: string;
  phone: string;
  gender?: "Male" | "Female" | "Other";
  dateOfBirth?: Date;
  address?: string;
  joinDate?: Date;
  loyaltyLevel?: "Bronze" | "Silver" | "Gold" | "Platinum";
  status?: "Active" | "Inactive";
  preferredService?: string;
  imageUrl?: string;
};
