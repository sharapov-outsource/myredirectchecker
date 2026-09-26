/* myredirectchecker — the words that are this service's own.
 *
 * The shared vocabulary lives in the service kit and is translated into all
 * twelve languages there. A language block missing here falls back to English;
 * `npm run check:i18n` reports which, and fails on one that is half-finished. */
'use strict';

var OWN = {};

OWN.en = {
  title: 'Redirect Check — every hop a link takes before it arrives',
  title_short: 'Redirect Check',
  h1: 'Redirect Check',
  subtitle: 'Every hop a link takes before it arrives: the status, where it points, who answered, how long it took, the certificate and the cookies — meta refresh and script redirects included',
  ph_url: 'example.com/some/page',
  hero_label: 'Link being checked',
  hero_count: 'redirects',
  empty_hint: 'Paste a link — a short one, an ad link with all its tracking parameters, an old address after a move. The check follows it one hop at a time, the way a browser would, and shows every step: the status, where it pointed, who answered, how long it took, the certificate and the cookies. A meta refresh or a script redirect counts as a hop too.',
  label_client: 'Ask as',
  label_cookies: 'Keep cookies',
  btn_copy_chain: 'Copy as text',

  /* ---- stages ---- */
  stage_follow: 'following the link',
  stage_analyse: 'reading the journey',
  progress_hops: 'hops so far: {n}',

  /* ---- cards ---- */
  card_journey: 'The journey',
  card_summary: 'Where it ends up',
  card_client: 'Who asked',
  note_journey: 'Every hop is a fresh connection, so its times are what a first visit costs; a browser reuses the connection for hops on the same host. Highlighted is the part of the address the hop changed.',

  k_destination: 'Ends at',
  k_outcome: 'Outcome',
  k_redirects: 'Redirects',
  k_time_total: 'Time, all requests',
  k_time_redirects: 'Of which redirects',
  k_hosts: 'Hosts on the way',
  k_client: 'Client',
  k_user_agent: 'User-Agent',
  k_language: 'Accept-Language',
  k_cookies: 'Cookies',

  v_no_redirects: 'none — the link goes straight there',
  v_requests: 'requests: {n}',
  v_not_sent: 'not sent',
  v_cookies_kept: 'kept between hops, as a browser does',
  v_cookies_forgotten: 'forgotten between hops, as a crawler does',
  v_cookies_off: 'no cookies',
  v_session: 'session',
  v_deleted: 'deleted',
  v_truncated: 'cut short',
  v_ports: 'Ports this service connects to: {list}.',
  note_client: 'The check asks in the interface language, the way your own browser would, so a site that redirects by language is seen doing it. It also asks from one place, so a redirect by country shows the answer for that place.',
  note_crawler: 'A crawler is imitated by its User-Agent alone. A site that verifies crawlers by reverse DNS sees this server rather than Google or Yandex, and may treat the request as an impostor.',
  empty_flags: 'Nothing to report.',
  at_steps: 'step {n}',
  incomplete_chain: 'The chain was followed as far as this service goes, and stops short of its end:',

  /* ---- a hop ---- */
  hop_details: 'Details',
  hop_final: 'destination',
  hop_failed: 'no answer',
  hop_stopped: 'not followed',
  hop_timing: 'Where the time went',
  hop_location: 'Location, as sent',
  hop_address: 'Address',
  hop_http: 'Protocol',
  hop_server: 'Server',
  hop_through: 'Answered through',
  hop_tls: 'TLS',
  hop_cert: 'Certificate',
  hop_cert_ok: 'trusted',
  hop_cert_bad: 'not trusted — a browser stops here with a warning',
  hop_cert_for: 'Issued for',
  hop_cert_issuer: 'Issued by',
  hop_cert_until: 'Valid until',
  hop_cookies_sent: 'Cookies sent',
  hop_cookies_set: 'Cookies set',
  hop_sets_cookies: 'cookies set: {n}',
  hop_headers: 'Response headers',
  hop_page: 'The page',
  hop_title: 'Title',
  hop_canonical: 'Canonical',
  hop_robots: 'Robots',
  hop_refresh: 'Refresh',
  hop_refresh_slow: 'to {url} after {s} s — too slow to count as a redirect',
  hop_noscript: 'Refresh without script',
  hop_scripts: 'Script redirects in the source',
  hop_body: 'Read',
  hop_relative: 'relative',
  hop_fragment: 'fragment carried over',
  hop_multiple: 'several Location headers',
  hop_not_followed: 'not followed',
  hop_loop: 'back to step {n}',
  note_cookie_values: 'Values are not shown: a cookie set during a redirect is often a session.',
  th_name: 'Name',
  th_scope: 'Domain and path',
  th_flags: 'Attributes',
  th_expires: 'Expires',
  unit_ms: 'ms',
  unit_s: 's',
  unit_kb: 'KB',

  t_dns: 'DNS',
  t_connect: 'connect',
  t_tls: 'TLS',
  t_wait: 'server',

  /* ---- how a hop moves on ---- */
  rt_http: 'HTTP redirect',
  rt_refresh_header: 'Refresh header',
  rt_meta_refresh: 'meta refresh',
  rt_javascript: 'script, found in the source',

  sc_301: 'permanent; a browser may turn POST into GET',
  sc_302: 'temporary; a browser may turn POST into GET',
  sc_303: 'see other; always followed with GET',
  sc_307: 'temporary; method and body kept',
  sc_308: 'permanent; method and body kept',

  /* ---- outcomes ---- */
  out_arrived: 'arrives',
  out_client_error: 'ends on an error page',
  out_server_error: 'ends on a server error',
  out_loop: 'goes round in a loop',
  out_too_many_redirects: 'more redirects than a browser follows',
  out_failed: 'breaks: a hop did not answer',
  out_refused: 'stops at an address this service does not follow',
  out_broken_redirect: 'breaks on a Location that is not an address',
  out_unsafe_redirect: 'ends on a redirect browsers refuse',
  out_left_web: 'hands over to an app',
  out_incomplete: 'cut short by the time limit',

  /* ---- clients ---- */
  ua_chrome: 'Chrome, desktop',
  ua_iphone: 'Safari, iPhone',
  ua_android: 'Chrome, Android',
  ua_googlebot: 'Googlebot',
  ua_yandexbot: 'YandexBot',
  ua_bingbot: 'Bingbot',
  ua_curl: 'curl',

  /* ---- cookies a browser refuses ---- */
  ck_too_large: 'refused: over 4 KB',
  ck_empty: 'refused: empty',
  ck_domain_mismatch: 'refused: a Domain the host does not belong to',
  ck_public_suffix: 'refused: the Domain is a top-level domain',
  ck_secure_over_http: 'refused: Secure set over http',
  ck_prefix_secure: 'refused: __Secure- without Secure over https',
  ck_prefix_host: 'refused: __Host- needs Secure, Path=/ and no Domain',
  ck_samesite_none_insecure: 'refused: SameSite=None without Secure',

  /* ---- what could not be established ---- */
  inc_deadline: 'the time limit ran out before the chain ended',
  inc_port_not_followed: 'a hop points at a port this service does not connect to',
  inc_credentials_not_followed: 'a hop carries a user name and password in the address',
  inc_url_too_long: 'a hop points at an address longer than this service follows',

  /* ---- errors ---- */
  err_invalid_host: 'That does not look like a web address.',
  err_url_too_long: 'That address is longer than this service follows.',
  err_scheme_not_supported: 'Only http and https addresses can be checked.',
  err_credentials_not_allowed: 'Take the user name and password out of the address: this service does not send them anywhere.',
  err_unknown_client: 'Unknown client. Use one of: chrome, iphone, android, googlebot, yandexbot, bingbot, curl.',
  err_connection_refused: 'The server refused the connection.',
  err_connection_reset: 'The connection was dropped.',
  err_connection_failed: 'The connection failed.',
  err_malformed_response: 'The answer was not valid HTTP.',
  err_tls_failed: 'The TLS handshake failed.',
  err_deadline: 'The time limit ran out before this hop.',

  /* ---- findings ---- */
  flag_redirect_loop: 'The chain goes round in a loop',
  fd_redirect_loop: 'A hop sends the request back to an address the chain has already visited, with the same cookies, so the answer can only repeat. Browsers give up with "too many redirects"; crawlers drop the link.',

  flag_redirect_loop_without_cookies: 'A loop for clients without cookies',
  fd_redirect_loop_without_cookies: 'Without cookies the chain comes back to where it started. A browser that keeps the cookie the site sets may get through — but crawlers keep no cookies, so this is the loop they see.',

  flag_too_many_redirects: 'More redirects than a browser follows',
  fd_too_many_redirects: 'Chrome and Firefox stop after twenty redirects and show an error. This chain was still going.',

  flag_beyond_googlebot_limit: 'Longer than Googlebot follows',
  fd_beyond_googlebot_limit: 'Googlebot follows up to ten redirects in a row. Past that the page is not crawled from this link, and Search Console reports a redirect error.',

  flag_long_chain: 'A long chain',
  fd_long_chain: 'Three redirects or more before the page. Each one is another round trip before anything starts loading, and search engines prefer one hop straight to the final address.',

  flag_could_be_one_redirect: 'Hops that could be one',
  fd_could_be_one_redirect: 'Several redirects within one site, each tidying its own part of the address. Sending the visitor straight to the final address saves the round trips. The first hop from http to https on the same host is not counted: that one is the right first step.',

  flag_slow_redirects: 'The redirects are slow',
  fd_slow_redirects: 'The redirects alone took more than a second, before the page itself started loading.',

  flag_connection_failed: 'A hop did not answer',
  fd_connection_failed: 'The chain breaks here: the next address did not resolve, refused the connection or did not answer in time. Visitors see an error page.',

  flag_redirect_to_private_network: 'Points into a private network',
  fd_redirect_to_private_network: 'A hop sends the visitor to an address inside a private network, or to a name that exists only inside one. Nobody on the internet can follow it, and the redirect itself says something about the internal layout. This service does not follow it either.',

  flag_location_malformed: 'A Location that cannot be parsed',
  fd_location_malformed: 'The redirect points at something that is not an address. Browsers show an error.',

  flag_multiple_location_headers: 'Two different Location headers',
  fd_multiple_location_headers: 'The response carries more than one Location, and they disagree. Chrome refuses such a redirect outright; other clients pick one of them. The first one was followed here.',

  flag_redirect_without_location: 'A redirect status with nowhere to go',
  fd_redirect_without_location: 'The status says redirect, but there is no Location header. Browsers show whatever body came with it, which is usually nothing.',

  flag_location_unencoded: 'A Location with raw characters',
  fd_location_unencoded: 'The Location header carries spaces or non-ASCII characters without percent-encoding. Browsers repair it; other clients, proxies and libraries may not.',

  flag_unsafe_redirect_target: 'A redirect to a scheme browsers refuse',
  fd_unsafe_redirect_target: 'The chain points at a javascript:, data: or file: address. Browsers refuse to follow a redirect there.',

  flag_leaves_the_web: 'Hands over to an app',
  fd_leaves_the_web: 'The chain ends on an address that is not a web page — tg://, mailto:, intent:, an app store link. A browser offers to open the app; what happens next is no longer a web question.',

  flag_ends_in_client_error: 'Ends on an error page',
  fd_ends_in_client_error: 'The final page answers with a 4xx status — not found, gone, forbidden. The link leads nowhere.',

  flag_ends_in_server_error: 'Ends on a server error',
  fd_ends_in_server_error: 'The final page answers with a 5xx status. It may be temporary; while it lasts, the link is broken.',

  flag_redirect_status_not_followed: 'A 3xx status browsers do not follow',
  fd_redirect_status_not_followed: '300, 304, 305 and 306 are 3xx statuses but not redirects to a browser: whatever Location they carry is ignored.',

  flag_bot_challenge: 'A bot check answered instead of the site',
  fd_bot_challenge: 'A protection service answered with a challenge meant for automated clients. A browser that passes it may be sent somewhere else; what follows is what a script sees.',

  flag_https_downgrade: 'From https back to http',
  fd_https_downgrade: 'A hop goes from an encrypted address to a plain one. From there the request, and every cookie not marked Secure, crosses the network in the clear, and browsers stop sending the Referer.',

  flag_late_https_upgrade: 'The upgrade to https comes late',
  fd_late_https_upgrade: 'The chain does reach https, but only after another hop over plain http. That hop crosses the network unencrypted, with the visitor\'s cookies attached. Redirect to https on the same host first, then anywhere else.',

  flag_upgrade_changes_host: 'The https upgrade also changes the host',
  fd_upgrade_changes_host: 'The first https hop goes to a different name. It works, but HSTS for the name the visitor typed is never received, and preloading that name needs the upgrade to happen on it first.',

  flag_ends_on_http: 'Ends on plain http',
  fd_ends_on_http: 'The final page is served without encryption.',

  flag_certificate_invalid: 'A certificate a browser would reject',
  fd_certificate_invalid: 'An https hop presents a certificate that has expired, names another host or is not issued by a trusted authority. A browser stops here at a warning page; the chain beyond it was followed anyway, to show where it leads.',

  flag_temporary_canonicalization: 'A temporary redirect where a permanent one is meant',
  fd_temporary_canonicalization: 'The hop only tidies the address — the scheme, a www, a trailing slash — and calls itself temporary. Browsers will not remember it and search engines keep both addresses. 301 or 308 is the status for this.',

  flag_permanent_redirect_cached: 'A permanent redirect with no expiry',
  fd_permanent_redirect_cached: 'A 301 or 308 without Cache-Control or Expires is kept by browsers for as long as they like. If it ever turns out wrong, everyone who has seen it keeps going to the old target. A max-age makes a mistake recoverable.',

  flag_meta_refresh: 'A meta refresh',
  fd_meta_refresh: 'The page sends visitors on with <meta http-equiv="refresh">. Browsers follow it, but only once the page has loaded, and search engines treat a delayed one as a temporary redirect.',

  flag_refresh_header: 'A Refresh header',
  fd_refresh_header: 'The response sends visitors on with a Refresh header. Browsers honour it, but it was never standardised as HTTP, and many other clients ignore it.',

  flag_javascript_redirect: 'A script redirect',
  fd_javascript_redirect: 'The page is empty but for a script that changes the location. Clients that run no script — most link previews, many crawlers, curl — stay on the empty page. Found in the source: this service does not run scripts.',

  flag_script_redirect_not_followed: 'A script may send visitors on',
  fd_script_redirect_not_followed: 'The final page changes the location somewhere in its scripts. That may sit behind a condition, so it was not followed; a browser may still go there.',

  flag_redirect_sets_cookies: 'Cookies set during redirects',
  fd_redirect_sets_cookies: 'Hops before the final page set cookies. Usual for tracking and for consent or login flows; worth knowing when the link is shared.',

  flag_cookie_rejected: 'A cookie a browser would refuse',
  fd_cookie_rejected: 'A Set-Cookie breaks a rule browsers enforce: a Domain the host does not belong to, Secure over http, a __Host- or __Secure- prefix without its conditions, SameSite=None without Secure. The browser drops it, and a login or consent flow that depends on it silently fails.',

  flag_query_lost: 'Query parameters lost on the way',
  fd_query_lost: 'Parameters the link started with are missing from the final address. Tracking parameters such as utm_source are the usual casualty: the visit gets counted as direct.',

  flag_path_lost: 'Ends on the home page',
  fd_path_lost: 'The link pointed at a particular page and the chain ends on the root of the site. Typical after a move that redirects everything to the home page: visitors and search engines both lose the page they were after.',

  flag_lands_on_another_site: 'Ends on another site',
  fd_lands_on_another_site: 'The link starts on one site and ends on another. Expected for short links and ad links; worth a look when it is not one of those.',

  flag_canonical_elsewhere: 'The final page names another canonical address',
  fd_canonical_elsewhere: 'The page the chain ends on gives its canonical address as somewhere else. Search engines may index that one instead, so it is the better one to link to.',

  flag_final_noindex: 'The final page is kept out of the index',
  fd_final_noindex: 'The page the chain ends on asks search engines not to index it, in a robots meta tag or an X-Robots-Tag header.',
};

OWN.ru = {
  title: 'Проверка редиректов — каждый шаг ссылки до места назначения',
  title_short: 'Проверка редиректов',
  h1: 'Проверка редиректов',
  subtitle: 'Каждый шаг ссылки до места назначения: код ответа, куда ведёт, кто ответил, сколько занял, сертификат и куки — вместе с meta refresh и редиректами из скриптов',
  ph_url: 'example.com/page',
  hero_label: 'Проверяемая ссылка',
  hero_count: 'редиректы',
  empty_hint: 'Вставьте ссылку — короткую, рекламную со всеми метками, старый адрес после переезда. Проверка пройдёт по ней шаг за шагом, как прошёл бы браузер, и покажет каждый переход: код ответа, куда он вёл, кто ответил, сколько занял, сертификат и куки. Meta refresh и редирект из скрипта тоже считаются шагами.',
  label_client: 'Спросить как',
  label_cookies: 'Хранить куки',
  btn_copy_chain: 'Скопировать текстом',

  /* ---- этапы ---- */
  stage_follow: 'идём по ссылке',
  stage_analyse: 'разбираем путь',
  progress_hops: 'шагов пройдено: {n}',

  /* ---- карточки ---- */
  card_journey: 'Путь',
  card_summary: 'Чем заканчивается',
  card_client: 'Кто спрашивал',
  note_journey: 'Каждый шаг — новое соединение, поэтому его время — это цена первого визита; браузер для шагов на одном хосте переиспользует соединение. Подсвечена та часть адреса, которую шаг поменял.',

  k_destination: 'Приводит на',
  k_outcome: 'Итог',
  k_redirects: 'Редиректы',
  k_time_total: 'Время, все запросы',
  k_time_redirects: 'Из них редиректы',
  k_hosts: 'Хосты по пути',
  k_client: 'Клиент',
  k_user_agent: 'User-Agent',
  k_language: 'Accept-Language',
  k_cookies: 'Куки',

  v_no_redirects: 'нет — ссылка ведёт сразу на место',
  v_requests: 'запросов: {n}',
  v_not_sent: 'не отправлялся',
  v_cookies_kept: 'хранятся между шагами, как в браузере',
  v_cookies_forgotten: 'забываются между шагами, как у поискового робота',
  v_cookies_off: 'без кук',
  v_session: 'до конца сессии',
  v_deleted: 'удалена',
  v_truncated: 'прочитано не целиком',
  v_ports: 'Порты, к которым подключается сервис: {list}.',
  note_client: 'Проверка спрашивает на языке интерфейса — так же, как ваш браузер, поэтому сайт, который перенаправляет по языку, будет пойман на этом. И спрашивает из одного места, так что редирект по стране покажет ответ для этого места.',
  note_crawler: 'Робот изображается одной только строкой User-Agent. Сайт, который проверяет роботов по обратному DNS, увидит этот сервер, а не Google или Яндекс, и может принять запрос за подделку.',
  empty_flags: 'Сообщить не о чем.',
  at_steps: 'шаг {n}',
  incomplete_chain: 'Цепочка пройдена настолько, насколько ходит этот сервис, и обрывается раньше конца:',

  /* ---- шаг ---- */
  hop_details: 'Подробности',
  hop_final: 'место назначения',
  hop_failed: 'нет ответа',
  hop_stopped: 'не пройден',
  hop_timing: 'На что ушло время',
  hop_location: 'Location, как прислан',
  hop_address: 'Адрес',
  hop_http: 'Протокол',
  hop_server: 'Сервер',
  hop_through: 'Ответ пришёл через',
  hop_tls: 'TLS',
  hop_cert: 'Сертификат',
  hop_cert_ok: 'доверенный',
  hop_cert_bad: 'не доверенный — браузер остановится здесь с предупреждением',
  hop_cert_for: 'Выдан для',
  hop_cert_issuer: 'Кем выдан',
  hop_cert_until: 'Действует до',
  hop_cookies_sent: 'Отправлены куки',
  hop_cookies_set: 'Установлены куки',
  hop_sets_cookies: 'ставит куки: {n}',
  hop_headers: 'Заголовки ответа',
  hop_page: 'Страница',
  hop_title: 'Заголовок',
  hop_canonical: 'Канонический адрес',
  hop_robots: 'Robots',
  hop_refresh: 'Refresh',
  hop_refresh_slow: 'на {url} через {s} с — слишком долго, чтобы считать это редиректом',
  hop_noscript: 'Refresh без скриптов',
  hop_scripts: 'Редиректы в коде скриптов',
  hop_body: 'Прочитано',
  hop_relative: 'относительный',
  hop_fragment: 'фрагмент унаследован',
  hop_multiple: 'несколько заголовков Location',
  hop_not_followed: 'не пройден',
  hop_loop: 'обратно на шаг {n}',
  note_cookie_values: 'Значения не показываются: кука, поставленная на редиректе, — часто сессия.',
  th_name: 'Имя',
  th_scope: 'Домен и путь',
  th_flags: 'Атрибуты',
  th_expires: 'Истекает',
  unit_ms: 'мс',
  unit_s: 'с',
  unit_kb: 'КБ',

  t_dns: 'DNS',
  t_connect: 'соединение',
  t_tls: 'TLS',
  t_wait: 'сервер',

  /* ---- как шаг идёт дальше ---- */
  rt_http: 'HTTP-редирект',
  rt_refresh_header: 'заголовок Refresh',
  rt_meta_refresh: 'meta refresh',
  rt_javascript: 'скрипт, найден в коде',

  sc_301: 'постоянный; браузер может сменить POST на GET',
  sc_302: 'временный; браузер может сменить POST на GET',
  sc_303: 'смотри другой; всегда повторяется через GET',
  sc_307: 'временный; метод и тело сохраняются',
  sc_308: 'постоянный; метод и тело сохраняются',

  /* ---- итоги ---- */
  out_arrived: 'доходит',
  out_client_error: 'заканчивается страницей ошибки',
  out_server_error: 'заканчивается ошибкой сервера',
  out_loop: 'ходит по кругу',
  out_too_many_redirects: 'редиректов больше, чем проходит браузер',
  out_failed: 'обрывается: шаг не ответил',
  out_refused: 'останавливается на адресе, куда сервис не ходит',
  out_broken_redirect: 'обрывается на Location, который не является адресом',
  out_unsafe_redirect: 'заканчивается редиректом, который браузеры отвергают',
  out_left_web: 'передаёт ссылку приложению',
  out_incomplete: 'прервана по лимиту времени',

  /* ---- клиенты ---- */
  ua_chrome: 'Chrome, компьютер',
  ua_iphone: 'Safari, iPhone',
  ua_android: 'Chrome, Android',
  ua_googlebot: 'Googlebot',
  ua_yandexbot: 'YandexBot',
  ua_bingbot: 'Bingbot',
  ua_curl: 'curl',

  /* ---- куки, которые браузер отвергает ---- */
  ck_too_large: 'отвергнута: больше 4 КБ',
  ck_empty: 'отвергнута: пустая',
  ck_domain_mismatch: 'отвергнута: Domain, к которому хост не относится',
  ck_public_suffix: 'отвергнута: Domain — домен верхнего уровня',
  ck_secure_over_http: 'отвергнута: Secure по http',
  ck_prefix_secure: 'отвергнута: __Secure- без Secure по https',
  ck_prefix_host: 'отвергнута: __Host- требует Secure, Path=/ и отсутствия Domain',
  ck_samesite_none_insecure: 'отвергнута: SameSite=None без Secure',

  /* ---- чего не удалось установить ---- */
  inc_deadline: 'лимит времени кончился раньше, чем цепочка',
  inc_port_not_followed: 'шаг ведёт на порт, к которому сервис не подключается',
  inc_credentials_not_followed: 'в адресе шага есть имя пользователя и пароль',
  inc_url_too_long: 'шаг ведёт на адрес длиннее, чем проходит сервис',

  /* ---- ошибки ---- */
  err_invalid_host: 'Это не похоже на веб-адрес.',
  err_url_too_long: 'Адрес длиннее, чем проходит этот сервис.',
  err_scheme_not_supported: 'Проверяются только адреса http и https.',
  err_credentials_not_allowed: 'Уберите из адреса имя пользователя и пароль: этот сервис их никуда не отправляет.',
  err_unknown_client: 'Неизвестный клиент. Допустимые: chrome, iphone, android, googlebot, yandexbot, bingbot, curl.',
  err_connection_refused: 'Сервер отказал в соединении.',
  err_connection_reset: 'Соединение оборвалось.',
  err_connection_failed: 'Соединиться не удалось.',
  err_malformed_response: 'Ответ — не корректный HTTP.',
  err_tls_failed: 'Рукопожатие TLS не удалось.',
  err_deadline: 'Лимит времени кончился до этого шага.',

  /* ---- находки ---- */
  flag_redirect_loop: 'Цепочка ходит по кругу',
  fd_redirect_loop: 'Шаг отправляет запрос на адрес, где цепочка уже побывала, с теми же куками, — ответ может только повториться. Браузер сдаётся с ошибкой «слишком много перенаправлений», поисковые роботы бросают ссылку.',

  flag_redirect_loop_without_cookies: 'Петля для клиентов без кук',
  fd_redirect_loop_without_cookies: 'Без кук цепочка возвращается туда, откуда начала. Браузер, который сохранит куку сайта, может пройти дальше, — но поисковые роботы куки не хранят, и для них это петля.',

  flag_too_many_redirects: 'Редиректов больше, чем проходит браузер',
  fd_too_many_redirects: 'Chrome и Firefox останавливаются после двадцати редиректов и показывают ошибку. А эта цепочка всё ещё продолжалась.',

  flag_beyond_googlebot_limit: 'Длиннее, чем проходит Googlebot',
  fd_beyond_googlebot_limit: 'Googlebot проходит не больше десяти редиректов подряд. Дальше страница по этой ссылке не сканируется, а Search Console сообщает об ошибке переадресации.',

  flag_long_chain: 'Длинная цепочка',
  fd_long_chain: 'До страницы три редиректа или больше. Каждый — лишний круг до сервера, прежде чем что-то начнёт грузиться, а поисковики предпочитают один шаг сразу на конечный адрес.',

  flag_could_be_one_redirect: 'Шаги, которые можно склеить',
  fd_could_be_one_redirect: 'Несколько редиректов в пределах одного сайта, и каждый правит свою часть адреса. Если сразу отправлять на конечный адрес, эти круги до сервера не понадобятся. Первый переход с http на https на том же хосте не считается: это правильный первый шаг.',

  flag_slow_redirects: 'Редиректы медленные',
  fd_slow_redirects: 'Одни только редиректы заняли больше секунды — ещё до того, как начала грузиться сама страница.',

  flag_connection_failed: 'Шаг не ответил',
  fd_connection_failed: 'Здесь цепочка обрывается: следующий адрес не разрешился, отказал в соединении или не ответил вовремя. Посетитель видит страницу ошибки.',

  flag_redirect_to_private_network: 'Ведёт во внутреннюю сеть',
  fd_redirect_to_private_network: 'Шаг отправляет посетителя на адрес внутри частной сети или на имя, которое существует только в ней. Из интернета по нему никто не пройдёт, а сам редирект кое-что рассказывает о внутреннем устройстве. Этот сервис по нему тоже не ходит.',

  flag_location_malformed: 'Location, который не разобрать',
  fd_location_malformed: 'Редирект указывает на то, что не является адресом. Браузер показывает ошибку.',

  flag_multiple_location_headers: 'Два разных заголовка Location',
  fd_multiple_location_headers: 'В ответе больше одного Location, и они не совпадают. Chrome такой редирект отвергает целиком, другие клиенты выбирают один из них. Здесь пройден первый.',

  flag_redirect_without_location: 'Код редиректа без адреса',
  fd_redirect_without_location: 'Статус говорит «перенаправление», но заголовка Location нет. Браузер покажет тело ответа, а оно обычно пустое.',

  flag_location_unencoded: 'Location с неэкранированными символами',
  fd_location_unencoded: 'В заголовке Location есть пробелы или символы вне ASCII без процентного кодирования. Браузеры это исправляют, а другие клиенты, прокси и библиотеки — не обязательно.',

  flag_unsafe_redirect_target: 'Редирект на схему, которую браузеры отвергают',
  fd_unsafe_redirect_target: 'Цепочка указывает на адрес javascript:, data: или file:. Браузеры отказываются идти туда по редиректу.',

  flag_leaves_the_web: 'Передаёт ссылку приложению',
  fd_leaves_the_web: 'Цепочка заканчивается адресом, который не является веб-страницей: tg://, mailto:, intent:, ссылкой в магазин приложений. Браузер предложит открыть приложение; что будет дальше — уже не вопрос веба.',

  flag_ends_in_client_error: 'Заканчивается страницей ошибки',
  fd_ends_in_client_error: 'Конечная страница отвечает кодом 4xx: не найдена, удалена, доступ запрещён. Ссылка никуда не ведёт.',

  flag_ends_in_server_error: 'Заканчивается ошибкой сервера',
  fd_ends_in_server_error: 'Конечная страница отвечает кодом 5xx. Возможно, это временно, но пока это длится, ссылка сломана.',

  flag_redirect_status_not_followed: 'Код 3xx, по которому браузер не идёт',
  fd_redirect_status_not_followed: '300, 304, 305 и 306 — коды из класса 3xx, но для браузера это не редиректы: их Location он не использует.',

  flag_bot_challenge: 'Вместо сайта ответила проверка на робота',
  fd_bot_challenge: 'Сервис защиты ответил проверкой для автоматических клиентов. Браузер, который её пройдёт, может попасть в другое место; дальше показано то, что видит скрипт.',

  flag_https_downgrade: 'С https обратно на http',
  fd_https_downgrade: 'Шаг ведёт с зашифрованного адреса на открытый. Дальше запрос и все куки без флага Secure идут по сети открытым текстом, а браузер перестаёт отправлять Referer.',

  flag_late_https_upgrade: 'Переход на https запаздывает',
  fd_late_https_upgrade: 'Цепочка доходит до https, но сначала делает ещё один шаг по открытому http. Этот шаг идёт по сети незашифрованным, вместе с куками посетителя. Сначала — редирект на https на том же хосте, а уже потом куда угодно.',

  flag_upgrade_changes_host: 'Переход на https заодно меняет хост',
  fd_upgrade_changes_host: 'Первый шаг на https уходит на другое имя. Это работает, но HSTS для имени, которое набрал посетитель, так и не будет получен, а для предзагрузки этого имени переход на https должен происходить на нём самом.',

  flag_ends_on_http: 'Заканчивается на открытом http',
  fd_ends_on_http: 'Конечная страница отдаётся без шифрования.',

  flag_certificate_invalid: 'Сертификат, который браузер отвергнет',
  fd_certificate_invalid: 'Шаг по https предъявляет сертификат, который истёк, выдан на другое имя или не заверен доверенным центром. Браузер остановится здесь на странице с предупреждением; цепочка дальше всё равно пройдена, чтобы показать, куда она ведёт.',

  flag_temporary_canonicalization: 'Временный редирект там, где нужен постоянный',
  fd_temporary_canonicalization: 'Шаг лишь приводит адрес в порядок — схема, www, слеш на конце — и при этом называет себя временным. Браузер его не запомнит, а поисковики будут держать оба адреса. Для такого подходит 301 или 308.',

  flag_permanent_redirect_cached: 'Постоянный редирект без срока',
  fd_permanent_redirect_cached: 'Ответ 301 или 308 без Cache-Control и Expires браузер хранит столько, сколько сочтёт нужным. Если редирект окажется ошибочным, все, кто его уже видел, продолжат уходить по старому адресу. max-age делает такую ошибку исправимой.',

  flag_meta_refresh: 'Meta refresh',
  fd_meta_refresh: 'Страница отправляет посетителя дальше через <meta http-equiv="refresh">. В браузере это работает, но только после загрузки страницы, а редирект с задержкой поисковики считают временным.',

  flag_refresh_header: 'Заголовок Refresh',
  fd_refresh_header: 'Ответ отправляет посетителя дальше заголовком Refresh. Браузеры его понимают, но в HTTP он так и не был стандартизирован, и многие другие клиенты его игнорируют.',

  flag_javascript_redirect: 'Редирект скриптом',
  fd_javascript_redirect: 'Страница пуста, если не считать скрипта, который меняет адрес. Клиенты без скриптов — большинство превью ссылок, многие роботы, curl — остаются на пустой странице. Найдено в исходном коде: этот сервис скрипты не выполняет.',

  flag_script_redirect_not_followed: 'Скрипт может отправить посетителя дальше',
  fd_script_redirect_not_followed: 'Где-то в скриптах конечной страницы меняется адрес. Это может стоять за условием, поэтому по нему не пошли; браузер всё же может туда уйти.',

  flag_redirect_sets_cookies: 'Куки на редиректах',
  fd_redirect_sets_cookies: 'Шаги до конечной страницы ставят куки. Обычное дело для трекинга и для сценариев согласия или входа; полезно знать, когда ссылкой делятся.',

  flag_cookie_rejected: 'Кука, которую браузер отвергнет',
  fd_cookie_rejected: 'Set-Cookie нарушает правило, которое браузеры соблюдают строго: Domain, к которому хост не относится, Secure по http, префикс __Host- или __Secure- без своих условий, SameSite=None без Secure. Браузер такую куку выбросит, и вход или согласие, завязанные на неё, молча не сработают.',

  flag_query_lost: 'Параметры потерялись по дороге',
  fd_query_lost: 'Параметров, с которыми начиналась ссылка, нет в конечном адресе. Обычно страдают метки вроде utm_source — визит засчитывается как прямой.',

  flag_path_lost: 'Приводит на главную',
  fd_path_lost: 'Ссылка вела на конкретную страницу, а цепочка заканчивается корнем сайта. Типично после переезда, при котором всё перенаправили на главную: и посетитель, и поисковик теряют нужную страницу.',

  flag_lands_on_another_site: 'Приводит на другой сайт',
  fd_lands_on_another_site: 'Ссылка начинается на одном сайте, а заканчивается на другом. Для коротких и рекламных ссылок это ожидаемо; в остальных случаях стоит присмотреться.',

  flag_canonical_elsewhere: 'Конечная страница называет другой канонический адрес',
  fd_canonical_elsewhere: 'Страница, на которой заканчивается цепочка, указывает свой канонический адрес где-то ещё. Поисковик может проиндексировать его вместо этой страницы, так что ссылаться лучше сразу туда.',

  flag_final_noindex: 'Конечная страница закрыта от индексации',
  fd_final_noindex: 'Страница, на которой заканчивается цепочка, просит поисковики её не индексировать — мета-тегом robots или заголовком X-Robots-Tag.',
};

