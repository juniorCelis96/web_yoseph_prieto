<?php
// API Endpoint para envío de correos utilizando PHPMailer y el servidor SMTP de Brevo.
// Recibe JSON: {"name": "...", "email": "...", "message": "..."}
// Responde JSON: {"success": true/false, "message": "..."}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Obtener el origen de la petición
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

// Lista de dominios permitidos
$allowed_origins = [
    'https://yosephprieto.com',
    'https://www.yosephprieto.com',
    'https://yoseph-prieto.vercel.app',
    'http://localhost:3000',
    'http://localhost:3001'
];

// Configurar CORS basado en el origen
if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    header('Access-Control-Allow-Origin: *');
}

// Configurar headers para CORS ANTES de cualquier salida
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Max-Age: 86400'); // 24 horas
header('Access-Control-Allow-Credentials: true');

// Manejar preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Incluir PHPMailer DESPUÉS de los headers CORS
require '../PHPMailer/Exception.php';
require '../PHPMailer/PHPMailer.php';
require '../PHPMailer/SMTP.php';

// Validar método HTTP
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Método no permitido. Solo se acepta POST.',
        'code' => 'METHOD_NOT_ALLOWED'
    ]);
    exit();
}

// Leer datos JSON del cuerpo de la petición
$json_input = file_get_contents('php://input');

// Validar que se recibió contenido
if (empty($json_input)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'No se recibieron datos en el cuerpo de la petición.',
        'code' => 'EMPTY_BODY'
    ]);
    exit();
}

// Decodificar JSON
$data = json_decode($json_input, true);

// Validar que se recibió JSON válido
if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Error al decodificar JSON: ' . json_last_error_msg(),
        'code' => 'INVALID_JSON'
    ]);
    exit();
}

// Extraer y validar datos del JSON
$nombre = isset($data['name']) ? trim($data['name']) : null;
$destinatario = isset($data['email']) ? trim($data['email']) : null;
$mensajetxt = isset($data['message']) ? trim($data['message']) : null;

// Validar campos requeridos
if (empty($destinatario) || empty($mensajetxt)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Campos requeridos faltantes. Se necesitan "email" y "message".',
        'code' => 'MISSING_FIELDS',
        'required_fields' => ['email', 'message'],
        'optional_fields' => ['name']
    ]);
    exit();
}

// Validar formato de email
if (!filter_var($destinatario, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'El formato del email no es válido.',
        'code' => 'INVALID_EMAIL_FORMAT'
    ]);
    exit();
}

// Validar longitud del mensaje
if (strlen($mensajetxt) > 5000) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'El mensaje es demasiado largo (máximo 5000 caracteres).',
        'code' => 'MESSAGE_TOO_LONG'
    ]);
    exit();
}

// Generar asunto automáticamente
$asuntotxt = "Nuevo mensaje de contacto desde web Yoseph Prieto";

