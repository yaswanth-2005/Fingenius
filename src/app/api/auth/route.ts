
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // In a real app, we would validate credentials against a database
    // For now, we're simply mocking a successful login
    if (email && password) {
      const userData = {
        id: '1',
        fullName: 'John Doe',
        email,
        isAuthenticated: true,
      };

      return NextResponse.json({ 
        success: true, 
        message: 'Login successful',
        user: userData 
      });
    }

    return NextResponse.json(
      { success: false, message: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
