import { NextResponse } from 'next/server'

export async function POST (request: Request) {
  try {
    console.log('📧 Iniciando proceso de envío de correo...')
    
    // 1. Extraer datos del body
    const { name, email, message } = await request.json()
    
    console.log('📨 Datos recibidos:', { name, email, messageLength: message?.length || 0 })
    
    // 2. Validar que existan todos los campos
    if (!name || !email || !message) {
      console.log('❌ Validación fallida: campos faltantes')
      return NextResponse.json(
        { success: false, message: 'Todos los campos son requeridos' },
        { status: 400 }
      )
    }
    
    // 3. Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      console.log('❌ Validación fallida: formato de email inválido')
      return NextResponse.json(
        { success: false, message: 'El formato del email no es válido' },
        { status: 400 }
      )
    }
    
    // 4. Enviar a API externa de emails (script PHP)
    console.log('🚀 Enviando a API externa PHP...')
    
    const phpApiUrl = 'http://13.59.20.44/synergy/web/sendEmail/yp.php'
    
    const externalApiResponse = await fetch(phpApiUrl, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, message })
    })
    
    console.log('📬 Respuesta de API externa:', {
      status: externalApiResponse.status,
      statusText: externalApiResponse.statusText,
      ok: externalApiResponse.ok
    })
    
    // 5. Si respuesta OK
    if (externalApiResponse.ok) {
      const responseData = await externalApiResponse.text()
      console.log('✅ Email enviado exitosamente:', responseData)
      
      return NextResponse.json({
        success: true,
        message: '¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.'
      })
    }
    
    // 6. Si hay error en la respuesta
    const errorText = await externalApiResponse.text()
    console.error('❌ Error en API externa:', {
      status: externalApiResponse.status,
      statusText: externalApiResponse.statusText,
      body: errorText
    })
    
    throw new Error(`API externa respondió con error: ${externalApiResponse.status}`)
    
  } catch (error) {
    console.error('❌ Error en API de contacto:', error)
    
    // Manejar errores específicos
    let errorMessage = 'Error al enviar el mensaje. Por favor inténtalo de nuevo.'
    
    if (error instanceof Error) {
      if (error.message.includes('fetch')) {
        errorMessage = 'Error de conexión. Verifica tu conexión a internet e inténtalo de nuevo.'
      } else if (error.message.includes('API externa')) {
        errorMessage = 'Error del servidor. Por favor contacta por WhatsApp.'
      }
    }
    
    // Manejar errores y retornar mensaje apropiado
    return NextResponse.json(
      {
        success: false,
        message: errorMessage
      },
      { status: 500 }
    )
  }
}
