import { Schema, model } from 'mongoose';

export interface IQuotation {
      firstName: string;
      lastName?: string;
      email?: string;
      phoneNumber: string;

      spouseFirstName?: string;
      spouseLastName?: string;

      streetAddress?: string;
      streetAddressLine2?: string;
      city: string;
      stateOrProvince: string;
      postalOrZipCode: string;

      isLegalOwner?: boolean;
      siteAddressIfDifferent?: string;
      isSiteReadyToWorkOn?: boolean;
      workType?: string;
      hasBuiltOrRenovatedBefore?: boolean;
      hasSelectedArchitectOrDesigner?: boolean;
      hasAllPropertyInfo?: boolean;
      hasPermitsApproved?: boolean;
      budget?: string;
      hasFinancing?: string;
      haveSelected?: string;
      expectationsExperienceHelp?: string;
      desiredStartTime?: string;
      preBuildRequirements?: string;
      specialRequirements?: string;
      hearAboutUs?: string;
      expectationsBuilder?: string;

      planFiles?: string[];
      builderExpectations?: string;

      priorities?: {
            communication?: number;
            reliability?: number;
            experience?: number;
            quality?: number;
            cost?: number;
      };
      wantsFreeMaintenance?: number;
}

const quotationSchema = new Schema<IQuotation>(
      {
            firstName: { type: String, required: true },
            lastName: { type: String },
            email: { type: String },
            phoneNumber: { type: String, required: true },

            spouseFirstName: { type: String },
            spouseLastName: { type: String },

            streetAddress: { type: String },
            streetAddressLine2: { type: String },
            city: { type: String, required: true },
            stateOrProvince: { type: String, required: true },
            postalOrZipCode: { type: String, required: true },

            isLegalOwner: { type: Boolean },
            siteAddressIfDifferent: { type: String },
            isSiteReadyToWorkOn: { type: Boolean },
            workType: { type: String },
            hasBuiltOrRenovatedBefore: { type: Boolean },
            hasSelectedArchitectOrDesigner: { type: Boolean },
            hasAllPropertyInfo: { type: Boolean },
            hasPermitsApproved: { type: Boolean },
            budget: { type: String },
            hasFinancing: { type: String },
            haveSelected: { type: String },
            expectationsExperienceHelp: { type: String },
            desiredStartTime: { type: String },
            preBuildRequirements: { type: String },
            specialRequirements: { type: String },
            hearAboutUs: { type: String },
            expectationsBuilder: { type: String },

            planFiles: { type: [String], default: [] },
            builderExpectations: { type: String },

            priorities: {
                  communication: { type: Number },
                  reliability: { type: Number },
                  experience: { type: Number },
                  quality: { type: Number },
                  cost: { type: Number },
            },
            wantsFreeMaintenance: { type: Number },
      },
      {
            timestamps: true,
      }
);

export const Quotation = model<IQuotation>('Quotation', quotationSchema);
