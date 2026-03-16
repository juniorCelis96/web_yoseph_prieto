import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createServerClient } from '@/lib/supabase'
import { mockDb } from '@/lib/mockDb'

// GET - Fetch single event
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createServerClient()
    
    // Si Supabase no está configurado, usar mock database
    if (!supabase) {
      const event = await mockDb.getEventById(params.id)
      if (!event) {
        return NextResponse.json(
          { error: 'Event not found' },
          { status: 404 }
        )
      }
      return NextResponse.json(event)
    }
    
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', params.id)
      .single()
    
    if (error || !data) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT - Update event
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    const body = await request.json()
    const { title, date, time, location, venue, description, status, active } = body
    
    const supabase = createServerClient()
    
    // Si Supabase no está configurado, usar mock database
    if (!supabase) {
      const updateData: any = {}
      if (title !== undefined) updateData.title = title
      if (date !== undefined) updateData.date = date
      if (time !== undefined) updateData.time = time || null
      if (location !== undefined) updateData.location = location
      if (venue !== undefined) updateData.venue = venue
      if (description !== undefined) updateData.description = description || null
      if (status !== undefined) updateData.status = status
      if (active !== undefined) updateData.active = active
      
      const updatedEvent = await mockDb.updateEvent(params.id, updateData)
      if (!updatedEvent) {
        return NextResponse.json(
          { error: 'Event not found' },
          { status: 404 }
        )
      }
      return NextResponse.json(updatedEvent)
    }
    
    const updateData: any = {}
    if (title !== undefined) updateData.title = title
    if (date !== undefined) updateData.date = date
    if (time !== undefined) updateData.time = time || null
    if (location !== undefined) updateData.location = location
    if (venue !== undefined) updateData.venue = venue
    if (description !== undefined) updateData.description = description || null
    if (status !== undefined) updateData.status = status
    if (active !== undefined) updateData.active = active
    
    const { data, error } = await supabase
      .from('events')
      .update(updateData)
      .eq('id', params.id)
      .select()
      .single()
    
    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to update event' },
        { status: 500 }
      )
    }
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE - Delete event
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    const supabase = createServerClient()
    
    // Si Supabase no está configurado, usar mock database
    if (!supabase) {
      const deleted = await mockDb.deleteEvent(params.id)
      if (!deleted) {
        return NextResponse.json(
          { error: 'Event not found' },
          { status: 404 }
        )
      }
      return NextResponse.json({ success: true })
    }
    
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', params.id)
    
    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to delete event' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