OWN.es = {
  title: 'Comprobación de redirecciones — cada salto que da un enlace antes de llegar',
  title_short: 'Comprobación de redirecciones',
  h1: 'Comprobación de redirecciones',
  subtitle: 'Cada salto que da un enlace antes de llegar: el código de estado, adónde apunta, quién respondió, cuánto tardó, el certificado y las cookies — incluidos meta refresh y redirecciones por script',
  ph_url: 'example.com/alguna/pagina',
  hero_label: 'Enlace comprobado',
  hero_count: 'redirecciones',
  empty_hint: 'Pegue un enlace — uno acortado, uno publicitario con todos sus parámetros de seguimiento, una dirección antigua tras una migración. La comprobación lo sigue salto a salto, como lo haría un navegador, y muestra cada paso: el código de estado, adónde apuntaba, quién respondió, cuánto tardó, el certificado y las cookies. Un meta refresh o una redirección por script también cuentan como salto.',
  label_client: 'Preguntar como',
  label_cookies: 'Conservar cookies',
  btn_copy_chain: 'Copiar como texto',

  /* ---- etapas ---- */
  stage_follow: 'siguiendo el enlace',
  stage_analyse: 'leyendo el recorrido',
  progress_hops: 'saltos hasta ahora: {n}',

  /* ---- tarjetas ---- */
  card_journey: 'El recorrido',
  card_summary: 'Dónde acaba',
  card_client: 'Quién preguntó',
  note_journey: 'Cada salto es una conexión nueva, así que sus tiempos son lo que cuesta una primera visita; un navegador reutiliza la conexión en los saltos al mismo host. Aparece resaltada la parte de la dirección que cambió el salto.',

  k_destination: 'Acaba en',
  k_outcome: 'Resultado',
  k_redirects: 'Redirecciones',
  k_time_total: 'Tiempo, todas las peticiones',
  k_time_redirects: 'Solo las redirecciones',
  k_hosts: 'Hosts por el camino',
  k_client: 'Cliente',
  k_user_agent: 'User-Agent',
  k_language: 'Accept-Language',
  k_cookies: 'Cookies',

  v_no_redirects: 'ninguna — el enlace va directamente al destino',
  v_requests: 'peticiones: {n}',
  v_not_sent: 'no se envía',
  v_cookies_kept: 'se conservan entre saltos, como hace un navegador',
  v_cookies_forgotten: 'se olvidan entre saltos, como hace un rastreador',
  v_cookies_off: 'sin cookies',
  v_session: 'sesión',
  v_deleted: 'eliminada',
  v_truncated: 'incompleto',
  v_ports: 'Puertos a los que se conecta este servicio: {list}.',
  note_client: 'La comprobación pregunta en el idioma de la interfaz, como lo haría su propio navegador, así que, si un sitio redirige según el idioma, eso se ve. También pregunta desde un único lugar, de modo que una redirección por país muestra la respuesta para ese lugar.',
  note_crawler: 'Un rastreador se imita solo con su User-Agent. Un sitio que verifica a los rastreadores por DNS inverso ve este servidor, y no a Google o a Yandex, y puede tratar la petición como un impostor.',
  empty_flags: 'Nada que señalar.',
  at_steps: 'paso {n}',
  incomplete_chain: 'La cadena se siguió hasta donde llega este servicio y se detiene antes de su final:',

  /* ---- un salto ---- */
  hop_details: 'Detalles',
  hop_final: 'destino',
  hop_failed: 'sin respuesta',
  hop_stopped: 'sin seguir',
  hop_timing: 'En qué se fue el tiempo',
  hop_location: 'Location, tal como se envió',
  hop_address: 'Dirección',
  hop_http: 'Protocolo',
  hop_server: 'Servidor',
  hop_through: 'Respondió a través de',
  hop_tls: 'TLS',
  hop_cert: 'Certificado',
  hop_cert_ok: 'de confianza',
  hop_cert_bad: 'no es de confianza — un navegador se detiene aquí con una advertencia',
  hop_cert_for: 'Emitido para',
  hop_cert_issuer: 'Emitido por',
  hop_cert_until: 'Válido hasta',
  hop_cookies_sent: 'Cookies enviadas',
  hop_cookies_set: 'Cookies establecidas',
  hop_sets_cookies: 'cookies establecidas: {n}',
  hop_headers: 'Cabeceras de la respuesta',
  hop_page: 'La página',
  hop_title: 'Título',
  hop_canonical: 'Dirección canónica',
  hop_robots: 'Robots',
  hop_refresh: 'Refresh',
  hop_refresh_slow: 'a {url} tras {s} s — demasiado lento para contar como redirección',
  hop_noscript: 'Refresh sin script',
  hop_scripts: 'Redirecciones por script en el código',
  hop_body: 'Leído',
  hop_relative: 'relativa',
  hop_fragment: 'fragmento heredado',
  hop_multiple: 'varias cabeceras Location',
  hop_not_followed: 'sin seguir',
  hop_loop: 'de vuelta al paso {n}',
  note_cookie_values: 'Los valores no se muestran: una cookie establecida durante una redirección suele ser una sesión.',
  th_name: 'Nombre',
  th_scope: 'Dominio y ruta',
  th_flags: 'Atributos',
  th_expires: 'Caduca',
  unit_ms: 'ms',
  unit_s: 's',
  unit_kb: 'KB',

  t_dns: 'DNS',
  t_connect: 'conexión',
  t_tls: 'TLS',
  t_wait: 'servidor',

  /* ---- cómo sigue un salto ---- */
  rt_http: 'redirección HTTP',
  rt_refresh_header: 'cabecera Refresh',
  rt_meta_refresh: 'meta refresh',
  rt_javascript: 'script, encontrado en el código',

  sc_301: 'permanente; un navegador puede convertir POST en GET',
  sc_302: 'temporal; un navegador puede convertir POST en GET',
  sc_303: 'ver otro; siempre se sigue con GET',
  sc_307: 'temporal; se conservan método y cuerpo',
  sc_308: 'permanente; se conservan método y cuerpo',

  /* ---- resultados ---- */
  out_arrived: 'llega a destino',
  out_client_error: 'acaba en una página de error',
  out_server_error: 'acaba en un error del servidor',
  out_loop: 'entra en bucle',
  out_too_many_redirects: 'más redirecciones de las que sigue un navegador',
  out_failed: 'se rompe: un salto no respondió',
  out_refused: 'se detiene en una dirección que este servicio no sigue',
  out_broken_redirect: 'se rompe en una cabecera Location que no es una dirección',
  out_unsafe_redirect: 'acaba en una redirección que los navegadores rechazan',
  out_left_web: 'pasa a una aplicación',
  out_incomplete: 'cortado por el límite de tiempo',

  /* ---- clientes ---- */
  ua_chrome: 'Chrome, escritorio',
  ua_iphone: 'Safari, iPhone',
  ua_android: 'Chrome, Android',
  ua_googlebot: 'Googlebot',
  ua_yandexbot: 'YandexBot',
  ua_bingbot: 'Bingbot',
  ua_curl: 'curl',

  /* ---- cookies que un navegador rechaza ---- */
  ck_too_large: 'rechazada: más de 4 KB',
  ck_empty: 'rechazada: vacía',
  ck_domain_mismatch: 'rechazada: un Domain al que el host no pertenece',
  ck_public_suffix: 'rechazada: el Domain es un dominio de nivel superior',
  ck_secure_over_http: 'rechazada: Secure establecido por http',
  ck_prefix_secure: 'rechazada: __Secure- sin Secure por https',
  ck_prefix_host: 'rechazada: __Host- exige Secure, Path=/ y ningún Domain',
  ck_samesite_none_insecure: 'rechazada: SameSite=None sin Secure',

  /* ---- lo que no se pudo establecer ---- */
  inc_deadline: 'el límite de tiempo se agotó antes de que terminara la cadena',
  inc_port_not_followed: 'un salto apunta a un puerto al que este servicio no se conecta',
  inc_credentials_not_followed: 'un salto lleva nombre de usuario y contraseña en la dirección',
  inc_url_too_long: 'un salto apunta a una dirección más larga que las que sigue este servicio',

  /* ---- errores ---- */
  err_invalid_host: 'Eso no parece una dirección web.',
  err_url_too_long: 'Esa dirección es más larga que las que sigue este servicio.',
  err_scheme_not_supported: 'Solo se pueden comprobar direcciones http y https.',
  err_credentials_not_allowed: 'Quite de la dirección el nombre de usuario y la contraseña: este servicio no los envía a ninguna parte.',
  err_unknown_client: 'Cliente desconocido. Use uno de estos: chrome, iphone, android, googlebot, yandexbot, bingbot, curl.',
  err_connection_refused: 'El servidor rechazó la conexión.',
  err_connection_reset: 'La conexión se cortó.',
  err_connection_failed: 'La conexión falló.',
  err_malformed_response: 'La respuesta no era HTTP válido.',
  err_tls_failed: 'Falló el saludo TLS.',
  err_deadline: 'El límite de tiempo se agotó antes de este salto.',

  /* ---- hallazgos ---- */
  flag_redirect_loop: 'La cadena entra en bucle',
  fd_redirect_loop: 'Un salto devuelve la petición a una dirección por la que la cadena ya ha pasado, con las mismas cookies, así que la respuesta solo puede repetirse. Los navegadores se rinden con «demasiadas redirecciones»; los rastreadores abandonan el enlace.',

  flag_redirect_loop_without_cookies: 'Un bucle para clientes sin cookies',
  fd_redirect_loop_without_cookies: 'Sin cookies, la cadena vuelve al punto de partida. Un navegador que conserve la cookie que establece el sitio puede pasar — pero los rastreadores no guardan cookies, así que este es el bucle que ven.',

  flag_too_many_redirects: 'Más redirecciones de las que sigue un navegador',
  fd_too_many_redirects: 'Chrome y Firefox se detienen tras veinte redirecciones y muestran un error. Esta cadena aún seguía.',

  flag_beyond_googlebot_limit: 'Más larga de lo que sigue Googlebot',
  fd_beyond_googlebot_limit: 'Googlebot sigue hasta diez redirecciones seguidas. Más allá, la página no se rastrea desde este enlace, y Search Console informa de un error de redirección.',

  flag_long_chain: 'Una cadena larga',
  fd_long_chain: 'Tres redirecciones o más antes de la página. Cada una es otra ida y vuelta antes de que empiece a cargarse nada, y los buscadores prefieren un solo salto directo a la dirección final.',

  flag_could_be_one_redirect: 'Saltos que podrían ser uno',
  fd_could_be_one_redirect: 'Varias redirecciones dentro de un mismo sitio, cada una retocando su propia parte de la dirección. Enviar al visitante directamente a la dirección final ahorra esas idas y vueltas. El primer salto de http a https en el mismo host no se cuenta: ese es el primer paso correcto.',

  flag_slow_redirects: 'Las redirecciones son lentas',
  fd_slow_redirects: 'Solo las redirecciones tardaron más de un segundo, antes de que la página en sí empezara a cargarse.',

  flag_connection_failed: 'Un salto no respondió',
  fd_connection_failed: 'La cadena se rompe aquí: la siguiente dirección no se resolvió, rechazó la conexión o no respondió a tiempo. Los visitantes ven una página de error.',

  flag_redirect_to_private_network: 'Apunta a una red privada',
  fd_redirect_to_private_network: 'Un salto envía al visitante a una dirección dentro de una red privada, o a un nombre que solo existe dentro de una. Nadie en internet puede seguirla, y la propia redirección dice algo sobre la estructura interna. Este servicio tampoco la sigue.',

  flag_location_malformed: 'Una cabecera Location que no se puede analizar',
  fd_location_malformed: 'La redirección apunta a algo que no es una dirección. Los navegadores muestran un error.',

  flag_multiple_location_headers: 'Dos cabeceras Location distintas',
  fd_multiple_location_headers: 'La respuesta lleva más de una cabecera Location, y no coinciden. Chrome rechaza de plano una redirección así; otros clientes eligen una de ellas. Aquí se siguió la primera.',

  flag_redirect_without_location: 'Un código de redirección sin destino',
  fd_redirect_without_location: 'El código dice «redirección», pero no hay cabecera Location. Los navegadores muestran el cuerpo que traiga la respuesta, que normalmente está vacío.',

  flag_location_unencoded: 'Una cabecera Location con caracteres sin codificar',
  fd_location_unencoded: 'La cabecera Location lleva espacios o caracteres no ASCII sin codificación porcentual. Los navegadores la reparan; otros clientes, proxies y bibliotecas puede que no.',

  flag_unsafe_redirect_target: 'Una redirección a un esquema que los navegadores rechazan',
  fd_unsafe_redirect_target: 'La cadena apunta a una dirección javascript:, data: o file:. Los navegadores se niegan a seguir una redirección hasta allí.',

  flag_leaves_the_web: 'Pasa a una aplicación',
  fd_leaves_the_web: 'La cadena acaba en una dirección que no es una página web — tg://, mailto:, intent:, un enlace a una tienda de aplicaciones. El navegador ofrece abrir la aplicación; lo que pase después ya no es una cuestión de la web.',

  flag_ends_in_client_error: 'Acaba en una página de error',
  fd_ends_in_client_error: 'La página final responde con un código 4xx — no encontrada, eliminada, prohibida. El enlace no lleva a ninguna parte.',

  flag_ends_in_server_error: 'Acaba en un error del servidor',
  fd_ends_in_server_error: 'La página final responde con un código 5xx. Puede ser temporal; mientras dure, el enlace está roto.',

  flag_redirect_status_not_followed: 'Un código 3xx que los navegadores no siguen',
  fd_redirect_status_not_followed: '300, 304, 305 y 306 son códigos 3xx, pero para un navegador no son redirecciones: se ignora cualquier Location que lleven.',

  flag_bot_challenge: 'Respondió una comprobación antibots en lugar del sitio',
  fd_bot_challenge: 'Un servicio de protección respondió con un desafío pensado para clientes automáticos. Un navegador que lo supere puede acabar en otro lugar; lo que sigue es lo que ve un script.',

  flag_https_downgrade: 'De https de vuelta a http',
  fd_https_downgrade: 'Un salto va de una dirección cifrada a una sin cifrar. A partir de ahí, la petición y todas las cookies sin la marca Secure cruzan la red en claro, y los navegadores dejan de enviar el Referer.',

  flag_late_https_upgrade: 'La redirección a https llega tarde',
  fd_late_https_upgrade: 'La cadena sí llega a https, pero solo después de otro salto por http sin cifrar. Ese salto cruza la red en claro, con las cookies del visitante adjuntas. Redirija primero a https en el mismo host y después a donde sea.',

  flag_upgrade_changes_host: 'La redirección a https también cambia el host',
  fd_upgrade_changes_host: 'El primer salto a https va a otro nombre. Funciona, pero el HSTS del nombre que escribió el visitante nunca se recibe, y para precargar ese nombre la redirección a https tiene que ocurrir primero en él.',

  flag_ends_on_http: 'Acaba en http sin cifrar',
  fd_ends_on_http: 'La página final se sirve sin cifrar.',

  flag_certificate_invalid: 'Un certificado que un navegador rechazaría',
  fd_certificate_invalid: 'Un salto https presenta un certificado caducado, a nombre de otro host o no emitido por una autoridad de confianza. Un navegador se detiene aquí en una página de advertencia; aun así, la cadena se siguió más allá, para mostrar adónde lleva.',

  flag_temporary_canonicalization: 'Una redirección temporal donde debería ser permanente',
  fd_temporary_canonicalization: 'El salto solo retoca la dirección — el esquema, un www, una barra final — y se declara temporal. Los navegadores no lo recordarán y los buscadores conservarán ambas direcciones. El código para esto es 301 o 308.',

  flag_permanent_redirect_cached: 'Una redirección permanente sin caducidad',
  fd_permanent_redirect_cached: 'Los navegadores guardan un 301 o un 308 sin Cache-Control ni Expires todo el tiempo que quieran. Si alguna vez resulta ser un error, todos los que lo hayan visto seguirán yendo al destino antiguo. Un max-age hace que un error tenga arreglo.',

  flag_meta_refresh: 'Un meta refresh',
  fd_meta_refresh: 'La página redirige a los visitantes con <meta http-equiv="refresh">. Los navegadores lo siguen, pero solo cuando la página ha terminado de cargar, y los buscadores tratan uno con retardo como una redirección temporal.',

  flag_refresh_header: 'Una cabecera Refresh',
  fd_refresh_header: 'La respuesta redirige a los visitantes con una cabecera Refresh. Los navegadores la respetan, pero nunca se estandarizó como parte de HTTP, y muchos otros clientes la ignoran.',

  flag_javascript_redirect: 'Una redirección por script',
  fd_javascript_redirect: 'La página está vacía salvo por un script que cambia la dirección. Los clientes que no ejecutan scripts — la mayoría de las vistas previas de enlaces, muchos rastreadores, curl — se quedan en la página vacía. Encontrada en el código fuente: este servicio no ejecuta scripts.',

  flag_script_redirect_not_followed: 'Un script puede enviar a los visitantes a otra parte',
  fd_script_redirect_not_followed: 'La página final cambia la dirección en algún punto de sus scripts. Eso puede depender de una condición, así que no se siguió; un navegador puede ir allí de todos modos.',

  flag_redirect_sets_cookies: 'Cookies establecidas durante las redirecciones',
  fd_redirect_sets_cookies: 'Los saltos anteriores a la página final establecen cookies. Es habitual para el seguimiento y en los flujos de consentimiento o de inicio de sesión; conviene saberlo cuando se comparte el enlace.',

  flag_cookie_rejected: 'Una cookie que un navegador rechazaría',
  fd_cookie_rejected: 'Un Set-Cookie incumple una regla que los navegadores hacen cumplir: un Domain al que el host no pertenece, Secure por http, un prefijo __Host- o __Secure- sin sus condiciones, SameSite=None sin Secure. El navegador descarta la cookie, y un flujo de inicio de sesión o de consentimiento que dependa de ella falla sin avisar.',

  flag_query_lost: 'Parámetros de consulta perdidos por el camino',
  fd_query_lost: 'En la dirección final faltan parámetros con los que empezaba el enlace. Los parámetros de seguimiento como utm_source son las víctimas habituales: la visita se cuenta como directa.',

  flag_path_lost: 'Acaba en la página de inicio',
  fd_path_lost: 'El enlace apuntaba a una página concreta y la cadena acaba en la raíz del sitio. Típico tras una migración que redirige todo a la página de inicio: tanto los visitantes como los buscadores pierden la página que buscaban.',

  flag_lands_on_another_site: 'Acaba en otro sitio',
  fd_lands_on_another_site: 'El enlace empieza en un sitio y acaba en otro. Es lo esperado en enlaces acortados y publicitarios; merece un vistazo cuando no es ninguno de ellos.',

  flag_canonical_elsewhere: 'La página final indica otra dirección canónica',
  fd_canonical_elsewhere: 'La página en la que acaba la cadena da como dirección canónica otra distinta. Los buscadores pueden indexar esa en su lugar, así que es mejor enlazar a ella.',

  flag_final_noindex: 'La página final queda fuera del índice',
  fd_final_noindex: 'La página en la que acaba la cadena pide a los buscadores que no la indexen, con una etiqueta meta robots o una cabecera X-Robots-Tag.',
};

