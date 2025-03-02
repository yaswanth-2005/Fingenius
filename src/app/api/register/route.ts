
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, password } = body;

    // In a real app, we would store this data in a database
    // For now, we're simply mocking a successful registration
    if (fullName && email && password) {
      const userData = {
        id: '1',
        fullName,
        email,
        isRegistrationComplete: false,
      };

      return NextResponse.json({ 
        success: true, 
        message: 'Registration successful',
        user: userData 
      });
    }

    return NextResponse.json(
      { success: false, message: 'Invalid registration data' },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
