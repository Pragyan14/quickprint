import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const supabase = await createClient()

  const body = await request.json()
  const { shopId, fileName, fileBase64, fileType, colorMode, sides, copies } = body

  // Get real IP
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'

  // Check shop exists
  const { data: shop } = await supabase
    .from('shops')
    .select('id')
    .eq('id', shopId)
    .single()

  if (!shop) {
    return NextResponse.json({ error: 'Shop not found.' }, { status: 404 })
  }

  // Check shop file limit (20 active files)
  const { count: shopFileCount } = await supabase
    .from('files')
    .select('*', { count: 'exact', head: true })
    .eq('shop_id', shopId)
    .eq('is_deleted', false)
    .gt('expires_at', new Date().toISOString())

  if (shopFileCount && shopFileCount >= 20) {
    return NextResponse.json(
      { error: 'This shop is currently busy. Please try again in a few minutes.' },
      { status: 429 }
    )
  }

  // Check IP upload limit (3 uploads)
  const { count: ipCount } = await supabase
    .from('files')
    .select('*', { count: 'exact', head: true })
    .eq('uploader_ip', ip)
    .eq('is_deleted', false)
    .gt('expires_at', new Date().toISOString())

  if (ipCount && ipCount >= 3) {
    return NextResponse.json(
      { error: 'You have reached the upload limit. Please wait before uploading again.' },
      { status: 429 }
    )
  }

  // Upload file to storage
  const fileBuffer = Buffer.from(fileBase64, 'base64')
  const fileExt = fileName.split('.').pop()
  const storagePath = `${shopId}/${Date.now()}.${fileExt}`

  const { error: storageError } = await supabase.storage
    .from('quick-print')
    .upload(storagePath, fileBuffer, {
      contentType: fileType,
      upsert: false,
    })

  if (storageError) {
    return NextResponse.json({ error: 'File upload failed.' }, { status: 500 })
  }

  // Insert file record
  const { error: dbError } = await supabase.from('files').insert({
    shop_id: shopId,
    file_name: fileName,
    storage_path: storagePath,
    color_mode: colorMode,
    sides,
    copies,
    uploader_ip: ip,
  })

  if (dbError) {
    return NextResponse.json({ error: 'Failed to save file record.' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}