OWN.pt = {
  title: 'Verificação de redirecionamentos — cada salto que um link dá antes de chegar',
  title_short: 'Verificação de redirecionamentos',
  h1: 'Verificação de redirecionamentos',
  subtitle: 'Cada salto que um link dá antes de chegar: o código de status, para onde aponta, quem respondeu, quanto tempo levou, o certificado e os cookies — incluindo meta refresh e redirecionamentos por script',
  ph_url: 'example.com/alguma/pagina',
  hero_label: 'Link verificado',
  hero_count: 'redirecionamentos',
  empty_hint: 'Cole um link — um encurtado, um de anúncio com todos os parâmetros de rastreamento, um endereço antigo depois de uma migração. A verificação o segue salto a salto, como um navegador faria, e mostra cada passo: o código de status, para onde apontava, quem respondeu, quanto tempo levou, o certificado e os cookies. Um meta refresh ou um redirecionamento por script também conta como salto.',
  label_client: 'Perguntar como',
  label_cookies: 'Manter cookies',
  btn_copy_chain: 'Copiar como texto',

  /* ---- etapas ---- */
  stage_follow: 'seguindo o link',
  stage_analyse: 'lendo o trajeto',
  progress_hops: 'saltos até agora: {n}',

  /* ---- cartões ---- */
  card_journey: 'O trajeto',
  card_summary: 'Onde termina',
  card_client: 'Quem perguntou',
  note_journey: 'Cada salto é uma conexão nova, então os tempos mostram o custo de uma primeira visita; um navegador reaproveita a conexão nos saltos para o mesmo host. Fica destacada a parte do endereço que o salto mudou.',

  k_destination: 'Termina em',
  k_outcome: 'Resultado',
  k_redirects: 'Redirecionamentos',
  k_time_total: 'Tempo, todas as requisições',
  k_time_redirects: 'Só os redirecionamentos',
  k_hosts: 'Hosts pelo caminho',
  k_client: 'Cliente',
  k_user_agent: 'User-Agent',
  k_language: 'Accept-Language',
  k_cookies: 'Cookies',

  v_no_redirects: 'nenhum — o link vai direto ao destino',
  v_requests: 'requisições: {n}',
  v_not_sent: 'não enviado',
  v_cookies_kept: 'mantidos entre saltos, como faz um navegador',
  v_cookies_forgotten: 'esquecidos entre saltos, como faz um rastreador',
  v_cookies_off: 'sem cookies',
  v_session: 'sessão',
  v_deleted: 'excluído',
  v_truncated: 'incompleto',
  v_ports: 'Portas às quais este serviço se conecta: {list}.',
  note_client: 'A verificação pergunta no idioma da interface, como o seu próprio navegador faria; assim, se um site redireciona conforme o idioma, isso aparece. Ela também pergunta de um único lugar, então um redirecionamento por país mostra a resposta para esse lugar.',
  note_crawler: 'Um rastreador é imitado apenas pelo User-Agent. Um site que verifica rastreadores por DNS reverso vê este servidor, e não o Google ou o Yandex, e pode tratar a requisição como um impostor.',
  empty_flags: 'Nada a relatar.',
  at_steps: 'passo {n}',
  incomplete_chain: 'A cadeia foi seguida até onde este serviço vai, e se interrompe antes do fim:',

  /* ---- um salto ---- */
  hop_details: 'Detalhes',
  hop_final: 'destino',
  hop_failed: 'sem resposta',
  hop_stopped: 'não seguido',
  hop_timing: 'Para onde foi o tempo',
  hop_location: 'Location, como foi enviado',
  hop_address: 'Endereço',
  hop_http: 'Protocolo',
  hop_server: 'Servidor',
  hop_through: 'Respondeu através de',
  hop_tls: 'TLS',
  hop_cert: 'Certificado',
  hop_cert_ok: 'confiável',
  hop_cert_bad: 'não confiável — um navegador para aqui com um aviso',
  hop_cert_for: 'Emitido para',
  hop_cert_issuer: 'Emitido por',
  hop_cert_until: 'Válido até',
  hop_cookies_sent: 'Cookies enviados',
  hop_cookies_set: 'Cookies definidos',
  hop_sets_cookies: 'cookies definidos: {n}',
  hop_headers: 'Cabeçalhos da resposta',
  hop_page: 'A página',
  hop_title: 'Título',
  hop_canonical: 'Endereço canônico',
  hop_robots: 'Robots',
  hop_refresh: 'Refresh',
  hop_refresh_slow: 'para {url} após {s} s — lento demais para contar como redirecionamento',
  hop_noscript: 'Refresh sem script',
  hop_scripts: 'Redirecionamentos por script no código',
  hop_body: 'Lido',
  hop_relative: 'relativo',
  hop_fragment: 'fragmento herdado',
  hop_multiple: 'vários cabeçalhos Location',
  hop_not_followed: 'não seguido',
  hop_loop: 'de volta ao passo {n}',
  note_cookie_values: 'Os valores não são mostrados: um cookie definido durante um redirecionamento muitas vezes é uma sessão.',
  th_name: 'Nome',
  th_scope: 'Domínio e caminho',
  th_flags: 'Atributos',
  th_expires: 'Expira',
  unit_ms: 'ms',
  unit_s: 's',
  unit_kb: 'KB',

  t_dns: 'DNS',
  t_connect: 'conexão',
  t_tls: 'TLS',
  t_wait: 'servidor',

  /* ---- como um salto segue adiante ---- */
  rt_http: 'redirecionamento HTTP',
  rt_refresh_header: 'cabeçalho Refresh',
  rt_meta_refresh: 'meta refresh',
  rt_javascript: 'script, encontrado no código',

  sc_301: 'permanente; um navegador pode trocar POST por GET',
  sc_302: 'temporário; um navegador pode trocar POST por GET',
  sc_303: 'ver outro; sempre seguido com GET',
  sc_307: 'temporário; método e corpo mantidos',
  sc_308: 'permanente; método e corpo mantidos',

  /* ---- resultados ---- */
  out_arrived: 'chega ao destino',
  out_client_error: 'termina numa página de erro',
  out_server_error: 'termina num erro do servidor',
  out_loop: 'entra em laço',
  out_too_many_redirects: 'mais redirecionamentos do que um navegador segue',
  out_failed: 'quebra: um salto não respondeu',
  out_refused: 'se detém num endereço que este serviço não segue',
  out_broken_redirect: 'quebra num Location que não é um endereço',
  out_unsafe_redirect: 'termina num redirecionamento que os navegadores recusam',
  out_left_web: 'passa para um aplicativo',
  out_incomplete: 'interrompido pelo limite de tempo',

  /* ---- clientes ---- */
  ua_chrome: 'Chrome, computador',
  ua_iphone: 'Safari, iPhone',
  ua_android: 'Chrome, Android',
  ua_googlebot: 'Googlebot',
  ua_yandexbot: 'YandexBot',
  ua_bingbot: 'Bingbot',
  ua_curl: 'curl',

  /* ---- cookies que um navegador recusa ---- */
  ck_too_large: 'recusado: mais de 4 KB',
  ck_empty: 'recusado: vazio',
  ck_domain_mismatch: 'recusado: um Domain ao qual o host não pertence',
  ck_public_suffix: 'recusado: o Domain é um domínio de primeiro nível',
  ck_secure_over_http: 'recusado: Secure definido por http',
  ck_prefix_secure: 'recusado: __Secure- sem Secure por https',
  ck_prefix_host: 'recusado: __Host- exige Secure, Path=/ e nenhum Domain',
  ck_samesite_none_insecure: 'recusado: SameSite=None sem Secure',

  /* ---- o que não foi possível determinar ---- */
  inc_deadline: 'o limite de tempo se esgotou antes de a cadeia terminar',
  inc_port_not_followed: 'um salto aponta para uma porta à qual este serviço não se conecta',
  inc_credentials_not_followed: 'um salto traz nome de usuário e senha no endereço',
  inc_url_too_long: 'um salto aponta para um endereço mais longo do que os que este serviço segue',

  /* ---- erros ---- */
  err_invalid_host: 'Isso não parece um endereço web.',
  err_url_too_long: 'Esse endereço é mais longo do que os que este serviço segue.',
  err_scheme_not_supported: 'Só é possível verificar endereços http e https.',
  err_credentials_not_allowed: 'Tire o nome de usuário e a senha do endereço: este serviço não os envia para lugar nenhum.',
  err_unknown_client: 'Cliente desconhecido. Use um destes: chrome, iphone, android, googlebot, yandexbot, bingbot, curl.',
  err_connection_refused: 'O servidor recusou a conexão.',
  err_connection_reset: 'A conexão caiu.',
  err_connection_failed: 'A conexão falhou.',
  err_malformed_response: 'A resposta não era HTTP válido.',
  err_tls_failed: 'O handshake TLS falhou.',
  err_deadline: 'O limite de tempo se esgotou antes deste salto.',

  /* ---- achados ---- */
  flag_redirect_loop: 'A cadeia entra em laço',
  fd_redirect_loop: 'Um salto manda a requisição de volta para um endereço pelo qual a cadeia já passou, com os mesmos cookies, então a resposta só pode se repetir. Os navegadores desistem com “redirecionamentos demais”; os rastreadores abandonam o link.',

  flag_redirect_loop_without_cookies: 'Um laço para clientes sem cookies',
  fd_redirect_loop_without_cookies: 'Sem cookies, a cadeia volta ao ponto de partida. Um navegador que guarde o cookie definido pelo site pode conseguir passar — mas os rastreadores não guardam cookies, então é esse o laço que eles veem.',

  flag_too_many_redirects: 'Mais redirecionamentos do que um navegador segue',
  fd_too_many_redirects: 'O Chrome e o Firefox param depois de vinte redirecionamentos e mostram um erro. Esta cadeia ainda continuava.',

  flag_beyond_googlebot_limit: 'Mais longa do que o Googlebot segue',
  fd_beyond_googlebot_limit: 'O Googlebot segue até dez redirecionamentos seguidos. Acima disso, a página não é rastreada a partir deste link, e o Search Console aponta um erro de redirecionamento.',

  flag_long_chain: 'Uma cadeia longa',
  fd_long_chain: 'Três redirecionamentos ou mais antes da página. Cada um é mais uma ida e volta antes que qualquer coisa comece a carregar, e os mecanismos de busca preferem um único salto direto para o endereço final.',

  flag_could_be_one_redirect: 'Saltos que poderiam ser um só',
  fd_could_be_one_redirect: 'Vários redirecionamentos dentro do mesmo site, cada um ajustando a sua parte do endereço. Mandar o visitante direto para o endereço final economiza essas idas e voltas. O primeiro salto de http para https no mesmo host não entra na conta: esse é o primeiro passo certo.',

  flag_slow_redirects: 'Os redirecionamentos são lentos',
  fd_slow_redirects: 'Só os redirecionamentos levaram mais de um segundo, antes de a própria página começar a carregar.',

  flag_connection_failed: 'Um salto não respondeu',
  fd_connection_failed: 'A cadeia quebra aqui: o próximo endereço não foi resolvido, recusou a conexão ou não respondeu a tempo. Os visitantes veem uma página de erro.',

  flag_redirect_to_private_network: 'Aponta para uma rede privada',
  fd_redirect_to_private_network: 'Um salto manda o visitante para um endereço dentro de uma rede privada, ou para um nome que só existe dentro de uma. Ninguém na internet consegue segui-lo, e o próprio redirecionamento diz algo sobre a estrutura interna. Este serviço também não o segue.',

  flag_location_malformed: 'Um Location impossível de interpretar',
  fd_location_malformed: 'O redirecionamento aponta para algo que não é um endereço. Os navegadores mostram um erro.',

  flag_multiple_location_headers: 'Dois cabeçalhos Location diferentes',
  fd_multiple_location_headers: 'A resposta traz mais de um Location, e eles não coincidem. O Chrome recusa de saída um redirecionamento assim; outros clientes escolhem um deles. Aqui foi seguido o primeiro.',

  flag_redirect_without_location: 'Um código de redirecionamento sem destino',
  fd_redirect_without_location: 'O código diz “redirecionamento”, mas não há cabeçalho Location. Os navegadores mostram o corpo que tiver vindo junto, que normalmente é vazio.',

  flag_location_unencoded: 'Um Location com caracteres não codificados',
  fd_location_unencoded: 'O cabeçalho Location traz espaços ou caracteres fora do ASCII sem codificação percentual. Os navegadores o corrigem; outros clientes, proxies e bibliotecas talvez não.',

  flag_unsafe_redirect_target: 'Um redirecionamento para um esquema que os navegadores recusam',
  fd_unsafe_redirect_target: 'A cadeia aponta para um endereço javascript:, data: ou file:. Os navegadores se recusam a seguir um redirecionamento até lá.',

  flag_leaves_the_web: 'Passa para um aplicativo',
  fd_leaves_the_web: 'A cadeia termina num endereço que não é uma página web — tg://, mailto:, intent:, um link de loja de aplicativos. O navegador oferece abrir o aplicativo; o que acontece depois já não é uma questão da web.',

  flag_ends_in_client_error: 'Termina numa página de erro',
  fd_ends_in_client_error: 'A página final responde com um código 4xx — não encontrada, removida, proibida. O link não leva a lugar nenhum.',

  flag_ends_in_server_error: 'Termina num erro do servidor',
  fd_ends_in_server_error: 'A página final responde com um código 5xx. Pode ser temporário; enquanto durar, o link fica quebrado.',

  flag_redirect_status_not_followed: 'Um código 3xx que os navegadores não seguem',
  fd_redirect_status_not_followed: '300, 304, 305 e 306 são códigos 3xx, mas para um navegador não são redirecionamentos: qualquer Location que tragam é ignorado.',

  flag_bot_challenge: 'Uma verificação antibot respondeu no lugar do site',
  fd_bot_challenge: 'Um serviço de proteção respondeu com um desafio feito para clientes automatizados. Um navegador que passar por ele pode ser levado a outro lugar; o que vem a seguir é o que um script vê.',

  flag_https_downgrade: 'De https de volta para http',
  fd_https_downgrade: 'Um salto vai de um endereço criptografado para um sem criptografia. Dali em diante, a requisição e todo cookie sem a marca Secure atravessam a rede em texto claro, e os navegadores deixam de enviar o Referer.',

  flag_late_https_upgrade: 'O redirecionamento para https chega tarde',
  fd_late_https_upgrade: 'A cadeia chega, sim, ao https, mas só depois de mais um salto por http puro. Esse salto atravessa a rede sem criptografia, com os cookies do visitante anexados. Redirecione primeiro para https no mesmo host e só depois para qualquer outro lugar.',

  flag_upgrade_changes_host: 'O redirecionamento para https também muda o host',
  fd_upgrade_changes_host: 'O primeiro salto para https vai para outro nome. Funciona, mas o HSTS do nome que o visitante digitou nunca é recebido, e pré-carregar esse nome exige que o redirecionamento para https aconteça primeiro nele.',

  flag_ends_on_http: 'Termina em http puro',
  fd_ends_on_http: 'A página final é servida sem criptografia.',

  flag_certificate_invalid: 'Um certificado que um navegador rejeitaria',
  fd_certificate_invalid: 'Um salto https apresenta um certificado vencido, em nome de outro host ou não emitido por uma autoridade confiável. Um navegador para aqui numa página de aviso; mesmo assim, a cadeia foi seguida adiante, para mostrar aonde leva.',

  flag_temporary_canonicalization: 'Um redirecionamento temporário onde deveria ser permanente',
  fd_temporary_canonicalization: 'O salto só ajusta o endereço — o esquema, um www, uma barra no final — e se declara temporário. Os navegadores não vão memorizá-lo e os mecanismos de busca mantêm os dois endereços. O código para isso é 301 ou 308.',

  flag_permanent_redirect_cached: 'Um redirecionamento permanente sem expiração',
  fd_permanent_redirect_cached: 'Um 301 ou 308 sem Cache-Control nem Expires é guardado pelos navegadores pelo tempo que quiserem. Se um dia ele se revelar errado, todos que já o viram continuam indo para o destino antigo. Um max-age torna o erro reparável.',

  flag_meta_refresh: 'Um meta refresh',
  fd_meta_refresh: 'A página encaminha os visitantes com <meta http-equiv="refresh">. Os navegadores o seguem, mas só depois que a página carrega, e os mecanismos de busca tratam um com atraso como redirecionamento temporário.',

  flag_refresh_header: 'Um cabeçalho Refresh',
  fd_refresh_header: 'A resposta encaminha os visitantes com um cabeçalho Refresh. Os navegadores o respeitam, mas ele nunca foi padronizado no HTTP, e muitos outros clientes o ignoram.',

  flag_javascript_redirect: 'Um redirecionamento por script',
  fd_javascript_redirect: 'A página está vazia, exceto por um script que muda o endereço. Clientes que não executam scripts — a maioria das prévias de links, muitos rastreadores, o curl — ficam na página vazia. Encontrado no código-fonte: este serviço não executa scripts.',

  flag_script_redirect_not_followed: 'Um script pode mandar os visitantes para outro lugar',
  fd_script_redirect_not_followed: 'A página final muda o endereço em algum ponto dos seus scripts. Isso pode depender de uma condição, então não foi seguido; um navegador ainda pode ir para lá.',

  flag_redirect_sets_cookies: 'Cookies definidos durante os redirecionamentos',
  fd_redirect_sets_cookies: 'Saltos anteriores à página final definem cookies. É comum para rastreamento e em fluxos de consentimento ou de login; vale saber disso quando o link é compartilhado.',

  flag_cookie_rejected: 'Um cookie que um navegador recusaria',
  fd_cookie_rejected: 'Um Set-Cookie quebra uma regra que os navegadores impõem: um Domain ao qual o host não pertence, Secure por http, um prefixo __Host- ou __Secure- sem as suas condições, SameSite=None sem Secure. O navegador descarta o cookie, e um fluxo de login ou de consentimento que dependa dele falha em silêncio.',

  flag_query_lost: 'Parâmetros de consulta perdidos pelo caminho',
  fd_query_lost: 'Parâmetros com que o link começava faltam no endereço final. Parâmetros de rastreamento como utm_source são as vítimas de sempre: a visita é contada como direta.',

  flag_path_lost: 'Termina na página inicial',
  fd_path_lost: 'O link apontava para uma página específica e a cadeia termina na raiz do site. Típico depois de uma migração que redireciona tudo para a página inicial: tanto os visitantes quanto os mecanismos de busca perdem a página que procuravam.',

  flag_lands_on_another_site: 'Termina em outro site',
  fd_lands_on_another_site: 'O link começa num site e termina em outro. É o esperado para links encurtados e de anúncios; vale uma olhada quando não é nenhum desses.',

  flag_canonical_elsewhere: 'A página final indica outro endereço canônico',
  fd_canonical_elsewhere: 'A página em que a cadeia termina indica outro endereço como canônico. Os mecanismos de busca podem indexar esse no lugar dela, então é melhor apontar os links para ele.',

  flag_final_noindex: 'A página final fica fora do índice',
  fd_final_noindex: 'A página em que a cadeia termina pede aos mecanismos de busca que não a indexem, com uma tag meta robots ou um cabeçalho X-Robots-Tag.',
};

OWN.fr = {
  title: 'Contrôle des redirections — chaque saut d’un lien jusqu’à sa destination',
  title_short: 'Contrôle des redirections',
  h1: 'Contrôle des redirections',
  subtitle: 'Chaque saut d’un lien jusqu’à sa destination : le code de réponse, où il mène, qui a répondu, combien de temps il a pris, le certificat et les cookies — meta refresh et redirections par script compris',
  ph_url: 'example.com/une/page',
  hero_label: 'Lien vérifié',
  hero_count: 'redirections',
  empty_hint: 'Collez un lien — un lien court, un lien publicitaire avec tous ses paramètres de suivi, une ancienne adresse après le déménagement d’un site. Le contrôle le suit saut par saut, comme le ferait un navigateur, et montre chaque étape : le code de réponse, où elle menait, qui a répondu, combien de temps elle a pris, le certificat et les cookies. Un meta refresh ou une redirection par script compte aussi comme un saut.',
  label_client: 'Se présenter comme',
  label_cookies: 'Conserver les cookies',
  btn_copy_chain: 'Copier en texte',

  /* ---- phases ---- */
  stage_follow: 'suivi du lien',
  stage_analyse: 'lecture du parcours',
  progress_hops: 'sauts jusqu’ici : {n}',

  /* ---- cartes ---- */
  card_journey: 'Le parcours',
  card_summary: 'Où mène le lien',
  card_client: 'Qui a demandé',
  note_journey: 'Chaque saut est une nouvelle connexion : ses temps correspondent donc à une première visite ; un navigateur réutilise la connexion pour les sauts sur un même hôte. La partie de l’adresse que le saut a modifiée est surlignée.',

  k_destination: 'Aboutit à',
  k_outcome: 'Résultat',
  k_redirects: 'Redirections',
  k_time_total: 'Temps, toutes requêtes',
  k_time_redirects: 'Dont redirections',
  k_hosts: 'Hôtes traversés',
  k_client: 'Client',
  k_user_agent: 'User-Agent',
  k_language: 'Accept-Language',
  k_cookies: 'Cookies',

  v_no_redirects: 'aucune — le lien mène directement à destination',
  v_requests: 'requêtes : {n}',
  v_not_sent: 'non envoyé',
  v_cookies_kept: 'conservés entre les sauts, comme le fait un navigateur',
  v_cookies_forgotten: 'oubliés entre les sauts, comme le fait un robot d’exploration',
  v_cookies_off: 'sans cookies',
  v_session: 'fin de session',
  v_deleted: 'supprimé',
  v_truncated: 'tronqué',
  v_ports: 'Ports auxquels ce service se connecte : {list}.',
  note_client: 'Le contrôle interroge le site dans la langue de l’interface, comme le ferait votre propre navigateur : un site qui redirige selon la langue est donc pris sur le fait. Il interroge aussi depuis un seul endroit, si bien qu’une redirection selon le pays montre la réponse destinée à cet endroit.',
  note_crawler: 'Un robot d’exploration n’est imité que par son User-Agent. Un site qui vérifie les robots par DNS inverse voit ce serveur plutôt que Google ou Yandex, et peut prendre la requête pour celle d’un imposteur.',
  empty_flags: 'Rien à signaler.',
  at_steps: 'étape {n}',
  incomplete_chain: 'La chaîne a été suivie aussi loin que ce service le permet, et s’arrête avant son terme :',

  /* ---- un saut ---- */
  hop_details: 'Détails',
  hop_final: 'arrivée',
  hop_failed: 'pas de réponse',
  hop_stopped: 'non suivi',
  hop_timing: 'Répartition du temps',
  hop_location: 'Location, tel qu’envoyé',
  hop_address: 'Adresse',
  hop_http: 'Protocole',
  hop_server: 'Serveur',
  hop_through: 'Réponse via',
  hop_tls: 'TLS',
  hop_cert: 'Certificat',
  hop_cert_ok: 'de confiance',
  hop_cert_bad: 'non fiable — un navigateur s’arrête ici avec un avertissement',
  hop_cert_for: 'Émis pour',
  hop_cert_issuer: 'Émis par',
  hop_cert_until: 'Valide jusqu’au',
  hop_cookies_sent: 'Cookies envoyés',
  hop_cookies_set: 'Cookies posés',
  hop_sets_cookies: 'cookies posés : {n}',
  hop_headers: 'En-têtes de réponse',
  hop_page: 'La page',
  hop_title: 'Titre',
  hop_canonical: 'Adresse canonique',
  hop_robots: 'Robots',
  hop_refresh: 'Refresh',
  hop_refresh_slow: 'vers {url} après {s} s — trop lent pour compter comme une redirection',
  hop_noscript: 'Refresh sans script',
  hop_scripts: 'Redirections par script dans le code source',
  hop_body: 'Lu',
  hop_relative: 'adresse relative',
  hop_fragment: 'fragment hérité',
  hop_multiple: 'plusieurs en-têtes Location',
  hop_not_followed: 'non suivie',
  hop_loop: 'retour à l’étape {n}',
  note_cookie_values: 'Les valeurs ne sont pas affichées : un cookie posé pendant une redirection contient souvent un identifiant de session.',
  th_name: 'Nom',
  th_scope: 'Domaine et chemin',
  th_flags: 'Attributs',
  th_expires: 'Expiration',
  unit_ms: 'ms',
  unit_s: 's',
  unit_kb: 'Ko',

  t_dns: 'DNS',
  t_connect: 'connexion',
  t_tls: 'TLS',
  t_wait: 'serveur',

  /* ---- comment un saut se poursuit ---- */
  rt_http: 'redirection HTTP',
  rt_refresh_header: 'en-tête Refresh',
  rt_meta_refresh: 'meta refresh',
  rt_javascript: 'script, trouvé dans le code source',

  sc_301: 'permanente ; un navigateur peut transformer POST en GET',
  sc_302: 'temporaire ; un navigateur peut transformer POST en GET',
  sc_303: 'voir ailleurs ; toujours suivie en GET',
  sc_307: 'temporaire ; méthode et corps conservés',
  sc_308: 'permanente ; méthode et corps conservés',

  /* ---- résultats ---- */
  out_arrived: 'arrive à destination',
  out_client_error: 'aboutit à une page d’erreur',
  out_server_error: 'aboutit à une erreur du serveur',
  out_loop: 'tourne en boucle',
  out_too_many_redirects: 'plus de redirections qu’un navigateur n’en suit',
  out_failed: 'se rompt : un saut n’a pas répondu',
  out_refused: 's’arrête sur une adresse que ce service ne suit pas',
  out_broken_redirect: 'se rompt : le Location n’est pas une adresse',
  out_unsafe_redirect: 'aboutit à une redirection que les navigateurs refusent',
  out_left_web: 'passe la main à une application',
  out_incomplete: 'écourté par la limite de temps',

  /* ---- clients ---- */
  ua_chrome: 'Chrome, ordinateur',
  ua_iphone: 'Safari, iPhone',
  ua_android: 'Chrome, Android',
  ua_googlebot: 'Googlebot',
  ua_yandexbot: 'YandexBot',
  ua_bingbot: 'Bingbot',
  ua_curl: 'curl',

  /* ---- cookies qu’un navigateur refuse ---- */
  ck_too_large: 'refusé : plus de 4 Ko',
  ck_empty: 'refusé : vide',
  ck_domain_mismatch: 'refusé : un Domain auquel l’hôte n’appartient pas',
  ck_public_suffix: 'refusé : le Domain est un domaine de premier niveau',
  ck_secure_over_http: 'refusé : Secure défini en http',
  ck_prefix_secure: 'refusé : __Secure- sans Secure en https',
  ck_prefix_host: 'refusé : __Host- exige Secure, Path=/ et aucun Domain',
  ck_samesite_none_insecure: 'refusé : SameSite=None sans Secure',

  /* ---- ce qui n’a pas pu être établi ---- */
  inc_deadline: 'la limite de temps a été atteinte avant la fin de la chaîne',
  inc_port_not_followed: 'un saut pointe vers un port auquel ce service ne se connecte pas',
  inc_credentials_not_followed: 'un saut porte un nom d’utilisateur et un mot de passe dans l’adresse',
  inc_url_too_long: 'un saut pointe vers une adresse trop longue pour ce service',

  /* ---- erreurs ---- */
  err_invalid_host: 'Cela ne ressemble pas à une adresse web.',
  err_url_too_long: 'Cette adresse est trop longue pour ce service.',
  err_scheme_not_supported: 'Seules les adresses http et https peuvent être vérifiées.',
  err_credentials_not_allowed: 'Retirez le nom d’utilisateur et le mot de passe de l’adresse : ce service ne les transmet nulle part.',
  err_unknown_client: 'Client inconnu. Utilisez l’un de ceux-ci : chrome, iphone, android, googlebot, yandexbot, bingbot, curl.',
  err_connection_refused: 'Le serveur a refusé la connexion.',
  err_connection_reset: 'La connexion a été coupée.',
  err_connection_failed: 'La connexion a échoué.',
  err_malformed_response: 'La réponse n’était pas du HTTP valide.',
  err_tls_failed: 'La poignée de main TLS a échoué.',
  err_deadline: 'La limite de temps a été atteinte avant ce saut.',

  /* ---- constats ---- */
  flag_redirect_loop: 'La chaîne tourne en boucle',
  fd_redirect_loop: 'Un saut renvoie la requête vers une adresse que la chaîne a déjà visitée, avec les mêmes cookies : la réponse ne peut donc que se répéter. Les navigateurs abandonnent avec « trop de redirections » ; les robots d’exploration écartent le lien.',

  flag_redirect_loop_without_cookies: 'Une boucle pour les clients sans cookies',
  fd_redirect_loop_without_cookies: 'Sans cookies, la chaîne revient à son point de départ. Un navigateur qui conserve le cookie posé par le site peut passer — mais les robots d’exploration ne conservent aucun cookie : c’est donc cette boucle qu’ils voient.',

  flag_too_many_redirects: 'Plus de redirections qu’un navigateur n’en suit',
  fd_too_many_redirects: 'Chrome et Firefox s’arrêtent après vingt redirections et affichent une erreur. Cette chaîne continuait encore.',

  flag_beyond_googlebot_limit: 'Au-delà de ce que suit Googlebot',
  fd_beyond_googlebot_limit: 'Googlebot suit jusqu’à dix redirections d’affilée. Au-delà, la page n’est pas explorée depuis ce lien, et Search Console signale une erreur de redirection.',

  flag_long_chain: 'Une longue chaîne',
  fd_long_chain: 'Trois redirections ou plus avant la page. Chacune est un aller-retour de plus avant que quoi que ce soit ne commence à charger, et les moteurs de recherche préfèrent un seul saut directement vers l’adresse finale.',

  flag_could_be_one_redirect: 'Des sauts qui pourraient n’en faire qu’un',
  fd_could_be_one_redirect: 'Plusieurs redirections au sein d’un même site, chacune mettant en ordre sa propre partie de l’adresse. Envoyer le visiteur directement à l’adresse finale épargne ces allers-retours. Le premier saut de http vers https sur le même hôte n’est pas compté : c’est la bonne première étape.',

  flag_slow_redirects: 'Les redirections sont lentes',
  fd_slow_redirects: 'Les redirections à elles seules ont pris plus d’une seconde, avant même que la page elle-même ne commence à charger.',

  flag_connection_failed: 'Un saut n’a pas répondu',
  fd_connection_failed: 'La chaîne se rompt ici : l’adresse suivante ne s’est pas résolue, a refusé la connexion ou n’a pas répondu à temps. Les visiteurs voient une page d’erreur.',

  flag_redirect_to_private_network: 'Pointe vers un réseau privé',
  fd_redirect_to_private_network: 'Un saut envoie le visiteur vers une adresse située dans un réseau privé, ou vers un nom qui n’existe qu’à l’intérieur d’un tel réseau. Personne sur internet ne peut la suivre, et la redirection elle-même révèle quelque chose de l’organisation interne. Ce service ne la suit pas non plus.',

  flag_location_malformed: 'Un Location impossible à analyser',
  fd_location_malformed: 'La redirection pointe vers quelque chose qui n’est pas une adresse. Les navigateurs affichent une erreur.',

  flag_multiple_location_headers: 'Deux en-têtes Location différents',
  fd_multiple_location_headers: 'La réponse porte plus d’un en-tête Location, et ils se contredisent. Chrome refuse d’emblée une telle redirection ; d’autres clients choisissent l’un d’eux. Ici, c’est le premier qui a été suivi.',

  flag_redirect_without_location: 'Un code de redirection qui ne mène nulle part',
  fd_redirect_without_location: 'Le code annonce une redirection, mais il n’y a pas d’en-tête Location. Les navigateurs affichent le corps qui l’accompagne, c’est-à-dire le plus souvent rien.',

  flag_location_unencoded: 'Un Location avec des caractères bruts',
  fd_location_unencoded: 'L’en-tête Location contient des espaces ou des caractères non ASCII sans encodage par pourcentage. Les navigateurs le réparent ; d’autres clients, proxys et bibliothèques peuvent ne pas le faire.',

  flag_unsafe_redirect_target: 'Une redirection vers un schéma que les navigateurs refusent',
  fd_unsafe_redirect_target: 'La chaîne pointe vers une adresse javascript:, data: ou file:. Les navigateurs refusent de suivre une redirection vers ce type d’adresse.',

  flag_leaves_the_web: 'Passe la main à une application',
  fd_leaves_the_web: 'La chaîne aboutit à une adresse qui n’est pas une page web — tg://, mailto:, intent:, un lien vers une boutique d’applications. Un navigateur propose d’ouvrir l’application ; la suite ne relève plus du web.',

  flag_ends_in_client_error: 'Aboutit à une page d’erreur',
  fd_ends_in_client_error: 'La page finale répond avec un code 4xx — introuvable, disparue, interdite. Le lien ne mène nulle part.',

  flag_ends_in_server_error: 'Aboutit à une erreur du serveur',
  fd_ends_in_server_error: 'La page finale répond avec un code 5xx. C’est peut-être temporaire ; tant que cela dure, le lien est rompu.',

  flag_redirect_status_not_followed: 'Un code 3xx que les navigateurs ne suivent pas',
  fd_redirect_status_not_followed: '300, 304, 305 et 306 sont des codes 3xx, mais pas des redirections pour un navigateur : le Location qu’ils portent éventuellement est ignoré.',

  flag_bot_challenge: 'Une vérification anti-robot a répondu à la place du site',
  fd_bot_challenge: 'Un service de protection a répondu par un défi destiné aux clients automatisés. Un navigateur qui le réussit peut être envoyé ailleurs ; ce qui suit est ce que voit un script.',

  flag_https_downgrade: 'Retour de https à http',
  fd_https_downgrade: 'Un saut passe d’une adresse chiffrée à une adresse en clair. À partir de là, la requête et tout cookie non marqué Secure traversent le réseau en clair, et les navigateurs cessent d’envoyer le Referer.',

  flag_late_https_upgrade: 'Le passage à https arrive tard',
  fd_late_https_upgrade: 'La chaîne atteint bien https, mais seulement après un autre saut en http en clair. Ce saut traverse le réseau sans chiffrement, avec les cookies du visiteur. Redirigez d’abord vers https sur le même hôte, puis n’importe où ailleurs.',

  flag_upgrade_changes_host: 'Le passage à https change aussi d’hôte',
  fd_upgrade_changes_host: 'Le premier saut en https mène à un autre nom. Cela fonctionne, mais l’en-tête HSTS du nom que le visiteur a saisi n’est jamais reçu, et le préchargement de ce nom exige que le passage à https se fasse d’abord sur ce nom même.',

  flag_ends_on_http: 'Aboutit en http en clair',
  fd_ends_on_http: 'La page finale est servie sans chiffrement.',

  flag_certificate_invalid: 'Un certificat qu’un navigateur rejetterait',
  fd_certificate_invalid: 'Un saut en https présente un certificat qui a expiré, qui désigne un autre hôte ou qui n’a pas été émis par une autorité de confiance. Un navigateur s’arrête ici sur une page d’avertissement ; la chaîne a quand même été suivie au-delà, pour montrer où elle mène.',

  flag_temporary_canonicalization: 'Une redirection temporaire là où il en faut une permanente',
  fd_temporary_canonicalization: 'Le saut ne fait que mettre l’adresse en ordre — le schéma, un www, une barre oblique finale — et se dit temporaire. Les navigateurs ne le retiendront pas et les moteurs de recherche gardent les deux adresses. Le code qui convient ici est 301 ou 308.',

  flag_permanent_redirect_cached: 'Une redirection permanente sans expiration',
  fd_permanent_redirect_cached: 'Un 301 ou un 308 sans Cache-Control ni Expires est conservé par les navigateurs aussi longtemps qu’ils le veulent. S’il s’avère un jour erroné, tous ceux qui l’ont vu continuent d’aller vers l’ancienne cible. Un max-age permet de rattraper une erreur.',

  flag_meta_refresh: 'Un meta refresh',
  fd_meta_refresh: 'La page envoie les visiteurs ailleurs avec <meta http-equiv="refresh">. Les navigateurs le suivent, mais seulement une fois la page chargée, et les moteurs de recherche traitent un meta refresh différé comme une redirection temporaire.',

  flag_refresh_header: 'Un en-tête Refresh',
  fd_refresh_header: 'La réponse envoie les visiteurs ailleurs avec un en-tête Refresh. Les navigateurs le respectent, mais il n’a jamais été normalisé dans HTTP, et beaucoup d’autres clients l’ignorent.',

  flag_javascript_redirect: 'Une redirection par script',
  fd_javascript_redirect: 'La page est vide, à part un script qui change l’adresse. Les clients qui n’exécutent aucun script — la plupart des aperçus de liens, de nombreux robots d’exploration, curl — restent sur la page vide. La redirection a été repérée dans le code source : ce service n’exécute pas de scripts.',

  flag_script_redirect_not_followed: 'Un script peut envoyer les visiteurs ailleurs',
  fd_script_redirect_not_followed: 'Quelque part dans ses scripts, la page finale change l’adresse. Ce changement peut dépendre d’une condition, il n’a donc pas été suivi ; un navigateur peut malgré tout s’y rendre.',

  flag_redirect_sets_cookies: 'Des cookies posés pendant les redirections',
  fd_redirect_sets_cookies: 'Des sauts précédant la page finale posent des cookies. C’est courant pour le suivi et pour les parcours de consentement ou de connexion ; bon à savoir quand le lien est partagé.',

  flag_cookie_rejected: 'Un cookie qu’un navigateur refuserait',
  fd_cookie_rejected: 'Un Set-Cookie enfreint une règle que les navigateurs appliquent : un Domain auquel l’hôte n’appartient pas, Secure en http, un préfixe __Host- ou __Secure- sans ses conditions, SameSite=None sans Secure. Le navigateur l’écarte, et une connexion ou un consentement qui en dépend échoue en silence.',

  flag_query_lost: 'Des paramètres d’URL perdus en route',
  fd_query_lost: 'Des paramètres présents au départ du lien manquent dans l’adresse finale. Les paramètres de suivi comme utm_source en sont les victimes habituelles : la visite est comptée comme directe.',

  flag_path_lost: 'Aboutit à la page d’accueil',
  fd_path_lost: 'Le lien visait une page précise et la chaîne aboutit à la racine du site. C’est typique d’un déménagement qui redirige tout vers la page d’accueil : visiteurs et moteurs de recherche perdent la page qu’ils cherchaient.',

  flag_lands_on_another_site: 'Aboutit à un autre site',
  fd_lands_on_another_site: 'Le lien part d’un site et aboutit à un autre. C’est attendu pour les liens courts et les liens publicitaires ; dans les autres cas, cela vaut un coup d’œil.',

  flag_canonical_elsewhere: 'La page finale indique une autre adresse canonique',
  fd_canonical_elsewhere: 'La page où aboutit la chaîne déclare une autre adresse comme canonique. Les moteurs de recherche peuvent indexer plutôt celle-là : c’est donc vers elle qu’il vaut mieux faire pointer les liens.',

  flag_final_noindex: 'La page finale est exclue de l’index',
  fd_final_noindex: 'La page où aboutit la chaîne demande aux moteurs de recherche de ne pas l’indexer, par une balise meta robots ou un en-tête X-Robots-Tag.',
};

