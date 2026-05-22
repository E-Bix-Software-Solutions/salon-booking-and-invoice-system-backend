export type CustomerType = {
  fullName: string;
  email?: string;
  phone: string;
  address?: string;
  gender?: "Male" | "Female" | "Other";
  dateOfBirth?: Date | string;
  joinDate?: Date | string;
  loyaltyLevel?: "Bronze" | "Silver" | "Gold" | "Platinum";
  status?: "Active" | "Inactive";
  preferredService?: string;
  imageUrl?: string;
}
