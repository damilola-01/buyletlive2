/**
 * Mock API Service for Lead Generation
 * Prepared for backend integration.
 */

export interface LeadData {
  name: string;
  email: string;
  phone: string;
  interest?: string;
  location?: string;
  budget?: string;
  notes?: string;
  propertyId?: number;
  viewingDate?: string;
  viewingTime?: string;
}

export const apiService = {
  /**
   * Submit a lead to the backend
   * @param data Lead information
   */
  async submitLead(data: LeadData): Promise<{ success: boolean; message: string }> {
    console.log('[API Mock] Submitting Lead:', data);
    
    // Simulate network latency
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock success response
    return {
      success: true,
      message: 'Your request has been received. An advisor will contact you shortly.'
    };
  }
};