OWN.de = {
  title: 'Weiterleitungs-Prüfung — jeder Sprung eines Links bis zum Ziel',
  title_short: 'Weiterleitungs-Prüfung',
  h1: 'Weiterleitungs-Prüfung',
  subtitle: 'Jeder Sprung eines Links bis zum Ziel: der Statuscode, wohin er zeigt, wer geantwortet hat, wie lange er gedauert hat, das Zertifikat und die Cookies — meta refresh und Skript-Weiterleitungen eingeschlossen',
  ph_url: 'example.com/eine/seite',
  hero_label: 'Geprüfter Link',
  hero_count: 'Weiterleitungen',
  empty_hint: 'Fügen Sie einen Link ein — einen kurzen, einen Werbelink mit allen Tracking-Parametern, eine alte Adresse nach einem Website-Umzug. Die Prüfung folgt ihm Sprung für Sprung, so wie es ein Browser täte, und zeigt jeden Schritt: den Statuscode, wohin er zeigte, wer geantwortet hat, wie lange er gedauert hat, das Zertifikat und die Cookies. Auch ein meta refresh oder eine Skript-Weiterleitung zählt als Sprung.',
  label_client: 'Anfragen als',
  label_cookies: 'Cookies behalten',
  btn_copy_chain: 'Als Text kopieren',

  /* ---- Phasen ---- */
  stage_follow: 'Link wird verfolgt',
  stage_analyse: 'Weg wird ausgewertet',
  progress_hops: 'Sprünge bisher: {n}',

  /* ---- Karten ---- */
  card_journey: 'Der Weg',
  card_summary: 'Wohin der Link führt',
  card_client: 'Wer angefragt hat',
  note_journey: 'Jeder Sprung ist eine neue Verbindung, seine Zeiten zeigen also, was ein erster Besuch kostet; ein Browser verwendet die Verbindung für Sprünge auf demselben Host wieder. Hervorgehoben ist der Teil der Adresse, den der Sprung geändert hat.',

  k_destination: 'Landet auf',
  k_outcome: 'Ergebnis',
  k_redirects: 'Weiterleitungen',
  k_time_total: 'Zeit, alle Anfragen',
  k_time_redirects: 'Davon Weiterleitungen',
  k_hosts: 'Hosts auf dem Weg',
  k_client: 'Client',
  k_user_agent: 'User-Agent',
  k_language: 'Accept-Language',
  k_cookies: 'Cookies',

  v_no_redirects: 'keine — der Link führt direkt ans Ziel',
  v_requests: 'Anfragen: {n}',
  v_not_sent: 'nicht gesendet',
  v_cookies_kept: 'zwischen den Sprüngen behalten, wie es ein Browser tut',
  v_cookies_forgotten: 'zwischen den Sprüngen vergessen, wie es ein Crawler tut',
  v_cookies_off: 'ohne Cookies',
  v_session: 'Sitzungsende',
  v_deleted: 'gelöscht',
  v_truncated: 'abgeschnitten',
  v_ports: 'Ports, mit denen sich dieser Dienst verbindet: {list}.',
  note_client: 'Die Prüfung fragt in der Sprache der Oberfläche an, so wie es Ihr eigener Browser täte; eine Website, die nach Sprache weiterleitet, tut das also auch hier. Außerdem fragt sie von einem einzigen Ort aus an, sodass eine Weiterleitung nach Land die Antwort für diesen Ort zeigt.',
  note_crawler: 'Ein Crawler wird allein über seinen User-Agent nachgeahmt. Eine Website, die Crawler per Reverse-DNS überprüft, sieht diesen Server statt Google oder Yandex und hält die Anfrage womöglich für eine Fälschung.',
  empty_flags: 'Nichts zu melden.',
  at_steps: 'Schritt {n}',
  incomplete_chain: 'Die Kette wurde so weit verfolgt, wie dieser Dienst reicht, und bricht vor ihrem Ende ab:',

  /* ---- ein Sprung ---- */
  hop_details: 'Details',
  hop_final: 'Ziel',
  hop_failed: 'keine Antwort',
  hop_stopped: 'nicht verfolgt',
  hop_timing: 'Wohin die Zeit ging',
  hop_location: 'Location, wie gesendet',
  hop_address: 'Adresse',
  hop_http: 'Protokoll',
  hop_server: 'Server',
  hop_through: 'Antwort kam über',
  hop_tls: 'TLS',
  hop_cert: 'Zertifikat',
  hop_cert_ok: 'vertrauenswürdig',
  hop_cert_bad: 'nicht vertrauenswürdig — ein Browser bleibt hier mit einer Warnung stehen',
  hop_cert_for: 'Ausgestellt für',
  hop_cert_issuer: 'Ausgestellt von',
  hop_cert_until: 'Gültig bis',
  hop_cookies_sent: 'Gesendete Cookies',
  hop_cookies_set: 'Gesetzte Cookies',
  hop_sets_cookies: 'gesetzte Cookies: {n}',
  hop_headers: 'Antwort-Header',
  hop_page: 'Die Seite',
  hop_title: 'Titel',
  hop_canonical: 'Kanonische Adresse',
  hop_robots: 'Robots',
  hop_refresh: 'Refresh',
  hop_refresh_slow: 'auf {url} nach {s} s — zu langsam, um als Weiterleitung zu gelten',
  hop_noscript: 'Refresh ohne Skript',
  hop_scripts: 'Skript-Weiterleitungen im Quelltext',
  hop_body: 'Gelesen',
  hop_relative: 'relative Adresse',
  hop_fragment: 'Fragment übernommen',
  hop_multiple: 'mehrere Location-Header',
  hop_not_followed: 'nicht verfolgt',
  hop_loop: 'zurück zu Schritt {n}',
  note_cookie_values: 'Die Werte werden nicht angezeigt: Ein Cookie, das während einer Weiterleitung gesetzt wird, enthält oft eine Sitzungskennung.',
  th_name: 'Name',
  th_scope: 'Domain und Pfad',
  th_flags: 'Attribute',
  th_expires: 'Ablauf',
  unit_ms: 'ms',
  unit_s: 's',
  unit_kb: 'KB',

  t_dns: 'DNS',
  t_connect: 'Verbindung',
  t_tls: 'TLS',
  t_wait: 'Server',

  /* ---- wie ein Sprung weitergeht ---- */
  rt_http: 'HTTP-Weiterleitung',
  rt_refresh_header: 'Refresh-Header',
  rt_meta_refresh: 'meta refresh',
  rt_javascript: 'Skript, im Quelltext gefunden',

  sc_301: 'dauerhaft; ein Browser darf POST in GET umwandeln',
  sc_302: 'vorübergehend; ein Browser darf POST in GET umwandeln',
  sc_303: 'siehe andere Adresse; wird immer mit GET abgerufen',
  sc_307: 'vorübergehend; Methode und Body bleiben erhalten',
  sc_308: 'dauerhaft; Methode und Body bleiben erhalten',

  /* ---- Ergebnisse ---- */
  out_arrived: 'kommt an',
  out_client_error: 'endet auf einer Fehlerseite',
  out_server_error: 'endet mit einem Serverfehler',
  out_loop: 'läuft im Kreis',
  out_too_many_redirects: 'mehr Weiterleitungen, als ein Browser folgt',
  out_failed: 'bricht ab: Sprung ohne Antwort',
  out_refused: 'stoppt an einer Adresse, der dieser Dienst nicht folgt',
  out_broken_redirect: 'bricht ab: Location ist keine Adresse',
  out_unsafe_redirect: 'endet mit einer Weiterleitung, die Browser verweigern',
  out_left_web: 'übergibt an eine App',
  out_incomplete: 'vom Zeitlimit abgebrochen',

  /* ---- Clients ---- */
  ua_chrome: 'Chrome, Desktop',
  ua_iphone: 'Safari, iPhone',
  ua_android: 'Chrome, Android',
  ua_googlebot: 'Googlebot',
  ua_yandexbot: 'YandexBot',
  ua_bingbot: 'Bingbot',
  ua_curl: 'curl',

  /* ---- Cookies, die ein Browser ablehnt ---- */
  ck_too_large: 'abgelehnt: über 4 KB',
  ck_empty: 'abgelehnt: leer',
  ck_domain_mismatch: 'abgelehnt: eine Domain, zu der der Host nicht gehört',
  ck_public_suffix: 'abgelehnt: Domain ist eine Top-Level-Domain',
  ck_secure_over_http: 'abgelehnt: Secure über http gesetzt',
  ck_prefix_secure: 'abgelehnt: __Secure- ohne Secure über https',
  ck_prefix_host: 'abgelehnt: __Host- verlangt Secure, Path=/ und keine Domain',
  ck_samesite_none_insecure: 'abgelehnt: SameSite=None ohne Secure',

  /* ---- was sich nicht feststellen ließ ---- */
  inc_deadline: 'das Zeitlimit lief ab, bevor die Kette endete',
  inc_port_not_followed: 'ein Sprung zeigt auf einen Port, mit dem sich dieser Dienst nicht verbindet',
  inc_credentials_not_followed: 'ein Sprung trägt Benutzername und Passwort in der Adresse',
  inc_url_too_long: 'ein Sprung zeigt auf eine Adresse, die für diesen Dienst zu lang ist',

  /* ---- Fehler ---- */
  err_invalid_host: 'Das sieht nicht nach einer Webadresse aus.',
  err_url_too_long: 'Diese Adresse ist für diesen Dienst zu lang.',
  err_scheme_not_supported: 'Geprüft werden können nur http- und https-Adressen.',
  err_credentials_not_allowed: 'Entfernen Sie Benutzername und Passwort aus der Adresse: Dieser Dienst schickt sie nirgendwohin.',
  err_unknown_client: 'Unbekannter Client. Möglich sind: chrome, iphone, android, googlebot, yandexbot, bingbot, curl.',
  err_connection_refused: 'Der Server hat die Verbindung abgewiesen.',
  err_connection_reset: 'Die Verbindung wurde getrennt.',
  err_connection_failed: 'Die Verbindung ist fehlgeschlagen.',
  err_malformed_response: 'Die Antwort war kein gültiges HTTP.',
  err_tls_failed: 'Der TLS-Handshake ist fehlgeschlagen.',
  err_deadline: 'Das Zeitlimit lief vor diesem Sprung ab.',

  /* ---- Befunde ---- */
  flag_redirect_loop: 'Die Kette läuft im Kreis',
  fd_redirect_loop: 'Ein Sprung schickt die Anfrage mit denselben Cookies an eine Adresse zurück, die die Kette schon besucht hat — die Antwort kann sich also nur wiederholen. Browser geben mit „zu viele Weiterleitungen“ auf; Crawler lassen den Link fallen.',

  flag_redirect_loop_without_cookies: 'Eine Schleife für Clients ohne Cookies',
  fd_redirect_loop_without_cookies: 'Ohne Cookies kehrt die Kette an ihren Ausgangspunkt zurück. Ein Browser, der das von der Website gesetzte Cookie behält, kommt womöglich durch — Crawler aber behalten keine Cookies, und genau diese Schleife sehen sie.',

  flag_too_many_redirects: 'Mehr Weiterleitungen, als ein Browser folgt',
  fd_too_many_redirects: 'Chrome und Firefox hören nach zwanzig Weiterleitungen auf und zeigen einen Fehler. Diese Kette ging noch weiter.',

  flag_beyond_googlebot_limit: 'Länger, als Googlebot folgt',
  fd_beyond_googlebot_limit: 'Googlebot folgt bis zu zehn Weiterleitungen hintereinander. Danach wird die Seite über diesen Link nicht gecrawlt, und die Search Console meldet einen Weiterleitungsfehler.',

  flag_long_chain: 'Eine lange Kette',
  fd_long_chain: 'Drei oder mehr Weiterleitungen vor der Seite. Jede ist ein weiterer Hin- und Rückweg, bevor irgendetwas zu laden beginnt, und Suchmaschinen bevorzugen einen einzigen Sprung direkt zur Zieladresse.',

  flag_could_be_one_redirect: 'Sprünge, die einer sein könnten',
  fd_could_be_one_redirect: 'Mehrere Weiterleitungen innerhalb einer Website, und jede räumt ihren eigenen Teil der Adresse auf. Wer den Besucher direkt zur Zieladresse schickt, spart diese Hin- und Rückwege. Der erste Sprung von http zu https auf demselben Host zählt nicht mit: Er ist der richtige erste Schritt.',

  flag_slow_redirects: 'Die Weiterleitungen sind langsam',
  fd_slow_redirects: 'Allein die Weiterleitungen dauerten länger als eine Sekunde — bevor die Seite selbst überhaupt zu laden begann.',

  flag_connection_failed: 'Ein Sprung hat nicht geantwortet',
  fd_connection_failed: 'Hier bricht die Kette ab: Die nächste Adresse ließ sich nicht auflösen, hat die Verbindung abgewiesen oder nicht rechtzeitig geantwortet. Besucher sehen eine Fehlerseite.',

  flag_redirect_to_private_network: 'Zeigt in ein privates Netz',
  fd_redirect_to_private_network: 'Ein Sprung schickt den Besucher an eine Adresse in einem privaten Netz oder an einen Namen, den es nur dort gibt. Niemand im Internet kann ihr folgen, und die Weiterleitung selbst verrät etwas über den internen Aufbau. Auch dieser Dienst folgt ihr nicht.',

  flag_location_malformed: 'Ein Location-Header, der sich nicht auswerten lässt',
  fd_location_malformed: 'Die Weiterleitung zeigt auf etwas, das keine Adresse ist. Browser zeigen einen Fehler.',

  flag_multiple_location_headers: 'Zwei verschiedene Location-Header',
  fd_multiple_location_headers: 'Die Antwort enthält mehr als einen Location-Header, und sie widersprechen sich. Chrome lehnt eine solche Weiterleitung rundweg ab; andere Clients nehmen einen davon. Hier wurde dem ersten gefolgt.',

  flag_redirect_without_location: 'Ein Weiterleitungsstatus ohne Ziel',
  fd_redirect_without_location: 'Der Status sagt „Weiterleitung“, aber es gibt keinen Location-Header. Browser zeigen, was als Inhalt mitkam, und das ist meist nichts.',

  flag_location_unencoded: 'Ein Location-Header mit rohen Zeichen',
  fd_location_unencoded: 'Der Location-Header enthält Leerzeichen oder Nicht-ASCII-Zeichen ohne Prozentkodierung. Browser reparieren das; andere Clients, Proxys und Bibliotheken womöglich nicht.',

  flag_unsafe_redirect_target: 'Eine Weiterleitung auf ein Schema, das Browser verweigern',
  fd_unsafe_redirect_target: 'Die Kette zeigt auf eine javascript:-, data:- oder file:-Adresse. Browser weigern sich, einer Weiterleitung dorthin zu folgen.',

  flag_leaves_the_web: 'Übergibt an eine App',
  fd_leaves_the_web: 'Die Kette endet auf einer Adresse, die keine Webseite ist — tg://, mailto:, intent:, ein Link in einen App-Store. Ein Browser bietet an, die App zu öffnen; was dann geschieht, ist keine Frage des Webs mehr.',

  flag_ends_in_client_error: 'Endet auf einer Fehlerseite',
  fd_ends_in_client_error: 'Die Zielseite antwortet mit einem 4xx-Status — nicht gefunden, entfernt, verboten. Der Link führt ins Leere.',

  flag_ends_in_server_error: 'Endet mit einem Serverfehler',
  fd_ends_in_server_error: 'Die Zielseite antwortet mit einem 5xx-Status. Das kann vorübergehend sein; solange es anhält, ist der Link kaputt.',

  flag_redirect_status_not_followed: 'Ein 3xx-Status, dem Browser nicht folgen',
  fd_redirect_status_not_followed: '300, 304, 305 und 306 sind 3xx-Codes, für einen Browser aber keine Weiterleitungen: Ein mitgesendeter Location-Header wird ignoriert.',

  flag_bot_challenge: 'Statt der Website antwortete eine Bot-Abwehr',
  fd_bot_challenge: 'Ein Schutzdienst hat mit einer Hürde für automatisierte Clients geantwortet. Ein Browser, der sie überwindet, wird womöglich woandershin geschickt; was folgt, ist das, was ein Skript sieht.',

  flag_https_downgrade: 'Von https zurück auf http',
  fd_https_downgrade: 'Ein Sprung führt von einer verschlüsselten Adresse zu einer unverschlüsselten. Von dort gehen die Anfrage und jedes nicht als Secure markierte Cookie im Klartext über das Netz, und Browser senden keinen Referer mehr.',

  flag_late_https_upgrade: 'Der Wechsel auf https kommt spät',
  fd_late_https_upgrade: 'Die Kette erreicht https zwar, aber erst nach einem weiteren Sprung über unverschlüsseltes http. Dieser Sprung geht unverschlüsselt über das Netz, samt den Cookies des Besuchers. Leiten Sie zuerst auf https beim selben Host weiter und erst dann woandershin.',

  flag_upgrade_changes_host: 'Der Wechsel auf https ändert auch den Host',
  fd_upgrade_changes_host: 'Der erste https-Sprung führt zu einem anderen Namen. Das funktioniert, aber HSTS für den Namen, den der Besucher eingegeben hat, kommt nie an, und damit dieser Name in die Preload-Liste kann, muss der Wechsel auf https zuerst auf ihm selbst stattfinden.',

  flag_ends_on_http: 'Endet auf unverschlüsseltem http',
  fd_ends_on_http: 'Die Zielseite wird ohne Verschlüsselung ausgeliefert.',

  flag_certificate_invalid: 'Ein Zertifikat, das ein Browser ablehnen würde',
  fd_certificate_invalid: 'Ein https-Sprung zeigt ein Zertifikat, das abgelaufen ist, einen anderen Host nennt oder nicht von einer vertrauenswürdigen Zertifizierungsstelle ausgestellt wurde. Ein Browser bleibt hier auf einer Warnseite stehen; die Kette dahinter wurde trotzdem verfolgt, um zu zeigen, wohin sie führt.',

  flag_temporary_canonicalization: 'Eine vorübergehende Weiterleitung, wo eine dauerhafte gemeint ist',
  fd_temporary_canonicalization: 'Der Sprung räumt nur die Adresse auf — das Schema, ein www, einen abschließenden Schrägstrich — und nennt sich vorübergehend. Browser merken ihn sich nicht, und Suchmaschinen behalten beide Adressen. Der richtige Status dafür ist 301 oder 308.',

  flag_permanent_redirect_cached: 'Eine dauerhafte Weiterleitung ohne Ablaufzeit',
  fd_permanent_redirect_cached: 'Ein 301 oder 308 ohne Cache-Control oder Expires wird von Browsern so lange behalten, wie sie wollen. Stellt er sich je als falsch heraus, landen alle, die ihn schon gesehen haben, weiter beim alten Ziel. Ein max-age macht einen Fehler behebbar.',

  flag_meta_refresh: 'Ein meta refresh',
  fd_meta_refresh: 'Die Seite schickt Besucher mit <meta http-equiv="refresh"> weiter. Browser folgen dem, aber erst, wenn die Seite geladen ist, und Suchmaschinen behandeln einen verzögerten meta refresh als vorübergehende Weiterleitung.',

  flag_refresh_header: 'Ein Refresh-Header',
  fd_refresh_header: 'Die Antwort schickt Besucher mit einem Refresh-Header weiter. Browser befolgen ihn, aber er wurde nie als Teil von HTTP standardisiert, und viele andere Clients ignorieren ihn.',

  flag_javascript_redirect: 'Eine Skript-Weiterleitung',
  fd_javascript_redirect: 'Die Seite ist leer bis auf ein Skript, das die Adresse ändert. Clients, die kein Skript ausführen — die meisten Linkvorschauen, viele Crawler, curl —, bleiben auf der leeren Seite. Die Weiterleitung wurde im Quelltext gefunden: Dieser Dienst führt keine Skripte aus.',

  flag_script_redirect_not_followed: 'Ein Skript schickt Besucher womöglich weiter',
  fd_script_redirect_not_followed: 'Die Zielseite ändert irgendwo in ihren Skripten die Adresse. Das kann hinter einer Bedingung stehen, deshalb wurde dem nicht gefolgt; ein Browser landet womöglich trotzdem dort.',

  flag_redirect_sets_cookies: 'Während der Weiterleitungen gesetzte Cookies',
  fd_redirect_sets_cookies: 'Sprünge vor der Zielseite setzen Cookies. Üblich für Tracking und für Einwilligungs- oder Anmeldeabläufe; gut zu wissen, wenn der Link geteilt wird.',

  flag_cookie_rejected: 'Ein Cookie, das ein Browser ablehnen würde',
  fd_cookie_rejected: 'Ein Set-Cookie verstößt gegen eine Regel, die Browser durchsetzen: eine Domain, zu der der Host nicht gehört, Secure über http, ein Präfix __Host- oder __Secure- ohne seine Bedingungen, SameSite=None ohne Secure. Der Browser verwirft das Cookie, und eine Anmeldung oder Einwilligung, die davon abhängt, scheitert stillschweigend.',

  flag_query_lost: 'URL-Parameter gehen unterwegs verloren',
  fd_query_lost: 'Parameter, mit denen der Link begann, fehlen in der Zieladresse. Meist trifft es Tracking-Parameter wie utm_source: Der Besuch wird als direkter Aufruf gezählt.',

  flag_path_lost: 'Endet auf der Startseite',
  fd_path_lost: 'Der Link zeigte auf eine bestimmte Seite, und die Kette endet im Wurzelverzeichnis der Website. Typisch nach einem Umzug, bei dem alles auf die Startseite weitergeleitet wird: Besucher wie Suchmaschinen verlieren die Seite, die sie gesucht haben.',

  flag_lands_on_another_site: 'Endet auf einer anderen Website',
  fd_lands_on_another_site: 'Der Link beginnt auf einer Website und endet auf einer anderen. Bei Kurzlinks und Werbelinks ist das zu erwarten; sonst lohnt ein Blick.',

  flag_canonical_elsewhere: 'Die Zielseite nennt eine andere kanonische Adresse',
  fd_canonical_elsewhere: 'Die Seite, auf der die Kette endet, gibt eine andere Adresse als kanonisch an. Suchmaschinen indexieren womöglich stattdessen jene, deshalb verlinkt man besser gleich dorthin.',

  flag_final_noindex: 'Die Zielseite ist von der Indexierung ausgeschlossen',
  fd_final_noindex: 'Die Seite, auf der die Kette endet, bittet Suchmaschinen, sie nicht zu indexieren — per Robots-Meta-Tag oder X-Robots-Tag-Header.',
};

