# myredirectchecker

**Русская версия — [ниже](#русская-версия).**

**[myredirectchecker.sharapov.biz](https://myredirectchecker.sharapov.biz)** —
every hop a link takes before it arrives: the status, where it points, who
answered, how long it took, the certificate and the cookies. Meta refresh and
script redirects count as hops too.

No ads, no registration, no accounts. Nothing you look up is stored. MIT licensed,
twelve languages, one `docker run` to host your own.

```bash
curl myredirectchecker.sharapov.biz/example.com/some/page
```

---

## Where this differs

[myheaders](https://myheaders.sharapov.biz) already follows the redirects of a
site's home page from its four entry points. This goes the other way: one link,
any link — a short one, an ad link with all its tracking parameters, an old
address after a move — and everything about each hop it takes.

**Every hop, in full.** The status and what it means for a browser (a 301 or a
302 may turn a POST into a GET; a 307 or 308 may not), `Location` as it was sent
and as it resolved, whether it was relative, whether the fragment was carried
over as RFC 9110 says it must be. The address that answered and the network it
came through — Cloudflare, DDoS-Guard, Qrator, CloudFront, Fastly and others,
recognised by their own markers only, and reported as "answered through", never
"issued by", because a CDN passing on the origin's redirect looks the same.
DNS, connect, TLS and server time for each hop. The certificate on every https
hop, and whether a browser would stop there. Every response header.

**Not only 3xx.** A page can answer 200 and still send the visitor on: with a
`Refresh` header, which every browser honours though HTTP never standardised it;
with `<meta http-equiv="refresh">`, whose content is parsed here step by step as
the HTML standard describes, because `0;URL='/next'`, `0, /next` and
`0 url = /next` are all real pages and all mean the same thing; or with a
script. Scripts are read, never run: a literal `location.href = '/next'` in a
page that is otherwise empty is a redirect stub and is followed, labelled as
found in the source. The same line anywhere else may sit behind a condition, so
it is reported and left alone.

**Cookies, kept the way a browser keeps them.** The most common false alarm a
redirect checker raises is a loop that no browser ever sees: a site sets a cookie
and redirects to the same address, and the second request, carrying the cookie,
gets the page. A checker that forgets cookies between hops sends the same
request twice and reports a loop. Here a loop is the same URL asked with the same
cookies — and turning cookies off (`?cookies=false`) shows the loop a crawler
does see, reported separately. Cookies a browser would refuse — a `Domain` the
host does not belong to, `Secure` over http, `__Host-` and `__Secure-` without
their conditions, `SameSite=None` without `Secure` — are refused here too, with
the reason. Values are never shown.

**Who is asking.** Sites redirect by client more often than people expect:
phones to an `m.` host, crawlers past a consent wall, curl to a plain page. The
check can ask as Chrome, Safari on an iPhone, Chrome on Android, Googlebot,
YandexBot, Bingbot or curl, sending what each of them sends — a browser profile
includes `Upgrade-Insecure-Requests` and the `Sec-Fetch-*` set, because some
servers upgrade to https only when they see the first and some firewalls treat a
request without the second as a script. It asks in the language of the page, so
a site that redirects `/` to `/ru/` is seen doing it.

What a profile cannot do is come from where the real client comes from: a site
that verifies Googlebot by reverse DNS sees this server. The page says so rather
than pretending otherwise.

**What is checked.**

- loops, and chains longer than a browser (20) or Googlebot (10) will follow;
- a hop that does not answer, and where the chain breaks;
- https back to http, and an upgrade to https that comes late — `http://a →
  http://www.a → https://www.a` spends a hop in the clear with the visitor's
  cookies attached;
- a temporary redirect that only tidies the address — the scheme, a `www`, a
  trailing slash — where a permanent one is meant;
- a 301 or 308 with no `Cache-Control` or `Expires`, which browsers keep for as
  long as they like: the redirect that is hardest to take back;
- query parameters lost on the way — `utm_source` is the usual casualty, and the
  visit is counted as direct;
- a link to a particular page that ends on the home page;
- two different `Location` headers, which Chrome refuses outright;
- a `Location` with raw spaces or non-ASCII characters, a `Location` that is not
  an address, a redirect status with no `Location` at all;
- a redirect to `javascript:` or `data:`, which browsers refuse, and one that
  hands over to an app — `tg://`, `mailto:`, `intent:`;
- what the final page says about itself: a canonical address somewhere else,
  `noindex` in a meta tag or an `X-Robots-Tag` header;
- a bot check answering instead of the site.

## No grade

A redirect is not good or bad on its own. A 302 to a login page is exactly right,
a 301 to the wrong page is worse than none, and only the person who owns the link
knows which one they meant. So there is no letter: the report names what breaks,
what leaks, what costs time and what search engines will read differently, and
leaves the verdict to the reader. The badge counts redirects.

## The guard

A redirect checker is a machine that fetches whatever address a stranger's server
tells it to. The obvious way to abuse one is a public link that answers

```
Location: http://169.254.169.254/latest/meta-data/
```

— the first request harmless, the second the cloud metadata endpoint of whatever
machine the checker runs on. So every hop is judged as if it had been typed,
before a socket is opened for it:

- only http and https are fetched; anything else is reported, not followed;
- a literal address is refused if it is private, however it is spelled —
  `0x7f000001`, `2130706433` and `[::ffff:10.0.0.1]` included;
- a name is refused at resolution if *any* address it resolves to is private, so
  a name that answers with one public and one private address does not get to
  choose, and nothing is connected to in either case;
- the address a socket actually reached is checked once more on connect;
- only ports 80, 443, 8080 and 8443 are spoken to, so a `Location` header cannot
  be used to knock on every port of somebody else's machine;
- the page itself is never passed on — only what the report says about it —
  so the service cannot be used as an anonymous proxy.

Worth knowing before pasting a link: a one-time link — a login by email, a
password reset — is used up by the check exactly as by a click.

## What the numbers mean

Each hop is a fresh connection, so its times are what a first visit costs; a
browser reuses the connection for hops on the same host. The check runs from one
place, so a redirect by country shows the answer for that place.

## API

```bash
curl myredirectchecker.sharapov.biz/example.com/some/page          # a link as is
curl "myredirectchecker.sharapov.biz/api/bit.ly/xyz?ua=googlebot"  # as a crawler
curl "myredirectchecker.sharapov.biz/api/example.com?cookies=false&output=yaml"
curl myredirectchecker.sharapov.biz/api/stream/example.com         # server-sent events, hop by hop
```

A link typed straight after the slash is redirected to the one canonical form, the
whole URL encoded into a single path segment:

```
/example.com/page?utm_source=x   →   /http%3A%2F%2Fexample.com%2Fpage%3Futm_source%3Dx
```

Its query string comes along. The service's own options — `ua`, `cookies`,
`lang`, `output`, `refresh`, `download` — are kept apart, which leaves one
ambiguity: a link that itself uses one of those names has to be sent encoded.
Without a scheme a link starts on plain `http://`, so the upgrade to https is part
of what is shown.

```bash
curl -s myredirectchecker.sharapov.biz/api/example.com | jq '.hops[] | [.status, .url]'
```

## Running your own

```bash
docker run -d --name myredirectchecker -p 127.0.0.1:3030:3030 ghcr.io/sharapov-outsource/myredirectchecker:latest
```

| Variable | Default | What it does |
|---|---|---|
| `PORT` | `3030` | listen port |
| `TRUST_PROXY` | `true` | read the client address from proxy headers. Turn **off** when facing the internet directly |
| `HTTP_TIMEOUT_MS` | `10000` | per-hop timeout |
| `HTTP_MAX_BODY` | `262144` | how much of a page to read looking for a meta refresh or a script redirect |
| `SCAN_TIMEOUT_MS` | `45000` | no new hop is started after this; the chain is reported as far as it got |
| `MAX_REDIRECTS` | `20` | where a browser gives up |
| `ALLOWED_PORTS` | `80,443,8080,8443` | ports a hop may go to. `any` lifts the list — for tests and private deployments only |
| `CACHE_TTL_MS` | `120000` | how long a report is kept: short, because a redirect is the kind of thing somebody fixes and checks again within the minute |
| `METRIKA_ID` | — | analytics counter; omitted, no analytics and a tighter policy |
| `HSTS` | — | set to `true` behind TLS |

The container is read-only, unprivileged and writes nothing.

Behind nginx, pass requests through unchanged — `proxy_pass http://127.0.0.1:3030;`
with no path after the port. With a path nginx decodes the request first, and an
encoded link falls apart at its first `%2F`. The slashes nginx merges by default
(`/https://…` arriving as `/https:/…`) are put back here.

## Development

```bash
npm install
npm start
npm test                                           # syntax, translations, unit tests, smoke
npm run scan -- example.com/some/page              # the checker without the web server
npm run scan -- bit.ly/xyz --ua=googlebot --no-cookies
```

The tests never leave the machine. The reasoning — what was typed, what a refresh
tag says, what a `Set-Cookie` allows, what a chain means — is tested on strings;
the follower runs against a server the test starts, with gzip, brotli, raw
deflate, windows-1251, a decompression bomb, a cookie gate, a loop, a chain one
hop longer than a browser follows, and a public link redirecting to the metadata
address; the smoke test boots the service twice, once allowed to reach a local
site and once guarded as it is in production.

The shared package is a git dependency, so `npm install` needs `git`:

```json
"@sharapov/service-kit": "git+https://github.com/sharapov-outsource/service-kit.git#v1.6.0"
```

The URL is spelled out in full because the `github:` shorthand resolves to
`git+ssh://`, and the build has no SSH key. `npm install` writes that form into
`package-lock.json` anyway, so after changing a version rewrite it back:

```bash
sed -i '' 's|git+ssh://git@github.com/|git+https://github.com/|g' package-lock.json
GIT_SSH_COMMAND=/usr/bin/false npm ci   # fails here if any ssh URL is left
```

## Built on

**[service-kit](https://github.com/sharapov-outsource/service-kit)** — the HTTP
shell, content negotiation, the closed policy, translations and design system.

## The rest of the family

[myip](https://myip.sharapov.biz) ·
[myssl](https://myssl.sharapov.biz) ·
[mydns](https://mydns.sharapov.biz) ·
[mymx](https://mymx.sharapov.biz) ·
[myheaders](https://myheaders.sharapov.biz) ·
[myneighbors](https://myneighbors.sharapov.biz) ·
myredirectchecker

## Licence

MIT. See [LICENSE](LICENSE).

---

## Русская версия

**[myredirectchecker.sharapov.biz](https://myredirectchecker.sharapov.biz)** —
каждый шаг, который ссылка проходит до места назначения: код ответа, куда она
ведёт, кто ответил, сколько это заняло, сертификат и куки. Meta refresh и
редиректы из скриптов тоже считаются шагами.

Без рекламы, без регистрации, без учётных записей. Ничего из того, что вы
проверяете, не сохраняется. Лицензия MIT, двенадцать языков, свой экземпляр
поднимается одним `docker run`.

```bash
curl myredirectchecker.sharapov.biz/example.com/some/page
```

### Чем это отличается

[myheaders](https://myheaders.sharapov.biz) уже проходит редиректы главной
страницы сайта со всех четырёх входов. Здесь всё наоборот: одна ссылка, любая —
короткая, рекламная со всеми метками, старый адрес после переезда — и всё о
каждом её шаге.

**Каждый шаг целиком.** Код ответа и что он значит для браузера (при 301 и 302
браузер может превратить POST в GET, при 307 и 308 — нет), `Location` как он
был прислан и во что разрешился, был ли он относительным, унаследован ли
фрагмент, как того требует RFC 9110. Адрес, который ответил, и сеть, через
которую пришёл ответ, — Cloudflare, DDoS-Guard, Qrator, CloudFront, Fastly и
другие, распознанные только по их собственным признакам. В отчёте написано
«ответ пришёл через», а не «редирект выдал»: CDN, который передаёт редирект
сервера-источника, выглядит точно так же. Время на DNS, соединение, TLS и ответ
сервера для каждого шага. Сертификат на каждом шаге по https и то, остановился
бы на нём браузер или нет. Все заголовки ответа.

**Не только 3xx.** Страница может ответить 200 и всё равно отправить посетителя
дальше: заголовком `Refresh`, который понимает любой браузер, хотя в HTTP его
так и не стандартизировали; тегом `<meta http-equiv="refresh">`, содержимое
которого разбирается здесь шаг за шагом так, как описывает стандарт HTML, —
потому что `0;URL='/next'`, `0, /next` и `0 url = /next` встречаются на живых
страницах и значат одно и то же; или скриптом. Скрипты читаются, но никогда не
выполняются: `location.href = '/next'` с готовым адресом на странице, где больше
ничего нет, — это заглушка-редирект, и по ней сервис идёт, помечая, что редирект
найден в исходном коде. Та же строка в любом другом месте может стоять за
условием, поэтому о ней сообщается, но по ней не идут.

**Куки хранятся так, как их хранит браузер.** Самая частая ложная тревога
чекеров редиректов — петля, которой ни один браузер не видел: сайт ставит куку и
перенаправляет на тот же адрес, а второй запрос, уже с кукой, получает страницу.
Чекер, который забывает куки между шагами, отправляет один и тот же запрос
дважды и объявляет петлю. Здесь петля — это тот же адрес, запрошенный с теми же
куками, а если куки выключить (`?cookies=false`), будет видна петля, которую
видит поисковый робот, — о ней сообщается отдельно. Куки, которые браузер
отвергнет, — `Domain`, к которому хост не относится, `Secure` по http, префиксы
`__Host-` и `__Secure-` без своих условий, `SameSite=None` без `Secure` —
отвергаются и здесь, с указанием причины. Значения кук не показываются.

**Кто спрашивает.** Сайты перенаправляют разных клиентов по-разному чаще, чем
принято думать: телефоны — на хост `m.`, роботов — мимо окна согласия, curl — на
страницу попроще. Проверка может спросить как Chrome, Safari на iPhone, Chrome
на Android, Googlebot, YandexBot, Bingbot или curl и отправляет то, что
отправляет каждый из них. Профиль браузера включает `Upgrade-Insecure-Requests` и
набор `Sec-Fetch-*`: некоторые серверы переходят на https, только увидев первый,
а некоторые файрволы считают запрос без второго скриптом. Спрашивает проверка на
языке страницы, так что сайт, который перенаправляет `/` на `/ru/`, будет пойман
на этом.

Чего профиль сделать не может — так это прийти оттуда, откуда приходит настоящий
клиент: сайт, который проверяет Googlebot по обратному DNS, увидит этот сервер.
Страница так и говорит, а не делает вид, что это не так.

**Что проверяется.**

- петли и цепочки длиннее, чем проходит браузер (20) или Googlebot (10);
- шаг, который не ответил, и место, где цепочка обрывается;
- переход с https обратно на http и запоздалый переход на https:
  `http://a → http://www.a → https://www.a` проводит один шаг открытым текстом
  вместе с куками посетителя;
- временный редирект, который лишь приводит адрес в порядок — схема, `www`,
  слеш на конце, — там, где нужен постоянный;
- 301 или 308 без `Cache-Control` и `Expires`: такой редирект браузер хранит
  сколько сочтёт нужным, и отменить его труднее всего;
- параметры, потерянные по дороге: обычно страдает `utm_source`, и визит
  засчитывается как прямой;
- ссылка на конкретную страницу, которая приводит на главную;
- два разных заголовка `Location` — Chrome такой редирект отвергает целиком;
- `Location` с пробелами или не-ASCII символами без кодирования, `Location`,
  который не является адресом, код редиректа без `Location` вовсе;
- редирект на `javascript:` или `data:`, который браузеры отвергают, и
  редирект, который передаёт ссылку приложению, — `tg://`, `mailto:`, `intent:`;
- что конечная страница говорит о себе: канонический адрес где-то ещё,
  `noindex` в мета-теге или в заголовке `X-Robots-Tag`;
- проверка на робота, ответившая вместо сайта.

### Без оценки

Редирект сам по себе не хорош и не плох. 302 на страницу входа — ровно то, что
нужно, 301 не туда хуже, чем никакого, а какой из них имелся в виду, знает
только владелец ссылки. Поэтому буквы нет: отчёт называет то, что ломается, что
утекает, что стоит времени и что поисковики прочитают иначе, а вывод оставляет
читателю. Значок показывает число редиректов.

### Защита

Чекер редиректов — это машина, которая идёт по любому адресу, какой ей назовёт
чужой сервер. Самый очевидный способ ею злоупотребить — публичная ссылка,
которая отвечает

```
Location: http://169.254.169.254/latest/meta-data/
```

Первый запрос безобиден, второй — адрес облачных метаданных той машины, на
которой работает чекер. Поэтому каждый шаг проверяется так, будто его набрали
вручную, ещё до того, как для него откроется сокет:

- ходят только по http и https; обо всём остальном сообщается, но туда не идут;
- адрес, записанный цифрами, отвергается, если он частный, как бы он ни был
  записан, — `0x7f000001`, `2130706433` и `[::ffff:10.0.0.1]` тоже;
- имя отвергается ещё при разрешении, если *хотя бы один* из его адресов частный:
  имя, которое отвечает одним публичным и одним частным адресом, выбирать не
  будет, и соединения не будет ни с тем, ни с другим;
- адрес, до которого на самом деле дошёл сокет, проверяется ещё раз при
  соединении;
- разговор идёт только с портами 80, 443, 8080 и 8443, так что заголовком
  `Location` нельзя простучать все порты чужой машины;
- сама страница наружу не отдаётся — только то, что о ней сказано в отчёте, —
  поэтому сервис нельзя использовать как анонимный прокси.

Что стоит знать, прежде чем вставлять ссылку: одноразовую ссылку — вход по
письму, сброс пароля — проверка израсходует точно так же, как клик.

### Что значат цифры

Каждый шаг — новое соединение, поэтому его время — это цена первого визита;
браузер для шагов на одном хосте переиспользует соединение. Проверка идёт из
одного места, так что редирект по стране покажет ответ для этого места.

### API

```bash
curl myredirectchecker.sharapov.biz/example.com/some/page          # ссылка как есть
curl "myredirectchecker.sharapov.biz/api/bit.ly/xyz?ua=googlebot"  # как поисковый робот
curl "myredirectchecker.sharapov.biz/api/example.com?cookies=false&output=yaml"
curl myredirectchecker.sharapov.biz/api/stream/example.com         # server-sent events, шаг за шагом
```

Ссылка, набранная сразу после слеша, перенаправляется на единственную
каноническую форму — весь URL закодирован в один сегмент пути:

```
/example.com/page?utm_source=x   →   /http%3A%2F%2Fexample.com%2Fpage%3Futm_source%3Dx
```

Строка запроса ссылки переносится вместе с ней. Собственные параметры сервиса —
`ua`, `cookies`, `lang`, `output`, `refresh`, `download` — держатся отдельно, и
отсюда одна неоднозначность: ссылку, которая сама использует одно из этих имён,
нужно отправлять закодированной. Ссылка без схемы начинается с открытого
`http://`, чтобы переход на https был частью того, что показано.

```bash
curl -s myredirectchecker.sharapov.biz/api/example.com | jq '.hops[] | [.status, .url]'
```

### Запуск своего экземпляра

```bash
docker run -d --name myredirectchecker -p 127.0.0.1:3030:3030 ghcr.io/sharapov-outsource/myredirectchecker:latest
```

| Переменная | По умолчанию | Что делает |
|---|---|---|
| `PORT` | `3030` | порт прослушивания |
| `TRUST_PROXY` | `true` | брать адрес клиента из заголовков прокси. **Выключить**, когда сервис смотрит в интернет напрямую |
| `HTTP_TIMEOUT_MS` | `10000` | таймаут одного шага |
| `HTTP_MAX_BODY` | `262144` | сколько страницы читать в поисках meta refresh или редиректа из скрипта |
| `SCAN_TIMEOUT_MS` | `45000` | после этого новые шаги не начинаются; цепочка показывается настолько, насколько пройдена |
| `MAX_REDIRECTS` | `20` | где сдаётся браузер |
| `ALLOWED_PORTS` | `80,443,8080,8443` | порты, на которые может вести шаг. `any` снимает ограничение — только для тестов и закрытых установок |
| `CACHE_TTL_MS` | `120000` | сколько хранится отчёт: недолго, потому что редирект — это то, что правят и тут же проверяют снова |
| `METRIKA_ID` | — | счётчик аналитики; без него аналитики нет, а политика строже |
| `HSTS` | — | поставить `true` за TLS |

Контейнер только для чтения, без привилегий, ничего не пишет.

За nginx запросы нужно передавать без изменений — `proxy_pass http://127.0.0.1:3030;`
без пути после порта. С путём nginx сначала раскодирует запрос, и закодированная
ссылка развалится на первом `%2F`. Слеши, которые nginx по умолчанию склеивает
(`/https://…` приходит как `/https:/…`), здесь восстанавливаются.

### Разработка

```bash
npm install
npm start
npm test                                           # синтаксис, переводы, юнит-тесты, smoke
npm run scan -- example.com/some/page              # проверка из консоли, без веб-сервера
npm run scan -- bit.ly/xyz --ua=googlebot --no-cookies
```

Тесты не выходят за пределы машины. Логика — что набрано, что говорит тег
refresh, что позволяет `Set-Cookie`, что значит цепочка — проверяется на
строках. Обход цепочки гоняется на сервере, который тест поднимает сам: gzip,
brotli, «сырой» deflate, windows-1251, бомба-распаковка, ворота на куках, петля,
цепочка на один шаг длиннее, чем проходит браузер, и публичная ссылка с
редиректом на адрес метаданных. Smoke-тест поднимает сервис дважды: один
экземпляр может ходить на локальный сайт, второй защищён так же, как в
продакшене.

Общий пакет подключён как git-зависимость, поэтому `npm install` требует `git`:

```json
"@sharapov/service-kit": "git+https://github.com/sharapov-outsource/service-kit.git#v1.6.0"
```

URL выписан полностью, потому что сокращение `github:` разворачивается в
`git+ssh://`, а у сборки нет ключа SSH. `npm install` всё равно записывает эту
форму в `package-lock.json`, так что после смены версии её надо переписать
обратно:

```bash
sed -i '' 's|git+ssh://git@github.com/|git+https://github.com/|g' package-lock.json
GIT_SSH_COMMAND=/usr/bin/false npm ci   # здесь и упадёт, если ssh-адрес остался
```

### На чём построено

**[service-kit](https://github.com/sharapov-outsource/service-kit)** — оболочка
HTTP, согласование форматов, закрытая политика, переводы и оформление.

### Остальная семья

[myip](https://myip.sharapov.biz) ·
[myssl](https://myssl.sharapov.biz) ·
[mydns](https://mydns.sharapov.biz) ·
[mymx](https://mymx.sharapov.biz) ·
[myheaders](https://myheaders.sharapov.biz) ·
[myneighbors](https://myneighbors.sharapov.biz) ·
myredirectchecker

### Лицензия

MIT. См. [LICENSE](LICENSE).
