export function PrivacyPolicyContent () {
  const currentDate = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className="text-sand font-body text-sm sm:text-base space-y-4">
      <p className="text-gold font-semibold">Última actualización: {currentDate}</p>

      <div className="space-y-4">
        <section>
          <h3 className="text-gold font-display font-semibold text-lg mb-2">1. Información que Recopilamos</h3>
          <p>
            Recopilamos información que usted nos proporciona directamente cuando utiliza nuestro formulario de contacto,
            incluyendo su nombre, dirección de correo electrónico y mensaje.
          </p>
        </section>

        <section>
          <h3 className="text-gold font-display font-semibold text-lg mb-2">2. Uso de la Información</h3>
          <p>
            Utilizamos la información recopilada para:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
            <li>Responder a sus consultas y solicitudes de contacto</li>
            <li>Mejorar nuestros servicios y experiencia del usuario</li>
            <li>Enviar comunicaciones relacionadas con nuestros servicios (solo si ha dado su consentimiento)</li>
          </ul>
        </section>

        <section>
          <h3 className="text-gold font-display font-semibold text-lg mb-2">3. Protección de Datos</h3>
          <p>
            Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger su información personal
            contra acceso no autorizado, alteración, divulgación o destrucción.
          </p>
        </section>

        <section>
          <h3 className="text-gold font-display font-semibold text-lg mb-2">4. Compartir Información</h3>
          <p>
            No vendemos, alquilamos ni compartimos su información personal con terceros, excepto cuando sea necesario
            para cumplir con la ley o proteger nuestros derechos legales.
          </p>
        </section>

        <section>
          <h3 className="text-gold font-display font-semibold text-lg mb-2">5. Sus Derechos</h3>
          <p>
            Usted tiene derecho a acceder, rectificar, eliminar u oponerse al tratamiento de sus datos personales.
            Para ejercer estos derechos, puede contactarnos a través de los medios indicados al final de esta política.
          </p>
        </section>

        <section>
          <h3 className="text-gold font-display font-semibold text-lg mb-2">6. Cookies</h3>
          <p>
            Nuestro sitio web puede utilizar cookies para mejorar su experiencia de navegación. Puede configurar su
            navegador para rechazar cookies, aunque esto puede afectar algunas funcionalidades del sitio.
          </p>
        </section>

        <section>
          <h3 className="text-gold font-display font-semibold text-lg mb-2">7. Cambios a esta Política</h3>
          <p>
            Nos reservamos el derecho de actualizar esta política de privacidad en cualquier momento. Le notificaremos
            cualquier cambio publicando la nueva política en esta página.
          </p>
        </section>

        <section className="pt-4 border-t border-gold/30">
          <h3 className="text-gold font-display font-semibold text-lg mb-2">Contacto</h3>
          <p>
            Si tiene preguntas sobre esta política de privacidad, puede contactarnos en:
          </p>
          <p className="mt-2">
            <strong>Email:</strong>{' '}
            <a href="mailto:oficialyoseph.prieto@gmail.com" className="text-gold hover:underline">
              oficialyoseph.prieto@gmail.com
            </a>
          </p>
        </section>
      </div>
    </div>
  )
}
