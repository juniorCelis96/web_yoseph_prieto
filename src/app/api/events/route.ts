import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createServerClient } from '@/lib/supabase'
import { mockDb } from '@/lib/mockDb'

// GET - Fetch all events
export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient()
    
    // Si Supabase no está configurado, usar mock database
    if (!supabase) {
      const events = await mockDb.getAllEvents()
      return NextResponse.json(events)
    }
    
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true })
    
    if (error) {
      console.error('Supabase error:', error)
      // Fallback a mock si hay error
      const events = await mockDb.getAllEvents()
      return NextResponse.json(events)
    }
    
    return NextResponse.json(data || [])
  } catch (error) {
    console.error('API error:', error)
    // Fallback a mock en caso de error
    try {
      const events = await mockDb.getAllEvents()
      return NextResponse.json(events)
    } catch {
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      )
    }
  }
}

// POST - Create new event
export async function POST(request: NextRequest) {
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
    
    console.log('Received event data:', { title, date, time, location, venue, description, status, active })
    
    if (!title || !date || !location || !venue || !status) {
      return NextResponse.json(
        { error: 'Missing required fields', details: { title: !!title, date: !!date, location: !!location, venue: !!venue, status: !!status } },
        { status: 400 }
      )
    }
    
    const supabase = createServerClient()
    
    // Si Supabase no está configurado, usar mock database
    if (!supabase) {
      // Convertir active de string a boolean si es necesario
      const activeValue = typeof active === 'string' ? active === 'true' : (active !== undefined ? active : true)
      
      const newEvent = await mockDb.createEvent({
        title,
        date,
        time: time || null,
        location,
        venue,
        description: description || null,
        status,
        active: activeValue
      })
      return NextResponse.json(newEvent, { status: 201 })
    }
    
    // Convertir active de string a boolean si es necesario
    const activeValue = typeof active === 'string' ? active === 'true' : (active !== undefined ? active : true)
    
    const eventData = {
      title,
      date,
      time: time || null,
      location,
      venue,
      description: description || null,
      status,
      active: activeValue
    }
    
    console.log('Inserting event data:', eventData)
    
    const { data, error } = await supabase
      .from('events')
      .insert(eventData)
      .select()
      .single()
    
    if (error) {
      console.error('Supabase error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      })
      return NextResponse.json(
        { 
          error: 'Failed to create event',
          details: error.message,
          code: error.code
        },
        { status: 500 }
      )
    }
    
    console.log('Event created successfully:', data)
    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('API error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: errorMessage
      },
      { status: 500 }
    )
  }
}