// Función para enviar correos
function enviarEmail($para, $asunto, $mensaje, $nombreRemitente = null) {
    $mail = new PHPMailer(true);

    try {
        // Configuración del servidor SMTP
        $mail->SMTPDebug = 0;
        $mail->isSMTP();
        $mail->Host = 'smtp-relay.brevo.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'sms.afk@gmail.com';
        $mail->Password = 'm9xcR4dQg20s1O5t';
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        // Configuración de los destinatarios
        $mail->setFrom('sms.afk@gmail.com', 'Notificaciones Yoseph Prieto');
        $mail->addAddress('oficialyoseph.prieto@gmail.com');

        // Configuración del contenido
        $mail->isHTML(true);
        $mail->Subject = $asunto;
        
        // Crear mensaje HTML con la plantilla personalizada de Yoseph Prieto
        $htmlMessage = '
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Mensaje de Contacto - Yoseph Prieto</title>
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                body {
                    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    background-color: #3d2817;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                }

                .container {
                    background: #3d2817;
                    border-radius: 10px;
                    overflow: hidden;
                    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
                    border: 2px solid #C9A84C;
                }

                /* Header */
                .header {
                    background: linear-gradient(135deg, #1a2332 0%, #2d5016 100%);
                    color: #C9A84C;
                    padding: 40px 30px;
                    text-align: center;
                    border-bottom: 3px solid #C9A84C;
                    position: relative;
                }

                .header::before {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-image: url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-18c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23C9A84C\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E");
                    opacity: 0.3;
                    pointer-events: none;
                }

                .header h1 {
                    font-size: 2.5rem;
                    margin-bottom: 10px;
                    font-weight: 700;
                    text-shadow: 0 2px 8px rgba(201, 168, 76, 0.5);
                    color: #C9A84C;
                    letter-spacing: 2px;
                    position: relative;
                    z-index: 1;
                }

                .header p {
                    font-size: 1.2rem;
                    color: #d4c5a9;
                    font-weight: 300;
                    font-style: italic;
                    position: relative;
                    z-index: 1;
                }

                /* Contenido principal */
                .content {
                    padding: 40px 30px;
                    background: #3d2817;
                }

                /* Sección de datos del contacto */
                .contact-info {
                    background: rgba(201, 168, 76, 0.1);
                    padding: 25px;
                    border-radius: 8px;
                    margin: 25px 0;
                    border-left: 4px solid #C9A84C;
                    border: 2px solid rgba(201, 168, 76, 0.3);
                }

                .contact-info h3 {
                    color: #C9A84C;
                    font-size: 1.4rem;
                    margin-bottom: 20px;
                    text-align: center;
                    font-weight: 600;
                    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
                }

                .contact-info p {
                    color: #d4c5a9;
                    margin-bottom: 12px;
                    font-size: 1.1rem;
                    line-height: 1.8;
                }

                .contact-info strong {
                    color: #C9A84C;
                    font-weight: 600;
                }

                /* Sección del mensaje */
                .message-section {
                    background: rgba(26, 35, 50, 0.5);
                    border: 2px solid rgba(201, 168, 76, 0.3);
                    padding: 25px;
                    border-radius: 8px;
                    margin: 25px 0;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                }

                .message-section h3 {
                    color: #C9A84C;
                    font-size: 1.4rem;
                    margin-bottom: 20px;
                    text-align: center;
                    font-weight: 600;
                    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
                }

                .message-section p {
                    line-height: 1.8;
                    color: #d4c5a9;
                    font-size: 1.1rem;
                    white-space: pre-wrap;
                }

                /* Footer */
                .footer {
                    background: linear-gradient(135deg, #1a2332 0%, #2d5016 100%);
                    color: #d4c5a9;
                    text-align: center;
                    padding: 25px 30px;
                    font-size: 14px;
                    border-top: 3px solid #C9A84C;
                }

                .footer p {
                    margin: 8px 0;
                    opacity: 0.9;
                }

                .footer strong {
                    color: #C9A84C;
                    font-weight: 600;
                }

                .footer .tagline {
                    font-style: italic;
                    color: #C9A84C;
                    font-size: 1.1rem;
                    margin-top: 10px;
                }

                /* Responsive */
                @media (max-width: 600px) {
                    body {
                        padding: 10px;
                    }

                    .header {
                        padding: 30px 20px;
                    }

                    .header h1 {
                        font-size: 2rem;
                    }

                    .header p {
                        font-size: 1rem;
                    }

                    .content {
                        padding: 30px 20px;
                    }

                    .contact-info, .message-section {
                        padding: 20px;
                    }

                    .contact-info h3, .message-section h3 {
                        font-size: 1.3rem;
                    }

                    .footer {
                        padding: 20px;
                    }
                }

                @media (max-width: 480px) {
                    .header h1 {
                        font-size: 1.8rem;
                    }

                    .header p {
                        font-size: 0.9rem;
                    }

                    .content {
                        padding: 25px 15px;
                    }

                    .contact-info, .message-section {
                        padding: 15px;
                    }

                    .contact-info p, .message-section p {
                        font-size: 1rem;
                    }
                }
            </style>
        </head>
        <body>
            <div class="container">
                <!-- Header -->
                <div class="header">
                    <h1>YOSEPH PRIETO</h1>
                    <p>Vamos pa\' lante</p>
                </div>
                
                <!-- Contenido principal -->
                <div class="content">
                    <!-- Datos del contacto -->
                    <div class="contact-info">
                        <h3>📋 Datos del contacto</h3>
                        <p><strong>Nombre:</strong> ' . htmlspecialchars($nombreRemitente ?: 'No proporcionado') . '</p>
                        <p><strong>Email:</strong> ' . htmlspecialchars($para) . '</p>
                    </div>
                    
                    <!-- Mensaje -->
                    <div class="message-section">
                        <h3>💬 Mensaje</h3>
                        <p>' . nl2br(htmlspecialchars($mensaje)) . '</p>
                    </div>
                    
                    <!-- Footer -->
                    <div class="footer">
                        <p>Este mensaje fue enviado desde el formulario de contacto de</p>
                        <p><strong>Yoseph Prieto Oficial</strong></p>
                        <p class="tagline">Vamos pa\' lante</p>
                        <p style="margin-top: 15px; font-size: 12px; opacity: 0.7;">Música ranchera, popular y carranga • Otanche, Boyacá</p>
                    </div>
                </div>
            </div>
        </body>
        </html>';
        
        $mail->Body = $htmlMessage;
        $mail->CharSet = 'UTF-8';

        $mail->send();
        return [
            'success' => true,
            'message' => "Correo enviado correctamente a $para",
            'code' => 'EMAIL_SENT',
            'timestamp' => date('Y-m-d H:i:s')
        ];

    } catch (Exception $e) {
        return [
            'success' => false,
            'message' => "Error al enviar correo: " . $mail->ErrorInfo,
            'code' => 'SMTP_ERROR',
            'timestamp' => date('Y-m-d H:i:s')
        ];
    }
}

// Procesar el envío del correo
try {
    $resultado = enviarEmail($destinatario, $asuntotxt, $mensajetxt, $nombre);
    
    // Establecer código de respuesta HTTP apropiado
    http_response_code($resultado['success'] ? 200 : 500);
    
    echo json_encode($resultado);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Error interno del servidor: ' . $e->getMessage(),
        'code' => 'INTERNAL_ERROR',
        'timestamp' => date('Y-m-d H:i:s')
    ]);
}
?>