OWN.tr = {
  title: 'Yönlendirme denetimi — bir bağlantının varana dek yaptığı her sıçrama',
  title_short: 'Yönlendirme denetimi',
  h1: 'Yönlendirme denetimi',
  subtitle: 'Bir bağlantının varana dek yaptığı her sıçrama: durum kodu, nereye yönlendirdiği, kimin yanıt verdiği, ne kadar sürdüğü, sertifika ve çerezler — meta refresh ve betik yönlendirmeleri de dâhil',
  ph_url: 'example.com/bir/sayfa',
  hero_label: 'Denetlenen bağlantı',
  hero_count: 'yönlendirme',
  empty_hint: 'Bir bağlantı yapıştırın — kısa bir bağlantı, tüm izleme parametreleriyle bir reklam bağlantısı, taşınmadan sonra kalmış eski bir adres. Denetim, bir tarayıcının yapacağı gibi onu sıçrama sıçrama izler ve her adımı gösterir: durum kodunu, nereye yönlendirdiğini, kimin yanıt verdiğini, ne kadar sürdüğünü, sertifikayı ve çerezleri. Bir meta refresh ya da betik yönlendirmesi de bir sıçrama sayılır.',
  label_client: 'Soran istemci',
  label_cookies: 'Çerezleri sakla',
  btn_copy_chain: 'Metin olarak kopyala',

  /* ---- aşamalar ---- */
  stage_follow: 'bağlantı izleniyor',
  stage_analyse: 'yolculuk inceleniyor',
  progress_hops: 'izlenen sıçrama: {n}',

  /* ---- kartlar ---- */
  card_journey: 'Yolculuk',
  card_summary: 'Nereye varıyor',
  card_client: 'Kim sordu',
  note_journey: 'Her sıçrama yeni bir bağlantıdır; bu yüzden süreleri bir ilk ziyaretin bedelini gösterir, tarayıcı ise aynı sunucudaki sıçramalar için bağlantıyı yeniden kullanır. Adresin, sıçramanın değiştirdiği kısmı vurgulanmıştır.',

  k_destination: 'Varış adresi',
  k_outcome: 'Sonuç',
  k_redirects: 'Yönlendirmeler',
  k_time_total: 'Süre, tüm istekler',
  k_time_redirects: 'Yönlendirmelere giden',
  k_hosts: 'Yoldaki sunucular',
  k_client: 'İstemci',
  k_user_agent: 'User-Agent',
  k_language: 'Accept-Language',
  k_cookies: 'Çerezler',

  v_no_redirects: 'yok — bağlantı doğrudan hedefe gidiyor',
  v_requests: 'istek: {n}',
  v_not_sent: 'gönderilmedi',
  v_cookies_kept: 'tarayıcıdaki gibi sıçramalar arasında saklanır',
  v_cookies_forgotten: 'tarama botundaki gibi sıçramalar arasında unutulur',
  v_cookies_off: 'çerezsiz',
  v_session: 'oturum sonunda',
  v_deleted: 'silindi',
  v_truncated: 'yarıda kesildi',
  v_ports: 'Bu hizmetin bağlandığı bağlantı noktaları: {list}.',
  note_client: 'Denetim, kendi tarayıcınızın yapacağı gibi arayüz dilinde sorar; böylece dile göre yönlendiren bir site bunu yaparken görülür. Ayrıca tek bir yerden sorar; bu yüzden ülkeye göre yapılan bir yönlendirme, o yer için verilen yanıtı gösterir.',
  note_crawler: 'Tarama botu yalnızca User-Agent dizesiyle taklit edilir. Tarama botlarını ters DNS ile doğrulayan bir site Google ya da Yandex’i değil bu sunucuyu görür ve isteği sahte sayabilir.',
  empty_flags: 'Bildirilecek bir şey yok.',
  at_steps: 'adım {n}',
  incomplete_chain: 'Zincir, bu hizmetin gidebildiği yere kadar izlendi, ama sonuna varılamadı:',

  /* ---- bir sıçrama ---- */
  hop_details: 'Ayrıntılar',
  hop_final: 'varış noktası',
  hop_failed: 'yanıt yok',
  hop_stopped: 'izlenmedi',
  hop_timing: 'Süre nereye harcandı',
  hop_location: 'Location, gönderildiği gibi',
  hop_address: 'Adres',
  hop_http: 'Protokol',
  hop_server: 'Sunucu',
  hop_through: 'Yanıtın geçtiği ağ',
  hop_tls: 'TLS',
  hop_cert: 'Sertifika',
  hop_cert_ok: 'güvenilir',
  hop_cert_bad: 'güvenilir değil — tarayıcı burada bir uyarıyla durur',
  hop_cert_for: 'Düzenlendiği adlar',
  hop_cert_issuer: 'Düzenleyen',
  hop_cert_until: 'Geçerlilik sonu',
  hop_cookies_sent: 'Gönderilen çerezler',
  hop_cookies_set: 'Kurulan çerezler',
  hop_sets_cookies: 'kurulan çerez: {n}',
  hop_headers: 'Yanıt başlıkları',
  hop_page: 'Sayfa',
  hop_title: 'Başlık',
  hop_canonical: 'Kanonik adres',
  hop_robots: 'Robots',
  hop_refresh: 'Refresh',
  hop_refresh_slow: '{s} sn sonra {url} adresine — yönlendirme sayılamayacak kadar yavaş',
  hop_noscript: 'Betiksiz Refresh',
  hop_scripts: 'Kaynak koddaki betik yönlendirmeleri',
  hop_body: 'Okunan',
  hop_relative: 'göreli',
  hop_fragment: 'parça devralındı',
  hop_multiple: 'birden çok Location başlığı',
  hop_not_followed: 'izlenmedi',
  hop_loop: '{n}. adıma geri',
  note_cookie_values: 'Değerler gösterilmez: yönlendirme sırasında kurulan bir çerez çoğu zaman bir oturumdur.',
  th_name: 'Ad',
  th_scope: 'Alan adı ve yol',
  th_flags: 'Öznitelikler',
  th_expires: 'Biter',
  unit_ms: 'ms',
  unit_s: 'sn',
  unit_kb: 'KB',

  t_dns: 'DNS',
  t_connect: 'bağlantı',
  t_tls: 'TLS',
  t_wait: 'sunucu',

  /* ---- sıçrama nasıl ilerler ---- */
  rt_http: 'HTTP yönlendirmesi',
  rt_refresh_header: 'Refresh başlığı',
  rt_meta_refresh: 'meta refresh',
  rt_javascript: 'betik, kaynak kodda bulundu',

  sc_301: 'kalıcı; tarayıcı POST’u GET’e çevirebilir',
  sc_302: 'geçici; tarayıcı POST’u GET’e çevirebilir',
  sc_303: 'başka kaynağa bakın; her zaman GET ile izlenir',
  sc_307: 'geçici; yöntem ve gövde korunur',
  sc_308: 'kalıcı; yöntem ve gövde korunur',

  /* ---- sonuçlar ---- */
  out_arrived: 'hedefe varıyor',
  out_client_error: 'bir hata sayfasında bitiyor',
  out_server_error: 'bir sunucu hatasında bitiyor',
  out_loop: 'döngüye giriyor',
  out_too_many_redirects: 'tarayıcının izlediğinden fazla yönlendirme',
  out_failed: 'kopuyor: bir sıçrama yanıt vermedi',
  out_refused: 'bu hizmetin izlemediği bir adreste duruyor',
  out_broken_redirect: 'adres olmayan bir Location başlığında kopuyor',
  out_unsafe_redirect: 'tarayıcıların reddettiği bir yönlendirmede bitiyor',
  out_left_web: 'bağlantıyı bir uygulamaya devrediyor',
  out_incomplete: 'süre sınırı nedeniyle yarıda kaldı',

  /* ---- istemciler ---- */
  ua_chrome: 'Chrome, masaüstü',
  ua_iphone: 'Safari, iPhone',
  ua_android: 'Chrome, Android',
  ua_googlebot: 'Googlebot',
  ua_yandexbot: 'YandexBot',
  ua_bingbot: 'Bingbot',
  ua_curl: 'curl',

  /* ---- tarayıcının reddettiği çerezler ---- */
  ck_too_large: 'reddedildi: 4 KB üzeri',
  ck_empty: 'reddedildi: boş',
  ck_domain_mismatch: 'reddedildi: sunucunun ait olmadığı bir Domain',
  ck_public_suffix: 'reddedildi: Domain bir üst düzey alan adı',
  ck_secure_over_http: 'reddedildi: http üzerinden Secure',
  ck_prefix_secure: 'reddedildi: __Secure- için https üzerinden Secure gerekir',
  ck_prefix_host: 'reddedildi: __Host- için Secure ve Path=/ gerekir, Domain olmamalı',
  ck_samesite_none_insecure: 'reddedildi: Secure olmadan SameSite=None',

  /* ---- belirlenemeyenler ---- */
  inc_deadline: 'süre sınırı zincir bitmeden doldu',
  inc_port_not_followed: 'bir sıçrama, bu hizmetin bağlanmadığı bir bağlantı noktasını gösteriyor',
  inc_credentials_not_followed: 'bir sıçramanın adresinde kullanıcı adı ve parola var',
  inc_url_too_long: 'bir sıçrama, bu hizmetin izleyebileceğinden uzun bir adresi gösteriyor',

  /* ---- hatalar ---- */
  err_invalid_host: 'Bu bir web adresine benzemiyor.',
  err_url_too_long: 'Bu adres, bu hizmetin izleyebileceğinden uzun.',
  err_scheme_not_supported: 'Yalnızca http ve https adresleri denetlenebilir.',
  err_credentials_not_allowed: 'Kullanıcı adını ve parolayı adresten çıkarın: bu hizmet onları hiçbir yere göndermez.',
  err_unknown_client: 'Bilinmeyen istemci. Şunlardan birini kullanın: chrome, iphone, android, googlebot, yandexbot, bingbot, curl.',
  err_connection_refused: 'Sunucu bağlantıyı reddetti.',
  err_connection_reset: 'Bağlantı koptu.',
  err_connection_failed: 'Bağlantı kurulamadı.',
  err_malformed_response: 'Yanıt geçerli HTTP değildi.',
  err_tls_failed: 'TLS el sıkışması başarısız oldu.',
  err_deadline: 'Süre sınırı bu sıçramadan önce doldu.',

  /* ---- bulgular ---- */
  flag_redirect_loop: 'Zincir döngüye giriyor',
  fd_redirect_loop: 'Bir sıçrama, isteği zincirin daha önce uğradığı bir adrese aynı çerezlerle geri gönderiyor; bu yüzden yanıt ancak kendini tekrarlayabilir. Tarayıcılar “çok fazla yönlendirme” hatasıyla vazgeçer, tarama botları bağlantıyı bırakır.',

  flag_redirect_loop_without_cookies: 'Çerezsiz istemciler için bir döngü',
  fd_redirect_loop_without_cookies: 'Çerezler olmadan zincir başladığı yere geri dönüyor. Sitenin kurduğu çerezi saklayan bir tarayıcı geçebilir — ama tarama botları çerez saklamaz, dolayısıyla onların gördüğü döngü budur.',

  flag_too_many_redirects: 'Tarayıcının izlediğinden fazla yönlendirme',
  fd_too_many_redirects: 'Chrome ve Firefox yirmi yönlendirmeden sonra durur ve hata gösterir. Bu zincir ise hâlâ sürüyordu.',

  flag_beyond_googlebot_limit: 'Googlebot’un izlediğinden uzun',
  fd_beyond_googlebot_limit: 'Googlebot art arda en fazla on yönlendirme izler. Bunun ötesinde sayfa bu bağlantı üzerinden taranmaz ve Search Console bir yönlendirme hatası bildirir.',

  flag_long_chain: 'Uzun bir zincir',
  fd_long_chain: 'Sayfadan önce üç ya da daha fazla yönlendirme var. Her biri, herhangi bir şey yüklenmeye başlamadan önce bir gidiş dönüş daha demek; arama motorları ise doğrudan son adrese giden tek bir sıçramayı tercih eder.',

  flag_could_be_one_redirect: 'Tek olabilecek sıçramalar',
  fd_could_be_one_redirect: 'Aynı site içinde, her biri adresin kendi kısmını düzelten birkaç yönlendirme. Ziyaretçiyi doğrudan son adrese göndermek bu gidiş dönüşlere gerek bırakmaz. Aynı sunucuda http’den https’e yapılan ilk sıçrama sayılmaz: doğru ilk adım odur.',

  flag_slow_redirects: 'Yönlendirmeler yavaş',
  fd_slow_redirects: 'Sayfanın kendisi yüklenmeye başlamadan önce, yalnızca yönlendirmeler bir saniyeden uzun sürdü.',

  flag_connection_failed: 'Bir sıçrama yanıt vermedi',
  fd_connection_failed: 'Zincir burada kopuyor: sonraki adres çözümlenmedi, bağlantıyı reddetti ya da zamanında yanıt vermedi. Ziyaretçiler bir hata sayfası görür.',

  flag_redirect_to_private_network: 'Özel bir ağa yönlendiriyor',
  fd_redirect_to_private_network: 'Bir sıçrama, ziyaretçiyi özel bir ağın içindeki bir adrese ya da yalnızca böyle bir ağın içinde var olan bir ada gönderiyor. İnternetteki hiç kimse bu yönlendirmeyi izleyemez; yönlendirmenin kendisi de iç yapı hakkında bir şeyler ele verir. Bu hizmet de onu izlemez.',

  flag_location_malformed: 'Ayrıştırılamayan bir Location',
  fd_location_malformed: 'Yönlendirme, adres olmayan bir şeye işaret ediyor. Tarayıcılar hata gösterir.',

  flag_multiple_location_headers: 'İki farklı Location başlığı',
  fd_multiple_location_headers: 'Yanıtta birden fazla Location var ve birbirini tutmuyor. Chrome böyle bir yönlendirmeyi doğrudan reddeder; diğer istemciler bunlardan birini seçer. Burada ilki izlendi.',

  flag_redirect_without_location: 'Gidecek yeri olmayan bir yönlendirme kodu',
  fd_redirect_without_location: 'Durum kodu yönlendirme diyor, ama Location başlığı yok. Tarayıcılar yanıtla birlikte gelen gövdeyi gösterir; o da genellikle boştur.',

  flag_location_unencoded: 'Ham karakterli bir Location',
  fd_location_unencoded: 'Location başlığı, yüzde kodlaması yapılmamış boşluklar ya da ASCII dışı karakterler içeriyor. Tarayıcılar bunu onarır; diğer istemciler, proxy’ler ve kitaplıklar onarmayabilir.',

  flag_unsafe_redirect_target: 'Tarayıcıların reddettiği bir şemaya yönlendirme',
  fd_unsafe_redirect_target: 'Zincir bir javascript:, data: ya da file: adresini gösteriyor. Tarayıcılar oraya giden bir yönlendirmeyi izlemeyi reddeder.',

  flag_leaves_the_web: 'Bağlantıyı bir uygulamaya devrediyor',
  fd_leaves_the_web: 'Zincir, web sayfası olmayan bir adreste bitiyor — tg://, mailto:, intent:, bir uygulama mağazası bağlantısı. Tarayıcı uygulamayı açmayı önerir; bundan sonrası artık bir web meselesi değil.',

  flag_ends_in_client_error: 'Bir hata sayfasında bitiyor',
  fd_ends_in_client_error: 'Son sayfa 4xx koduyla yanıt veriyor — bulunamadı, kaldırıldı, erişim yasak. Bağlantı hiçbir yere çıkmıyor.',

  flag_ends_in_server_error: 'Bir sunucu hatasında bitiyor',
  fd_ends_in_server_error: 'Son sayfa 5xx koduyla yanıt veriyor. Geçici olabilir; bu durum sürdükçe bağlantı bozuktur.',

  flag_redirect_status_not_followed: 'Tarayıcıların izlemediği bir 3xx kodu',
  fd_redirect_status_not_followed: '300, 304, 305 ve 306 birer 3xx kodudur, ama tarayıcı için yönlendirme değildir: taşıdıkları Location ne olursa olsun yok sayılır.',

  flag_bot_challenge: 'Site yerine bir bot denetimi yanıt verdi',
  fd_bot_challenge: 'Bir koruma hizmeti, otomatik istemcilere yönelik bir sınamayla yanıt verdi. Bunu geçen bir tarayıcı başka bir yere gönderilebilir; bundan sonrası bir betiğin gördüğüdür.',

  flag_https_downgrade: 'https’ten http’ye geri',
  fd_https_downgrade: 'Bir sıçrama şifreli bir adresten şifresiz bir adrese gidiyor. Bu noktadan sonra istek ve Secure işaretli olmayan her çerez ağı açık metin olarak geçer; tarayıcılar da Referer göndermeyi bırakır.',

  flag_late_https_upgrade: 'https’e geçiş gecikiyor',
  fd_late_https_upgrade: 'Zincir https’e varıyor, ama ancak şifresiz http üzerinden bir sıçrama daha yaptıktan sonra. O sıçrama, ziyaretçinin çerezleri iliştirilmiş olarak ağı şifresiz geçer. Önce aynı sunucuda https’e, sonra başka herhangi bir yere yönlendirin.',

  flag_upgrade_changes_host: 'https’e geçiş sunucuyu da değiştiriyor',
  fd_upgrade_changes_host: 'İlk https sıçraması başka bir ada gidiyor. Bu çalışır, ama ziyaretçinin yazdığı ad için HSTS hiç alınmaz; o adın ön yüklenmesi de geçişin önce o adın kendisinde yapılmasını gerektirir.',

  flag_ends_on_http: 'Şifresiz http’de bitiyor',
  fd_ends_on_http: 'Son sayfa şifrelenmeden sunuluyor.',

  flag_certificate_invalid: 'Tarayıcının reddedeceği bir sertifika',
  fd_certificate_invalid: 'Bir https sıçraması, süresi dolmuş, başka bir ad için düzenlenmiş ya da güvenilir bir sertifika otoritesinden gelmeyen bir sertifika sunuyor. Tarayıcı burada bir uyarı sayfasında durur; zincirin devamı, nereye çıktığını göstermek için yine de izlendi.',

  flag_temporary_canonicalization: 'Kalıcı olması gereken yerde geçici yönlendirme',
  fd_temporary_canonicalization: 'Sıçrama yalnızca adresi düzeltiyor — şema, bir www, sondaki eğik çizgi — ve kendini geçici diye tanıtıyor. Tarayıcılar onu hatırlamaz, arama motorları da iki adresi birden tutar. Bunun için doğru kod 301 ya da 308’dir.',

  flag_permanent_redirect_cached: 'Süresi belirtilmemiş kalıcı yönlendirme',
  fd_permanent_redirect_cached: 'Cache-Control ya da Expires içermeyen bir 301 veya 308’i tarayıcılar istedikleri kadar saklar. Bir gün yanlış olduğu ortaya çıkarsa, onu görmüş olan herkes eski hedefe gitmeyi sürdürür. max-age, bir hatayı geri alınabilir kılar.',

  flag_meta_refresh: 'Bir meta refresh',
  fd_meta_refresh: 'Sayfa ziyaretçileri <meta http-equiv="refresh"> ile ileri gönderiyor. Tarayıcılar bunu izler, ama ancak sayfa yüklendikten sonra; arama motorları da gecikmeli olanı geçici bir yönlendirme sayar.',

  flag_refresh_header: 'Bir Refresh başlığı',
  fd_refresh_header: 'Yanıt ziyaretçileri bir Refresh başlığıyla ileri gönderiyor. Tarayıcılar buna uyar, ama bu başlık HTTP standardına hiç girmedi ve diğer birçok istemci onu yok sayar.',

  flag_javascript_redirect: 'Bir betik yönlendirmesi',
  fd_javascript_redirect: 'Sayfa, adresi değiştiren bir betik dışında boş. Betik çalıştırmayan istemciler — çoğu bağlantı önizlemesi, birçok tarama botu, curl — boş sayfada kalır. Kaynak kodda bulundu: bu hizmet betik çalıştırmaz.',

  flag_script_redirect_not_followed: 'Bir betik ziyaretçileri ileri gönderebilir',
  fd_script_redirect_not_followed: 'Son sayfa, betiklerinin bir yerinde adresi değiştiriyor. Bu bir koşula bağlı olabilir, bu yüzden izlenmedi; bir tarayıcı yine de oraya gidebilir.',

  flag_redirect_sets_cookies: 'Yönlendirmeler sırasında kurulan çerezler',
  fd_redirect_sets_cookies: 'Son sayfadan önceki sıçramalar çerez kuruyor. İzleme için ve onay ya da oturum açma akışları için olağan bir durum; bağlantı paylaşılırken bilmekte yarar var.',

  flag_cookie_rejected: 'Tarayıcının reddedeceği bir çerez',
  fd_cookie_rejected: 'Bir Set-Cookie, tarayıcıların zorunlu kıldığı bir kuralı çiğniyor: sunucunun ait olmadığı bir Domain, http üzerinden Secure, koşulları karşılanmamış bir __Host- ya da __Secure- öneki, Secure olmadan SameSite=None. Tarayıcı bu çerezi atar ve ona dayanan bir oturum açma ya da onay akışı sessizce bozulur.',

  flag_query_lost: 'Sorgu parametreleri yolda kayboldu',
  fd_query_lost: 'Bağlantının başta taşıdığı parametreler son adreste yok. Genellikle kaybolan, utm_source gibi izleme parametreleridir: ziyaret doğrudan ziyaret olarak sayılır.',

  flag_path_lost: 'Ana sayfada bitiyor',
  fd_path_lost: 'Bağlantı belirli bir sayfayı gösteriyordu, zincir ise sitenin kökünde bitiyor. Her şeyi ana sayfaya yönlendiren bir taşınmanın ardından sık görülür: hem ziyaretçiler hem arama motorları aradıkları sayfayı kaybeder.',

  flag_lands_on_another_site: 'Başka bir sitede bitiyor',
  fd_lands_on_another_site: 'Bağlantı bir sitede başlıyor, başka bir sitede bitiyor. Kısa bağlantılar ve reklam bağlantıları için beklenen bir durum; bunlardan biri değilse göz atmaya değer.',

  flag_canonical_elsewhere: 'Son sayfa başka bir kanonik adres bildiriyor',
  fd_canonical_elsewhere: 'Zincirin bittiği sayfa, kanonik adresi olarak başka bir yeri gösteriyor. Arama motorları onun yerine o adresi dizine ekleyebilir; bu yüzden bağlantı verilecek daha iyi adres odur.',

  flag_final_noindex: 'Son sayfa dizin dışında tutuluyor',
  fd_final_noindex: 'Zincirin bittiği sayfa, bir robots meta etiketiyle ya da X-Robots-Tag başlığıyla arama motorlarından kendisini dizine eklememelerini istiyor.',
};

OWN.uk = {
  title: 'Перевірка перенаправлень — кожен перехід посилання до місця призначення',
  title_short: 'Перевірка перенаправлень',
  h1: 'Перевірка перенаправлень',
  subtitle: 'Кожен перехід посилання до місця призначення: код відповіді, куди веде, хто відповів, скільки тривав, сертифікат і куки — разом із meta refresh і скриптовими перенаправленнями',
  ph_url: 'example.com/page',
  hero_label: 'Посилання на перевірці',
  hero_count: 'перенаправлення',
  empty_hint: 'Вставте посилання — коротке, рекламне з усіма мітками відстеження, стару адресу після переїзду. Перевірка йде за ним перехід за переходом, як ішов би браузер, і показує кожен крок: код відповіді, куди він вів, хто відповів, скільки тривав, сертифікат і куки. Перенаправлення через meta refresh чи скрипт теж вважається переходом.',
  label_client: 'Питати як',
  label_cookies: 'Зберігати куки',
  btn_copy_chain: 'Копіювати як текст',

  /* ---- етапи ---- */
  stage_follow: 'йдемо за посиланням',
  stage_analyse: 'розбираємо шлях',
  progress_hops: 'пройдено переходів: {n}',

  /* ---- картки ---- */
  card_journey: 'Шлях',
  card_summary: 'Чим закінчується',
  card_client: 'Хто питав',
  note_journey: 'Кожен перехід — нове з’єднання, тож його час показує, чого коштує перший візит; браузер для переходів на тому самому вузлі використовує з’єднання повторно. Підсвічено ту частину адреси, яку змінив перехід.',

  k_destination: 'Кінцева адреса',
  k_outcome: 'Підсумок',
  k_redirects: 'Перенаправлення',
  k_time_total: 'Час, усі запити',
  k_time_redirects: 'З них перенаправлення',
  k_hosts: 'Вузли на шляху',
  k_client: 'Клієнт',
  k_user_agent: 'User-Agent',
  k_language: 'Accept-Language',
  k_cookies: 'Куки',

  v_no_redirects: 'немає — посилання веде одразу на місце',
  v_requests: 'запитів: {n}',
  v_not_sent: 'не надсилався',
  v_cookies_kept: 'зберігаються між переходами, як у браузері',
  v_cookies_forgotten: 'забуваються між переходами, як у пошукового робота',
  v_cookies_off: 'без кук',
  v_session: 'наприкінці сесії',
  v_deleted: 'видалена',
  v_truncated: 'не повністю',
  v_ports: 'Порти, до яких підключається цей сервіс: {list}.',
  note_client: 'Перевірка питає мовою інтерфейсу — так само, як ваш власний браузер, тож видно, коли сайт перенаправляє за мовою. А ще вона питає з одного місця, тож перенаправлення за країною покаже відповідь для цього місця.',
  note_crawler: 'Пошукового робота імітовано лише рядком User-Agent. Сайт, що перевіряє роботів за зворотним DNS, побачить цей сервер, а не Google чи Yandex, і може визнати запит підробкою.',
  empty_flags: 'Нема про що повідомити.',
  at_steps: 'крок {n}',
  incomplete_chain: 'Ланцюжок пройдено так далеко, як сягає цей сервіс, і до кінця його пройти не вдалося:',

  /* ---- перехід ---- */
  hop_details: 'Подробиці',
  hop_final: 'місце призначення',
  hop_failed: 'немає відповіді',
  hop_stopped: 'не пройдено',
  hop_timing: 'На що пішов час',
  hop_location: 'Location, як надіслано',
  hop_address: 'Адреса',
  hop_http: 'Протокол',
  hop_server: 'Сервер',
  hop_through: 'Відповідь прийшла через',
  hop_tls: 'TLS',
  hop_cert: 'Сертифікат',
  hop_cert_ok: 'довірений',
  hop_cert_bad: 'недовірений — браузер зупиниться тут із попередженням',
  hop_cert_for: 'Видано на',
  hop_cert_issuer: 'Ким видано',
  hop_cert_until: 'Дійсний до',
  hop_cookies_sent: 'Надіслані куки',
  hop_cookies_set: 'Встановлені куки',
  hop_sets_cookies: 'встановлено кук: {n}',
  hop_headers: 'Заголовки відповіді',
  hop_page: 'Сторінка',
  hop_title: 'Заголовок',
  hop_canonical: 'Канонічна адреса',
  hop_robots: 'Robots',
  hop_refresh: 'Refresh',
  hop_refresh_slow: 'на {url} через {s} с — надто повільно, щоб вважатися перенаправленням',
  hop_noscript: 'Refresh без скриптів',
  hop_scripts: 'Перенаправлення скриптами у вихідному коді',
  hop_body: 'Прочитано',
  hop_relative: 'відносний',
  hop_fragment: 'фрагмент успадковано',
  hop_multiple: 'кілька заголовків Location',
  hop_not_followed: 'не пройдено',
  hop_loop: 'назад до кроку {n}',
  note_cookie_values: 'Значення не показано: кука, встановлена під час перенаправлення, часто і є сесією.',
  th_name: 'Назва',
  th_scope: 'Домен і шлях',
  th_flags: 'Атрибути',
  th_expires: 'Спливає',
  unit_ms: 'мс',
  unit_s: 'с',
  unit_kb: 'КБ',

  t_dns: 'DNS',
  t_connect: 'з’єднання',
  t_tls: 'TLS',
  t_wait: 'сервер',

  /* ---- як перехід іде далі ---- */
  rt_http: 'HTTP-перенаправлення',
  rt_refresh_header: 'заголовок Refresh',
  rt_meta_refresh: 'meta refresh',
  rt_javascript: 'скрипт, знайдений у коді',

  sc_301: 'постійне; браузер може змінити POST на GET',
  sc_302: 'тимчасове; браузер може змінити POST на GET',
  sc_303: 'дивіться інше; наступний запит завжди GET',
  sc_307: 'тимчасове; метод і тіло зберігаються',
  sc_308: 'постійне; метод і тіло зберігаються',

  /* ---- підсумки ---- */
  out_arrived: 'доходить до мети',
  out_client_error: 'закінчується сторінкою помилки',
  out_server_error: 'закінчується помилкою сервера',
  out_loop: 'ходить по колу',
  out_too_many_redirects: 'перенаправлень більше, ніж проходить браузер',
  out_failed: 'обривається: перехід не відповів',
  out_refused: 'зупиняється на адресі, куди цей сервіс не ходить',
  out_broken_redirect: 'обривається на Location, який не є адресою',
  out_unsafe_redirect: 'закінчується перенаправленням, яке браузери відхиляють',
  out_left_web: 'передає посилання застосунку',
  out_incomplete: 'перервано через ліміт часу',

  /* ---- клієнти ---- */
  ua_chrome: 'Chrome, комп’ютер',
  ua_iphone: 'Safari, iPhone',
  ua_android: 'Chrome, Android',
  ua_googlebot: 'Googlebot',
  ua_yandexbot: 'YandexBot',
  ua_bingbot: 'Bingbot',
  ua_curl: 'curl',

  /* ---- куки, які браузер відхиляє ---- */
  ck_too_large: 'відхилена: понад 4 КБ',
  ck_empty: 'відхилена: порожня',
  ck_domain_mismatch: 'відхилена: Domain, до якого вузол не належить',
  ck_public_suffix: 'відхилена: Domain — домен верхнього рівня',
  ck_secure_over_http: 'відхилена: Secure через http',
  ck_prefix_secure: 'відхилена: __Secure- вимагає Secure через https',
  ck_prefix_host: 'відхилена: __Host- вимагає Secure, Path=/ і жодного Domain',
  ck_samesite_none_insecure: 'відхилена: SameSite=None без Secure',

  /* ---- чого не вдалося встановити ---- */
  inc_deadline: 'ліміт часу вичерпався раніше, ніж закінчився ланцюжок',
  inc_port_not_followed: 'перехід веде на порт, до якого цей сервіс не підключається',
  inc_credentials_not_followed: 'перехід має в адресі ім’я користувача й пароль',
  inc_url_too_long: 'перехід веде на адресу, довшу, ніж може пройти цей сервіс',

  /* ---- помилки ---- */
  err_invalid_host: 'Це не схоже на вебадресу.',
  err_url_too_long: 'Ця адреса довша, ніж може пройти цей сервіс.',
  err_scheme_not_supported: 'Перевіряти можна лише адреси http і https.',
  err_credentials_not_allowed: 'Приберіть з адреси ім’я користувача й пароль: цей сервіс нікуди їх не надсилає.',
  err_unknown_client: 'Невідомий клієнт. Використовуйте один із таких: chrome, iphone, android, googlebot, yandexbot, bingbot, curl.',
  err_connection_refused: 'Сервер відхилив з’єднання.',
  err_connection_reset: 'З’єднання обірвалося.',
  err_connection_failed: 'Не вдалося з’єднатися.',
  err_malformed_response: 'Відповідь не є коректним HTTP.',
  err_tls_failed: 'Рукостискання TLS не вдалося.',
  err_deadline: 'Ліміт часу вичерпався до цього переходу.',

  /* ---- знахідки ---- */
  flag_redirect_loop: 'Ланцюжок ходить по колу',
  fd_redirect_loop: 'Перехід відправляє запит на адресу, де ланцюжок уже побував, із тими самими куками, тож відповідь може лише повторитися. Браузери здаються з помилкою «забагато перенаправлень», пошукові роботи відкидають посилання.',

  flag_redirect_loop_without_cookies: 'Петля для клієнтів без кук',
  fd_redirect_loop_without_cookies: 'Без кук ланцюжок повертається туди, звідки почав. Браузер, що зберігає куку, встановлену сайтом, може пройти далі, — але пошукові роботи куки не зберігають, тож саме цю петлю вони й бачать.',

  flag_too_many_redirects: 'Перенаправлень більше, ніж проходить браузер',
  fd_too_many_redirects: 'Chrome і Firefox зупиняються після двадцяти перенаправлень і показують помилку. А цей ланцюжок усе ще тривав.',

  flag_beyond_googlebot_limit: 'Довший, ніж проходить Googlebot',
  fd_beyond_googlebot_limit: 'Googlebot проходить не більше десяти перенаправлень поспіль. Далі сторінка за цим посиланням не сканується, а Search Console повідомляє про помилку перенаправлення.',

  flag_long_chain: 'Довгий ланцюжок',
  fd_long_chain: 'До сторінки три перенаправлення чи більше. Кожне — це ще один похід туди й назад, перш ніж щось почне завантажуватися, а пошукові системи віддають перевагу одному переходу одразу на кінцеву адресу.',

  flag_could_be_one_redirect: 'Переходи, які можна звести до одного',
  fd_could_be_one_redirect: 'Кілька перенаправлень у межах одного сайту, і кожне виправляє свою частину адреси. Якщо одразу відправляти відвідувача на кінцеву адресу, ці походи туди й назад не знадобляться. Перший перехід з http на https на тому самому вузлі не враховується: це правильний перший крок.',

  flag_slow_redirects: 'Перенаправлення повільні',
  fd_slow_redirects: 'Лише перенаправлення зайняли понад секунду — ще до того, як почала завантажуватися сама сторінка.',

  flag_connection_failed: 'Перехід не відповів',
  fd_connection_failed: 'Тут ланцюжок обривається: наступна адреса не розв’язалася, відхилила з’єднання або не відповіла вчасно. Відвідувачі бачать сторінку помилки.',

  flag_redirect_to_private_network: 'Веде в приватну мережу',
  fd_redirect_to_private_network: 'Перехід відправляє відвідувача на адресу всередині приватної мережі або на ім’я, яке існує лише в ній. Ніхто з інтернету туди не потрапить, а саме перенаправлення дещо розповідає про внутрішню будову мережі. Цей сервіс туди теж не йде.',

  flag_location_malformed: 'Location, який не вдається розібрати',
  fd_location_malformed: 'Перенаправлення вказує на щось, що не є адресою. Браузери показують помилку.',

  flag_multiple_location_headers: 'Два різні заголовки Location',
  fd_multiple_location_headers: 'Відповідь містить більше одного Location, і вони не збігаються. Chrome таке перенаправлення відхиляє повністю; інші клієнти обирають один із них. Тут пройдено перший.',

  flag_redirect_without_location: 'Код перенаправлення, за яким нікуди йти',
  fd_redirect_without_location: 'Код відповіді каже «перенаправлення», але заголовка Location немає. Браузери показують тіло, яке прийшло з відповіддю, а воно зазвичай порожнє.',

  flag_location_unencoded: 'Location із незакодованими символами',
  fd_location_unencoded: 'Заголовок Location містить пробіли або символи поза ASCII без відсоткового кодування. Браузери це виправляють, а інші клієнти, проксі й бібліотеки — не обов’язково.',

  flag_unsafe_redirect_target: 'Перенаправлення на схему, яку браузери відхиляють',
  fd_unsafe_redirect_target: 'Ланцюжок указує на адресу javascript:, data: чи file:. Браузери відмовляються йти туди за перенаправленням.',

  flag_leaves_the_web: 'Передає посилання застосунку',
  fd_leaves_the_web: 'Ланцюжок закінчується адресою, яка не є вебсторінкою, — tg://, mailto:, intent:, посиланням на магазин застосунків. Браузер запропонує відкрити застосунок; що буде далі — уже не питання вебу.',

  flag_ends_in_client_error: 'Закінчується сторінкою помилки',
  fd_ends_in_client_error: 'Кінцева сторінка відповідає кодом 4xx — не знайдено, видалено, заборонено. Посилання нікуди не веде.',

  flag_ends_in_server_error: 'Закінчується помилкою сервера',
  fd_ends_in_server_error: 'Кінцева сторінка відповідає кодом 5xx. Можливо, це тимчасово, але поки це триває, посилання не працює.',

  flag_redirect_status_not_followed: 'Код 3xx, за яким браузери не йдуть',
  fd_redirect_status_not_followed: '300, 304, 305 і 306 — коди класу 3xx, але для браузера це не перенаправлення: хоч який Location вони несуть, його ігнорують.',

  flag_bot_challenge: 'Замість сайту відповіла перевірка на бота',
  fd_bot_challenge: 'Сервіс захисту відповів перевіркою, призначеною для автоматичних клієнтів. Браузер, який її пройде, може потрапити деінде; далі показано те, що бачить скрипт.',

  flag_https_downgrade: 'З https назад на http',
  fd_https_downgrade: 'Перехід веде із зашифрованої адреси на незашифровану. Далі запит і кожна кука без позначки Secure ідуть мережею відкритим текстом, а браузери перестають надсилати Referer.',

  flag_late_https_upgrade: 'Перехід на https запізнюється',
  fd_late_https_upgrade: 'Ланцюжок таки доходить до https, але лише після ще одного переходу через незашифрований http. Цей перехід іде мережею незашифрованим, разом із куками відвідувача. Спершу перенаправляйте на https на тому самому вузлі, а вже потім куди завгодно.',

  flag_upgrade_changes_host: 'Перехід на https заодно змінює вузол',
  fd_upgrade_changes_host: 'Перший перехід на https веде на інше ім’я. Це працює, але HSTS для імені, яке набрав відвідувач, так і не надходить, а для попереднього завантаження цього імені перехід на https має спершу відбутися на ньому самому.',

  flag_ends_on_http: 'Закінчується на незашифрованому http',
  fd_ends_on_http: 'Кінцеву сторінку віддають без шифрування.',

  flag_certificate_invalid: 'Сертифікат, який браузер відхилить',
  fd_certificate_invalid: 'Перехід через https показує сертифікат, який прострочений, виданий на інше ім’я або не підписаний довіреним центром сертифікації. Браузер зупиниться тут на сторінці з попередженням; ланцюжок далі все одно пройдено, щоб показати, куди він веде.',

  flag_temporary_canonicalization: 'Тимчасове перенаправлення там, де потрібне постійне',
  fd_temporary_canonicalization: 'Перехід лише впорядковує адресу — схему, www, скісну риску в кінці — і при цьому називає себе тимчасовим. Браузери його не запам’ятають, а пошукові системи триматимуть обидві адреси. Для такого підходить 301 або 308.',

  flag_permanent_redirect_cached: 'Постійне перенаправлення без терміну дії',
  fd_permanent_redirect_cached: '301 чи 308 без Cache-Control і Expires браузери зберігають стільки, скільки самі вважають за потрібне. Якщо перенаправлення колись виявиться хибним, усі, хто його вже бачив, і далі ходитимуть на стару адресу. max-age робить таку помилку виправною.',

  flag_meta_refresh: 'Перенаправлення через meta refresh',
  fd_meta_refresh: 'Сторінка відправляє відвідувачів далі через <meta http-equiv="refresh">. Браузери його виконують, але лише після завантаження сторінки, а відкладений meta refresh пошукові системи вважають тимчасовим перенаправленням.',

  flag_refresh_header: 'Заголовок Refresh',
  fd_refresh_header: 'Відповідь відправляє відвідувачів далі заголовком Refresh. Браузери його шанують, але в HTTP він так і не став стандартом, і багато інших клієнтів його ігнорують.',

  flag_javascript_redirect: 'Перенаправлення скриптом',
  fd_javascript_redirect: 'Сторінка порожня, якщо не рахувати скрипту, що змінює адресу. Клієнти, які не виконують скриптів, — більшість прев’ю посилань, багато пошукових роботів, curl — лишаються на порожній сторінці. Знайдено у вихідному коді: цей сервіс скриптів не виконує.',

  flag_script_redirect_not_followed: 'Скрипт може відправити відвідувачів далі',
  fd_script_redirect_not_followed: 'Кінцева сторінка десь у своїх скриптах змінює адресу. Це може стояти за умовою, тож перевірка цим шляхом не пішла; браузер усе ж може туди перейти.',

  flag_redirect_sets_cookies: 'Куки під час перенаправлень',
  fd_redirect_sets_cookies: 'Переходи до кінцевої сторінки встановлюють куки. Звична річ для відстеження та для сценаріїв згоди чи входу; варто знати, коли посиланням діляться.',

  flag_cookie_rejected: 'Кука, яку браузер відхилить',
  fd_cookie_rejected: 'Set-Cookie порушує правило, яке браузери суворо застосовують: Domain, до якого вузол не належить, Secure через http, префікс __Host- чи __Secure- без виконання його умов, SameSite=None без Secure. Браузер таку куку відкидає, і вхід чи згода, що на неї покладаються, мовчки не спрацьовують.',

  flag_query_lost: 'Параметри загубилися дорогою',
  fd_query_lost: 'Параметрів, з якими починалося посилання, у кінцевій адресі немає. Зазвичай страждають мітки відстеження на кшталт utm_source: візит зараховують як прямий.',

  flag_path_lost: 'Приводить на головну',
  fd_path_lost: 'Посилання вело на конкретну сторінку, а ланцюжок закінчується коренем сайту. Типово після переїзду, під час якого все перенаправили на головну: і відвідувачі, і пошукові системи втрачають сторінку, яку шукали.',

  flag_lands_on_another_site: 'Приводить на інший сайт',
  fd_lands_on_another_site: 'Посилання починається на одному сайті, а закінчується на іншому. Для коротких і рекламних посилань це очікувано; в інших випадках варто придивитися.',

  flag_canonical_elsewhere: 'Кінцева сторінка називає іншу канонічну адресу',
  fd_canonical_elsewhere: 'Сторінка, якою закінчується ланцюжок, указує канонічною іншу адресу. Пошукові системи можуть проіндексувати ту адресу замість цієї, тож посилатися краще одразу туди.',

  flag_final_noindex: 'Кінцеву сторінку закрито від індексування',
  fd_final_noindex: 'Сторінка, якою закінчується ланцюжок, просить пошукові системи її не індексувати — метатегом robots або заголовком X-Robots-Tag.',
};

