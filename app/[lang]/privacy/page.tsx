import type { Metadata } from "next";

interface Props { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return lang === "en"
    ? { title: "Privacy Policy | Pavel Popov", description: "Privacy Policy — how we collect, use and protect your personal data." }
    : { title: "Политика конфиденциальности | Павел Попов", description: "Политика конфиденциальности — как мы собираем, используем и защищаем ваши персональные данные." };
}

export default async function PrivacyPage({ params }: Props) {
  const { lang } = await params;
  const isEn = lang === "en";

  return (
    <>
      {/* Hero */}
      <section className="bg-[#0F172A] pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-sm font-semibold text-blue-400 uppercase tracking-widest">
            {isEn ? "Legal" : "Правовая информация"}
          </span>
          <h1 className="mt-2 text-4xl sm:text-5xl font-bold text-white">
            {isEn ? "Privacy Policy" : "Политика конфиденциальности"}
          </h1>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            {isEn
              ? "Last updated: March 3, 2026"
              : "Последнее обновление: 3 марта 2026 г."}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-[#F8FAFC] py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-slate max-w-none prose-headings:text-[#0F172A] prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-lg prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-3 prose-p:text-[#374151] prose-p:leading-relaxed prose-li:text-[#374151] prose-a:text-[#2563EB] prose-a:no-underline hover:prose-a:underline">

            {isEn ? (
              /* ===================== ENGLISH ===================== */
              <>
                <h2>1. General Provisions</h2>
                <p>
                  This Privacy Policy governs the collection, processing, storage and protection of personal data
                  obtained through the website <strong>beyondcore.pro</strong> (hereinafter — the "Website"),
                  operated by Pavel Popov, individual IT consultant (hereinafter — the "Operator").
                </p>
                <p>
                  This Policy is developed in accordance with the Law of the Republic of Uzbekistan
                  "On Personal Data" (No. ZRU-547, dated July 2, 2019), as well as generally accepted
                  international practices for the protection of personal data.
                </p>
                <p>
                  By using the Website and/or submitting your personal data through the contact form,
                  you confirm that you have read and agree to this Privacy Policy.
                </p>

                <h2>2. Data Controller</h2>
                <p>
                  <strong>Pavel Popov</strong><br />
                  IT, AI &amp; Cybersecurity Transformation Advisor<br />
                  Location: Tashkent, Republic of Uzbekistan<br />
                  Email: <a href="mailto:popov@iofm.ru">popov@iofm.ru</a>
                </p>

                <h2>3. Personal Data We Collect</h2>
                <h3>3.1. Data provided by you</h3>
                <p>When you fill in the contact form on the Website, we may collect:</p>
                <ul>
                  <li>Full name</li>
                  <li>Email address</li>
                  <li>Phone number (if provided)</li>
                  <li>Message text</li>
                </ul>

                <h3>3.2. Automatically collected data</h3>
                <p>When you visit the Website, the following data may be collected automatically:</p>
                <ul>
                  <li>IP address</li>
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>Pages visited and time spent</li>
                  <li>Referral source</li>
                  <li>Device type and screen resolution</li>
                  <li>Cookies and similar identifiers</li>
                </ul>

                <h2>4. Purposes of Data Processing</h2>
                <p>We process your personal data for the following purposes:</p>
                <ul>
                  <li>Responding to your inquiries and requests via the contact form</li>
                  <li>Providing consultations and services you have requested</li>
                  <li>Analyzing website traffic and improving user experience</li>
                  <li>Ensuring website security and preventing fraud</li>
                  <li>Complying with legal obligations under the laws of the Republic of Uzbekistan</li>
                </ul>

                <h2>5. Legal Basis for Processing</h2>
                <p>
                  The legal basis for processing your personal data is your <strong>voluntary consent</strong>,
                  provided when you submit the contact form or continue using the Website.
                  You may withdraw your consent at any time by contacting us
                  at <a href="mailto:popov@iofm.ru">popov@iofm.ru</a>.
                </p>

                <h2>6. Third-Party Services</h2>
                <p>
                  To ensure website functionality and analytics, we use the following third-party services
                  that may process your data:
                </p>
                <ul>
                  <li><strong>Google Analytics</strong> (Google LLC, USA) — website traffic analysis</li>
                  <li><strong>Yandex.Metrica</strong> (Yandex LLC, Russia) — website traffic analysis</li>
                  <li><strong>Vercel Inc.</strong> (USA) — website hosting and delivery</li>
                  <li><strong>Resend</strong> (USA) — email delivery for the contact form</li>
                </ul>
                <p>
                  Each of these services has its own privacy policy. We recommend reviewing them
                  for detailed information on how they handle data.
                </p>

                <h2>7. Cross-Border Data Transfer</h2>
                <p>
                  By using the Website, you acknowledge and consent to the transfer of your personal data
                  to servers located outside the Republic of Uzbekistan, specifically:
                </p>
                <ul>
                  <li><strong>United States</strong> — Vercel (hosting), Google Analytics, Resend</li>
                  <li><strong>Russia</strong> — Yandex.Metrica</li>
                </ul>
                <p>
                  Cross-border transfer is carried out in accordance with Article 29 of the Law
                  "On Personal Data" of the Republic of Uzbekistan, based on your explicit consent.
                </p>

                <h2>8. Cookies</h2>
                <p>
                  The Website uses cookies — small text files stored on your device. Cookies help us
                  analyze traffic and improve the Website.
                </p>
                <h3>Types of cookies used:</h3>
                <ul>
                  <li><strong>Essential cookies</strong> — required for basic website functionality</li>
                  <li><strong>Analytics cookies</strong> — Google Analytics and Yandex.Metrica cookies for traffic analysis</li>
                </ul>
                <p>
                  You can disable cookies in your browser settings. Please note that disabling cookies
                  may affect the functionality of the Website.
                </p>

                <h2>9. Data Retention</h2>
                <p>
                  Personal data submitted via the contact form is processed for the purpose of responding
                  to your inquiry and is not stored in a database on the Website. Data is forwarded
                  to the Operator&apos;s email and retained only as long as necessary to fulfill the stated purpose.
                </p>
                <p>
                  Analytics data is retained in accordance with the data retention policies of Google Analytics
                  and Yandex.Metrica.
                </p>

                <h2>10. Your Rights</h2>
                <p>
                  In accordance with the Law "On Personal Data" of the Republic of Uzbekistan,
                  you have the right to:
                </p>
                <ul>
                  <li>Obtain information about the processing of your personal data</li>
                  <li>Request correction of inaccurate or incomplete data</li>
                  <li>Request deletion of your personal data</li>
                  <li>Withdraw your consent to data processing at any time</li>
                  <li>Be notified within 3 business days if your data is transferred to third parties</li>
                  <li>File a complaint with the authorized body for the protection of personal data rights</li>
                </ul>
                <p>
                  To exercise any of these rights, please contact us
                  at <a href="mailto:popov@iofm.ru">popov@iofm.ru</a>.
                  We will respond to your request within 10 business days.
                </p>

                <h2>11. Data Security</h2>
                <p>
                  We take appropriate organizational and technical measures to protect your personal data
                  from unauthorized access, alteration, disclosure, or destruction, including:
                </p>
                <ul>
                  <li>SSL/TLS encryption for all data transmitted via the Website</li>
                  <li>Access restriction to personal data on a need-to-know basis</li>
                  <li>Use of reputable and secure third-party service providers</li>
                </ul>

                <h2>12. Children&apos;s Privacy</h2>
                <p>
                  The Website is not intended for individuals under 18 years of age.
                  We do not knowingly collect personal data from minors.
                </p>

                <h2>13. Changes to This Policy</h2>
                <p>
                  We reserve the right to update this Privacy Policy at any time. Changes take effect
                  upon publication on this page. We recommend checking this page periodically
                  for updates. The date of the last update is indicated at the top of this page.
                </p>

                <h2>14. Contact Information</h2>
                <p>
                  If you have any questions regarding this Privacy Policy or the processing
                  of your personal data, please contact us:
                </p>
                <ul>
                  <li>Email: <a href="mailto:popov@iofm.ru">popov@iofm.ru</a></li>
                  <li>Telegram: <a href="https://t.me/popov_pa_uz" target="_blank" rel="noopener noreferrer">@popov_pa_uz</a></li>
                </ul>
              </>
            ) : (
              /* ===================== RUSSIAN ===================== */
              <>
                <h2>1. Общие положения</h2>
                <p>
                  Настоящая Политика конфиденциальности определяет порядок сбора, обработки, хранения
                  и защиты персональных данных, получаемых через сайт <strong>beyondcore.pro</strong>
                  (далее — «Сайт»), оператором которого является Павел Попов, индивидуальный IT-консультант
                  (далее — «Оператор»).
                </p>
                <p>
                  Настоящая Политика разработана в соответствии с Законом Республики Узбекистан
                  «О персональных данных» (№ ЗРУ-547 от 02.07.2019), а также общепринятыми международными
                  практиками защиты персональных данных.
                </p>
                <p>
                  Используя Сайт и/или отправляя свои персональные данные через контактную форму,
                  вы подтверждаете, что ознакомлены и согласны с настоящей Политикой конфиденциальности.
                </p>

                <h2>2. Оператор персональных данных</h2>
                <p>
                  <strong>Попов Павел</strong><br />
                  IT, AI &amp; Cybersecurity Transformation Advisor<br />
                  Местоположение: г. Ташкент, Республика Узбекистан<br />
                  Email: <a href="mailto:popov@iofm.ru">popov@iofm.ru</a>
                </p>

                <h2>3. Какие персональные данные мы собираем</h2>
                <h3>3.1. Данные, которые вы предоставляете</h3>
                <p>При заполнении контактной формы на Сайте мы можем собирать:</p>
                <ul>
                  <li>Имя и фамилию</li>
                  <li>Адрес электронной почты</li>
                  <li>Номер телефона (при предоставлении)</li>
                  <li>Текст сообщения</li>
                </ul>

                <h3>3.2. Автоматически собираемые данные</h3>
                <p>При посещении Сайта автоматически могут собираться следующие данные:</p>
                <ul>
                  <li>IP-адрес</li>
                  <li>Тип и версия браузера</li>
                  <li>Операционная система</li>
                  <li>Посещённые страницы и время пребывания</li>
                  <li>Источник перехода</li>
                  <li>Тип устройства и разрешение экрана</li>
                  <li>Файлы cookie и аналогичные идентификаторы</li>
                </ul>

                <h2>4. Цели обработки данных</h2>
                <p>Мы обрабатываем ваши персональные данные в следующих целях:</p>
                <ul>
                  <li>Ответ на ваши обращения и запросы через контактную форму</li>
                  <li>Предоставление запрошенных вами консультаций и услуг</li>
                  <li>Анализ посещаемости сайта и улучшение пользовательского опыта</li>
                  <li>Обеспечение безопасности сайта и предотвращение мошенничества</li>
                  <li>Исполнение требований законодательства Республики Узбекистан</li>
                </ul>

                <h2>5. Правовое основание обработки</h2>
                <p>
                  Правовым основанием для обработки ваших персональных данных является ваше{" "}
                  <strong>добровольное согласие</strong>, предоставляемое при отправке контактной формы
                  или при продолжении использования Сайта. Вы можете отозвать своё согласие в любое время,
                  направив запрос на <a href="mailto:popov@iofm.ru">popov@iofm.ru</a>.
                </p>

                <h2>6. Третьи лица</h2>
                <p>
                  Для обеспечения работы сайта и аналитики мы используем следующие сторонние сервисы,
                  которые могут обрабатывать ваши данные:
                </p>
                <ul>
                  <li><strong>Google Analytics</strong> (Google LLC, США) — анализ посещаемости сайта</li>
                  <li><strong>Яндекс.Метрика</strong> (ООО «Яндекс», Россия) — анализ посещаемости сайта</li>
                  <li><strong>Vercel Inc.</strong> (США) — хостинг и доставка сайта</li>
                  <li><strong>Resend</strong> (США) — доставка электронной почты из контактной формы</li>
                </ul>
                <p>
                  Каждый из этих сервисов имеет собственную политику конфиденциальности.
                  Рекомендуем ознакомиться с ними для получения подробной информации.
                </p>

                <h2>7. Трансграничная передача данных</h2>
                <p>
                  Используя Сайт, вы подтверждаете своё согласие на передачу ваших персональных данных
                  на серверы, расположенные за пределами Республики Узбекистан, а именно:
                </p>
                <ul>
                  <li><strong>США</strong> — Vercel (хостинг), Google Analytics, Resend</li>
                  <li><strong>Россия</strong> — Яндекс.Метрика</li>
                </ul>
                <p>
                  Трансграничная передача осуществляется в соответствии со статьёй 29 Закона
                  «О персональных данных» Республики Узбекистан на основании вашего явного согласия.
                </p>

                <h2>8. Файлы cookie</h2>
                <p>
                  Сайт использует cookie-файлы — небольшие текстовые файлы, сохраняемые на вашем устройстве.
                  Cookie помогают нам анализировать трафик и улучшать работу Сайта.
                </p>
                <h3>Типы используемых cookie:</h3>
                <ul>
                  <li><strong>Необходимые cookie</strong> — требуются для базового функционирования сайта</li>
                  <li><strong>Аналитические cookie</strong> — cookie Google Analytics и Яндекс.Метрики для анализа посещаемости</li>
                </ul>
                <p>
                  Вы можете отключить cookie в настройках вашего браузера. Обратите внимание,
                  что отключение cookie может повлиять на работу Сайта.
                </p>

                <h2>9. Сроки хранения данных</h2>
                <p>
                  Персональные данные, отправленные через контактную форму, обрабатываются с целью
                  ответа на ваше обращение и не хранятся в базе данных Сайта. Данные пересылаются
                  на электронную почту Оператора и хранятся только до достижения заявленной цели обработки.
                </p>
                <p>
                  Аналитические данные хранятся в соответствии с политиками хранения данных
                  Google Analytics и Яндекс.Метрики.
                </p>

                <h2>10. Ваши права</h2>
                <p>
                  В соответствии с Законом «О персональных данных» Республики Узбекистан
                  вы имеете право:
                </p>
                <ul>
                  <li>Получить информацию об обработке ваших персональных данных</li>
                  <li>Требовать исправления неточных или неполных данных</li>
                  <li>Требовать удаления ваших персональных данных</li>
                  <li>Отозвать своё согласие на обработку данных в любое время</li>
                  <li>Быть уведомлённым в течение 3 рабочих дней о передаче данных третьим лицам</li>
                  <li>Обратиться с жалобой в уполномоченный орган по защите прав субъектов персональных данных</li>
                </ul>
                <p>
                  Для реализации любого из указанных прав направьте запрос
                  на <a href="mailto:popov@iofm.ru">popov@iofm.ru</a>.
                  Мы ответим на ваш запрос в течение 10 рабочих дней.
                </p>

                <h2>11. Меры безопасности</h2>
                <p>
                  Мы принимаем соответствующие организационные и технические меры для защиты ваших
                  персональных данных от несанкционированного доступа, изменения, раскрытия
                  или уничтожения, включая:
                </p>
                <ul>
                  <li>SSL/TLS-шифрование всех данных, передаваемых через Сайт</li>
                  <li>Ограничение доступа к персональным данным на основе принципа необходимости</li>
                  <li>Использование проверенных и надёжных сторонних сервис-провайдеров</li>
                </ul>

                <h2>12. Конфиденциальность несовершеннолетних</h2>
                <p>
                  Сайт не предназначен для лиц младше 18 лет.
                  Мы сознательно не собираем персональные данные несовершеннолетних.
                </p>

                <h2>13. Изменения в Политике</h2>
                <p>
                  Мы оставляем за собой право обновлять настоящую Политику конфиденциальности
                  в любое время. Изменения вступают в силу с момента публикации на данной странице.
                  Рекомендуем периодически проверять эту страницу на предмет обновлений.
                  Дата последнего обновления указана в начале данной страницы.
                </p>

                <h2>14. Контактная информация</h2>
                <p>
                  Если у вас есть вопросы относительно настоящей Политики конфиденциальности
                  или обработки ваших персональных данных, свяжитесь с нами:
                </p>
                <ul>
                  <li>Email: <a href="mailto:popov@iofm.ru">popov@iofm.ru</a></li>
                  <li>Telegram: <a href="https://t.me/popov_pa_uz" target="_blank" rel="noopener noreferrer">@popov_pa_uz</a></li>
                </ul>
              </>
            )}

          </div>
        </div>
      </section>
    </>
  );
}
