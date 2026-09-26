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

window.I18N = window.mergeI18N(OWN);