OWN.zh = {
  title: '重定向检测 — 链接抵达之前经过的每一跳',
  title_short: '重定向检测',
  h1: '重定向检测',
  subtitle: '链接抵达之前经过的每一跳：状态码、指向何处、由谁应答、耗时多久、证书与 Cookie —— meta refresh 和脚本重定向也包括在内',
  ph_url: 'example.com/page',
  hero_label: '被检测的链接',
  hero_count: '重定向次数',
  empty_hint: '粘贴一个链接 —— 短链接、带着全套跟踪参数的广告链接、网站迁移后的旧地址都可以。检测会像浏览器那样一跳一跳地跟随它，并展示每一步：状态码、指向何处、由谁应答、耗时多久、证书与 Cookie。meta refresh 和脚本重定向也各算一跳。',
  label_client: '请求身份',
  label_cookies: '保留 Cookie',
  btn_copy_chain: '复制为文本',

  /* ---- stages ---- */
  stage_follow: '正在跟随链接',
  stage_analyse: '正在解读路径',
  progress_hops: '已跟随 {n} 跳',

  /* ---- cards ---- */
  card_journey: '逐跳路径',
  card_summary: '最终去向',
  card_client: '请求方',
  note_journey: '每一跳都新建一条连接，所以其耗时就是首次访问的开销；对同一主机上的各跳，浏览器会复用连接。高亮显示的是这一跳所改动的那部分地址。',

  k_destination: '终点',
  k_outcome: '结果',
  k_redirects: '重定向',
  k_time_total: '耗时（全部请求）',
  k_time_redirects: '其中重定向',
  k_hosts: '途经主机',
  k_client: '客户端',
  k_user_agent: 'User-Agent',
  k_language: 'Accept-Language',
  k_cookies: 'Cookie',

  v_no_redirects: '无 —— 链接直达目的地',
  v_requests: '共 {n} 次请求',
  v_not_sent: '未发送',
  v_cookies_kept: '在各跳之间保留，与浏览器一样',
  v_cookies_forgotten: '在各跳之间丢弃，与爬虫一样',
  v_cookies_off: '不带 Cookie',
  v_session: '会话',
  v_deleted: '已删除',
  v_truncated: '已截断',
  v_ports: '本服务会连接的端口：{list}。',
  note_client: '检测会像你自己的浏览器那样，用界面语言发出请求，因此站点若按语言重定向，这里也能看到。检测也只从一个地点发出请求，因此站点若按国家重定向，显示的是针对这个地点的应答。',
  note_crawler: '对爬虫的模仿仅限于 User-Agent。通过反向 DNS 核实爬虫的站点，看到的是本服务的服务器，而不是 Google 或 Yandex，因此可能把这次请求当作冒充者。',
  empty_flags: '没有需要报告的内容。',
  at_steps: '第 {n} 步',
  incomplete_chain: '本服务已把链跟随到力所能及之处，但未能走到链的终点：',

  /* ---- a hop ---- */
  hop_details: '详情',
  hop_final: '终点',
  hop_failed: '无应答',
  hop_stopped: '未跟随',
  hop_timing: '时间花在了哪里',
  hop_location: 'Location（原样）',
  hop_address: '地址',
  hop_http: '协议',
  hop_server: '服务器',
  hop_through: '应答经由',
  hop_tls: 'TLS',
  hop_cert: '证书',
  hop_cert_ok: '受信任',
  hop_cert_bad: '不受信任 —— 浏览器会在这里停下并显示警告',
  hop_cert_for: '颁发给',
  hop_cert_issuer: '颁发者',
  hop_cert_until: '有效期至',
  hop_cookies_sent: '发送的 Cookie',
  hop_cookies_set: '设置的 Cookie',
  hop_sets_cookies: '设置 {n} 个 Cookie',
  hop_headers: '响应头',
  hop_page: '页面',
  hop_title: '标题',
  hop_canonical: '规范地址',
  hop_robots: 'Robots',
  hop_refresh: 'Refresh',
  hop_refresh_slow: '{s} 秒后前往 {url} —— 太慢，不算作重定向',
  hop_noscript: '无脚本时的 Refresh',
  hop_scripts: '源码中的脚本重定向',
  hop_body: '已读取',
  hop_relative: '相对地址',
  hop_fragment: '沿用原片段',
  hop_multiple: '多个 Location 响应头',
  hop_not_followed: '未跟随',
  hop_loop: '回到第 {n} 步',
  note_cookie_values: '不显示取值：在重定向过程中设置的 Cookie 往往承载着会话。',
  th_name: '名称',
  th_scope: '域名与路径',
  th_flags: '属性',
  th_expires: '过期时间',
  unit_ms: '毫秒',
  unit_s: '秒',
  unit_kb: 'KB',

  t_dns: 'DNS',
  t_connect: '连接',
  t_tls: 'TLS',
  t_wait: '服务器',

  /* ---- how a hop moves on ---- */
  rt_http: 'HTTP 重定向',
  rt_refresh_header: 'Refresh 响应头',
  rt_meta_refresh: 'meta refresh',
  rt_javascript: '脚本（在源码中发现）',

  sc_301: '永久；浏览器可能把 POST 改成 GET',
  sc_302: '临时；浏览器可能把 POST 改成 GET',
  sc_303: '查看其他位置；一律用 GET 跟随',
  sc_307: '临时；保留方法和请求体',
  sc_308: '永久；保留方法和请求体',

  /* ---- outcomes ---- */
  out_arrived: '到达目的地',
  out_client_error: '止于错误页面',
  out_server_error: '止于服务器错误',
  out_loop: '陷入循环',
  out_too_many_redirects: '重定向次数超出浏览器的上限',
  out_failed: '中断：某一跳没有应答',
  out_refused: '停在本服务不跟随的地址上',
  out_broken_redirect: '断在一个不是地址的 Location 上',
  out_unsafe_redirect: '止于浏览器拒绝的重定向',
  out_left_web: '移交给应用',
  out_incomplete: '因时限而中断',

  /* ---- clients ---- */
  ua_chrome: 'Chrome（桌面版）',
  ua_iphone: 'Safari（iPhone）',
  ua_android: 'Chrome（Android）',
  ua_googlebot: 'Googlebot',
  ua_yandexbot: 'YandexBot',
  ua_bingbot: 'Bingbot',
  ua_curl: 'curl',

  /* ---- cookies a browser refuses ---- */
  ck_too_large: '被拒绝：超过 4 KB',
  ck_empty: '被拒绝：为空',
  ck_domain_mismatch: '被拒绝：主机不属于所设的 Domain',
  ck_public_suffix: '被拒绝：Domain 是顶级域名',
  ck_secure_over_http: '被拒绝：通过 http 设置了 Secure',
  ck_prefix_secure: '被拒绝：__Secure- 须经 https 设置并带 Secure',
  ck_prefix_host: '被拒绝：__Host- 需要 Secure、Path=/ 且不带 Domain',
  ck_samesite_none_insecure: '被拒绝：SameSite=None 却没有 Secure',

  /* ---- what could not be established ---- */
  inc_deadline: '链还没走完，时限就到了',
  inc_port_not_followed: '某一跳指向本服务不会连接的端口',
  inc_credentials_not_followed: '某一跳的地址中带有用户名和密码',
  inc_url_too_long: '某一跳指向的地址超出了本服务所能跟随的长度',

  /* ---- errors ---- */
  err_invalid_host: '这看起来不像网址。',
  err_url_too_long: '这个地址超出了本服务所能跟随的长度。',
  err_scheme_not_supported: '只能检测 http 和 https 地址。',
  err_credentials_not_allowed: '请从地址中去掉用户名和密码：本服务不会把它们发送到任何地方。',
  err_unknown_client: '未知的客户端。请使用以下之一：chrome, iphone, android, googlebot, yandexbot, bingbot, curl。',
  err_connection_refused: '服务器拒绝了连接。',
  err_connection_reset: '连接被中断。',
  err_connection_failed: '连接失败。',
  err_malformed_response: '应答不是有效的 HTTP。',
  err_tls_failed: 'TLS 握手失败。',
  err_deadline: '到这一跳之前，时限已经用完。',

  /* ---- findings ---- */
  flag_redirect_loop: '重定向链陷入循环',
  fd_redirect_loop: '某一跳把请求送回链上已经访问过的地址，而且带着相同的 Cookie，应答只会不断重复。浏览器会以“重定向次数过多”为由放弃；爬虫则会丢弃这个链接。',

  flag_redirect_loop_without_cookies: '对不带 Cookie 的客户端形成循环',
  fd_redirect_loop_without_cookies: '不带 Cookie 时，链会回到起点。保留站点所设 Cookie 的浏览器也许能走通 —— 但爬虫不保存 Cookie，所以它们看到的正是这个循环。',

  flag_too_many_redirects: '重定向次数超出浏览器的上限',
  fd_too_many_redirects: 'Chrome 和 Firefox 在二十次重定向之后就会停下并显示错误。而这条链到那时还在继续。',

  flag_beyond_googlebot_limit: '超出 Googlebot 的跟随上限',
  fd_beyond_googlebot_limit: 'Googlebot 最多连续跟随十次重定向。超过之后，就不会经由这个链接抓取该页面，Search Console 也会报告重定向错误。',

  flag_long_chain: '重定向链较长',
  fd_long_chain: '到达页面之前有三次或更多重定向。每一次都是在任何内容开始加载之前多出的一次往返；搜索引擎也更希望一跳直达最终地址。',

  flag_could_be_one_redirect: '本可合为一跳的几跳',
  fd_could_be_one_redirect: '同一站点内接连几次重定向，每次只整理地址中属于自己的那一部分。把访客直接送到最终地址，就能省去这些往返。同一主机上从 http 到 https 的第一跳不计在内：那一跳正是正确的第一步。',

  flag_slow_redirects: '重定向很慢',
  fd_slow_redirects: '在页面本身开始加载之前，光是重定向就花了一秒以上。',

  flag_connection_failed: '某一跳没有应答',
  fd_connection_failed: '链在这里断开：下一个地址无法解析、拒绝了连接，或没有及时应答。访客看到的是错误页面。',

  flag_redirect_to_private_network: '指向专用网络',
  fd_redirect_to_private_network: '某一跳把访客送往专用网络内部的地址，或是只存在于这类网络内部的名称。互联网上谁也无法跟过去，而这个重定向本身就透露了一些内部结构。本服务同样不会跟随它。',

  flag_location_malformed: '无法解析的 Location',
  fd_location_malformed: '重定向指向的东西不是一个地址。浏览器会显示错误。',

  flag_multiple_location_headers: '两个不同的 Location 响应头',
  fd_multiple_location_headers: '响应中带有不止一个 Location，而且彼此不一致。Chrome 会直接拒绝这样的重定向；其他客户端则从中挑一个。这里跟随的是第一个。',

  flag_redirect_without_location: '有重定向状态码，却无处可去',
  fd_redirect_without_location: '状态码表示重定向，却没有 Location 响应头。浏览器会显示随之返回的响应体，而它通常是空的。',

  flag_location_unencoded: 'Location 中含有未编码的字符',
  fd_location_unencoded: 'Location 响应头中含有未经百分号编码的空格或非 ASCII 字符。浏览器会自行修正；其他客户端、代理和库则未必。',

  flag_unsafe_redirect_target: '重定向到浏览器拒绝的协议',
  fd_unsafe_redirect_target: '链指向一个 javascript:、data: 或 file: 地址。浏览器拒绝经由重定向前往那里。',

  flag_leaves_the_web: '移交给应用',
  fd_leaves_the_web: '链止于一个不是网页的地址 —— tg://、mailto:、intent:，或应用商店链接。浏览器会询问是否打开相应的应用；之后发生什么，就不再是 Web 的问题了。',

  flag_ends_in_client_error: '止于错误页面',
  fd_ends_in_client_error: '最终页面以 4xx 状态码应答 —— 未找到、已删除、禁止访问。这个链接哪儿也去不了。',

  flag_ends_in_server_error: '止于服务器错误',
  fd_ends_in_server_error: '最终页面以 5xx 状态码应答。这也许只是暂时的；但在它持续期间，链接是坏的。',

  flag_redirect_status_not_followed: '浏览器不会跟随的 3xx 状态码',
  fd_redirect_status_not_followed: '300、304、305 和 306 虽属 3xx 状态码，对浏览器来说却不是重定向：无论带着什么 Location，都会被忽略。',

  flag_bot_challenge: '应答的不是站点，而是人机验证',
  fd_bot_challenge: '某个防护服务用一道针对自动化客户端的验证作了应答。通过验证的浏览器可能会被送往别处；下面显示的是脚本看到的内容。',

  flag_https_downgrade: '从 https 退回 http',
  fd_https_downgrade: '某一跳从加密地址转到了明文地址。从那以后，请求以及所有未标记 Secure 的 Cookie 都以明文穿过网络，浏览器也不再发送 Referer。',

  flag_late_https_upgrade: '升级到 https 来得太晚',
  fd_late_https_upgrade: '链最终确实到达了 https，但在此之前又走了一跳明文 http。那一跳带着访客的 Cookie，未经加密地穿过网络。请先在同一主机上重定向到 https，然后再去别处。',

  flag_upgrade_changes_host: '升级到 https 的同时更换了主机',
  fd_upgrade_changes_host: '通往 https 的第一跳去了另一个域名。这样能用，但访客输入的那个域名永远收不到 HSTS，而要预加载那个域名，就需要先在它自身上完成升级。',

  flag_ends_on_http: '止于明文 http',
  fd_ends_on_http: '最终页面在未加密的情况下提供。',

  flag_certificate_invalid: '浏览器会拒绝的证书',
  fd_certificate_invalid: '某一跳 https 出示的证书已过期、签给了别的主机，或者并非由受信任的机构签发。浏览器会停在这里的警告页上；为了显示链通向何处，这里依然跟随了之后的部分。',

  flag_temporary_canonicalization: '该用永久重定向的地方用了临时重定向',
  fd_temporary_canonicalization: '这一跳只是整理地址 —— 协议、www、末尾的斜杠 —— 却自称是临时的。浏览器不会记住它，搜索引擎则会把两个地址都保留下来。这种情况应该用 301 或 308。',

  flag_permanent_redirect_cached: '没有过期时间的永久重定向',
  fd_permanent_redirect_cached: '没有 Cache-Control 或 Expires 的 301 或 308，浏览器想保存多久就保存多久。一旦发现它是错的，所有见过它的人都会继续前往旧的目标。加上 max-age，错误才有挽回的余地。',

  flag_meta_refresh: '使用了 meta refresh',
  fd_meta_refresh: '页面用 <meta http-equiv="refresh"> 把访客送往下一处。浏览器会照做，但要等页面加载完成之后；带延迟的 meta refresh，搜索引擎会视为临时重定向。',

  flag_refresh_header: '使用了 Refresh 响应头',
  fd_refresh_header: '响应用 Refresh 响应头把访客送往下一处。浏览器会遵从它，但它从未作为 HTTP 的一部分被标准化，许多其他客户端会忽略它。',

  flag_javascript_redirect: '脚本重定向',
  fd_javascript_redirect: '页面上除了一段改变地址的脚本之外，什么都没有。不运行脚本的客户端 —— 大多数链接预览、许多爬虫、curl —— 会停留在这个空页面上。这是在源码中发现的：本服务不执行脚本。',

  flag_script_redirect_not_followed: '脚本可能把访客送往别处',
  fd_script_redirect_not_followed: '最终页面的脚本中有某处会改变地址。这可能取决于某个条件，所以没有跟随；浏览器仍可能前往那里。',

  flag_redirect_sets_cookies: '重定向过程中设置了 Cookie',
  fd_redirect_sets_cookies: '最终页面之前的几跳设置了 Cookie。这在跟踪以及同意、登录流程中很常见；分享链接时值得知道这一点。',

  flag_cookie_rejected: '浏览器会拒绝的 Cookie',
  fd_cookie_rejected: '某个 Set-Cookie 违反了浏览器强制执行的规则：主机不属于所设的 Domain、通过 http 设置 Secure、使用 __Host- 或 __Secure- 前缀却不满足其条件、SameSite=None 却没有 Secure。浏览器会丢弃它，依赖它的登录或同意流程就会悄无声息地失败。',

  flag_query_lost: '查询参数在途中丢失',
  fd_query_lost: '链接起初带有的参数，在最终地址中不见了。最常受害的是 utm_source 这类跟踪参数：这次访问会被计为直接访问。',

  flag_path_lost: '止于首页',
  fd_path_lost: '链接原本指向某个具体页面，链却止于站点根路径。这在把一切都重定向到首页的迁移之后很典型：访客和搜索引擎都丢失了他们要找的那个页面。',

  flag_lands_on_another_site: '止于另一个站点',
  fd_lands_on_another_site: '链接从一个站点出发，却止于另一个站点。对短链接和广告链接来说这在意料之中；若不属于这两类，就值得看一看。',

  flag_canonical_elsewhere: '最终页面声明了另一个规范地址',
  fd_canonical_elsewhere: '链最终到达的页面把自己的规范地址指向了别处。搜索引擎可能会转而将那个地址编入索引，所以更好的做法是直接链接到那里。',

  flag_final_noindex: '最终页面被排除在索引之外',
  fd_final_noindex: '链最终到达的页面通过 robots meta 标签或 X-Robots-Tag 响应头，要求搜索引擎不要将其编入索引。',
};

