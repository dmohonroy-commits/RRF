export interface GuarantorInfo {
  name: string;
  address: string;
  relation: string;
  nid: string;
  mobile: string;
}

export interface WitnessInfo {
  name: string;
  address: string;
  mobile: string;
}

export interface RelativeInfo {
  name: string;
  relation: string;
  occupation: string;
  address: string;
  mobile: string;
}

export interface VerificationBranchData {
  relatives: RelativeInfo[];
  chairmanName?: string;
  chairmanUnionName?: string;
  chairmanOpinion: string;
  neighbor1Name?: string;
  neighbor1Opinion?: string;
  neighbor2Name?: string;
  neighbor2Opinion?: string;
  staffBondAgreed: boolean;
  investigatingOfficerName: string;
  investigatingOfficerDesignation: string;
  investigationComments: string;
  recommendationStatus: 'recommended' | 'rejected' | 'pending';
  investigationDate: string;
}

export interface WorkerData {
  id: string;
  slNo: string;
  workerName: string;
  fatherHusbandName: string;
  motherName: string;
  permVillage: string;
  permPost: string;
  permUpazila: string;
  permDistrict: string;
  presAddress: string;
  mobile: string;
  nidNumber: string;
  designation: string;
  branchOffice: string;
  joiningDate: string;
  guarantor1: GuarantorInfo;
  guarantor2: GuarantorInfo;
  witness1: WitnessInfo;
  witness2: WitnessInfo;
  docCategory: 'stamp100' | 'cert25' | 'verification' | 'all';
  status: 'draft' | 'stamp_printed' | 'cert_printed' | 'verification_pending' | 'verified';
  createdAt: string;
  updatedAt: string;
  verificationData?: VerificationBranchData;
  // Extra Hub Forms Data
  idCardRequested?: boolean;
  idCardBloodGroup?: string;
  trainingBatchNo?: string;
  oathConfirmed?: boolean;
  familyMembersCount?: number;
}

export type ViewTab = 
  | 'home' 
  | 'entry' 
  | 'stamp100_preview' 
  | 'cert25_preview' 
  | 'verification_preview' 
  | 'forms_hub' 
  | 'admin' 
  | 'web_portal' 
  | 'conditions' 
  | 'guidelines' 
  | 'firebase_status';

export type DisplayMode = 'android_app' | 'full_web';
