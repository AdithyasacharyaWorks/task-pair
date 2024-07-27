
import { NextResponse } from 'next/server';
import { database, dbId, userCollectionId, Query } from '@/backend';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route'; 

export async function GET(request: Request) {
    try {

      const session = await getServerSession(authOptions);
      if (!session) {
            return NextResponse.json({ status: 'error', message: 'Unauthorized' }, { status: 401 });
        }
      const url = new URL(request.url);
      const email = url.searchParams.get('email') || '';
  
      const data = await database.listDocuments(dbId, userCollectionId, [Query.equal('email', email)]);
  
      if (data.documents.length > 0) {
        return NextResponse.json({ status: 'success', message: 'Email found in database', data }, { status: 200 });
      } else {
        return NextResponse.json({ status: 'success', message: 'Email not found in database' ,data}, { status: 200 });
      }
    } catch (error: any) {
      console.error('Error checking email:', error);
      return NextResponse.json({ status: 'error', message: 'Error fetching email', error: error.message || error }, { status: 500 });
    }
  }
  