OWN.ja = {
  title: 'リダイレクト検査 — リンクが目的地にたどり着くまでのすべてのホップ',
  title_short: 'リダイレクト検査',
  h1: 'リダイレクト検査',
  subtitle: 'リンクが目的地にたどり着くまでのすべてのホップ：ステータスコード、行き先、応答した相手、所要時間、証明書、Cookie — meta refresh やスクリプトによるリダイレクトも含めて',
  ph_url: 'example.com/page',
  hero_label: '検査対象のリンク',
  hero_count: 'リダイレクト回数',
  empty_hint: 'リンクを貼り付けてください — 短縮リンク、トラッキングパラメーターがすべて付いた広告リンク、サイト移転後の古いアドレスなど。検査はブラウザーと同じように一ホップずつたどり、ステップごとにステータスコード、行き先、応答した相手、所要時間、証明書、Cookie を表示します。meta refresh やスクリプトによるリダイレクトも一つのホップとして数えます。',
  label_client: 'クライアント',
  label_cookies: 'Cookie を保持',
  btn_copy_chain: 'テキストでコピー',

  /* ---- stages ---- */
  stage_follow: 'リンクを追跡中',
  stage_analyse: '道のりを分析中',
  progress_hops: 'これまで {n} ホップ',

  /* ---- cards ---- */
  card_journey: '道のり',
  card_summary: '行き着く先',
  card_client: 'リクエスト元',
  note_journey: 'ホップごとに新しい接続を張るので、その時間は初回訪問のコストにあたります。同じホスト上のホップなら、ブラウザーは接続を再利用します。ハイライトされているのは、そのホップで変わったアドレスの部分です。',

  k_destination: '到達先',
  k_outcome: '結果',
  k_redirects: 'リダイレクト',
  k_time_total: '所要時間（全リクエスト）',
  k_time_redirects: 'うちリダイレクト',
  k_hosts: '経由したホスト',
  k_client: 'クライアント',
  k_user_agent: 'User-Agent',
  k_language: 'Accept-Language',
  k_cookies: 'Cookie',

  v_no_redirects: 'なし — リンクはそのまま目的地に届く',
  v_requests: 'リクエスト {n} 件',
  v_not_sent: '送信なし',
  v_cookies_kept: 'ホップ間で保持（ブラウザーと同じ）',
  v_cookies_forgotten: 'ホップ間で破棄（クローラーと同じ）',
  v_cookies_off: 'Cookie なし',
  v_session: 'セッション',
  v_deleted: '削除',
  v_truncated: '途中で打ち切り',
  v_ports: 'このサービスが接続するポート：{list}。',
  note_client: '検査は、あなた自身のブラウザーと同じように表示言語で問い合わせます。そのため、言語によってリダイレクトするサイトなら、その動きがここにも現れます。また問い合わせは一か所から行うので、国によるリダイレクトでは、その場所に対する応答が表示されます。',
  note_crawler: 'クローラーの模倣は User-Agent だけで行っています。逆引き DNS でクローラーを確認するサイトには、Google や Yandex ではなくこのサーバーが見えるため、リクエストがなりすましとして扱われることがあります。',
  empty_flags: '報告することはありません。',
  at_steps: 'ステップ {n}',
  incomplete_chain: 'このサービスがたどれるところまで連鎖をたどりましたが、終点には届いていません：',

  /* ---- a hop ---- */
  hop_details: '詳細',
  hop_final: '到達先',
  hop_failed: '応答なし',
  hop_stopped: '未追跡',
  hop_timing: '時間の内訳',
  hop_location: 'Location（受信したまま）',
  hop_address: 'アドレス',
  hop_http: 'プロトコル',
  hop_server: 'サーバー',
  hop_through: '経由したネットワーク',
  hop_tls: 'TLS',
  hop_cert: '証明書',
  hop_cert_ok: '信頼済み',
  hop_cert_bad: '信頼されていない — ブラウザーはここで警告を出して止まる',
  hop_cert_for: '発行先',
  hop_cert_issuer: '発行者',
  hop_cert_until: '有効期限',
  hop_cookies_sent: '送信した Cookie',
  hop_cookies_set: '設定された Cookie',
  hop_sets_cookies: 'Cookie を {n} 件設定',
  hop_headers: '応答ヘッダー',
  hop_page: 'ページ',
  hop_title: 'タイトル',
  hop_canonical: '正規 URL',
  hop_robots: 'Robots',
  hop_refresh: 'Refresh',
  hop_refresh_slow: '{s} 秒後に {url} へ — リダイレクトと見なすには遅すぎる',
  hop_noscript: 'スクリプト無効時の Refresh',
  hop_scripts: 'ソース内のスクリプトによるリダイレクト',
  hop_body: '読み取り量',
  hop_relative: '相対 URL',
  hop_fragment: 'フラグメントを引き継ぎ',
  hop_multiple: '複数の Location ヘッダー',
  hop_not_followed: '未追跡',
  hop_loop: 'ステップ {n} に戻る',
  note_cookie_values: '値は表示しません。リダイレクトの途中で設定される Cookie は、セッションそのものであることが多いためです。',
  th_name: '名前',
  th_scope: 'ドメインとパス',
  th_flags: '属性',
  th_expires: '有効期限',
  unit_ms: 'ms',
  unit_s: '秒',
  unit_kb: 'KB',

  t_dns: 'DNS',
  t_connect: '接続',
  t_tls: 'TLS',
  t_wait: 'サーバー',

  /* ---- how a hop moves on ---- */
  rt_http: 'HTTP リダイレクト',
  rt_refresh_header: 'Refresh ヘッダー',
  rt_meta_refresh: 'meta refresh',
  rt_javascript: 'スクリプト（ソース内で検出）',

  sc_301: '恒久的（ブラウザーは POST を GET に変えることがある）',
  sc_302: '一時的（ブラウザーは POST を GET に変えることがある）',
  sc_303: '他を参照（常に GET でたどる）',
  sc_307: '一時的（メソッドと本文を保持）',
  sc_308: '恒久的（メソッドと本文を保持）',

  /* ---- outcomes ---- */
  out_arrived: '到達する',
  out_client_error: 'エラーページで終わる',
  out_server_error: 'サーバーエラーで終わる',
  out_loop: '循環する',
  out_too_many_redirects: 'リダイレクトがブラウザーの上限を超える',
  out_failed: '途切れる：応答しないホップがある',
  out_refused: 'このサービスがたどらないアドレスで止まる',
  out_broken_redirect: 'アドレスではない Location で途切れる',
  out_unsafe_redirect: 'ブラウザーが拒否するリダイレクトで終わる',
  out_left_web: 'アプリに引き渡す',
  out_incomplete: '制限時間で打ち切られる',

  /* ---- clients ---- */
  ua_chrome: 'Chrome（デスクトップ）',
  ua_iphone: 'Safari（iPhone）',
  ua_android: 'Chrome（Android）',
  ua_googlebot: 'Googlebot',
  ua_yandexbot: 'YandexBot',
  ua_bingbot: 'Bingbot',
  ua_curl: 'curl',

  /* ---- cookies a browser refuses ---- */
  ck_too_large: '拒否：4 KB を超える',
  ck_empty: '拒否：空',
  ck_domain_mismatch: '拒否：ホストが属さない Domain',
  ck_public_suffix: '拒否：Domain がトップレベルドメイン',
  ck_secure_over_http: '拒否：http で Secure を設定',
  ck_prefix_secure: '拒否：__Secure- には https での Secure が必要',
  ck_prefix_host: '拒否：__Host- には Secure、Path=/、Domain なしが必要',
  ck_samesite_none_insecure: '拒否：Secure なしの SameSite=None',

  /* ---- what could not be established ---- */
  inc_deadline: '連鎖が終わる前に制限時間が尽きた',
  inc_port_not_followed: 'あるホップが、このサービスの接続しないポートを指している',
  inc_credentials_not_followed: 'あるホップのアドレスにユーザー名とパスワードが含まれている',
  inc_url_too_long: 'あるホップが、このサービスがたどれる長さを超えるアドレスを指している',

  /* ---- errors ---- */
  err_invalid_host: 'Web アドレスには見えません。',
  err_url_too_long: 'このアドレスは、このサービスがたどれる長さを超えています。',
  err_scheme_not_supported: '検査できるのは http と https のアドレスだけです。',
  err_credentials_not_allowed: 'アドレスからユーザー名とパスワードを取り除いてください。このサービスはそれらをどこにも送りません。',
  err_unknown_client: '不明なクライアントです。次のいずれかを使ってください：chrome, iphone, android, googlebot, yandexbot, bingbot, curl。',
  err_connection_refused: 'サーバーが接続を拒否しました。',
  err_connection_reset: '接続が切断されました。',
  err_connection_failed: '接続に失敗しました。',
  err_malformed_response: '応答が正しい HTTP ではありませんでした。',
  err_tls_failed: 'TLS ハンドシェイクに失敗しました。',
  err_deadline: 'このホップに至る前に制限時間が尽きました。',

  /* ---- findings ---- */
  flag_redirect_loop: '連鎖が循環している',
  fd_redirect_loop: 'あるホップが、連鎖ですでに訪れたアドレスへ、同じ Cookie のままリクエストを送り返しています。これでは応答は繰り返すしかありません。ブラウザーは「リダイレクトが多すぎる」として諦め、クローラーはそのリンクを捨てます。',

  flag_redirect_loop_without_cookies: 'Cookie を保持しないクライアントでは循環する',
  fd_redirect_loop_without_cookies: 'Cookie がないと、連鎖は出発点に戻ってきます。サイトが設定する Cookie を保持するブラウザーなら通り抜けられるかもしれません — しかしクローラーは Cookie を保持しないので、クローラーが目にするのはこの循環です。',

  flag_too_many_redirects: 'ブラウザーがたどる上限を超えるリダイレクト',
  fd_too_many_redirects: 'Chrome と Firefox は二十回のリダイレクトで止まり、エラーを表示します。この連鎖はその時点でもまだ続いていました。',

  flag_beyond_googlebot_limit: 'Googlebot がたどる長さを超えている',
  fd_beyond_googlebot_limit: 'Googlebot が連続してたどるリダイレクトは最大十回です。それを超えると、このリンクからはページがクロールされず、Search Console はリダイレクトエラーを報告します。',

  flag_long_chain: '連鎖が長い',
  fd_long_chain: 'ページに着くまでに三回以上のリダイレクトがあります。一つひとつが、何かが読み込まれ始める前の往復をもう一回増やします。検索エンジンも、最終アドレスへ一ホップで直行する形を好みます。',

  flag_could_be_one_redirect: '一つにまとめられるホップ',
  fd_could_be_one_redirect: '一つのサイトの中でリダイレクトが何回も続き、それぞれがアドレスの一部分ずつを整えています。訪問者を最終アドレスへ直接送れば、その分の往復が省けます。同じホスト上での http から https への最初のホップは数えていません。それは正しい第一歩だからです。',

  flag_slow_redirects: 'リダイレクトが遅い',
  fd_slow_redirects: 'ページそのものの読み込みが始まる前に、リダイレクトだけで一秒以上かかっています。',

  flag_connection_failed: '応答しないホップがある',
  fd_connection_failed: '連鎖はここで途切れています。次のアドレスは名前解決できなかったか、接続を拒否したか、時間内に応答しませんでした。訪問者にはエラーページが表示されます。',

  flag_redirect_to_private_network: 'プライベートネットワークを指している',
  fd_redirect_to_private_network: 'あるホップが、プライベートネットワーク内のアドレスか、そうしたネットワークの中にしか存在しない名前へ訪問者を送っています。インターネット上の誰もそこへはたどれず、リダイレクトそのものが内部の構成について何かを明かしてしまいます。このサービスもそこへはたどりません。',

  flag_location_malformed: '解釈できない Location',
  fd_location_malformed: 'リダイレクトがアドレスではないものを指しています。ブラウザーはエラーを表示します。',

  flag_multiple_location_headers: '異なる二つの Location ヘッダー',
  fd_multiple_location_headers: '応答に Location が複数あり、内容が食い違っています。Chrome はこうしたリダイレクトを一律に拒否し、ほかのクライアントはそのうち一つを選びます。ここでは最初のものをたどりました。',

  flag_redirect_without_location: '行き先のないリダイレクトステータス',
  fd_redirect_without_location: 'ステータスコードはリダイレクトを示していますが、Location ヘッダーがありません。ブラウザーは一緒に返された本文を表示しますが、たいていは空です。',

  flag_location_unencoded: '未エンコードの文字を含む Location',
  fd_location_unencoded: 'Location ヘッダーに、パーセントエンコードされていない空白や非 ASCII 文字が含まれています。ブラウザーは補正しますが、ほかのクライアントやプロキシ、ライブラリもそうするとは限りません。',

  flag_unsafe_redirect_target: 'ブラウザーが拒否するスキームへのリダイレクト',
  fd_unsafe_redirect_target: '連鎖が javascript:、data:、file: のいずれかのアドレスを指しています。ブラウザーはそこへのリダイレクトには従いません。',

  flag_leaves_the_web: 'アプリに引き渡している',
  fd_leaves_the_web: '連鎖が Web ページではないアドレスで終わっています — tg://、mailto:、intent:、アプリストアのリンクなど。ブラウザーはアプリを開くかどうか尋ねます。その先で何が起きるかは、もう Web の問題ではありません。',

  flag_ends_in_client_error: 'エラーページで終わる',
  fd_ends_in_client_error: '最終ページが 4xx のステータスコード（見つからない、削除済み、アクセス禁止など）で応答しています。このリンクはどこにもたどり着きません。',

  flag_ends_in_server_error: 'サーバーエラーで終わる',
  fd_ends_in_server_error: '最終ページが 5xx のステータスコードで応答しています。一時的なものかもしれませんが、続いている間はリンクが壊れています。',

  flag_redirect_status_not_followed: 'ブラウザーが従わない 3xx ステータス',
  fd_redirect_status_not_followed: '300、304、305、306 は 3xx のステータスコードですが、ブラウザーにとってはリダイレクトではありません。どんな Location が付いていても無視されます。',

  flag_bot_challenge: 'サイトではなくボット判定が応答した',
  fd_bot_challenge: '保護サービスが、自動化されたクライアント向けのチャレンジで応答しました。それを通過したブラウザーは別の場所へ送られるかもしれません。以下はスクリプトから見えるものです。',

  flag_https_downgrade: 'https から http へ逆戻り',
  fd_https_downgrade: 'あるホップが、暗号化されたアドレスから平文のアドレスへ移っています。そこから先は、リクエストと、Secure の付いていない Cookie がすべて平文でネットワークを流れ、ブラウザーは Referer を送らなくなります。',

  flag_late_https_upgrade: 'https への切り替えが遅い',
  fd_late_https_upgrade: '連鎖は https にたどり着きますが、その前にもう一度平文の http を経由しています。そのホップは訪問者の Cookie を付けたまま、暗号化されずにネットワークを流れます。まず同じホスト上で https へリダイレクトし、それから別の場所へ向けてください。',

  flag_upgrade_changes_host: 'https への切り替えでホストも変わる',
  fd_upgrade_changes_host: '最初の https のホップが別の名前へ向かっています。動作はしますが、訪問者が入力した名前の HSTS は一度も受け取られず、その名前をプリロードするには、まずその名前自体で切り替えが行われる必要があります。',

  flag_ends_on_http: '平文の http で終わる',
  fd_ends_on_http: '最終ページが暗号化なしで配信されています。',

  flag_certificate_invalid: 'ブラウザーが拒否する証明書',
  fd_certificate_invalid: 'ある https のホップが提示する証明書は、期限切れか、別のホスト向けか、信頼された認証局が発行したものではありません。ブラウザーはここで警告ページに止まります。行き先を示すため、その先の連鎖もあえてたどっています。',

  flag_temporary_canonicalization: '恒久的であるべきリダイレクトが一時的',
  fd_temporary_canonicalization: 'このホップはアドレス（スキーム、www、末尾のスラッシュ）を整えるだけなのに、自らを一時的と称しています。ブラウザーはこれを記憶せず、検索エンジンは両方のアドレスを保持します。この用途のステータスは 301 か 308 です。',

  flag_permanent_redirect_cached: '有効期限のない恒久的なリダイレクト',
  fd_permanent_redirect_cached: 'Cache-Control も Expires もない 301 や 308 は、ブラウザーが好きなだけ保持します。後で誤りだとわかっても、一度それを見た人は皆、古い転送先へ行き続けます。max-age を付けておけば、間違いを取り返せます。',

  flag_meta_refresh: 'meta refresh を使用',
  fd_meta_refresh: 'ページは <meta http-equiv="refresh"> で訪問者を先へ送っています。ブラウザーは従いますが、それはページの読み込みが終わってからです。また検索エンジンは、遅延付きのものを一時的なリダイレクトとして扱います。',

  flag_refresh_header: 'Refresh ヘッダーを使用',
  fd_refresh_header: '応答は Refresh ヘッダーで訪問者を先へ送っています。ブラウザーはこれに従いますが、HTTP として標準化されたことは一度もなく、ほかの多くのクライアントは無視します。',

  flag_javascript_redirect: 'スクリプトによるリダイレクト',
  fd_javascript_redirect: 'ページには、アドレスを書き換えるスクリプト以外に何もありません。スクリプトを実行しないクライアント（大半のリンクプレビュー、多くのクローラー、curl）は、空のページに留まります。これはソースから見つけたものです。このサービスはスクリプトを実行しません。',

  flag_script_redirect_not_followed: 'スクリプトが訪問者を先へ送るかもしれない',
  fd_script_redirect_not_followed: '最終ページのスクリプトのどこかでアドレスが書き換えられます。条件付きかもしれないためたどってはいませんが、ブラウザーはそこへ移動する可能性があります。',

  flag_redirect_sets_cookies: 'リダイレクトの途中で設定される Cookie',
  fd_redirect_sets_cookies: '最終ページより前のホップが Cookie を設定しています。トラッキングや、同意・ログインの流れではよくあることですが、リンクを共有するときには知っておく価値があります。',

  flag_cookie_rejected: 'ブラウザーが拒否する Cookie',
  fd_cookie_rejected: 'Set-Cookie が、ブラウザーの強制する規則に反しています。ホストが属さない Domain、http での Secure、条件を満たさない __Host- や __Secure- の接頭辞、Secure なしの SameSite=None などです。ブラウザーはこれを捨てるため、それに依存するログインや同意の流れは黙って失敗します。',

  flag_query_lost: '途中でクエリパラメーターが失われる',
  fd_query_lost: 'リンクが最初に持っていたパラメーターが、最終アドレスから消えています。よく犠牲になるのは utm_source のようなトラッキングパラメーターで、その訪問は直接の訪問として数えられてしまいます。',

  flag_path_lost: 'トップページで終わる',
  fd_path_lost: 'リンクは特定のページを指していたのに、連鎖はサイトのルートで終わっています。何もかもをトップページへリダイレクトするサイト移転の後によくある形で、訪問者も検索エンジンも、目当てのページを見失います。',

  flag_lands_on_another_site: '別のサイトで終わる',
  fd_lands_on_another_site: 'リンクはあるサイトから始まり、別のサイトで終わっています。短縮リンクや広告リンクなら想定どおりですが、そのどちらでもない場合は確認する価値があります。',

  flag_canonical_elsewhere: '最終ページが別の正規 URL を示している',
  fd_canonical_elsewhere: '連鎖が行き着いたページは、自身の正規 URL として別の場所を示しています。検索エンジンは代わりにそちらをインデックスする可能性があるので、リンクするならそちらのほうが適しています。',

  flag_final_noindex: '最終ページがインデックスから除外されている',
  fd_final_noindex: '連鎖が行き着いたページは、robots メタタグか X-Robots-Tag ヘッダーで、検索エンジンにインデックスしないよう求めています。',
};

OWN.hi = {
  title: 'रीडायरेक्ट जाँच — मंज़िल तक पहुँचने से पहले लिंक का हर पड़ाव',
  title_short: 'रीडायरेक्ट जाँच',
  h1: 'रीडायरेक्ट जाँच',
  subtitle: 'मंज़िल तक पहुँचने से पहले लिंक का हर पड़ाव: स्टेटस कोड, वह कहाँ ले जाता है, किसने उत्तर दिया, कितना समय लगा, प्रमाणपत्र और कुकियाँ — meta refresh और स्क्रिप्ट वाले रीडायरेक्ट समेत',
  ph_url: 'example.com/page',
  hero_label: 'जाँचा गया लिंक',
  hero_count: 'रीडायरेक्ट',
  empty_hint: 'कोई लिंक चिपकाएँ — छोटा लिंक, सारे ट्रैकिंग पैरामीटरों वाला विज्ञापन-लिंक, साइट के स्थानांतरण के बाद का पुराना पता। जाँच ब्राउज़र की तरह एक-एक पड़ाव करके उसका अनुसरण करती है और हर चरण दिखाती है: स्टेटस कोड, वह कहाँ ले गया, किसने उत्तर दिया, कितना समय लगा, प्रमाणपत्र और कुकियाँ। meta refresh या स्क्रिप्ट वाला रीडायरेक्ट भी एक पड़ाव गिना जाता है।',
  label_client: 'किस रूप में पूछें',
  label_cookies: 'कुकियाँ रखें',
  btn_copy_chain: 'टेक्स्ट कॉपी करें',

  /* ---- stages ---- */
  stage_follow: 'लिंक का अनुसरण',
  stage_analyse: 'सफ़र पढ़ा जा रहा है',
  progress_hops: 'अब तक पड़ाव: {n}',

  /* ---- cards ---- */
  card_journey: 'सफ़र',
  card_summary: 'कहाँ पहुँचता है',
  card_client: 'किसने पूछा',
  note_journey: 'हर पड़ाव एक नया कनेक्शन है, इसलिए उसके समय वही हैं जो पहली बार आने पर लगते हैं; एक ही होस्ट पर पड़ावों के लिए ब्राउज़र कनेक्शन दोबारा इस्तेमाल करता है। पते का जो हिस्सा पड़ाव ने बदला, वह चिह्नित है।',

  k_destination: 'मंज़िल',
  k_outcome: 'परिणाम',
  k_redirects: 'रीडायरेक्ट',
  k_time_total: 'समय, सभी अनुरोध',
  k_time_redirects: 'इसमें से रीडायरेक्ट',
  k_hosts: 'रास्ते के होस्ट',
  k_client: 'क्लाइंट',
  k_user_agent: 'User-Agent',
  k_language: 'Accept-Language',
  k_cookies: 'कुकियाँ',

  v_no_redirects: 'कोई नहीं — लिंक सीधे वहीं ले जाता है',
  v_requests: 'अनुरोध: {n}',
  v_not_sent: 'नहीं भेजा गया',
  v_cookies_kept: 'पड़ावों के बीच रखी जाती हैं, जैसे ब्राउज़र रखता है',
  v_cookies_forgotten: 'पड़ावों के बीच भुला दी जाती हैं, जैसे क्रॉलर भुला देता है',
  v_cookies_off: 'बिना कुकियों के',
  v_session: 'सत्र तक',
  v_deleted: 'हटाई गई',
  v_truncated: 'पूरा नहीं पढ़ा गया',
  v_ports: 'यह सेवा इन पोर्टों से जुड़ती है: {list}।',
  note_client: 'जाँच इंटरफ़ेस की भाषा में पूछती है, जैसे आपका अपना ब्राउज़र पूछता, इसलिए भाषा के आधार पर रीडायरेक्ट करने वाली साइट ऐसा करते हुए दिखती है। यह एक ही जगह से भी पूछती है, इसलिए देश के आधार पर होने वाला रीडायरेक्ट उसी जगह का उत्तर दिखाता है।',
  note_crawler: 'क्रॉलर की नक़ल केवल उसके User-Agent से की जाती है। जो साइट रिवर्स DNS से क्रॉलरों की पुष्टि करती है, उसे Google या Yandex के बजाय यह सर्वर दिखता है, और वह अनुरोध को नक़ली मान सकती है।',
  empty_flags: 'बताने लायक कुछ नहीं।',
  at_steps: 'चरण {n}',
  incomplete_chain: 'यह सेवा जहाँ तक जाती है, वहाँ तक शृंखला का अनुसरण हुआ, पर उसके अंत तक नहीं पहुँचा जा सका:',

  /* ---- a hop ---- */
  hop_details: 'विवरण',
  hop_final: 'मंज़िल',
  hop_failed: 'कोई उत्तर नहीं',
  hop_stopped: 'अनुसरण नहीं किया',
  hop_timing: 'समय कहाँ लगा',
  hop_location: 'Location, जैसा भेजा गया',
  hop_address: 'पता',
  hop_http: 'प्रोटोकॉल',
  hop_server: 'सर्वर',
  hop_through: 'उत्तर किसके ज़रिये आया',
  hop_tls: 'TLS',
  hop_cert: 'प्रमाणपत्र',
  hop_cert_ok: 'भरोसेमंद',
  hop_cert_bad: 'भरोसेमंद नहीं — ब्राउज़र यहाँ चेतावनी देकर रुक जाता है',
  hop_cert_for: 'किसके लिए जारी',
  hop_cert_issuer: 'जारीकर्ता',
  hop_cert_until: 'कब तक वैध',
  hop_cookies_sent: 'भेजी गई कुकियाँ',
  hop_cookies_set: 'सेट की गई कुकियाँ',
  hop_sets_cookies: 'कुकियाँ सेट: {n}',
  hop_headers: 'उत्तर के हेडर',
  hop_page: 'पृष्ठ',
  hop_title: 'शीर्षक',
  hop_canonical: 'प्रामाणिक पता',
  hop_robots: 'Robots',
  hop_refresh: 'Refresh',
  hop_refresh_slow: '{s} सेकंड बाद {url} पर — रीडायरेक्ट माने जाने के लिए बहुत धीमा',
  hop_noscript: 'स्क्रिप्ट के बिना Refresh',
  hop_scripts: 'कोड में स्क्रिप्ट वाले रीडायरेक्ट',
  hop_body: 'पढ़ा गया',
  hop_relative: 'सापेक्ष',
  hop_fragment: '# के बाद का हिस्सा आगे गया',
  hop_multiple: 'कई Location हेडर',
  hop_not_followed: 'अनुसरण नहीं किया',
  hop_loop: 'वापस चरण {n} पर',
  note_cookie_values: 'मान नहीं दिखाए जाते: रीडायरेक्ट के दौरान सेट हुई कुकी अक्सर सत्र-कुकी होती है।',
  th_name: 'नाम',
  th_scope: 'डोमेन और पथ',
  th_flags: 'विशेषताएँ',
  th_expires: 'समाप्ति',
  unit_ms: 'मिसे',
  unit_s: 'से',
  unit_kb: 'KB',

  t_dns: 'DNS',
  t_connect: 'कनेक्शन',
  t_tls: 'TLS',
  t_wait: 'सर्वर',

  /* ---- how a hop moves on ---- */
  rt_http: 'HTTP रीडायरेक्ट',
  rt_refresh_header: 'Refresh हेडर',
  rt_meta_refresh: 'meta refresh',
  rt_javascript: 'स्क्रिप्ट, कोड में मिली',

  sc_301: 'स्थायी; ब्राउज़र POST को GET में बदल सकता है',
  sc_302: 'अस्थायी; ब्राउज़र POST को GET में बदल सकता है',
  sc_303: 'अन्यत्र देखें; अनुसरण हमेशा GET से होता है',
  sc_307: 'अस्थायी; मेथड और बॉडी वही रहते हैं',
  sc_308: 'स्थायी; मेथड और बॉडी वही रहते हैं',

  /* ---- outcomes ---- */
  out_arrived: 'पहुँच जाता है',
  out_client_error: 'त्रुटि पृष्ठ पर ख़त्म होता है',
  out_server_error: 'सर्वर त्रुटि पर ख़त्म होता है',
  out_loop: 'चक्र में घूमता रहता है',
  out_too_many_redirects: 'ब्राउज़र की सीमा से अधिक रीडायरेक्ट',
  out_failed: 'टूट जाता है: एक पड़ाव ने उत्तर नहीं दिया',
  out_refused: 'ऐसे पते पर रुक जाता है जिसका यह सेवा अनुसरण नहीं करती',
  out_broken_redirect: 'ऐसे Location पर टूट जाता है जो पता ही नहीं है',
  out_unsafe_redirect: 'ऐसे रीडायरेक्ट पर ख़त्म होता है जिसे ब्राउज़र ठुकरा देते हैं',
  out_left_web: 'किसी ऐप को सौंप देता है',
  out_incomplete: 'समय-सीमा के कारण बीच में रुक गया',

  /* ---- clients ---- */
  ua_chrome: 'Chrome, डेस्कटॉप',
  ua_iphone: 'Safari, iPhone',
  ua_android: 'Chrome, Android',
  ua_googlebot: 'Googlebot',
  ua_yandexbot: 'YandexBot',
  ua_bingbot: 'Bingbot',
  ua_curl: 'curl',

  /* ---- cookies a browser refuses ---- */
  ck_too_large: 'अस्वीकृत: 4 KB से बड़ी',
  ck_empty: 'अस्वीकृत: ख़ाली',
  ck_domain_mismatch: 'अस्वीकृत: ऐसा Domain जिसका यह होस्ट हिस्सा नहीं',
  ck_public_suffix: 'अस्वीकृत: Domain एक शीर्ष-स्तरीय डोमेन है',
  ck_secure_over_http: 'अस्वीकृत: http पर Secure सेट किया गया',
  ck_prefix_secure: 'अस्वीकृत: https पर Secure के बिना __Secure-',
  ck_prefix_host: 'अस्वीकृत: __Host- के लिए Secure, Path=/ और Domain का न होना ज़रूरी है',
  ck_samesite_none_insecure: 'अस्वीकृत: Secure के बिना SameSite=None',

  /* ---- what could not be established ---- */
  inc_deadline: 'शृंखला ख़त्म होने से पहले समय-सीमा पूरी हो गई',
  inc_port_not_followed: 'एक पड़ाव ऐसे पोर्ट की ओर ले जाता है जिससे यह सेवा नहीं जुड़ती',
  inc_credentials_not_followed: 'एक पड़ाव के पते में उपयोगकर्ता नाम और पासवर्ड है',
  inc_url_too_long: 'एक पड़ाव ऐसे पते की ओर ले जाता है जो इस सेवा की सीमा से लंबा है',

  /* ---- errors ---- */
  err_invalid_host: 'यह वेब पते जैसा नहीं लगता।',
  err_url_too_long: 'यह पता इस सेवा की सीमा से लंबा है।',
  err_scheme_not_supported: 'केवल http और https पते जाँचे जा सकते हैं।',
  err_credentials_not_allowed: 'पते से उपयोगकर्ता नाम और पासवर्ड हटा दें: यह सेवा उन्हें कहीं नहीं भेजती।',
  err_unknown_client: 'अज्ञात क्लाइंट। इनमें से किसी एक का उपयोग करें: chrome, iphone, android, googlebot, yandexbot, bingbot, curl।',
  err_connection_refused: 'सर्वर ने कनेक्शन ठुकरा दिया।',
  err_connection_reset: 'कनेक्शन बीच में टूट गया।',
  err_connection_failed: 'कनेक्शन नहीं हो सका।',
  err_malformed_response: 'उत्तर मान्य HTTP नहीं था।',
  err_tls_failed: 'TLS हैंडशेक विफल रहा।',
  err_deadline: 'इस पड़ाव से पहले ही समय-सीमा पूरी हो गई।',

  /* ---- findings ---- */
  flag_redirect_loop: 'शृंखला चक्र में घूमती रहती है',
  fd_redirect_loop: 'एक पड़ाव अनुरोध को उन्हीं कुकियों के साथ ऐसे पते पर वापस भेजता है जहाँ शृंखला पहले जा चुकी है, इसलिए उत्तर बस दोहराया ही जा सकता है। ब्राउज़र “बहुत अधिक रीडायरेक्ट” कहकर हार मान लेते हैं; क्रॉलर लिंक छोड़ देते हैं।',

  flag_redirect_loop_without_cookies: 'बिना कुकी वाले क्लाइंटों के लिए चक्र',
  fd_redirect_loop_without_cookies: 'कुकियों के बिना शृंखला वहीं लौट आती है जहाँ से चली थी। जो ब्राउज़र साइट की सेट की हुई कुकी रख लेता है, वह शायद आगे निकल जाए — पर क्रॉलर कोई कुकी नहीं रखते, इसलिए उन्हें यही चक्र दिखता है।',

  flag_too_many_redirects: 'ब्राउज़र की सीमा से अधिक रीडायरेक्ट',
  fd_too_many_redirects: 'Chrome और Firefox बीस रीडायरेक्टों के बाद रुककर त्रुटि दिखाते हैं। यह शृंखला तब भी चल रही थी।',

  flag_beyond_googlebot_limit: 'Googlebot की सीमा से लंबी शृंखला',
  fd_beyond_googlebot_limit: 'Googlebot लगातार दस रीडायरेक्टों तक का अनुसरण करता है। उसके आगे इस लिंक से पृष्ठ क्रॉल नहीं होता, और Search Console रीडायरेक्ट त्रुटि दिखाता है।',

  flag_long_chain: 'लंबी शृंखला',
  fd_long_chain: 'पृष्ठ से पहले तीन या अधिक रीडायरेक्ट। हर रीडायरेक्ट का मतलब है कुछ भी लोड होने से पहले एक और आना-जाना, और सर्च इंजन सीधे अंतिम पते तक एक ही पड़ाव पसंद करते हैं।',

  flag_could_be_one_redirect: 'पड़ाव जो एक हो सकते थे',
  fd_could_be_one_redirect: 'एक ही साइट के भीतर कई रीडायरेक्ट, जिनमें से हर एक पते का अपना-अपना हिस्सा सुधारता है। आगंतुक को सीधे अंतिम पते पर भेजें, तो इतने आने-जाने की ज़रूरत नहीं रहती। उसी होस्ट पर http से https वाला पहला पड़ाव नहीं गिना जाता: वही सही पहला क़दम है।',

  flag_slow_redirects: 'रीडायरेक्ट धीमे हैं',
  fd_slow_redirects: 'पृष्ठ का लोड होना शुरू होने से पहले ही, केवल रीडायरेक्टों में एक सेकंड से अधिक लग गया।',

  flag_connection_failed: 'एक पड़ाव ने उत्तर नहीं दिया',
  fd_connection_failed: 'शृंखला यहीं टूट जाती है: अगला पता हल नहीं हुआ, उसने कनेक्शन ठुकरा दिया या समय पर उत्तर नहीं दिया। आगंतुकों को त्रुटि पृष्ठ दिखता है।',

  flag_redirect_to_private_network: 'निजी नेटवर्क के भीतर ले जाता है',
  fd_redirect_to_private_network: 'एक पड़ाव आगंतुक को किसी निजी नेटवर्क के भीतर के पते पर भेजता है, या ऐसे नाम पर जो केवल ऐसे ही किसी नेटवर्क के भीतर मौजूद है। इंटरनेट पर कोई उसका अनुसरण नहीं कर सकता, और रीडायरेक्ट ख़ुद भीतरी ढाँचे के बारे में कुछ बता देता है। यह सेवा भी उसका अनुसरण नहीं करती।',

  flag_location_malformed: 'ऐसा Location जिसे पढ़ा नहीं जा सकता',
  fd_location_malformed: 'रीडायरेक्ट ऐसी चीज़ की ओर इशारा करता है जो पता ही नहीं है। ब्राउज़र त्रुटि दिखाते हैं।',

  flag_multiple_location_headers: 'दो अलग-अलग Location हेडर',
  fd_multiple_location_headers: 'उत्तर में एक से अधिक Location हैं, और वे आपस में मेल नहीं खाते। Chrome ऐसे रीडायरेक्ट को सिरे से ठुकरा देता है; दूसरे क्लाइंट उनमें से कोई एक चुन लेते हैं। यहाँ पहले वाले का अनुसरण किया गया।',

  flag_redirect_without_location: 'रीडायरेक्ट का कोड, पर जाने को कोई जगह नहीं',
  fd_redirect_without_location: 'कोड रीडायरेक्ट बताता है, पर Location हेडर है ही नहीं। ब्राउज़र उसके साथ आई बॉडी दिखा देते हैं, जो अक्सर ख़ाली होती है।',

  flag_location_unencoded: 'कच्चे अक्षरों वाला Location',
  fd_location_unencoded: 'Location हेडर में प्रतिशत-एन्कोडिंग के बिना स्पेस या ASCII से बाहर के अक्षर हैं। ब्राउज़र इसे ठीक कर लेते हैं; दूसरे क्लाइंट, प्रॉक्सी और लाइब्रेरी शायद न करें।',

  flag_unsafe_redirect_target: 'ऐसी योजना पर रीडायरेक्ट जिसे ब्राउज़र ठुकरा देते हैं',
  fd_unsafe_redirect_target: 'शृंखला किसी javascript:, data: या file: पते की ओर इशारा करती है। ब्राउज़र वहाँ रीडायरेक्ट का अनुसरण करने से इनकार करते हैं।',

  flag_leaves_the_web: 'किसी ऐप को सौंप देता है',
  fd_leaves_the_web: 'शृंखला ऐसे पते पर ख़त्म होती है जो वेब पृष्ठ नहीं है — tg://, mailto:, intent:, किसी ऐप स्टोर का लिंक। ब्राउज़र ऐप खोलने की पेशकश करता है; आगे क्या होता है, यह अब वेब का सवाल नहीं रहा।',

  flag_ends_in_client_error: 'त्रुटि पृष्ठ पर ख़त्म होता है',
  fd_ends_in_client_error: 'अंतिम पृष्ठ 4xx कोड के साथ उत्तर देता है — नहीं मिला, हटा दिया गया, पहुँच वर्जित। लिंक कहीं नहीं ले जाता।',

  flag_ends_in_server_error: 'सर्वर त्रुटि पर ख़त्म होता है',
  fd_ends_in_server_error: 'अंतिम पृष्ठ 5xx कोड के साथ उत्तर देता है। हो सकता है यह अस्थायी हो; जब तक यह बना है, लिंक टूटा हुआ है।',

  flag_redirect_status_not_followed: 'ऐसा 3xx कोड जिसका ब्राउज़र अनुसरण नहीं करते',
  fd_redirect_status_not_followed: '300, 304, 305 और 306 कोड 3xx वर्ग के हैं, पर ब्राउज़र के लिए रीडायरेक्ट नहीं: उनके साथ जो भी Location आए, उसे अनदेखा किया जाता है।',

  flag_bot_challenge: 'साइट की जगह बॉट-जाँच ने उत्तर दिया',
  fd_bot_challenge: 'एक सुरक्षा सेवा ने स्वचालित क्लाइंटों के लिए बनी चुनौती के साथ उत्तर दिया। जो ब्राउज़र इसे पार कर ले, उसे कहीं और भेजा जा सकता है; आगे वही है जो एक स्क्रिप्ट को दिखता है।',

  flag_https_downgrade: 'https से वापस http पर',
  fd_https_downgrade: 'एक पड़ाव एन्क्रिप्टेड पते से अनएन्क्रिप्टेड पते पर जाता है। वहाँ से अनुरोध, और हर वह कुकी जिस पर Secure नहीं लगा है, नेटवर्क को खुले रूप में पार करते हैं, और ब्राउज़र Referer भेजना बंद कर देते हैं।',

  flag_late_https_upgrade: 'https पर जाना देर से होता है',
  fd_late_https_upgrade: 'शृंखला https तक पहुँचती तो है, पर अनएन्क्रिप्टेड http पर एक और पड़ाव के बाद। वह पड़ाव आगंतुक की कुकियों समेत बिना एन्क्रिप्शन के नेटवर्क पार करता है। पहले उसी होस्ट पर https पर रीडायरेक्ट करें, फिर कहीं और।',

  flag_upgrade_changes_host: 'https पर जाते समय होस्ट भी बदलता है',
  fd_upgrade_changes_host: 'पहला https पड़ाव किसी दूसरे नाम पर जाता है। यह काम करता है, पर आगंतुक ने जो नाम टाइप किया, उसके लिए HSTS कभी मिलता ही नहीं, और उस नाम को प्रीलोड करने के लिए ज़रूरी है कि https पर जाना पहले उसी नाम पर हो।',

  flag_ends_on_http: 'अनएन्क्रिप्टेड http पर ख़त्म होता है',
  fd_ends_on_http: 'अंतिम पृष्ठ बिना एन्क्रिप्शन के परोसा जाता है।',

  flag_certificate_invalid: 'ऐसा प्रमाणपत्र जिसे ब्राउज़र अस्वीकार कर देगा',
  fd_certificate_invalid: 'एक https पड़ाव ऐसा प्रमाणपत्र दिखाता है जो समय-समाप्त है, किसी दूसरे होस्ट का नाम लेता है, या किसी भरोसेमंद प्राधिकरण ने जारी नहीं किया। ब्राउज़र यहाँ चेतावनी वाले पृष्ठ पर रुक जाता है; आगे की शृंखला का अनुसरण फिर भी किया गया, यह दिखाने के लिए कि वह कहाँ ले जाती है।',

  flag_temporary_canonicalization: 'जहाँ स्थायी रीडायरेक्ट चाहिए, वहाँ अस्थायी',
  fd_temporary_canonicalization: 'यह पड़ाव केवल पते को सुधारता है — योजना, www, अंत का स्लैश — और ख़ुद को अस्थायी कहता है। ब्राउज़र उसे याद नहीं रखेंगे और सर्च इंजन दोनों पते रखे रहेंगे। इसके लिए सही कोड 301 या 308 है।',

  flag_permanent_redirect_cached: 'बिना समाप्ति-अवधि का स्थायी रीडायरेक्ट',
  fd_permanent_redirect_cached: 'Cache-Control या Expires के बिना 301 या 308 को ब्राउज़र जितनी देर चाहें, रखे रहते हैं। अगर वह कभी ग़लत निकले, तो जिसने भी उसे देखा है, वह पुराने लक्ष्य पर ही जाता रहेगा। max-age से ग़लती सुधारी जा सकती है।',

  flag_meta_refresh: 'meta refresh से रीडायरेक्ट',
  fd_meta_refresh: 'पृष्ठ आगंतुकों को <meta http-equiv="refresh"> से आगे भेजता है। ब्राउज़र इसका अनुसरण करते हैं, पर पृष्ठ लोड हो जाने के बाद ही, और सर्च इंजन देर से होने वाले meta refresh को अस्थायी रीडायरेक्ट मानते हैं।',

  flag_refresh_header: 'Refresh हेडर',
  fd_refresh_header: 'उत्तर आगंतुकों को Refresh हेडर से आगे भेजता है। ब्राउज़र इसका पालन करते हैं, पर इसे HTTP के मानक में कभी शामिल नहीं किया गया, और कई दूसरे क्लाइंट इसे अनदेखा कर देते हैं।',

  flag_javascript_redirect: 'स्क्रिप्ट से रीडायरेक्ट',
  fd_javascript_redirect: 'पृष्ठ में पता बदलने वाली एक स्क्रिप्ट के सिवा कुछ नहीं है। जो क्लाइंट स्क्रिप्ट नहीं चलाते — ज़्यादातर लिंक प्रीव्यू, कई क्रॉलर, curl — वे ख़ाली पृष्ठ पर ही रह जाते हैं। यह कोड में मिला: यह सेवा स्क्रिप्ट नहीं चलाती।',

  flag_script_redirect_not_followed: 'एक स्क्रिप्ट आगंतुकों को आगे भेज सकती है',
  fd_script_redirect_not_followed: 'अंतिम पृष्ठ अपनी स्क्रिप्टों में कहीं पता बदलता है। यह किसी शर्त के पीछे हो सकता है, इसलिए इसका अनुसरण नहीं किया गया; ब्राउज़र फिर भी वहाँ जा सकता है।',

  flag_redirect_sets_cookies: 'रीडायरेक्ट के दौरान सेट की गई कुकियाँ',
  fd_redirect_sets_cookies: 'अंतिम पृष्ठ से पहले के पड़ाव कुकियाँ सेट करते हैं। ट्रैकिंग और सहमति या लॉगिन की प्रक्रियाओं में यह आम है; लिंक साझा करते समय यह जानना उपयोगी है।',

  flag_cookie_rejected: 'ऐसी कुकी जिसे ब्राउज़र ठुकरा देगा',
  fd_cookie_rejected: 'एक Set-Cookie ऐसा नियम तोड़ता है जिसे ब्राउज़र लागू करते हैं: ऐसा Domain जिसका होस्ट हिस्सा नहीं, http पर Secure, अपनी शर्तों के बिना __Host- या __Secure- उपसर्ग, Secure के बिना SameSite=None। ब्राउज़र उसे छोड़ देता है, और उस पर टिकी लॉगिन या सहमति की प्रक्रिया चुपचाप विफल हो जाती है।',

  flag_query_lost: 'रास्ते में पैरामीटर खो गए',
  fd_query_lost: 'लिंक जिन पैरामीटरों के साथ शुरू हुआ था, वे अंतिम पते में नहीं हैं। आम तौर पर नुक़सान utm_source जैसे ट्रैकिंग पैरामीटरों का होता है: विज़िट सीधी विज़िट के रूप में गिनी जाती है।',

  flag_path_lost: 'मुखपृष्ठ पर ख़त्म होता है',
  fd_path_lost: 'लिंक एक ख़ास पृष्ठ की ओर था और शृंखला साइट के मूल पर ख़त्म होती है। ऐसे स्थानांतरण के बाद यह आम है जिसमें सब कुछ मुखपृष्ठ पर रीडायरेक्ट कर दिया जाता है: आगंतुक और सर्च इंजन दोनों वह पृष्ठ खो देते हैं जिसकी उन्हें तलाश थी।',

  flag_lands_on_another_site: 'दूसरी साइट पर ख़त्म होता है',
  fd_lands_on_another_site: 'लिंक एक साइट पर शुरू होता है और दूसरी पर ख़त्म होता है। छोटे लिंक और विज्ञापन-लिंक के लिए यह अपेक्षित है; जब वह इनमें से कोई न हो, तो एक नज़र डालने लायक है।',

  flag_canonical_elsewhere: 'अंतिम पृष्ठ किसी दूसरे प्रामाणिक पते का नाम लेता है',
  fd_canonical_elsewhere: 'जिस पृष्ठ पर शृंखला ख़त्म होती है, वह अपना प्रामाणिक पता कहीं और बताता है। सर्च इंजन उसकी जगह उसी पते को इंडेक्स कर सकते हैं, इसलिए लिंक देने के लिए वही बेहतर है।',

  flag_final_noindex: 'अंतिम पृष्ठ इंडेक्स से बाहर रखा गया है',
  fd_final_noindex: 'जिस पृष्ठ पर शृंखला ख़त्म होती है, वह robots मेटा टैग या X-Robots-Tag हेडर के ज़रिये सर्च इंजनों से कहता है कि उसे इंडेक्स न करें।',
};

