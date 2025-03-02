
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // In a real app, we would get the user ID from the session
    // and fetch the user profile from the database
    
    // Mock user profile data
    const profileData = {
      id: '1',
      fullName: 'John Doe',
      email: 'john@example.com',
      age: 35,
      gender: 'male',
      income: '50000',
      bankBalance: '200000',
      propertiesWorth: '5000000',
      debt: '100000',
      insurance: 'Life insurance policy',
      medicalCondition: 'None',
      lifestyle: 'moderate',
    };

    return NextResponse.json({ 
      success: true, 
      profile: profileData 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    // In a real app, we would validate and update the user profile in the database
    
    return NextResponse.json({ 
      success: true, 
      message: 'Profile updated successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
