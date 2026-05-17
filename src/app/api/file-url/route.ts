import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const supabase = await createClient()

  // Check auth
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { storagePath, fileId } = await request.json()

  // Verify this file belongs to a shop owned by the requesting user
  const { data: file } = await supabase
    .from('files')
    .select('id, shop_id, shops(owner_id)')
    .eq('id', fileId)
    .single()

  if (!file) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 })
  }

  const shop = file.shops as any
  if (shop?.owner_id !== user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  // Safe to generate signed URL
  const { data } = await supabase.storage
    .from('quick-print')
    .createSignedUrl(storagePath, 60)

  if (!data?.signedUrl) {
    return NextResponse.json({ error: 'Could not generate URL' }, { status: 500 })
  }

  return NextResponse.json({ signedUrl: data.signedUrl })
}