OWN.ar = {
  title: 'فحص إعادة التوجيه — كل قفزة يمرّ بها الرابط قبل أن يصل',
  title_short: 'فحص إعادة التوجيه',
  h1: 'فحص إعادة التوجيه',
  subtitle: 'كل قفزة يمرّ بها الرابط قبل أن يصل: رمز الحالة، وإلى أين تشير، ومن أجاب، وكم استغرقت، والشهادة، والكوكيز — بما في ذلك meta refresh وإعادة التوجيه بالسكربت',
  ph_url: 'example.com/page',
  hero_label: 'الرابط المفحوص',
  hero_count: 'عمليات إعادة التوجيه',
  empty_hint: 'الصق رابطًا — رابطًا مختصرًا، أو رابط إعلان بكل معاملات التتبع فيه، أو عنوانًا قديمًا بعد انتقال الموقع. يتبعه الفحص قفزةً قفزة كما يفعل المتصفح، ويعرض كل خطوة: رمز الحالة، وإلى أين أشارت، ومن أجاب، وكم استغرقت، والشهادة، والكوكيز. وإعادة التوجيه عبر meta refresh أو بالسكربت تُحتسب قفزةً هي الأخرى.',
  label_client: 'اسأل بصفة',
  label_cookies: 'احتفظ بالكوكيز',
  btn_copy_chain: 'انسخ نصًا',

  /* ---- stages ---- */
  stage_follow: 'يُتتبَّع الرابط',
  stage_analyse: 'تُقرأ الرحلة',
  progress_hops: 'القفزات حتى الآن: {n}',

  /* ---- cards ---- */
  card_journey: 'الرحلة',
  card_summary: 'إلى أين ينتهي',
  card_client: 'من سأل',
  note_journey: 'كل قفزة اتصال جديد، فأزمنتها هي كلفة الزيارة الأولى؛ أما المتصفح فيعيد استعمال الاتصال للقفزات على المضيف نفسه. والجزء المميَّز من العنوان هو ما غيّرته القفزة.',

  k_destination: 'ينتهي إلى',
  k_outcome: 'النتيجة',
  k_redirects: 'عمليات إعادة التوجيه',
  k_time_total: 'الزمن، كل الطلبات',
  k_time_redirects: 'منها لإعادة التوجيه',
  k_hosts: 'المضيفات على الطريق',
  k_client: 'العميل',
  k_user_agent: 'User-Agent',
  k_language: 'Accept-Language',
  k_cookies: 'الكوكيز',

  v_no_redirects: 'لا شيء — الرابط يؤدي إلى وجهته مباشرةً',
  v_requests: 'الطلبات: {n}',
  v_not_sent: 'لم تُرسَل',
  v_cookies_kept: 'تُحفظ بين القفزات كما يفعل المتصفح',
  v_cookies_forgotten: 'تُنسى بين القفزات كما يفعل برنامج الزحف',
  v_cookies_off: 'بلا كوكيز',
  v_session: 'حتى نهاية الجلسة',
  v_deleted: 'محذوفة',
  v_truncated: 'لم يُقرأ كاملًا',
  v_ports: 'المنافذ التي تتصل بها هذه الخدمة: {list}.',
  note_client: 'يسأل الفحص بلغة الواجهة كما يفعل متصفحك أنت، فيُرى الموقع الذي يعيد التوجيه بحسب اللغة وهو يفعل ذلك. ويسأل أيضًا من مكان واحد، فإعادة التوجيه بحسب البلد تُظهر الاستجابة الخاصة بذلك المكان.',
  note_crawler: 'يُحاكى برنامج الزحف بترويسة User-Agent وحدها. والموقع الذي يتحقق من برامج الزحف عبر DNS العكسي يرى هذا الخادم بدلًا من Google أو Yandex، وقد يعدّ الطلب انتحالًا.',
  empty_flags: 'لا شيء يُذكر.',
  at_steps: 'الخطوة {n}',
  incomplete_chain: 'تتبّع الفحص السلسلة إلى أبعد ما تبلغه هذه الخدمة، وتوقف قبل نهايتها:',

  /* ---- a hop ---- */
  hop_details: 'التفاصيل',
  hop_final: 'الوجهة',
  hop_failed: 'لا استجابة',
  hop_stopped: 'لم تُتبَع',
  hop_timing: 'أين ذهب الوقت',
  hop_location: 'Location كما أُرسلت',
  hop_address: 'عنوان IP',
  hop_http: 'البروتوكول',
  hop_server: 'الخادم',
  hop_through: 'جاءت الاستجابة عبر',
  hop_tls: 'TLS',
  hop_cert: 'الشهادة',
  hop_cert_ok: 'موثوقة',
  hop_cert_bad: 'غير موثوقة — يتوقف المتصفح هنا عند تحذير',
  hop_cert_for: 'صادرة باسم',
  hop_cert_issuer: 'جهة الإصدار',
  hop_cert_until: 'صالحة حتى',
  hop_cookies_sent: 'الكوكيز المرسلة',
  hop_cookies_set: 'الكوكيز المضبوطة',
  hop_sets_cookies: 'كوكيز مضبوطة: {n}',
  hop_headers: 'ترويسات الاستجابة',
  hop_page: 'الصفحة',
  hop_title: 'عنوان الصفحة',
  hop_canonical: 'العنوان المعياري',
  hop_robots: 'Robots',
  hop_refresh: 'Refresh',
  hop_refresh_slow: 'إلى {url} بعد {s} ث — أبطأ من أن يُعدّ إعادة توجيه',
  hop_noscript: 'Refresh بلا سكربت',
  hop_scripts: 'إعادة التوجيه بالسكربت في الشيفرة',
  hop_body: 'ما قُرئ',
  hop_relative: 'نسبي',
  hop_fragment: 'نُقل الجزء بعد #',
  hop_multiple: 'عدة ترويسات Location',
  hop_not_followed: 'لم تُتبَع',
  hop_loop: 'عودة إلى الخطوة {n}',
  note_cookie_values: 'لا تُعرض القيم: فالكوكي التي تُضبط أثناء إعادة التوجيه كثيرًا ما تكون كوكي جلسة.',
  th_name: 'الاسم',
  th_scope: 'النطاق والمسار',
  th_flags: 'السمات',
  th_expires: 'الانتهاء',
  unit_ms: 'مث',
  unit_s: 'ث',
  unit_kb: 'KB',

  t_dns: 'DNS',
  t_connect: 'الاتصال',
  t_tls: 'TLS',
  t_wait: 'الخادم',

  /* ---- how a hop moves on ---- */
  rt_http: 'إعادة توجيه HTTP',
  rt_refresh_header: 'ترويسة Refresh',
  rt_meta_refresh: 'meta refresh',
  rt_javascript: 'سكربت، عُثر عليه في الشيفرة',

  sc_301: 'دائمة؛ قد يحوّل المتصفح POST إلى GET',
  sc_302: 'مؤقتة؛ قد يحوّل المتصفح POST إلى GET',
  sc_303: 'انظر في مكان آخر؛ يُتبَع دائمًا بـ GET',
  sc_307: 'مؤقتة؛ تبقى الطريقة والمتن كما هما',
  sc_308: 'دائمة؛ تبقى الطريقة والمتن كما هما',

  /* ---- outcomes ---- */
  out_arrived: 'يصل',
  out_client_error: 'ينتهي بصفحة خطأ',
  out_server_error: 'ينتهي بخطأ في الخادم',
  out_loop: 'يدور في حلقة',
  out_too_many_redirects: 'عمليات إعادة توجيه تتجاوز حدّ المتصفح',
  out_failed: 'ينقطع: قفزة لم تستجب',
  out_refused: 'يتوقف عند عنوان لا تتبعه هذه الخدمة',
  out_broken_redirect: 'ينقطع عند قيمة Location ليست عنوانًا',
  out_unsafe_redirect: 'ينتهي بإعادة توجيه ترفضها المتصفحات',
  out_left_web: 'يُحيل إلى تطبيق',
  out_incomplete: 'يتوقف بانتهاء المهلة',

  /* ---- clients ---- */
  ua_chrome: 'Chrome، كمبيوتر مكتبي',
  ua_iphone: 'Safari, iPhone',
  ua_android: 'Chrome, Android',
  ua_googlebot: 'Googlebot',
  ua_yandexbot: 'YandexBot',
  ua_bingbot: 'Bingbot',
  ua_curl: 'curl',

  /* ---- cookies a browser refuses ---- */
  ck_too_large: 'مرفوضة: أكبر من 4 KB',
  ck_empty: 'مرفوضة: فارغة',
  ck_domain_mismatch: 'مرفوضة: Domain لا ينتمي إليه المضيف',
  ck_public_suffix: 'مرفوضة: Domain نطاق من المستوى الأعلى',
  ck_secure_over_http: 'مرفوضة: ضبط Secure عبر http',
  ck_prefix_secure: 'مرفوضة: __Secure- بلا Secure عبر https',
  ck_prefix_host: 'مرفوضة: تشترط __Host- وجود Secure وPath=/ وغياب Domain',
  ck_samesite_none_insecure: 'مرفوضة: SameSite=None بلا Secure',

  /* ---- what could not be established ---- */
  inc_deadline: 'نفدت المهلة قبل أن تنتهي السلسلة',
  inc_port_not_followed: 'قفزة تشير إلى منفذ لا تتصل به هذه الخدمة',
  inc_credentials_not_followed: 'قفزة تحمل في عنوانها اسم مستخدم وكلمة مرور',
  inc_url_too_long: 'قفزة تشير إلى عنوان أطول مما تتبعه هذه الخدمة',

  /* ---- errors ---- */
  err_invalid_host: 'هذا لا يبدو عنوان ويب.',
  err_url_too_long: 'هذا العنوان أطول مما تتبعه هذه الخدمة.',
  err_scheme_not_supported: 'لا يمكن فحص سوى عناوين http وhttps.',
  err_credentials_not_allowed: 'احذف اسم المستخدم وكلمة المرور من العنوان: هذه الخدمة لا ترسلهما إلى أي مكان.',
  err_unknown_client: 'عميل غير معروف. استخدم واحدًا مما يلي: chrome, iphone, android, googlebot, yandexbot, bingbot, curl.',
  err_connection_refused: 'رفض الخادم الاتصال.',
  err_connection_reset: 'انقطع الاتصال.',
  err_connection_failed: 'تعذّر الاتصال.',
  err_malformed_response: 'لم تكن الاستجابة HTTP صالحًا.',
  err_tls_failed: 'أخفقت مصافحة TLS.',
  err_deadline: 'نفدت المهلة قبل هذه القفزة.',

  /* ---- findings ---- */
  flag_redirect_loop: 'السلسلة تدور في حلقة',
  fd_redirect_loop: 'قفزة تعيد الطلب إلى عنوان سبق أن مرّت به السلسلة، وبالكوكيز نفسها، فلا يسع الاستجابة إلا أن تتكرر. تستسلم المتصفحات برسالة «عمليات إعادة توجيه كثيرة جدًا»، وتتخلى برامج الزحف عن الرابط.',

  flag_redirect_loop_without_cookies: 'حلقة للعملاء بلا كوكيز',
  fd_redirect_loop_without_cookies: 'بلا كوكيز تعود السلسلة إلى حيث بدأت. قد يمرّ المتصفح الذي يحتفظ بالكوكي التي يضبطها الموقع — لكن برامج الزحف لا تحتفظ بأي كوكيز، فهذه هي الحلقة التي تراها.',

  flag_too_many_redirects: 'عمليات إعادة توجيه تتجاوز حدّ المتصفح',
  fd_too_many_redirects: 'يتوقف Chrome وFirefox بعد عشرين إعادة توجيه ويعرضان خطأ. وهذه السلسلة كانت لا تزال مستمرة.',

  flag_beyond_googlebot_limit: 'أطول مما يتبعه Googlebot',
  fd_beyond_googlebot_limit: 'يتبع Googlebot ما يصل إلى عشر عمليات إعادة توجيه متتالية. وبعد ذلك لا يزحف إلى الصفحة عبر هذا الرابط، ويُبلغ Search Console عن خطأ في إعادة التوجيه.',

  flag_long_chain: 'سلسلة طويلة',
  fd_long_chain: 'ثلاث عمليات إعادة توجيه أو أكثر قبل الصفحة. كل واحدة منها ذهاب وإياب إضافي قبل أن يبدأ تحميل أي شيء، ومحركات البحث تفضّل قفزة واحدة مباشرة إلى العنوان النهائي.',

  flag_could_be_one_redirect: 'قفزات كان يمكن أن تكون واحدة',
  fd_could_be_one_redirect: 'عدة عمليات إعادة توجيه داخل موقع واحد، تهذّب كلٌّ منها جزءها من العنوان. وإرسال الزائر مباشرةً إلى العنوان النهائي يوفّر رحلات الذهاب والإياب هذه. ولا تُحتسب القفزة الأولى من http إلى https على المضيف نفسه: فتلك هي الخطوة الأولى الصحيحة.',

  flag_slow_redirects: 'إعادة التوجيه بطيئة',
  fd_slow_redirects: 'استغرقت عمليات إعادة التوجيه وحدها أكثر من ثانية، قبل أن تبدأ الصفحة نفسها بالتحميل.',

  flag_connection_failed: 'قفزة لم تستجب',
  fd_connection_failed: 'تنقطع السلسلة هنا: العنوان التالي لم يُترجَم اسمه، أو رفض الاتصال، أو لم يستجب في الوقت المحدد. ويرى الزوار صفحة خطأ.',

  flag_redirect_to_private_network: 'يشير إلى داخل شبكة خاصة',
  fd_redirect_to_private_network: 'قفزة ترسل الزائر إلى عنوان داخل شبكة خاصة، أو إلى اسم لا وجود له إلا داخل شبكة كهذه. لا يستطيع أحد على الإنترنت اتباعها، وإعادة التوجيه نفسها تكشف شيئًا عن البنية الداخلية. وهذه الخدمة لا تتبعها كذلك.',

  flag_location_malformed: 'قيمة Location يتعذّر تحليلها',
  fd_location_malformed: 'تشير إعادة التوجيه إلى شيء ليس عنوانًا. وتعرض المتصفحات خطأ.',

  flag_multiple_location_headers: 'ترويستا Location مختلفتان',
  fd_multiple_location_headers: 'تحمل الاستجابة أكثر من Location، وهي غير متطابقة. يرفض Chrome إعادة توجيه كهذه رفضًا تامًا، ويختار العملاء الآخرون واحدةً منها. وقد اتُّبعت الأولى هنا.',

  flag_redirect_without_location: 'رمز إعادة توجيه بلا وجهة',
  fd_redirect_without_location: 'يقول رمز الحالة «إعادة توجيه»، لكن لا ترويسة Location. فتعرض المتصفحات ما جاء معه من متن، وهو فارغ في العادة.',

  flag_location_unencoded: 'قيمة Location بمحارف خام',
  fd_location_unencoded: 'تحمل ترويسة Location مسافات أو محارف خارج ASCII دون ترميز النسبة المئوية. تصلحها المتصفحات، أما العملاء الآخرون والخوادم الوسيطة والمكتبات فقد لا تفعل.',

  flag_unsafe_redirect_target: 'إعادة توجيه إلى مخطط ترفضه المتصفحات',
  fd_unsafe_redirect_target: 'تشير السلسلة إلى عنوان javascript: أو data: أو file:. وترفض المتصفحات اتباع إعادة توجيه إلى هناك.',

  flag_leaves_the_web: 'يُحيل إلى تطبيق',
  fd_leaves_the_web: 'تنتهي السلسلة بعنوان ليس صفحة ويب — tg:// أو mailto: أو intent: أو رابط متجر تطبيقات. يعرض المتصفح فتح التطبيق؛ وما يحدث بعد ذلك لم يعد مسألة ويب.',

  flag_ends_in_client_error: 'ينتهي بصفحة خطأ',
  fd_ends_in_client_error: 'تستجيب الصفحة النهائية برمز 4xx — غير موجودة، أو أُزيلت، أو محظورة. الرابط لا يؤدي إلى أي مكان.',

  flag_ends_in_server_error: 'ينتهي بخطأ في الخادم',
  fd_ends_in_server_error: 'تستجيب الصفحة النهائية برمز 5xx. قد يكون ذلك مؤقتًا، لكن ما دام قائمًا فالرابط معطوب.',

  flag_redirect_status_not_followed: 'رمز 3xx لا تتبعه المتصفحات',
  fd_redirect_status_not_followed: 'الرموز 300 و304 و305 و306 من فئة 3xx، لكنها ليست إعادة توجيه في نظر المتصفح: فأي Location تحمله يُتجاهَل.',

  flag_bot_challenge: 'استجاب اختبار كشف الروبوتات بدل الموقع',
  fd_bot_challenge: 'استجابت خدمة حماية باختبار موجَّه إلى العملاء الآليين. والمتصفح الذي يجتازه قد يُرسَل إلى مكان آخر؛ وما يلي هو ما يراه أي سكربت.',

  flag_https_downgrade: 'من https رجوعًا إلى http',
  fd_https_downgrade: 'قفزة تنتقل من عنوان مشفَّر إلى عنوان غير مشفَّر. ومن هناك يعبر الطلب الشبكةَ نصًّا مكشوفًا، ومعه كل كوكي لا تحمل Secure، وتتوقف المتصفحات عن إرسال Referer.',

  flag_late_https_upgrade: 'الانتقال إلى https يتأخر',
  fd_late_https_upgrade: 'تبلغ السلسلة https فعلًا، لكن بعد قفزة أخرى عبر http غير مشفَّر. وتعبر تلك القفزة الشبكة دون تشفير، ومعها كوكيز الزائر. أعِد التوجيه أولًا إلى https على المضيف نفسه، ثم إلى أي مكان آخر.',

  flag_upgrade_changes_host: 'الانتقال إلى https يغيّر المضيف أيضًا',
  fd_upgrade_changes_host: 'أول قفزة إلى https تذهب إلى اسم مختلف. هذا يعمل، لكن HSTS الخاصة بالاسم الذي كتبه الزائر لا تصل أبدًا، والتحميل المسبق لذلك الاسم يشترط أن يجري الانتقال إلى https عليه هو أولًا.',

  flag_ends_on_http: 'ينتهي على http غير مشفَّر',
  fd_ends_on_http: 'تُقدَّم الصفحة النهائية دون تشفير.',

  flag_certificate_invalid: 'شهادة سيرفضها المتصفح',
  fd_certificate_invalid: 'قفزة عبر https تقدّم شهادة منتهية الصلاحية، أو تسمّي مضيفًا آخر، أو لم تُصدرها سلطة تصديق موثوقة. يتوقف المتصفح هنا عند صفحة تحذير؛ ومع ذلك اتُّبعت السلسلة بعدها لبيان إلى أين تؤدي.',

  flag_temporary_canonicalization: 'إعادة توجيه مؤقتة في موضع الدائمة',
  fd_temporary_canonicalization: 'لا تفعل القفزة سوى تهذيب العنوان — المخطط، أو www، أو الشرطة المائلة في آخره — ومع ذلك تسمّي نفسها مؤقتة. لن تتذكرها المتصفحات، وستُبقي محركات البحث على العنوانين كليهما. والرمز المناسب لهذا هو 301 أو 308.',

  flag_permanent_redirect_cached: 'إعادة توجيه دائمة بلا مدة صلاحية',
  fd_permanent_redirect_cached: 'إعادة التوجيه 301 أو 308 بلا Cache-Control ولا Expires تحتفظ بها المتصفحات ما شاءت. وإن تبيّن يومًا أنها خاطئة، يظل كل من رآها يذهب إلى الهدف القديم. وإضافة max-age تجعل الخطأ قابلًا للتدارك.',

  flag_meta_refresh: 'إعادة توجيه عبر meta refresh',
  fd_meta_refresh: 'ترسل الصفحة الزوار إلى وجهة أخرى عبر <meta http-equiv="refresh">. تتبعها المتصفحات، لكن بعد اكتمال تحميل الصفحة فقط، وتعامل محركات البحث المؤجَّلةَ منها معاملةَ إعادة التوجيه المؤقتة.',

  flag_refresh_header: 'ترويسة Refresh',
  fd_refresh_header: 'ترسل الاستجابة الزوار إلى وجهة أخرى بترويسة Refresh. تلتزم بها المتصفحات، لكنها لم تُعتمد قط جزءًا من معيار HTTP، وكثير من العملاء الآخرين يتجاهلونها.',

  flag_javascript_redirect: 'إعادة توجيه بالسكربت',
  fd_javascript_redirect: 'الصفحة فارغة إلا من سكربت يغيّر العنوان. والعملاء الذين لا يشغّلون السكربتات — معظم معاينات الروابط، وكثير من برامج الزحف، وcurl — يبقون على الصفحة الفارغة. عُثر عليه في الشيفرة: فهذه الخدمة لا تشغّل السكربتات.',

  flag_script_redirect_not_followed: 'قد يرسل سكربت الزوار إلى وجهة أخرى',
  fd_script_redirect_not_followed: 'تغيّر الصفحة النهائية العنوان في موضع ما من سكربتاتها. وقد يكون ذلك مشروطًا، فلم يُتبَع؛ لكن المتصفح قد يذهب إلى هناك مع ذلك.',

  flag_redirect_sets_cookies: 'كوكيز تُضبط أثناء إعادة التوجيه',
  fd_redirect_sets_cookies: 'تضبط القفزات السابقة للصفحة النهائية كوكيز. وهذا معتاد في التتبع وفي مسارات الموافقة أو تسجيل الدخول؛ ومن المفيد معرفته عند مشاركة الرابط.',

  flag_cookie_rejected: 'كوكي سيرفضها المتصفح',
  fd_cookie_rejected: 'تخالف Set-Cookie قاعدة تفرضها المتصفحات: Domain لا ينتمي إليه المضيف، أو Secure عبر http، أو بادئة __Host- أو __Secure- دون شروطها، أو SameSite=None بلا Secure. فيُسقط المتصفح الكوكي، ويخفق بصمت أي مسار دخول أو موافقة يعتمد عليها.',

  flag_query_lost: 'ضاعت معاملات الاستعلام في الطريق',
  fd_query_lost: 'المعاملات التي بدأ بها الرابط غائبة عن العنوان النهائي. وأكثر ما يذهب ضحية ذلك معاملات التتبع مثل utm_source: فتُحتسب الزيارة زيارةً مباشرة.',

  flag_path_lost: 'ينتهي بالصفحة الرئيسية',
  fd_path_lost: 'كان الرابط يشير إلى صفحة بعينها، والسلسلة تنتهي بجذر الموقع. وهذا معتاد بعد انتقال يُعاد فيه توجيه كل شيء إلى الصفحة الرئيسية: فيخسر الزوار ومحركات البحث معًا الصفحة التي كانوا يقصدونها.',

  flag_lands_on_another_site: 'ينتهي في موقع آخر',
  fd_lands_on_another_site: 'يبدأ الرابط في موقع وينتهي في آخر. وهذا متوقع في الروابط المختصرة وروابط الإعلانات؛ ويستحق نظرة حين لا يكون منها.',

  flag_canonical_elsewhere: 'الصفحة النهائية تسمّي عنوانًا معياريًا آخر',
  fd_canonical_elsewhere: 'الصفحة التي تنتهي عندها السلسلة تعلن أن عنوانها المعياري عنوانٌ آخر. وقد تفهرس محركات البحث ذلك العنوان بدلًا منها، فالأفضل أن يشير الرابط إليه.',

  flag_final_noindex: 'الصفحة النهائية مستبعدة من الفهرسة',
  fd_final_noindex: 'الصفحة التي تنتهي عندها السلسلة تطلب من محركات البحث ألا تفهرسها، عبر وسم meta robots أو ترويسة X-Robots-Tag.',
};

window.I18N = window.mergeI18N(OWN);
