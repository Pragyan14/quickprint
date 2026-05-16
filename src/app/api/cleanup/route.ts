import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createClient()

  // Find all expired, not yet deleted files
  const { data: expiredFiles } = await supabase
    .from('files')
    .select('id, storage_path')
    .eq('is_deleted', false)
    .lt('expires_at', new Date().toISOString())

  if (!expiredFiles || expiredFiles.length === 0) {
    return NextResponse.json({ deleted: 0 })
  }

  // Delete each file from storage
  const storagePaths = expiredFiles.map(f => f.storage_path)
  await supabase.storage.from('quick-print').remove(storagePaths)

  // Delete rows from DB entirely
  const ids = expiredFiles.map(f => f.id)
  await supabase.from('files').delete().in('id', ids)

  return NextResponse.json({ deleted: expiredFiles.length })
}