export function TermsOfServiceContent () {
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
          <h3 className="text-gold font-display font-semibold text-lg mb-2">1. Aceptación de los Términos</h3>
          <p>
            Al acceder y utilizar este sitio web, usted acepta cumplir con estos términos y condiciones de servicio.
            Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestro sitio web.
          </p>
        </section>

        <section>
          <h3 className="text-gold font-display font-semibold text-lg mb-2">2. Uso del Sitio Web</h3>
          <p>
            Usted se compromete a utilizar este sitio web únicamente para fines legales y de manera que no infrinja
            los derechos de terceros ni restrinja o inhiba el uso y disfrute del sitio web por parte de otros usuarios.
          </p>
        </section>

        <section>
          <h3 className="text-gold font-display font-semibold text-lg mb-2">3. Propiedad Intelectual</h3>
          <p>
            Todo el contenido de este sitio web, incluyendo pero no limitado a textos, gráficos, logotipos, iconos,
            imágenes, clips de audio y software, es propiedad de Yoseph Prieto o de sus proveedores de contenido y
            está protegido por las leyes de propiedad intelectual.
          </p>
        </section>

        <section>
          <h3 className="text-gold font-display font-semibold text-lg mb-2">4. Limitación de Responsabilidad</h3>
          <p>
            Yoseph Prieto no será responsable de ningún daño directo, indirecto, incidental, especial o consecuente
            que resulte del uso o la imposibilidad de usar este sitio web, incluso si se ha advertido de la posibilidad
            de tales daños.
          </p>
        </section>

        <section>
          <h3 className="text-gold font-display font-semibold text-lg mb-2">5. Enlaces a Terceros</h3>
          <p>
            Este sitio web puede contener enlaces a sitios web de terceros. No tenemos control sobre el contenido de
            estos sitios y no asumimos responsabilidad por ellos. La inclusión de cualquier enlace no implica nuestra
            aprobación del sitio web vinculado.
          </p>
        </section>

        <section>
          <h3 className="text-gold font-display font-semibold text-lg mb-2">6. Modificaciones</h3>
          <p>
            Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor
            inmediatamente después de su publicación en el sitio web. Es su responsabilidad revisar periódicamente
            estos términos.
          </p>
        </section>

        <section>
          <h3 className="text-gold font-display font-semibold text-lg mb-2">7. Ley Aplicable</h3>
          <p>
            Estos términos se regirán e interpretarán de acuerdo con las leyes de Colombia, sin tener en cuenta sus
            disposiciones sobre conflictos de leyes.
          </p>
        </section>

        <section className="pt-4 border-t border-gold/30">
          <h3 className="text-gold font-display font-semibold text-lg mb-2">Contacto</h3>
          <p>
            Si tiene preguntas sobre estos términos de servicio, puede contactarnos en:
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
